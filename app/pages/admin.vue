<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-card-dark border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300 z-20 hidden md:flex">
      <div class="flex flex-col h-full">
        <!-- Logo Area -->
        <div class="p-6 pb-2">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-2xl">travel_explore</span>
            </div>
            <div>
              <h1 class="text-slate-900 dark:text-white text-lg font-bold leading-tight">CeylonGuide</h1>
              <p class="text-slate-500 dark:text-slate-400 text-xs font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary group transition-all" href="#">
            <span class="material-symbols-outlined filled">dashboard</span>
            <span class="text-sm font-semibold">Dashboard</span>
          </a>

          <p class="px-3 pt-4 pb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Content</p>

          <NuxtLink to="/destinations" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform">map</span>
            <span class="text-sm font-medium">Destinations</span>
          </NuxtLink>

          <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group" href="#">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform">hotel</span>
            <span class="text-sm font-medium">Accommodations</span>
          </a>

          <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group" href="#">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform">directions_bike</span>
            <span class="text-sm font-medium">Activities</span>
          </a>

          <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group" href="#">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform">article</span>
            <span class="text-sm font-medium">Blog Posts</span>
          </a>

          <NuxtLink to="/phrasebook" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform">translate</span>
            <span class="text-sm font-medium">Phrases</span>
          </NuxtLink>

          <p class="px-3 pt-4 pb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Management</p>

          <NuxtLink to="/scam-alerts" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform text-primary">warning</span>
            <span class="text-sm font-medium">Scam Alerts</span>
            <span class="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{{ stats.scamReports }}</span>
          </NuxtLink>

          <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group" href="#">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform">group</span>
            <span class="text-sm font-medium">Users</span>
          </a>
        </nav>

        <!-- Bottom Actions -->
        <div class="p-4 border-t border-slate-100 dark:border-slate-800">
          <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group" href="#">
            <span class="material-symbols-outlined group-hover:rotate-90 transition-transform">settings</span>
            <span class="text-sm font-medium">Settings</span>
          </a>

          <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 px-3">
            <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
              <img alt="Admin Avatar" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNBt4YoMZ_icQRe2G8ztwORbfB9iAvS7SmchxRI6Rq-z7UQVI_Iq7xU0HoyQqtiF4weTC4ufRlUvGiuGEId8_6FfGZXlI_-YEHo1SEx-2uZ9tkHJw5uucSeqbYpKRlN7N_ZfTVq5ugu48MIBx64DWKMw5V-wgW5uM6Duh7wvrF9618RGwQJd9lWYo_wNX9S1xAl_nRod6H-cJE2-LMVTU7SsczM2_RKcBlEvtEQ4Osq2hKFdHJzIXpOzDAXDqYg3gYzrYlyOCannc"/>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-slate-900 dark:text-white">Admin User</span>
              <span class="text-xs text-slate-500 dark:text-slate-400">admin@ceylonguide.com</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      <!-- Mobile Header -->
      <header class="md:hidden h-16 bg-white dark:bg-card-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">travel_explore</span>
          <span class="font-bold text-slate-900 dark:text-white">CeylonGuide</span>
        </div>
        <button class="text-slate-500">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </header>

      <!-- Main Scrollable Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Header Section -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 class="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">Welcome back, Admin</h1>
              <p class="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your tours and content today.</p>
            </div>
            <div class="w-full md:w-auto">
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                </div>
                <input class="block w-full md:w-80 pl-10 pr-3 py-2.5 border-none rounded-xl bg-white dark:bg-card-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all" placeholder="Search content, users, or alerts..." type="text"/>
              </div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="stat in statsCards" :key="stat.id" 
                 class="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1 hover:shadow-md transition-shadow"
                 :class="stat.highlighted ? 'ring-1 ring-primary/10' : ''">
              <div class="flex justify-between items-start">
                <div class="p-2 rounded-lg" :class="stat.iconBg">
                  <span class="material-symbols-outlined" :class="stat.iconColor">{{ stat.icon }}</span>
                </div>
                <span class="flex items-center text-xs font-semibold px-2 py-1 rounded-full"
                      :class="stat.badgeClass">
                  <span class="material-symbols-outlined text-[14px] mr-0.5">{{ stat.badgeIcon }}</span>
                  {{ stat.badgeText }}
                </span>
              </div>
              <div class="mt-4">
                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{{ stat.label }}</p>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">{{ stat.value }}</h3>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
            <div class="flex flex-wrap gap-4">
              <button class="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-xl font-medium shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                <span class="material-symbols-outlined text-[20px]">add_location_alt</span>
                Add Destination
              </button>
              <button class="flex items-center gap-2 bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5">
                <span class="material-symbols-outlined text-[20px] text-red-500">add_alert</span>
                Report Scam
              </button>
              <button class="flex items-center gap-2 bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5">
                <span class="material-symbols-outlined text-[20px] text-blue-500">post_add</span>
                Write Blog
              </button>
              <button class="flex items-center gap-2 bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5">
                <span class="material-symbols-outlined text-[20px] text-purple-500">reviews</span>
                Pending Reviews
              </button>
            </div>
          </div>

          <!-- Main Grid: Recent Activity & Analytics -->
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <!-- Recent Activity Table -->
            <div class="xl:col-span-2 bg-white dark:bg-card-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 class="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                <button class="text-sm text-primary font-medium hover:text-primary-dark">View All</button>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      <th class="px-6 py-4">Content</th>
                      <th class="px-6 py-4">Type</th>
                      <th class="px-6 py-4">Status</th>
                      <th class="px-6 py-4">Date</th>
                      <th class="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                    <tr v-for="activity in recentActivities" :key="activity.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td class="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                        <div class="h-8 w-8 rounded-lg shrink-0" :class="activity.thumbnailClass">
                          <img v-if="activity.thumbnail" class="h-full w-full object-cover" :src="activity.thumbnail" :alt="activity.name"/>
                          <span v-if="activity.icon" class="material-symbols-outlined text-[18px] flex items-center justify-center h-full">{{ activity.icon }}</span>
                        </div>
                        {{ activity.name }}
                      </td>
                      <td class="px-6 py-4 text-slate-500 dark:text-slate-400">{{ activity.type }}</td>
                      <td class="px-6 py-4">
                        <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :class="activity.statusClass">
                          {{ activity.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-slate-500 dark:text-slate-400">{{ activity.date }}</td>
                      <td class="px-6 py-4 text-right">
                        <button class="text-slate-400 hover:text-primary transition-colors">
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Analytics Column -->
            <div class="space-y-6">
              <!-- Visitor Traffic Chart -->
              <div class="bg-white dark:bg-card-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 flex flex-col h-full">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-lg font-bold text-slate-900 dark:text-white">Visitor Traffic</h2>
                  <select class="bg-slate-50 dark:bg-slate-800 border-none text-xs rounded-lg px-2 py-1 text-slate-500 dark:text-slate-400 outline-none focus:ring-1 focus:ring-primary">
                    <option>Last 7 Days</option>
                    <option>Last Month</option>
                  </select>
                </div>
                <!-- Chart -->
                <div class="flex-1 w-full flex items-end gap-2 h-40 mt-4 px-2">
                  <div v-for="(bar, index) in chartData" :key="index" 
                       class="w-full rounded-t-sm relative group transition-all hover:opacity-80"
                       :class="bar.color"
                       :style="{ height: bar.height }">
                    <div class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {{ bar.value }}
                    </div>
                  </div>
                </div>
                <div class="flex justify-between text-[10px] text-slate-400 mt-2 px-1 uppercase font-medium">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
              </div>

              <!-- Server Storage -->
              <div class="bg-gradient-to-br from-[#221510] to-[#3a251c] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                <h3 class="font-bold text-lg mb-1 relative z-10">Server Storage</h3>
                <p class="text-white/60 text-sm mb-6 relative z-10">You have used 85% of your available storage space.</p>
                <div class="w-full bg-white/10 h-2 rounded-full mb-2 overflow-hidden relative z-10">
                  <div class="bg-primary h-full rounded-full w-[85%]"></div>
                </div>
                <div class="flex justify-between text-xs text-white/40 relative z-10">
                  <span>85 GB Used</span>
                  <span>100 GB Total</span>
                </div>
                <button class="mt-6 w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors relative z-10">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© 2023 CeylonGuide. All rights reserved.</p>
            <div class="flex gap-4">
              <a class="hover:text-primary" href="#">Privacy Policy</a>
              <a class="hover:text-primary" href="#">Terms of Service</a>
              <a class="hover:text-primary" href="#">Support</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Stats data
const stats = ref({
  totalUsers: 1254,
  activeTours: 86,
  scamReports: 3,
  monthlyViews: '45.2k'
})

// Stats cards configuration
const statsCards = ref([
  {
    id: 1,
    label: 'Total Users',
    value: '1,254',
    icon: 'group',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeText: '+12%',
    badgeIcon: 'trending_up',
    badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    highlighted: false
  },
  {
    id: 2,
    label: 'Active Tours',
    value: '86',
    icon: 'tour',
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    badgeText: '+5%',
    badgeIcon: 'trending_up',
    badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    highlighted: false
  },
  {
    id: 3,
    label: 'Scam Reports',
    value: '3',
    icon: 'warning',
    iconBg: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-600 dark:text-red-400',
    badgeText: 'New',
    badgeIcon: 'priority_high',
    badgeClass: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    highlighted: true
  },
  {
    id: 4,
    label: 'Monthly Views',
    value: '45.2k',
    icon: 'visibility',
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeText: '+8%',
    badgeIcon: 'trending_up',
    badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    highlighted: false
  }
])

// Recent activities data
const recentActivities = ref([
  {
    id: 1,
    name: 'Sigiriya Rock Fortress',
    type: 'Destination',
    status: 'Published',
    statusClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    date: 'Oct 24, 2023',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCibIp6Ja6d20aEuCbSPU-rRGgoIyyPV9mD4nQ8Dn9F7qXvIGn82Z7OzdFJOELrRiMpdLFFfd0Co-XzIZgk-K5nGQbKlEoqDPNgOT1ZNjTzQsImVHrrGFVan8CrEYnA-zr9x_po6URJNx_6EkYLlx2wS7UwbGpnwwDyclo8Oo_Pa6bgwuTPYspysjWqMa3XYrT0ATY-mA3WQ17umwjmwRf_QgmjA7078lWTvPXUyGzglZ-bMPJbZ48BbBrD5ka13fI14HOu7VtCWHQ',
    thumbnailClass: 'bg-gray-200 overflow-hidden'
  },
  {
    id: 2,
    name: 'Tuk-Tuk Overcharge',
    type: 'Scam Alert',
    status: 'Pending Review',
    statusClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    date: 'Today, 10:23 AM',
    icon: 'warning',
    thumbnailClass: 'bg-red-100 flex items-center justify-center text-red-500'
  },
  {
    id: 3,
    name: 'Ella Tea Plantations',
    type: 'Blog Post',
    status: 'Draft',
    statusClass: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    date: 'Yesterday',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6tdaoDUcxRRdqG9o_6TCgHfxrRi_bs-FOEYiRtb9895ATsKPQHHe2C6vA2efu0iNwiVd6OE8LFYlFMolbYM2yl1PUwFOHZ1A2cCEt15o1z98tIjlF8e-IxUJifIQVaZUuI3GZVTsQR_0nOiTZtEGfcsfOrfRP5CubzAh6PqYCFcvmcT5EKrStklHEmnpwGNM25IpjxFzcWwI2xxP66C-jv3CaDVj-4o0ICcfIh_Q3htU08E-TYYleufnPkZWNGNZ_4Ln9lL34s-w',
    thumbnailClass: 'bg-gray-200 overflow-hidden'
  },
  {
    id: 4,
    name: 'Arugam Bay Surf',
    type: 'Activity',
    status: 'Published',
    statusClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    date: 'Oct 20, 2023',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPdI7dsdQkWqDzvXNm3MJrXEbgjU41prr0C0r4oQslSajMRM_yXlLfOpSaqG1fEW5fDg6T5X5VtxGp0hf7JE3KQebAqLmFs-cxtVB_iSyn64d5KxrbP9T9c20KoCP-Fnivd5JK-phmXOhrjXQQladdFl06xjY0q18AAvS6PDF-CsqkcMegUnp3kZvkAYpmvlU1HkhJobOyBpG_llKdytiZjhDZPkn7rU4xuUVeO3UDzueoySrA5BCqp3pnTSzrM_JmEJBX7o5b8Iw',
    thumbnailClass: 'bg-gray-200 overflow-hidden'
  }
])

// Chart data for visitor traffic
const chartData = ref([
  { height: '40%', value: '1.2k', color: 'bg-primary/10' },
  { height: '60%', value: '2.4k', color: 'bg-primary/20' },
  { height: '50%', value: '1.8k', color: 'bg-primary/10' },
  { height: '80%', value: '3.2k', color: 'bg-primary/30' },
  { height: '55%', value: '1.9k', color: 'bg-primary/20' },
  { height: '90%', value: '4.5k', color: 'bg-primary/60' },
  { height: '75%', value: '3.8k', color: 'bg-primary' }
])

// SEO
useHead({
  title: 'Admin Dashboard',
  meta: [
    {
      name: 'description',
      content: 'CeylonGuide Admin Dashboard - Manage destinations, content, scam alerts, and monitor system statistics.'
    }
  ]
})
</script>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}
</style>
