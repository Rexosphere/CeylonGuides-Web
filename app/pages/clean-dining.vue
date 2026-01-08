<template>
  <div>
    <!-- Hero Section -->
    <CleanDiningHero />

    <!-- Filter Bar -->
    <CleanDiningFilterBar v-model:search-query="searchQuery" :active-filters="activeFilters"
      :restaurant-count="restaurants.length" @toggle-filter="toggleFilter" @clear-filters="clearFilters" />

    <!-- Main Content Section -->
    <section class="py-8 bg-background-light dark:bg-background-dark min-h-screen">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Restaurant List -->
          <div class="lg:col-span-8 space-y-6">
            <!-- Loading State -->
            <div v-if="pending" class="flex justify-center py-12">
              <div class="animate-spin size-8 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="displayRestaurants.length === 0" class="text-center py-12 text-gray-500">
              <span class="material-symbols-outlined text-4xl mb-2">restaurant</span>
              <p>No restaurants found. Try adjusting your filters.</p>
            </div>

            <!-- Restaurant Cards -->
            <CleanDiningRestaurantCard v-for="restaurant in displayRestaurants" :key="restaurant.name"
              :restaurant="restaurant" @view-details="viewRestaurantDetails(restaurant)" />
          </div>

          <!-- Map Sidebar -->
          <CleanDiningMap />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Restaurant } from '~/types/api'

// Default layout enabled
// definePageMeta({
//   layout: 'default'
// })

// Get config
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Filters
const selectedCategory = ref<string | null>(null)
const selectedDietary = ref<string | null>(null)
const selectedHygiene = ref<string | null>(null)
const searchQuery = ref('')
const debouncedQuery = ref('')
const activeFilters = ref<string[]>([])

// Debounce search input (300ms)
let debounceTimer: ReturnType<typeof setTimeout>
watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = newVal
  }, 300)
})

const { data: categoriesResponse } = await useFetch<{
  success: boolean
  data: Array<{ category: string; count: number }>
}>(`${apiBase}/api/dining/categories/list`)

const categories = computed(() => categoriesResponse.value?.data || [])

function formatCategory(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase())
}

// Review Modal State
const showReviewModal = ref(false)
const selectedRestaurant = ref<Restaurant | null>(null)
const reviewSubmitting = ref(false)
const reviewError = ref('')
const reviewSuccess = ref(false)
const reviewForm = ref({ rating: 0, comment: '' })
const showDetailsModal = ref(false)
const detailsLoading = ref(false)
const detailsError = ref('')
const restaurantDetails = ref<Restaurant | null>(null)

const { data: restaurantsResponse, pending, refresh } = await useFetch<{
  success: boolean
  data: Restaurant[]
  count: number
}>(
  () => {
    const params = new URLSearchParams()
    if (selectedCategory.value) params.set('category', selectedCategory.value)
    if (selectedDietary.value) params.set('dietary', selectedDietary.value)
    if (selectedHygiene.value) params.set('hygiene', selectedHygiene.value)
    if (debouncedQuery.value) params.set('search', debouncedQuery.value)
    const queryStr = params.toString()
    return `${apiBase}/api/dining${queryStr ? `?${queryStr}` : ''}`
  },
  { watch: [selectedCategory, selectedDietary, selectedHygiene, debouncedQuery] }
)

// Handle deep-links for specific restaurant
const route = useRoute()

function scrollToRestaurant(id: string) {
  nextTick(() => {
    const el = document.getElementById(`restaurant-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('ring-2', 'ring-dining-primary', 'ring-offset-2')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-dining-primary', 'ring-offset-2')
      }, 3000)
    }
  })
}

onMounted(async () => {
  if (route.query.id) {
    const restaurantId = route.query.id as string
    await nextTick()
    await openDetails(restaurantId)
    scrollToRestaurant(restaurantId)
  }
})

// Near Me mode state
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const sortBy = ref<'relevance' | 'distance' | 'rating'>('relevance')
const gettingLocation = ref(false)

// Enable location
async function enableLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported')
    return
  }

  gettingLocation.value = true

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      sortBy.value = 'distance'
      gettingLocation.value = false
    },
    (error) => {
      console.error('Location error:', error)
      alert('Could not get location')
      gettingLocation.value = false
    },
    { timeout: 10000 }
  )
}

// Calculate distance (Haversine formula)
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Sorted restaurants based on sortBy and location
const sortedRestaurants = computed(() => {
  const list = [...(restaurantsResponse.value?.data || [])]

  if (sortBy.value === 'distance' && userLocation.value) {
    list.sort((a, b) => {
      const distA = getDistance(
        userLocation.value!.lat,
        userLocation.value!.lng,
        a.location?.latitude || 0,
        a.location?.longitude || 0
      )
      const distB = getDistance(
        userLocation.value!.lat,
        userLocation.value!.lng,
        b.location?.latitude || 0,
        b.location?.longitude || 0
      )
      return distA - distB
    })
  } else if (sortBy.value === 'rating') {
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  return list
})

const restaurants = computed(() => sortedRestaurants.value)

// Sample restaurant data for the new design
const sampleRestaurants = [
  {
    name: 'A Minute By Tuk Tuk',
    location: 'Galle Fort',
    rating: 4,
    description: 'Colorful open-air eatery on the oceanfront (Old Dutch Hospital) with a seafood-centric menu.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuKoU059FSWsAAhLEWLUoUJTsh_3FwnWDg7mJo2upWT75W0aJd7TqkQloSdCV_kEOrFPq6iaflpGdnTuBwmDHCZQEVIiWgrp6tNA2qG_KZlKXqWrYP1WkpZ9NuyrM5I4PCEnNXCliH8_xGbnJH5zlMT5xZoL9q6z_5QdHLTRipPisKlbG3SevLTHc8mTsRSWH4LePj2v-enfIGsapMrJ2s0pJ3c1fcdOKoPNS8SlKsbxuF2q77qOo_RRlZGbJB0USVnFSfiOxmLhw',
    grade: 'Grade A',
    tags: ['Sri Lankan', 'Vegetarian', 'Seafood', 'Outdoor Seating']
  },
  {
    name: 'Paradise Road The Gallery Café',
    location: 'Colombo 7',
    rating: 5,
    description: 'Stylish cafe in a Geoffrey Bawa heritage building offering international and Sri Lankan dishes.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZWXUCz6Fr49V7H4gxXHBLQYAwtp78rRRlIv4In6r4hrRnlGV7cFPUQfMSgJre3GEAI8Fm-zXjPE6WMMFX483FjvsRaGK6wQYRg75cEc6n1Fb-Md1dkerRPzfTPc5Bl3UDUFq7B6O1B80qz4B2okkEIYXbTsyiX3L221SAAbuBTLoDNDF20teeH6tcsbO-iQzRuPGCiQOUJbfY1vHjME8j8w8o7_h8Bx9bC43b4YnbRYNGEd_5JMvXfjIYBiOBJPmd-ZQMtrJKiK4',
    grade: 'Safe & Secure',
    tags: ['International', 'Vegetarian', 'Outdoor Seating', 'Safe & Secure']
  }
]

// Display restaurants with filtering
const displayRestaurants = computed(() => {
  let filtered = sampleRestaurants

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.location.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Apply active filters
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(r => {
      return activeFilters.value.every(filter => {
        switch (filter) {
          case 'safe':
            return r.grade === 'Safe & Secure' || r.grade === 'Grade A'
          case 'vegetarian':
            return r.tags.some(tag => tag.toLowerCase().includes('vegetarian'))
          case 'vegan':
            return r.tags.some(tag => tag.toLowerCase().includes('vegan'))
          case 'halal':
            return r.tags.some(tag => tag.toLowerCase().includes('halal'))
          case 'hygiene':
            return r.grade === 'Grade A'
          case 'fineDining':
            return r.tags.some(tag => tag.toLowerCase().includes('fine'))
          default:
            return true
        }
      })
    })
  }

  return filtered
})

// Dietary filters
const dietaryFilters = [
  { id: null, label: 'All', icon: 'restaurant' },
  { id: 'VEGETARIAN', label: 'Vegetarian', icon: 'eco' },
  { id: 'VEGAN', label: 'Vegan', icon: 'psychiatry' },
  { id: 'HALAL', label: 'Halal', icon: 'mosque' },
]

// Hygiene rating helper
function getHygieneStars(rating: string): number {
  switch (rating) {
    case 'EXCELLENT': return 5
    case 'GOOD': return 4
    case 'FAIR': return 3
    case 'POOR': return 2
    default: return 0
  }
}

function selectDietary(id: string | null) {
  selectedDietary.value = selectedDietary.value === id ? null : id
}

function selectHygiene(id: string | null) {
  selectedHygiene.value = selectedHygiene.value === id ? null : id
}

function openReviewModal(restaurant: Restaurant) {
  selectedRestaurant.value = restaurant
  reviewForm.value = { rating: 0, comment: '' }
  reviewError.value = ''
  reviewSuccess.value = false
  showReviewModal.value = true
}

async function openDetails(restaurantId: string) {
  showDetailsModal.value = true
  detailsLoading.value = true
  detailsError.value = ''
  try {
    const response = await $fetch<{ success: boolean; data: Restaurant }>(`${apiBase}/api/dining/${restaurantId}`)
    if (response.success) {
      restaurantDetails.value = response.data
    }
  } catch (err: any) {
    detailsError.value = err?.data?.error || 'Failed to load restaurant details.'
  } finally {
    detailsLoading.value = false
  }
}

function closeDetails() {
  showDetailsModal.value = false
  restaurantDetails.value = null
}

async function submitReview() {
  if (!selectedRestaurant.value || reviewForm.value.rating === 0) return

  reviewSubmitting.value = true
  reviewError.value = ''

  try {
    await $fetch(`${apiBase}/api/dining/${selectedRestaurant.value.id}/reviews`, {
      method: 'POST',
      body: {
        rating: reviewForm.value.rating,
        comment: reviewForm.value.comment || undefined
      }
    })

    reviewSuccess.value = true
    setTimeout(() => {
      showReviewModal.value = false
      refresh()
    }, 1500)
  } catch (err: any) {
    reviewError.value = err?.data?.error || 'Failed to submit review'
  } finally {
    reviewSubmitting.value = false
  }
}

// Filter management
function toggleFilter(filter: string) {
  const index = activeFilters.value.indexOf(filter)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(filter)
  }
}

function clearFilters() {
  activeFilters.value = []
  searchQuery.value = ''
}

// View restaurant details
function viewRestaurantDetails(restaurant: any) {
  console.log('View details for:', restaurant.name)
  // TODO: Implement modal or navigation to details page
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
