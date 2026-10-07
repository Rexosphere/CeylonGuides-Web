<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-main dark:text-white">
    <Header variant="solid" />
    
    <main class="flex-1 mt-[72px]">
      <slot />
    </main>

    <Footer />
  </div>
</template>
