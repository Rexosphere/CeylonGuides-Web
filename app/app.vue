<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <NotificationContainer />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NotificationContainer from '~/components/UI/NotificationContainer.vue'

const config = useRuntimeConfig()
const authPinged = useState<boolean>('auth_pinged', () => false)

// Debug: Enable click logging if ?debugClicks=1
import { useClickDebug } from '~/composables/useClickDebug'
useClickDebug()

onMounted(async () => {
  if (authPinged.value) return
  authPinged.value = true
  try {
    const response = await $fetch<{ success: boolean }>(`${config.public.apiBase}/api/auth/ping`)
    console.info('Auth ping:', response.success ? 'ok' : 'failed')
  } catch (error) {
    // Auth backend is optional in articles-first mode
  }
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - CeylonGuide` : 'CeylonGuide - Travel Stories & Journals from Sri Lanka'
  },
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>
