<template>
  <div class="error-page">
    <div class="error-content">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
      <NuxtLink to="/" class="home-link">
        Go back home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.error-content h1 {
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ef4444;
}

.error-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #6b7280;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.home-link:hover {
  background-color: #059669;
}
</style>
