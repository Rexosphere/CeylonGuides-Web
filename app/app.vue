<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AIChatWidget />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const config = useRuntimeConfig()
const authPinged = useState<boolean>('auth_pinged', () => false)

onMounted(async () => {
  if (authPinged.value) return
  authPinged.value = true
  try {
    const response = await $fetch<{ success: boolean }>(`${config.public.apiBase}/api/auth/ping`)
    console.info('Auth ping:', response.success ? 'ok' : 'failed')
  } catch (error) {
    console.warn('Auth ping failed:', error)
  }
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - CeylonGuides` : 'CeylonGuides'
  },
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>
