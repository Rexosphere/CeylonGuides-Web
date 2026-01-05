<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Button -->
    <button 
      v-if="!isOpen"
      @click="isOpen = true"
      class="group relative size-16 bg-gradient-to-br from-coral-orange to-orange-600 rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-xl"
    >
      <span class="material-symbols-outlined text-3xl">smart_toy</span>
      <span class="absolute -top-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
    </button>

    <!-- Chat Panel -->
    <div 
      v-if="isOpen"
      class="w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-white dark:bg-background-dark rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/10"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-coral-orange to-orange-600 px-4 py-3 flex items-center justify-between text-white">
        <div class="flex items-center gap-3">
          <div class="size-10 bg-white/20 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined">smart_toy</span>
          </div>
          <div>
            <h3 class="font-bold text-sm">Ceylon Guide AI</h3>
            <p class="text-xs text-white/80">Your travel assistant</p>
          </div>
        </div>
        <button @click="isOpen = false" class="hover:bg-white/20 p-1 rounded-lg transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Quick Actions Bar -->
      <div class="px-3 py-2 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-dark flex gap-2 overflow-x-auto">
        <button
          v-for="action in quickActions"
          :key="action.id"
          @click="handleQuickAction(action.id)"
          :class="[
            'px-3 py-2 rounded-lg text-white text-xs font-semibold whitespace-nowrap hover:opacity-90 transition-all hover:scale-105 shadow-sm',
            action.color
          ]"
        >
          {{ action.label }}
        </button>
      </div>

      <!-- Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#1a1210]">
        <div 
          v-for="(msg, idx) in messages" 
          :key="idx"
          :class="[
            'max-w-[85%] p-3 rounded-2xl text-sm',
            msg.role === 'user' 
              ? 'ml-auto bg-coral-orange text-white rounded-br-sm' 
              : 'bg-white dark:bg-surface-dark text-gray-800 dark:text-white shadow-sm rounded-bl-sm'
          ]"
        >
          <span v-html="formatMessage(msg.content)"></span>
          
          <!-- Action Buttons (from AI response) -->
          <div v-if="msg.actions && msg.actions.length" class="mt-3 flex flex-wrap gap-2">
            <button 
              v-for="action in msg.actions" 
              :key="action"
              @click="handleAction(action)"
              class="text-xs px-3 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
            >
              {{ formatActionLabel(action) }}
            </button>
          </div>
          
          <!-- Suggestions -->
          <div v-if="msg.suggestions && msg.suggestions.length" class="mt-3 flex flex-wrap gap-2">
            <button 
              v-for="sug in msg.suggestions" 
              :key="sug"
              @click="sendMessage(sug)"
              class="text-xs px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            >
              {{ sug }}
            </button>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex gap-1 p-3 bg-white dark:bg-surface-dark rounded-2xl rounded-bl-sm w-fit">
          <span class="size-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
          <span class="size-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
          <span class="size-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
        </div>
      </div>

      <!-- Input -->
      <form @submit.prevent="handleSubmit" class="p-3 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-background-dark">
        <div class="flex gap-2">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Ask me anything about Sri Lanka..."
            class="flex-1 px-4 py-3 bg-gray-100 dark:bg-surface-dark border-0 rounded-xl text-sm focus:ring-2 focus:ring-coral-orange focus:outline-none"
            :disabled="isTyping"
          />
          <button 
            type="submit"
            :disabled="!inputMessage.trim() || isTyping"
            class="size-12 bg-coral-orange hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-xl transition-colors flex items-center justify-center"
          >
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
  suggestions?: string[]
  actions?: string[]
}

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const isOpen = ref(false)
const isTyping = ref(false)
const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const sessionId = ref<string>('')

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: "Ayubowan! 🙏 I'm your AI travel assistant for Sri Lanka. How can I help you today?",
    suggestions: ['Learn basic phrases', 'Check scam alerts', 'Find restaurants'],
    actions: ['safety-mode', 'scam-alerts', 'clean-dining']
  }
])

// Quick action buttons
const quickActions = [
  { id: 'emergency', label: '🚨 Emergency', color: 'bg-red-500' },
  { id: 'scam-report', label: '⚠️ Report Scam', color: 'bg-orange-500' },
  { id: 'fare-check', label: '🚖 Check Fare', color: 'bg-blue-500' },
  { id: 'find-food', label: '🍽️ Find Food', color: 'bg-green-500' }
]

// Quick action handler
async function handleQuickAction(actionId: string) {
  switch (actionId) {
    case 'emergency':
      await navigateTo('/safety-mode')
      isOpen.value = false
      break
    case 'scam-report':
      await navigateTo('/scam-alerts')
      isOpen.value = false
      break
    case 'fare-check':
      await navigateTo('/transport')
      isOpen.value = false
      break
    case 'find-food':
      await navigateTo('/clean-dining')
      isOpen.value = false
      break
  }
}

// Action handler for buttons in messages
function handleAction(action: string) {
  // Parse action format: "navigate:/path?query=value"
  if (action.startsWith('navigate:')) {
    const url = action.replace('navigate:', '')
    navigateTo(url)
    isOpen.value = false
    return
  }
  
  // Simple route mapping
  const routes: Record<string, string> = {
    'scam-alerts': '/scam-alerts',
    'emergency': '/emergency',
    'safety-mode': '/safety-mode',
    'transport': '/transport',
    'phrasebook': '/phrasebook',
    'clean-dining': '/clean-dining',
    'facilities': '/facilities',
    'accommodation': '/accommodation',
    'weather': '/weather',
    'money': '/money',
    'search': '/search'
  }
  
  const route = routes[action]
  if (route) {
    navigateTo(route)
    isOpen.value = false
  }
}

// Format action labels with icons
function formatActionLabel(action: string): string {
  // Handle navigate: format - extract meaningful label
  if (action.startsWith('navigate:')) {
    const pathPart = action.replace('navigate:', '').split('?')[0] || ''
    const page = pathPart.split('/').pop() ?? ''
    const navLabels: Record<string, string> = {
      'scam-alerts': '⚠️ View Alerts',
      'safety-mode': '🛡️ Safety Mode',
      'transport': '🚖 Transport',
      'phrasebook': '📖 Phrases',
      'clean-dining': '🍽️ Dining',
      'facilities': '🚻 Facilities'
    }
    return navLabels[page] || '→ ' + page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  
  // Predefined labels with emojis
  const labels: Record<string, string> = {
    'scam-alerts': '⚠️ Scam Alerts',
    'emergency': '🚨 Emergency',
    'safety-mode': '🛡️ Safety Mode',
    'transport': '🚖 Transport',
    'phrasebook': '📖 Phrases',
    'clean-dining': '🍽️ Dining',
    'facilities': '🚻 Facilities',
    'accommodation': '🏨 Stay',
    'weather': '🌦️ Weather',
    'money': '💰 Money'
  }
  return labels[action] || action.charAt(0).toUpperCase() + action.slice(1).replace(/-/g, ' ')
}

/**
 * Escape HTML entities to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char)
}

/**
 * Format message with safe HTML rendering
 * 1. Escape all HTML entities first (prevents XSS)
 * 2. Convert **bold** to <strong> (safe - only on escaped content)
 * 3. Convert newlines to <br> (safe)
 */
function formatMessage(content: string): string {
  // Step 1: Escape ALL HTML to prevent XSS
  let escaped = escapeHtml(content)
  
  // Step 2: Apply safe formatting transformations
  // Only bold (**text**) and line breaks are allowed
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  escaped = escaped.replace(/\n/g, '<br>')
  
  return escaped
}

async function sendMessage(text: string) {
  if (!text.trim()) return
  
  messages.value.push({ role: 'user', content: text })
  inputMessage.value = ''
  isTyping.value = true
  
  await nextTick()
  scrollToBottom()
  
  try {
    const response = await $fetch<{
      success: boolean
      data: {
        session_id: string
        response: string
        suggestions?: string[]
        action?: string
      }
    }>(`${apiBase}/api/ai/chat`, {
      method: 'POST',
      body: {
        message: text,
        session_id: sessionId.value || undefined
      }
    })
    
    if (response.success) {
      sessionId.value = response.data.session_id
      messages.value.push({
        role: 'assistant',
        content: response.data.response,
        suggestions: response.data.suggestions,
        actions: (response.data as any).actions || []
      })
      
      // Handle navigation actions
      if (response.data.action?.startsWith('navigate:')) {
        const path = response.data.action.replace('navigate:', '')
        setTimeout(() => navigateTo(path), 1000)
      }
    }
  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: "I'm sorry, I'm having trouble responding right now. Please try again.",
      suggestions: ['Try again']
    })
  } finally {
    isTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}

function handleSubmit() {
  sendMessage(inputMessage.value)
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>
