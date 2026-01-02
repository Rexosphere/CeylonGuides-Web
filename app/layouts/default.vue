<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
    <Header />
    
    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>

