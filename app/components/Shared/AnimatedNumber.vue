<template>
  <span>{{ displayValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: { 
    type: Number, 
    default: 1000 
  },
  format: {
    type: Function,
    default: (val) => Math.round(val).toLocaleString()
  }
})

const displayValue = ref(props.format(0))

watch(() => props.value, (newValue, oldValue) => {
  animateValue(oldValue || 0, newValue, props.duration)
})

onMounted(() => {
  if (props.value) {
    animateValue(0, props.value, props.duration)
  }
})

function animateValue(start, end, duration) {
  const startTime = performance.now()
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function (easeOutQuart)
    const ease = 1 - Math.pow(1 - progress, 4)
    
    const current = start + (end - start) * ease
    displayValue.value = props.format(current)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}
</script>
