import { ref, computed } from 'vue'
import { useToast } from './useToast'

export interface BlogPost {
    id: string
    title: string
    excerpt: string
    author: {
        name: string
        avatar: string
        role?: string
    }
    date: string
    readTime: string
    category: string
    image: string
    featured?: boolean
    type?: 'standard' | 'quote' | 'video'
    quote?: string
    content?: string
}

export const useBlog = () => {
    const posts = ref<BlogPost[]>([
        {
            id: '1',
            title: 'Chasing Waterfalls in Ella: A Monsoon Diary',
            excerpt: 'Experience the misty magic of the hill country during the rainy season. A journey through tea plantations, hidden pools, and the roaring beauty of Ravana Falls.',
            author: { name: 'Sarah Jenkins', avatar: '/images/downloaded_a6c73e891fa9.avif', role: 'Explorer' },
            date: 'June 12, 2025',
            readTime: '8 min read',
            category: 'Hill Country',
            image: '/images/downloaded_6f4be875f1ff.avif',
            featured: true,
            type: 'standard',
            content: `
## The Journey Begins

The train ride from Kandy to Ella is often cited as one of the most scenic train rides in the world. But experiencing it during the monsoon season? That's a whole different kind of magic. As the locomotive chugs through the mist-covered hills, the world outside transforms into a verdant dreamscape of emerald tea plantations and cascading waterfalls.

### Ravana Falls: A Roaring Spectacle

Our first stop was the legendary Ravana Falls. Usually a serene cascade, the rains had swollen it into a roaring beast of nature. The sheer power of the water crashing down the rocks was mesmerizing. 

> "There is no better way to feel the pulse of Sri Lanka than to stand before its waterfalls in the rain."

We spent hours just listening to the sound of the water, a natural symphony that drowned out all the worries of the world.

### Tea Plantations in the Mist

Walking through the tea estates with the mist rolling in is an ethereal experience. The tea pluckers, with their colorful sacks, moved like ghosts through the fog, their nimble fingers picking the 'two leaves and a bud' with practiced precision.

## Where to Stay

We stayed at a cozy homestay tucked away in the hills. The mornings began with a hot cup of locally sourced Ceylon tea and a view that stretched for miles—when the mist cleared, of course.

### Tips for Monsoon Travel available
- **Pack Rain Gear**: A good raincoat is essential. Umbrellas can be useless in the wind.
- **Leech Socks**: If you plan on tracking, these are a lifesaver.
- **Patience**: The views might be obscured, but waiting for that moment of clarity is part of the adventure.

Visiting Ella in the rain isn't for everyone, but for those who seek atmosphere and solitude, it's the perfect time.`
        },
        {
            id: '2',
            title: 'The Ancient Majesty of Sigiriya: A Climb Through History',
            excerpt: 'Walking through the lion\'s paws and ascending the spiral staircases reveals not just a fortress, but a story of power, art, and engineering marvels from ancient Ceylon.',
            author: { name: 'David Chen', avatar: '/images/downloaded_14ff402ae3d9.avif' },
            date: 'June 10, 2025',
            readTime: '5 min read',
            category: 'Culture',
            image: '/images/downloaded_e54d2abd2d5e.avif',
            type: 'standard',
            content: `
## The Lion Rock

Rising dramatically from the central plains, the massive column of rock that is Sigiriya is awe-inspiring from miles away. Built by King Kashyapa in the 5th century, it was both a palace and a fortress.

### The Frescoes

Halfway up the rock, a sheltered gallery contains the Sigiriya Frescoes—ancient paintings of celestial nymphs. These vibrant works of art have survived for over 1500 years, retaining their color and detail.

## The Summit

The climb is steep, but the view from the top is worth every step. Walking among the ruins of the upper palace, with the wind in your hair and the jungle stretching out 360 degrees around you, you feel like a king of old.

### Engineering Marvels

The gardens below are a testament to ancient hydraulic engineering, with fountains that still work during the rainy season. It's a reminder that this wasn't just a fortress; it was a masterpiece of urban planning.`
        },
        {
            id: '3',
            title: 'The Art of Ceylon Tea',
            excerpt: 'From the misty slopes of Nuwara Eliya to your morning cup. A guide to the flavors and history.',
            author: { name: 'Nimali Perera', avatar: '' },
            date: 'June 8, 2025',
            readTime: '4 min read',
            category: 'Food & Drink',
            image: '/images/downloaded_a78fb194635d.avif',
            type: 'standard',
            content: `
## A Legacy in a Cup

Ceylon Tea is famous worldwide, but the story behind it is even more rich. Introduced by the British in the 19th century after a coffee blight, tea became the lifeblood of the hill country.

### The Process

1. **Plucking**: Only the top two leaves and a bud.
2. **Withering**: Removing moisture.
3. **Rolling**: Twisting the leaves to release oils.
4. **Fermentation**: The magic step that defines color and flavor.
5. **Firing**: Locking in the taste.

## Tasting Notes

- **Nuwara Eliya**: The "Champagne of Teas", light and floral.
- **Uva**: Exotic and aromatic.
- **Ruhuna**: Strong and full-bodied, perfect for milk tea.

Next time you sip your morning brew, remember the misty hills it came from.`
        },
        {
            id: '4',
            title: 'Quote of the Week',
            excerpt: '',
            quote: '"Sri Lanka is a universe in an island. Every corner holds a new surprise, a new flavor, a new friend."',
            author: { name: 'Sarah Jenkins', avatar: '/images/downloaded_a6c73e891fa9.avif', role: 'Solo Traveler' },
            date: 'June 5, 2025',
            readTime: '1 min read',
            category: 'Community',
            image: '',
            type: 'quote',
            content: ''
        },
        {
            id: '5',
            title: 'My First Tuk-Tuk Ride',
            excerpt: 'Navigating the chaotic yet charming streets of Colombo on three wheels. A purely adrenaline-filled experience.',
            author: { name: 'Mike Ross', avatar: '' },
            date: 'June 3, 2025',
            readTime: '3 min read',
            category: 'Community',
            image: '/images/downloaded_bc33951277d3.avif',
            type: 'standard',
            content: `
## Three Wheels of Fury

If you haven't ridden a tuk-tuk in Sri Lanka, you haven't really been to Sri Lanka. It's not just transport; it's an extreme sport.

### The Rules of the Road

1. **There are no rules.**
2. The horn is a language. One beep: "Hello". Two beeps: "Move over". Long beep: "I am coming through, pray for safety."
3. Cows have the right of way. Always.

Despite the chaos, there's a rhythm to it. The colorful interiors, the loud baila music playing, and the wind in your face make it unforgettable.`
        },
        {
            id: '6',
            title: 'A Culinary Journey: Spices of the South',
            excerpt: 'Discover the fiery curries and coconut-infused sambols that define southern Sri Lankan cuisine. Includes a list of must-visit local eateries.',
            author: { name: 'Dilani F.', avatar: '' },
            date: 'May 28, 2025',
            readTime: '10 min read',
            category: 'Food & Drink',
            image: '/images/downloaded_df76468379ff.avif',
            type: 'standard',
            content: `
## More Than Just Curry

Southern cuisine leans heavily on seafood, coconut, and a heavy hand with the spices.

### Must-Try Dishes

- **Ambul Thiyal (Sour Fish Curry)**: A dry curry made with goraka (dried gambooge) that gives it a unique sour flavor.
- **Pol Sambol**: Fresh coconut, lime, onion, and chili. Simple perfection.
- **Hoppers**: Bowl-shaped pancakes, best eaten with lunumis (chili paste).

### Where to Eat

Check out the small "Hela Bojun" outlets for authentic, government-certified local food cooked by local women. It's cheap, hygienic, and incredibly delicious.`
        },
        {
            id: '7',
            title: 'Surfing Season is Here',
            excerpt: 'Why Arugam Bay should be your next stop this June. Best breaks for beginners and pros alike.',
            author: { name: 'Kasun P.', avatar: '' },
            date: 'May 25, 2025',
            readTime: '6 min read',
            category: 'Beaches',
            image: '/images/downloaded_bea3130b5790.avif',
            type: 'standard',
            content: `
## The Surfer's Paradise

Arugam Bay on the East Coast comes alive from May to September. It's listed as one of the top surf spots in the world, and for good reason.

### The Spots

- **Main Point**: For the pros. Long, consistent right-hand point break.
- **Whiskey Point**: Great for beginners and fun waves.
- **Peanut Farm**: A bit of a trek, but a hidden gem with fewer crowds.

### Beyond the Waves

Even if you don't surf, the vibe in "A-Bay" is unmatched. Laid-back cafes, yoga on the beach, and parties that go late into the night. It's the ultimate chill zone.`
        }
    ])

    const activeCategory = ref('All Stories')
    const searchQuery = ref('')
    const sortBy = ref<'newest' | 'popular'>('newest')
    const filterReadTime = ref<'all' | 'short' | 'medium' | 'long'>('all')
    const filterSavedOnly = ref(false)

    // Mock saved state (in real app, use localStorage or pinia similar to useCommunity)
    const savedPosts = ref<Set<string>>(new Set())

    // Initialize from localStorage
    if (import.meta.client) {
        try {
            const stored = localStorage.getItem('blog-saved-posts')
            if (stored) {
                savedPosts.value = new Set(JSON.parse(stored))
            }
        } catch (e) { console.error('Error loading saved posts', e) }
    }


    const { showToast } = useToast()

    function toggleSave(id: string) {
        if (savedPosts.value.has(id)) {
            savedPosts.value.delete(id)
            showToast('Removed from Reading List', 'info')
        } else {
            savedPosts.value.add(id)
            showToast('Saved to Reading List')
        }

        // Persist
        if (import.meta.client) {
            localStorage.setItem('blog-saved-posts', JSON.stringify(Array.from(savedPosts.value)))
        }
    }

    function isSaved(id: string) {
        return savedPosts.value.has(id)
    }

    const categories = computed(() => {
        const cats = new Set(posts.value.map(p => p.category))
        return ['All Stories', ...Array.from(cats)].sort()
    })

    const featuredPost = computed(() => posts.value.find(p => p.featured) || posts.value[0])

    const filteredPosts = computed(() => {
        let result = posts.value.filter(p => !p.featured) // Exclude featured from grid

        // 1. Category Filter
        if (activeCategory.value !== 'All Stories') {
            result = result.filter(p => p.category === activeCategory.value)
        }

        // 2. Search Filter
        if (searchQuery.value) {
            const lower = searchQuery.value.toLowerCase()
            result = result.filter(p =>
                p.title.toLowerCase().includes(lower) ||
                p.excerpt.toLowerCase().includes(lower) ||
                p.author.name.toLowerCase().includes(lower)
            )
        }

        // 3. Read Time Filter
        if (filterReadTime.value !== 'all') {
            result = result.filter(p => {
                const mins = parseInt(p.readTime)
                if (filterReadTime.value === 'short') return mins < 5
                if (filterReadTime.value === 'medium') return mins >= 5 && mins <= 10
                if (filterReadTime.value === 'long') return mins > 10
                return true
            })
        }

        // 4. Saved Only Filter
        if (filterSavedOnly.value) {
            result = result.filter(p => savedPosts.value.has(p.id))
        }

        // 5. Sorting
        if (sortBy.value === 'newest') {
            result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        } else if (sortBy.value === 'popular') {
            // Mock popularity sorting
            result.sort((a, b) => a.title.length - b.title.length)
        }

        return result
    })

    function setCategory(cat: string) {
        activeCategory.value = cat
    }

    function setSearch(query: string) {
        searchQuery.value = query
    }

    function getRelatedPosts(currentId: string, category: string, limit = 3) {
        return posts.value
            .filter(p => p.id !== currentId && p.category === category && p.type !== 'quote')
            .slice(0, limit)
    }

    function addPost(post: Partial<BlogPost>) {
        const newPost: BlogPost = {
            id: crypto.randomUUID(),
            title: post.title || 'Untitled Story',
            excerpt: post.excerpt || '',
            author: post.author || { name: 'Anonymous', avatar: '' }, // Fallback
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            readTime: post.readTime || '5 min read',
            category: post.category || 'Community',
            image: post.image || '',
            content: post.content || '',
            type: 'standard',
            featured: false
        }

        posts.value.unshift(newPost)
        // In real app, persist this to backend
    }

    return {
        posts,
        activeCategory,
        categories,
        searchQuery,
        sortBy,
        filterReadTime,
        filterSavedOnly,
        featuredPost,
        filteredPosts,
        setCategory,
        setSearch,
        toggleSave,
        isSaved,
        getRelatedPosts,
        addPost
    }
}
