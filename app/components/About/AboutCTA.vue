<template>
  <div 
    ref="containerRef"
    class="w-full px-4 pb-24 pt-10 transition-all duration-1000 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
  >
    <div class="max-w-5xl mx-auto rounded-[2.5rem] bg-[#221510] relative overflow-hidden text-center py-20 px-6 sm:px-12 shadow-2xl group ring-1 ring-white/10">
      <!-- Decorative Pattern -->
      <div 
        class="absolute inset-0 opacity-20 transition-transform duration-[20s] ease-linear group-hover:scale-110" 
        style="background-image: url('/images/downloaded_098c82e58963.avif'); background-size: cover; background-position: center;"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#221510] via-[#221510]/90 to-[#221510]/80"></div>
      
      <div class="relative z-10 flex flex-col items-center gap-8">
        <!-- Content Group -->
        <div class="max-w-3xl space-y-6">
          <h2 class="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] drop-shadow-lg">{{ title }}</h2>
          <p class="text-gray-200 dark:text-gray-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">{{ text }}</p>
        </div>
        
        <!-- Social Proof -->
        <div class="flex flex-col items-center gap-2" :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
           <div class="flex items-center gap-1 text-yellow-400 text-lg">
             <span class="material-symbols-outlined fill-current">star</span>
             <span class="material-symbols-outlined fill-current">star</span>
             <span class="material-symbols-outlined fill-current">star</span>
             <span class="material-symbols-outlined fill-current">star</span>
             <span class="material-symbols-outlined fill-current">star</span>
           </div>
           <p class="text-white/80 font-medium text-sm">
             <span class="font-bold text-white">{{ socialProof.rating }}</span> Average Rating • <span class="text-primary-light">{{ socialProof.count }}</span>
           </p>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4 md:pt-8 max-w-2xl mx-auto">
          <button class="bg-primary hover:bg-primary/90 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-primary/20 text-lg flex-1 hover:-translate-y-1 active:translate-y-0 text-nowrap">
            {{ buttons.primary }}
          </button>
          
          <button class="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 backdrop-blur-md text-white font-bold py-4 px-8 rounded-2xl transition-all text-lg flex-1 hover:-translate-y-1 active:translate-y-0 text-nowrap">
            {{ buttons.secondary }}
          </button>
          
          <button class="text-white/70 hover:text-white font-bold py-4 px-8 rounded-2xl transition-all text-lg flex-1 hover:bg-white/5 border border-transparent hover:border-white/10 text-nowrap">
            {{ buttons.tertiary }}
          </button>
        </div>
        
        <!-- Testimonial Carousel -->
        <div v-if="testimonials && testimonials.length" class="mt-12 w-full max-w-2xl bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div class="relative h-24 overflow-hidden">
             <TransitionGroup name="fade">
               <div 
                 v-for="(t, index) in testimonials" 
                 :key="index"
                 v-show="activeTestimonial === index"
                 class="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
               >
                 <p class="text-white/90 text-lg italic leading-relaxed">"{{ t.text }}"</p>
                 <p class="text-primary text-sm font-bold mt-2 uppercase tracking-wide opacity-80">— {{ t.author }}</p>
               </div>
             </TransitionGroup>
          </div>
          <!-- Indicators -->
          <div class="flex justify-center gap-2 mt-4">
            <button 
              v-for="(_, idx) in testimonials" 
              :key="idx"
              @click="activeTestimonial = idx"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="activeTestimonial === idx ? 'w-6 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'"
            ></button>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="flex items-center gap-6 md:gap-10 mt-4 text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
          <span class="flex items-center gap-2 hover:text-white/60 transition-colors"><span class="material-symbols-outlined text-base">verified_user</span> Secure</span>
          <span class="h-1 w-1 rounded-full bg-white/20"></span>
          <span class="flex items-center gap-2 hover:text-white/60 transition-colors"><span class="material-symbols-outlined text-base">license</span> Licensed</span>
          <span class="h-1 w-1 rounded-full bg-white/20"></span>
          <span class="flex items-center gap-2 hover:text-white/60 transition-colors"><span class="material-symbols-outlined text-base">support</span> 24/7 Help</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollObserver } from '~/composables/useScrollObserver'

interface Buttons {
  primary: string
  secondary: string
  tertiary: string
}

interface SocialProof {
  rating: string
  count: string
}

interface Testimonial {
  text: string
  author: string
}

const props = defineProps<{
  title: string
  text: string
  socialProof: SocialProof
  buttons: Buttons
  testimonials: Testimonial[]
}>()

const activeTestimonial = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const { observe } = useScrollObserver()
let timer: any

onMounted(() => {
  if (props.testimonials && props.testimonials.length > 1) {
    timer = setInterval(() => {
      activeTestimonial.value = (activeTestimonial.value + 1) % props.testimonials.length
    }, 5000)
  }
  
  if (containerRef.value) {
    observe(containerRef.value, () => {
      isVisible.value = true
    })
  }
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
