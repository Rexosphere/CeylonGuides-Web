<template>
  <div class="lg:col-span-8 flex flex-col gap-6">
    <!-- Filter Status -->
    <div v-if="searchQuery" class="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/10">
      <p class="text-sm font-medium text-text-main dark:text-white">
        Searching for <span class="font-bold text-primary">"{{ searchQuery }}"</span>
        <span v-if="activeTab !== 'All Topics'"> in {{ activeTab }}</span>
      </p>
      <button @click="setSearch('')" class="text-xs font-bold text-text-secondary hover:text-red-500">Clear Search</button>
    </div>

    <!-- Empty State -->
    <div v-if="posts.length === 0" class="flex flex-col items-center justify-center py-16 bg-white dark:bg-card-dark rounded-2xl border border-dashed border-border-color dark:border-neutral-700">
       <span class="material-symbols-outlined text-4xl text-text-muted mb-3">search_off</span>
       <h3 class="text-lg font-bold text-text-main dark:text-white">No discussions found</h3>
       <p class="text-sm text-text-secondary dark:text-gray-400">Try adjusting your search or filters</p>
       <button @click="setSearch('')" class="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary/20">
         View All Posts
       </button>
    </div>

    <!-- Feed -->
    <div 
      v-for="post in posts" 
      :key="post.id"
      class="bg-white dark:bg-card-dark rounded-2xl p-6 border border-border-color dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
    > 
      <!-- Type Badge -->
      <div class="absolute top-0 right-0 px-4 py-1.5 bg-background-light dark:bg-neutral-800 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider text-text-muted border-b border-l border-border-color dark:border-neutral-700">
        {{ post.type === 'report' ? 'Trip Report' : post.type === 'qa' ? 'Q&A' : post.type === 'guide' ? 'Guide' : 'Buddy' }}
      </div>

      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="relative">
               <!-- Avatar Placeholder -->
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-neutral-700 dark:to-neutral-600 flex items-center justify-center text-primary font-bold text-sm">
                {{ getUser(post.authorId)?.name.charAt(0) }}
              </div>
              <!-- Online Indicator -->
              <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-card-dark"></div>
          </div>
          <div>
            <h4 class="font-bold text-sm text-text-main dark:text-white hover:underline cursor-pointer">
              {{ getUser(post.authorId)?.name }}
              <span v-if="getUser(post.authorId)?.verified" class="material-symbols-outlined text-[14px] text-blue-500 align-text-bottom">verified</span>
            </h4>
            <p class="text-xs text-text-secondary dark:text-gray-400 flex items-center gap-2">
              <span>{{ getUser(post.authorId)?.role }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{{ post.date }}</span>
            </p>
          </div>
        </div>

        <!-- Overflow Menu -->
        <div class="relative" tabindex="0" @blur="closeMenu(post.id)">
           <button @click.stop="toggleMenu(post.id)" class="p-1 rounded-full text-text-muted hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
              <span class="material-symbols-outlined text-[20px]">more_vert</span>
           </button>
           
           <div v-show="activeMenuId === post.id" class="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-border-color dark:border-neutral-700 overflow-hidden z-20 animate-in">
              <button @click="reportPost(post.id)" class="w-full text-left px-4 py-2.5 text-xs font-bold text-text-secondary hover:bg-neutral-50 dark:hover:bg-white/5 hover:text-red-500 flex items-center gap-2">
                 <span class="material-symbols-outlined text-[16px]">flag</span> Report
              </button>
              <button @click="blockUser(post.authorId)" class="w-full text-left px-4 py-2.5 text-xs font-bold text-text-secondary hover:bg-neutral-50 dark:hover:bg-white/5 hover:text-text-main flex items-center gap-2">
                 <span class="material-symbols-outlined text-[16px]">block</span> Block User
              </button>
              <button class="w-full text-left px-4 py-2.5 text-xs font-bold text-text-secondary hover:bg-neutral-50 dark:hover:bg-white/5 hover:text-text-main flex items-center gap-2">
                 <span class="material-symbols-outlined text-[16px]">visibility_off</span> Hide
              </button>
           </div>
        </div>
      </div>

      <!-- Content -->
      <div class="mb-4">
        <h3 class="text-lg font-bold text-text-main dark:text-white mb-2 leading-snug group-hover:text-primary transition-colors cursor-pointer">{{ post.title }}</h3>
        <p class="text-sm text-text-secondary dark:text-gray-300 line-clamp-3 leading-relaxed">
          {{ post.excerpt }}
        </p>
        <!-- Optional Image -->
        <div v-if="post.image" class="mt-3 rounded-lg overflow-hidden h-48 w-full relative group/image">
            <div class="absolute inset-0 bg-black/20 group-hover/image:bg-black/10 transition-colors"></div>
            <!-- Placeholder for demo -->
            <img :src="post.image" alt="Post image" class="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105">
        </div>
      </div>

      <!-- Tags & Footer -->
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span 
          v-for="tag in post.tags" 
          :key="tag" 
          class="px-2.5 py-1 rounded-lg bg-background-light dark:bg-white/5 text-xs text-text-secondary dark:text-gray-400 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          #{{ tag }}
        </span>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-border-color dark:border-neutral-700">
        <div class="flex items-center gap-1 sm:gap-4">
          <!-- Like Button -->
          <button 
            @click.stop="toggleLike(post.id)"
            class="flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors group/btn"
            :class="getEngagement(post.id).liked ? 'text-red-500 bg-red-50 dark:bg-red-900/10' : 'text-text-secondary hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-red-500'"
          >
            <span class="material-symbols-outlined text-[20px] group-active/btn:scale-75 transition-transform" 
              :class="getEngagement(post.id).liked ? 'filled' : ''">favorite</span>
            <span class="text-xs font-bold">{{ post.likes }}</span>
          </button>
          
          <!-- Reply CTA -->
          <button class="flex items-center gap-1.5 px-2 py-1 rounded-lg text-text-secondary hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px]">chat_bubble</span>
            <span class="text-xs font-bold">{{ post.comments }} <span class="hidden sm:inline">Replies</span></span>
          </button>
          
          <!-- Save -->
          <button 
            @click.stop="toggleSave(post.id)"
            class="flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors"
            :class="getEngagement(post.id).saved ? 'text-primary bg-primary/10' : 'text-text-secondary hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-primary'"
            :title="getEngagement(post.id).saved ? 'Saved' : 'Save Post'"
          >
            <span class="material-symbols-outlined text-[20px]" :class="getEngagement(post.id).saved ? 'filled' : ''">bookmark</span>
          </button>

          <!-- Follow -->
           <button 
            @click.stop="toggleFollow(post.id)"
            class="flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors"
            :class="getEngagement(post.id).following ? 'text-primary bg-primary/10' : 'text-text-secondary hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-primary'"
            :title="getEngagement(post.id).following ? 'Following Thread' : 'Follow Thread'"
          >
            <span class="material-symbols-outlined text-[20px]" :class="getEngagement(post.id).following ? 'filled' : ''">notifications</span>
          </button>
        </div>

        <div class="flex items-center gap-1 text-xs text-text-secondary opacity-60">
          <span class="material-symbols-outlined text-[16px]">visibility</span>
          {{ post.views }}
        </div>
      </div>
    </div>

    <!-- Load More (Mock) -->
    <div v-if="posts.length > 0" class="text-center pt-4">
      <button class="px-6 py-2.5 text-sm font-bold text-text-secondary hover:text-primary transition-colors">
        Load More Discussions
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCommunity } from '~/composables/useCommunity'
const { posts, users, searchQuery, setSearch, activeTab, toggleLike, toggleSave, toggleFollow, getEngagement } = useCommunity()

const activeMenuId = ref<string | null>(null)

function getUser(id: string) {
  return users.value.find(u => u.id === id)
}

function toggleMenu(postId: string) {
  activeMenuId.value = activeMenuId.value === postId ? null : postId
}

function closeMenu(postId: string) {
  // Small delay to allow click events to register
  setTimeout(() => {
    if (activeMenuId.value === postId) activeMenuId.value = null
  }, 200)
}

function reportPost(postId: string) {
  alert(`Post ${postId} has been reported for review.`)
  activeMenuId.value = null
}

function blockUser(userId: string) {
  alert(`User ${userId} has been blocked.`)
  activeMenuId.value = null
}
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
@keyframes in {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: in 0.1s ease-out forwards;
}
</style>
