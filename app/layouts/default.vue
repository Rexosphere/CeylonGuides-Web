<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
    <Header variant="solid" />
    
    <main class="flex-1 mt-[80px]">
      <slot />
    </main>

    <Footer />
  </div>
</template>

