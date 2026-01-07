import { ref } from 'vue'

export interface SpeechOptions {
  lang?: 'sinhala' | 'tamil' | string
  rate?: number
  pitch?: number
  volume?: number
}

export function useSpeech() {
  const isSpeaking = ref(false)
  const isSupported = ref(false)
  const currentUtterance = ref<SpeechSynthesisUtterance | null>(null)

  // Check if speech synthesis is supported
  if (typeof window !== 'undefined') {
    isSupported.value = 'speechSynthesis' in window
  }

  /**
   * Speak text with specified options
   */
  function speak(text: string, options: SpeechOptions = {}) {
    if (!isSupported.value) {
      console.warn('Speech synthesis is not supported in this browser')
      return
    }

    if (!text) {
      console.warn('No text provided to speak')
      return
    }

    // Stop any ongoing speech
    stop()

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Map language codes
    const langMap: Record<string, string> = {
      'sinhala': 'si-LK',
      'tamil': 'ta-LK',
      'english': 'en-US'
    }

    // Set language (default to Sinhala)
    utterance.lang = langMap[options.lang || 'sinhala'] || options.lang || 'si-LK'
    
    // Set speech rate (default to slower for learning)
    utterance.rate = options.rate ?? 0.8
    
    // Set pitch and volume
    utterance.pitch = options.pitch ?? 1
    utterance.volume = options.volume ?? 1

    // Event handlers
    utterance.onstart = () => {
      isSpeaking.value = true
    }

    utterance.onend = () => {
      isSpeaking.value = false
      currentUtterance.value = null
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      isSpeaking.value = false
      currentUtterance.value = null
    }

    // Store current utterance
    currentUtterance.value = utterance

    // Speak
    window.speechSynthesis.speak(utterance)
  }

  /**
   * Stop current speech
   */
  function stop() {
    if (!isSupported.value) return
    
    window.speechSynthesis.cancel()
    isSpeaking.value = false
    currentUtterance.value = null
  }

  /**
   * Pause current speech
   */
  function pause() {
    if (!isSupported.value || !isSpeaking.value) return
    
    window.speechSynthesis.pause()
  }

  /**
   * Resume paused speech
   */
  function resume() {
    if (!isSupported.value) return
    
    window.speechSynthesis.resume()
  }

  /**
   * Speak a Sinhala phrase
   */
  function speakSinhala(text: string, rate?: number) {
    speak(text, { lang: 'sinhala', rate })
  }

  /**
   * Speak a Tamil phrase
   */
  function speakTamil(text: string, rate?: number) {
    speak(text, { lang: 'tamil', rate })
  }

  /**
   * Speak an English phrase
   */
  function speakEnglish(text: string, rate?: number) {
    speak(text, { lang: 'english', rate })
  }

  /**
   * Get available voices
   */
  function getVoices() {
    if (!isSupported.value) return []
    return window.speechSynthesis.getVoices()
  }

  /**
   * Check if a specific language is available
   */
  function isLanguageAvailable(lang: string): boolean {
    if (!isSupported.value) return false
    
    const voices = getVoices()
    const langCode = lang === 'sinhala' ? 'si' : lang === 'tamil' ? 'ta' : lang
    
    return voices.some(voice => voice.lang.startsWith(langCode))
  }

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    pause,
    resume,
    speakSinhala,
    speakTamil,
    speakEnglish,
    getVoices,
    isLanguageAvailable
  }
}
