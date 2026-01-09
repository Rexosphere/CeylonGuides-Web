<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-charcoal dark:text-white">Embassies & Consulates</h2>
      <div class="relative">
        <span
          class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
        <input v-model="searchQuery"
          class="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all w-64 shadow-sm"
          placeholder="Search by country or city..." type="text" />
      </div>
    </div>

    <div class="space-y-3 mb-8">
      <div v-for="embassy in filteredEmbassies" :key="embassy.id"
        class="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all cursor-pointer group shadow-sm hover:shadow-md"
        @click="selectEmbassy(embassy)">
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-700">
            <img :alt="`${embassy.country} Flag`" class="w-full h-full object-cover" :src="embassy.flagUrl" />
          </div>
          <div>
            <h4 class="font-bold text-sm text-charcoal dark:text-white">{{ embassy.country }}</h4>
            <p class="text-xs text-slate-500">{{ embassy.type }} • {{ embassy.city }}</p>
          </div>
        </div>
        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            class="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-slate-100 dark:border-slate-600"
            @click.stop="showLocation(embassy)">
            <span class="material-symbols-outlined text-lg">place</span>
          </button>
          <button
            class="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-slate-100 dark:border-slate-600"
            @click.stop="callEmbassy(embassy)">
            <span class="material-symbols-outlined text-lg">call</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Embassy {
  id: string
  country: string
  city: string
  type: string
  flagUrl: string
  phone?: string
  lat?: number
  lng?: number
}

const props = defineProps<{
  isOffline?: boolean
  selectedEmbassyId?: string | null
}>()

const emit = defineEmits<{
  'select-embassy': [embassy: Embassy]
}>()

const searchQuery = ref('')

// Sample embassy data - replace with actual data
const embassies = ref<Embassy[]>([
  {
    id: 'usa-colombo',
    country: 'United States',
    city: 'Colombo',
    type: 'Embassy',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsH_jvy889D50RIJ4p0-fEk-nr9d86zPXWdg9CD0GHGnIaCVvI0FknxQ9tY4n8PkR8ut_Yh1or8YSuPapMKvozfNJNRR3mW-jkXqc4cdXN8-_RcVEI1jmsXUeLlOE_LNpz7EdXmfyYlxXr0Yvw2gdIvg0l9vaAUNGJFCtcw5FGV2V1O6T6sVfwV133YA02TTixe1q14dOie0LOvO1egsl_UPU2aQQ95XXFslZv842yQjikZ6Y73RAA9Su9gstqPMSN0Y50Xgl-uA',
    phone: '+94112498500'
  },
  {
    id: 'uk-colombo',
    country: 'United Kingdom',
    city: 'Colombo',
    type: 'High commission',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqWWwksL83PvO-RlvNnCZ4dyj4agELxPPERSyLSmPHm2VfpEJxG75p51c91hwQ-DRl9ZjS9SWLVoyn5-AnH2s3qUWMcj2DoC7IOqaQ-QmAf8ulaAiy7Jr3TVOmrXhYwjMUsyKSh62kNF753YWGBVH5Lss7ppzqpnOiBWnnyxHzFjJYYs2pPmlmbAFfPXGkhBB8BqlwAEEvlsC93wnNQ0PD03tPQpBa-Wnw1XI5mTnUWrcris7IjUb6BhChsVPkdQJdk4Hb7rfShFY',
    phone: '+94112389639'
  },
  {
    id: 'australia-colombo',
    country: 'Australia',
    city: 'Colombo',
    type: 'High commission',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMcq6PJ9Skl8sEMrJeCR5XSanmC252i3d_Rr0tXuQ-xsiaqJgeTbS9fhwAoTkHN2IvIIdMck4tVWbDWWcJUlO3B6V3ZUDOkYqbODYsvruWuXHKMz2M7M0gwkmNvPBS_r_i-xeDEuksOaz8y9NpF9o5Hk05FCQ3DH8sf6vhps9RpTvPJEvFHnaKazdgldEDAyd8CKwEzltqkc_s6E6cP2YFqmuTrwmT19EdWXa7yy32_9g5g9jdTjFCcM0pwHKwJSGimuY7sRicvgw',
    phone: '+94115246200'
  },
  {
    id: 'canada-colombo',
    country: 'Canada',
    city: 'Colombo',
    type: 'High commission',
    flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVqoDyBaoGF-8F5j9E3HpH9uTmCrp44KlCXQIw6dwSy8StdTcSG_dxtL76W4-FO96hKyJAR_qzViv2u_Gym1_ZrEk-dkltzCNxrMRdUbO--thDb0wdj-rvFQG86ro-Ur7St9nIiYk4VI7aqUspJFKUc-fTosSD4ihmxkx76ODMyXDOS_I8FyWutUvo-K-YcaqdwGOktz1s8vFkhqiCWTL4lPepjA6GrsUGmrg9KapIyHhHVoyH_AiL4n129uDlozMq7OlMVhANh8I',
    phone: '+94115220841'
  }
])

const filteredEmbassies = computed(() => {
  if (!searchQuery.value) return embassies.value

  const query = searchQuery.value.toLowerCase()
  return embassies.value.filter(embassy =>
    embassy.country.toLowerCase().includes(query) ||
    embassy.city.toLowerCase().includes(query)
  )
})

function selectEmbassy(embassy: Embassy) {
  emit('select-embassy', embassy)
}

function showLocation(embassy: Embassy) {
  // Emit event to show location on map
  emit('select-embassy', embassy)
}

function callEmbassy(embassy: Embassy) {
  if (embassy.phone) {
    window.location.href = `tel:${embassy.phone}`
  }
}
</script>

<style scoped>
.text-charcoal {
  color: #1e293b;
}

.shadow-soft {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
