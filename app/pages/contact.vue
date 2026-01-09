<template>
  <div class="bg-background-light dark:bg-background-dark text-[#181311] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden">
    
    <ContactHero 
      v-if="data.hero"
      :title="data.hero.title"
      :subtitle="data.hero.subtitle"
      :image="data.hero.image"
      :response-stats="data.hero.responseStats"
    />
    
    <main class="flex-grow">
      <div class="layout-container flex flex-col items-center px-4 sm:px-10 lg:px-40 -mt-16 relative z-20 pb-20">
        <ContactTabs 
          v-if="data.tabs"
          :tabs="data.tabs"
          :active-tab="activeTab"
          @update:activeTab="activeTab = $event"
        />
        
        <div class="flex flex-col lg:flex-row gap-8 w-full max-w-[1100px]">
        <ContactForm 
            v-if="data.form"
            :title="currentFormConfig?.title ?? 'Send us a message'"
            :fields="data.form.fields"
            :topics="currentTopics"
            :submit-button-text="currentFormConfig?.submitButton ?? 'Send Message'"
            :privacy-note="data.form.privacyNote"
            :message-placeholder="currentFormConfig?.messagePlaceholder"
            :extra-fields="currentFormConfig?.extraFields ?? []"
            :active-tab="activeTab"
          />
          <ContactSidebar 
            v-if="data.contactMethods"
            :contact-methods="data.contactMethods"
            :faqs="data.faqs ?? []"
            :partnership="data.partnership"
            :active-tab="activeTab"
          />
        </div>
      </div>
    </main>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ContactHero from '~/components/Contact/ContactHero.vue'
import ContactTabs from '~/components/Contact/ContactTabs.vue'
import ContactForm from '~/components/Contact/ContactForm.vue'
import ContactSidebar from '~/components/Contact/ContactSidebar.vue'

import contactMd from '../../contact.md?raw'

// --- Interfaces ---
interface ResponseStat {
  icon: string
  text: string
}

interface HeroData {
  title: string
  subtitle: string
  image: string
  responseStats?: ResponseStat[]
}

interface Tab {
  id: string
  label: string
  icon: string
  description: string
}

interface FormField {
  label: string
  placeholder?: string
}

interface FormData {
  title: string
  fields: {
    name: FormField
    email: FormField
    topic: FormField
    message: FormField
  }
  submitButton: string
  privacyNote: string
}

interface ContactMethod {
  id: string
  icon: string
  label: string
  value: string
  link?: string
  note?: string
  isOnline?: boolean
  address?: string
  hours?: string
}

interface FAQ {
  question: string
  answer: string
  tab?: string
  topics?: string[]
}

interface Partnership {
  title: string
  subtitle: string
  buttonText: string
  benefits?: string[]
}

interface ExtraField {
  id: string
  type: string
  label: string
  placeholder?: string
  required?: boolean
  icon?: string
  options?: string[]
}

interface FormConfig {
  title: string
  messagePlaceholder: string
  submitButton: string
  extraFields?: ExtraField[]
}

interface PageData {
  hero?: HeroData
  tabs?: Tab[]
  topicsPerTab?: Record<string, string[]>
  formConfigPerTab?: Record<string, FormConfig>
  form?: FormData
  contactMethods?: ContactMethod[]
  faqs?: FAQ[]
  partnership?: Partnership
}

// --- YAML Parser ---
function parseYaml(yamlStr: string): any {
  const lines = yamlStr.split('\n')
  const result: any = {}
  
  const stack: { indent: number; obj: any; isArray: boolean }[] = [{ indent: -2, obj: result, isArray: false }]
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line || !line.trim() || line.trim().startsWith('#')) continue

    const indent = line.search(/\S/)
    const content = line.trim()
    
    while (stack.length > 1 && stack[stack.length - 1]!.indent >= indent) {
      stack.pop()
    }
    
    const currentParent = stack[stack.length - 1]!.obj

    if (content.startsWith('- ')) {
      const itemContent = content.substring(2).trim()
      
      if (itemContent.startsWith('"') && itemContent.endsWith('"')) {
        if (Array.isArray(currentParent)) {
          currentParent.push(itemContent.slice(1, -1))
        }
        continue
      }
      
      if (!itemContent.includes(':')) {
        if (Array.isArray(currentParent)) {
          currentParent.push(itemContent.replace(/^"|"$/g, ''))
        }
        continue
      }
      
      if (itemContent.includes(':')) {
        const colonIdx = itemContent.indexOf(':')
        const key = itemContent.substring(0, colonIdx).trim()
        let value = itemContent.substring(colonIdx + 1).trim()
        value = value.replace(/^"|"$/g, '')
        
        const newObj: any = {}
        if (key) newObj[key] = value
        
        if (Array.isArray(currentParent)) {
          currentParent.push(newObj)
          stack.push({ indent: indent, obj: newObj, isArray: false })
        }
        continue
      }
    }

    if (content.includes(':')) {
      const colonIdx = content.indexOf(':')
      const key = content.substring(0, colonIdx).trim()
      let value = content.substring(colonIdx + 1).trim()

      if (value === '') {
        const nextIdx = i + 1
        let isArray = false
        if (nextIdx < lines.length) {
          const nextLine = lines[nextIdx]
          if (nextLine && nextLine.trim().startsWith('- ')) {
            isArray = true
          }
        }
        
        if (isArray) {
          currentParent[key] = []
          stack.push({ indent: indent, obj: currentParent[key], isArray: true })
        } else {
          currentParent[key] = {}
          stack.push({ indent: indent, obj: currentParent[key], isArray: false })
        }
      } else if (value.startsWith('[') && value.endsWith(']')) {
        const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, ''))
        currentParent[key] = items
      } else {
        value = value.replace(/^"|"$/g, '')
        // Handle boolean values
        if (value === 'true') {
          currentParent[key] = true
        } else if (value === 'false') {
          currentParent[key] = false
        } else {
          currentParent[key] = value
        }
      }
    }
  }

  return result
}

function parseFrontmatter(markdown: string): PageData {
  if (!markdown) return {}
  const match = markdown.match(/^---\n([\s\S]*?)\n---/)
  if (!match || !match[1]) return {}

  const parsed = parseYaml(match[1])
  return parsed as PageData
}

const data = parseFrontmatter(contactMd)
const activeTab = ref('general')

// Computed: Get topics for current tab
const currentTopics = computed((): string[] => {
  if (data.topicsPerTab && data.topicsPerTab[activeTab.value]) {
    return data.topicsPerTab[activeTab.value] ?? []
  }
  return []
})

// Computed: Get form config for current tab
const currentFormConfig = computed(() => {
  if (data.formConfigPerTab && data.formConfigPerTab[activeTab.value]) {
    return data.formConfigPerTab[activeTab.value]
  }
  return null
})

// Computed: Get FAQs relevant to current tab (show all if no specific tab)
const currentFaqs = computed(() => {
  if (!data.faqs) return []
  return data.faqs.filter(faq => !faq.tab || faq.tab === activeTab.value || faq.tab === 'general')
})

// Debug log
console.log('Parsed contact data:', JSON.stringify(data, null, 2))

useHead({
  title: 'Contact & Support - CeylonGuide',
  meta: [
    { name: 'description', content: 'Get in touch with CeylonGuide for support, inquiries, feedback, or partnership opportunities. We are here to help you explore Sri Lanka.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
}
</style>
