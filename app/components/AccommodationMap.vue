<template>
  <div class="relative hidden md:block md:flex-1 bg-neutral-100 dark:bg-neutral-900 overflow-hidden sticky top-[80px] h-[calc(100vh-80px)]">
    <!-- Simulated Map Background -->
    <div class="absolute inset-0 z-0 opacity-100">
      <img 
        class="h-full w-full object-cover grayscale opacity-40" 
        alt="Detailed map of Sri Lanka with topography" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFyNK7fjbRGoMJQgJ0Vt7uKHvny4mc1kU3-9CBJk2F8F_2m75xOGfJZ0ibuVb4EoYjPMiMjS7cOGmsXrfS1SgaK1Pvsq-VF_mm0mcg835xZHEwn9Cmc8CWJuzBCAN8DLvsKBVVg9E2kYe6yNLzcs3sAVOu0yL3sfsHloHYIrYd00UPGJg3MpOVbtnR851S-bq8XPfEdxCnLTyz9LRjtBlK6EoJRExuMJTfcQfLs75DA9wpWkQq68kUDUkJ0hcyyOg047FOkS2s9c0"
      />
    </div>
    <!-- Map Overlay UI -->
    <div class="absolute inset-0 z-10 p-6 pointer-events-none">
      <div class="flex justify-end pointer-events-auto">
        <div class="flex gap-2 rounded-lg bg-white p-2 shadow-lg dark:bg-neutral-800">
          <button class="flex size-8 items-center justify-center rounded hover:bg-neutral-100 dark:hover:bg-white/10">
            <span class="material-symbols-outlined text-neutral-dark dark:text-white">add</span>
          </button>
          <button class="flex size-8 items-center justify-center rounded hover:bg-neutral-100 dark:hover:bg-white/10">
            <span class="material-symbols-outlined text-neutral-dark dark:text-white">remove</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Map Pins -->
    <div class="absolute top-1/4 left-1/4 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
      <div class="relative flex flex-col items-center">
        <div class="flex items-center justify-center rounded-lg bg-white px-3 py-1 shadow-lg dark:bg-neutral-800 transition-transform group-hover:scale-110">
          <span class="text-sm font-bold text-neutral-dark dark:text-white">$120</span>
        </div>
        <div class="size-3 rotate-45 bg-white dark:bg-neutral-800 -mt-1.5 shadow-sm"></div>
        <div class="size-3 rounded-full bg-primary mt-1 ring-4 ring-primary/30"></div>
      </div>
    </div>
    <div class="absolute top-1/2 left-1/3 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
      <div class="relative flex flex-col items-center">
        <div class="flex items-center justify-center rounded-lg bg-white px-3 py-1 shadow-lg dark:bg-neutral-800 transition-transform group-hover:scale-110">
          <span class="text-sm font-bold text-neutral-dark dark:text-white">$45</span>
        </div>
        <div class="size-3 rotate-45 bg-white dark:bg-neutral-800 -mt-1.5 shadow-sm"></div>
      </div>
    </div>
    <div class="absolute bottom-1/3 right-1/4 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
      <div class="relative flex flex-col items-center">
        <div class="flex items-center justify-center rounded-lg bg-white px-3 py-1 shadow-lg dark:bg-neutral-800 transition-transform group-hover:scale-110">
          <span class="text-sm font-bold text-neutral-dark dark:text-white">$210</span>
        </div>
        <div class="size-3 rotate-45 bg-white dark:bg-neutral-800 -mt-1.5 shadow-sm"></div>
      </div>
    </div>
  </div>
</template>
