<template>
  <div class="w-full">
    <!-- Hero Section -->
    <div class="relative w-full">
      <div 
        class="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative" 
        style='background-image: linear-gradient(rgba(16, 34, 31, 0.4) 0%, rgba(16, 34, 31, 0.7) 100%), url("/images/downloaded_e51794257d3d.avif");'
      >
        <div class="flex flex-col gap-3 text-center max-w-[720px] z-10 pt-20">
          <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg font-display">
            Speak Like a Local
          </h1>
          <p class="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Connect deeply with Sri Lanka. Master essential phrases and learn the cultural etiquette that opens hearts.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="w-full max-w-[560px] z-10 mt-4">
          <div class="flex w-full items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-2 border border-white/20">
            <div class="flex items-center justify-center pl-3 text-gray-500">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input 
              v-model="searchQuery"
              @input="handleSearch"
              class="w-full bg-transparent border-none text-charcoal placeholder:text-gray-500 focus:ring-0 h-12 px-3 text-base outline-none" 
              placeholder="Search phrases (e.g., 'How much?', 'Thank you')..."
            />
            <button 
              v-if="searchQuery"
              @click="clearSearch"
              class="flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors" 
              title="Clear search"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="px-4 md:px-6 lg:px-8 py-8 w-full max-w-[1920px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-[320px_1fr_340px] gap-6 lg:gap-8">
      
      <!-- Quick Learn Panel (Left Sidebar) -->
      <aside class="hidden lg:block">
        <div class="sticky top-4 space-y-4">
          <!-- Quick Learn Card -->
          <div class="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl shadow-xl overflow-hidden">
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-xl font-bold">Today's Useful Phrases</h3>
                  <p class="text-white/80 text-sm mt-1">Master these essentials</p>
                </div>
                <span class="material-symbols-outlined text-3xl">school</span>
              </div>
              
              <button
                @click="shuffleQuickLearnPhrases"
                class="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span class="material-symbols-outlined text-lg">shuffle</span>
                <span>Shuffle Phrases</span>
              </button>
            </div>
            
            <!-- Phrases List -->
            <div class="bg-white text-charcoal divide-y divide-gray-100">
              <button
                v-for="(phrase, index) in quickLearnPhrases"
                :key="phrase.phraseId"
                @click="scrollToPhrase(phrase.phraseId)"
                class="w-full p-4 hover:bg-gray-50 transition-colors text-left group"
              >
                <div class="flex items-start gap-3">
                  <div class="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm text-primary group-hover:text-primary/80 transition-colors">{{ phrase.english }}</p>
                    <p class="text-xs text-gray-600 mt-0.5 truncate">{{ phrase.pronunciation }}</p>
                  </div>
                  <span class="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </button>
            </div>
          </div>
          
          <!-- Tips Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-2xl">lightbulb</span>
              <div>
                <h4 class="font-bold text-sm text-charcoal mb-1">Pro Tip</h4>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Practice pronunciation slowly at first. Locals appreciate the effort, even if not perfect!
                </p>
              </div>
            </div>
          </div>
          
          <!-- Quiz Component -->
          <PhraseQuiz
            v-if="filteredPhrases.length >= 4"
            :phrases="filteredPhrases"
            :language="selectedLanguage === 'both' ? 'sinhala' : selectedLanguage"
          />

          <!-- Download Offline -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <Icon name="mdi:cloud-download" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div class="flex-1">
                <h3 class="text-sm font-semibold text-gray-900 mb-1">Download Offline</h3>
                <p class="text-xs text-gray-600 mb-3">Access phrases without internet</p>
                <button
                  @click="downloadOfflineData"
                  class="w-full px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Main Content (Center Column) -->
      <div class="flex flex-col gap-8">
      
      <!-- Language Toggle & Controls -->
      <div class="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-charcoal font-display">{{ activeCategory ? activeCategory.name : 'All Phrases' }}</h2>
            <p class="text-gray-500 mt-1 text-sm">
              {{ filteredPhrases.length }} phrase{{ filteredPhrases.length !== 1 ? 's' : '' }} found
              <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <!-- Learning Mode Toggle -->
            <button
              @click="toggleLearningMode"
              :class="[
                'px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                isLearningMode
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-600 hover:text-purple-600'
              ]"
            >
              <span class="material-symbols-outlined text-base">school</span>
              <span>Learning Mode</span>
            </button>
            
            <div class="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-gray-200">
              <label 
                v-for="lang in ['Sinhala', 'Tamil', 'Both']" 
                :key="lang"
                class="cursor-pointer"
              >
                <input 
                  type="radio" 
                  name="lang" 
                  :value="lang.toLowerCase()" 
                  v-model="selectedLanguage"
                  class="peer sr-only"
                />
                <div class="px-3 py-1.5 rounded-md text-xs font-bold text-gray-500 peer-checked:bg-primary peer-checked:text-white transition-all">
                  <span>{{ lang }}</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div 
          v-for="category in displayCategories" 
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="[
            'group flex flex-col items-center gap-2 p-4 rounded-xl shadow-sm border cursor-pointer transition-all',
            category.id === 'emergency' 
              ? (selectedCategory === category.id 
                  ? 'bg-red-600 border-red-700 shadow-lg scale-105' 
                  : 'bg-red-50 border-red-300 hover:bg-red-100 hover:border-red-400 hover:shadow-lg hover:scale-105')
              : (selectedCategory === category.id 
                  ? 'border-primary shadow-md bg-primary/5 scale-105' 
                  : 'bg-white border-gray-200 hover:border-primary hover:shadow-md hover:scale-105')
          ]"
        >
          <div :class="[
            'h-10 w-10 rounded-full flex items-center justify-center transition-colors',
            category.id === 'emergency'
              ? (selectedCategory === category.id
                  ? 'bg-white text-red-600'
                  : 'bg-red-600 text-white group-hover:bg-red-700')
              : (selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-background-light text-primary group-hover:bg-primary group-hover:text-white')
          ]">
            <span class="material-symbols-outlined text-xl">{{ category.icon }}</span>
          </div>
          <span :class="[
            'font-bold text-xs text-center leading-tight',
            category.id === 'emergency'
              ? (selectedCategory === category.id ? 'text-white' : 'text-red-900')
              : 'text-charcoal'
          ]">{{ category.name }}</span>
          <span v-if="category.id === 'emergency'" :class="[
            'text-[10px] font-bold uppercase tracking-wide',
            selectedCategory === category.id ? 'text-red-100' : 'text-red-600'
          ]">⚠️ Quick Access</span>
        </div>
      </div>

      <!-- Phrases List -->
      <div class="flex flex-col gap-5">
          <!-- Emergency Phrase Set Banner -->
          <div v-if="savedPhrases.length > 0" class="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">⭐</span>
              <div>
                <h4 class="font-bold text-yellow-900">Emergency Phrase Set</h4>
                <p class="text-sm text-yellow-700">{{ savedPhrases.length }} phrase{{ savedPhrases.length > 1 ? 's' : '' }} saved for quick access</p>
              </div>
            </div>
            <NuxtLink 
              to="/safety-mode"
              class="shrink-0 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Use in Safety Mode
            </NuxtLink>
          </div>

          <!-- Loading State -->
          <div v-if="false" class="space-y-4">
            <div v-for="i in 3" :key="i" class="animate-pulse">
              <div class="h-24 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>

          <!-- No Results -->
          <div v-else-if="filteredPhrases.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-charcoal mb-2">No phrases found</h3>
            <p class="text-gray-600">Try adjusting your search or filter criteria</p>
            <button
              @click="clearSearch"
              class="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          <!-- Phrases -->
          <template v-else>
            <div
              v-for="(phrase, index) in filteredPhrases"
              :key="phrase.phraseId"
              :data-phrase-id="phrase.phraseId"
              :class="[
                'flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all gap-4 group',
                phrase.emergency_flag || phrase.category === 'emergency'
                  ? 'bg-red-50 border-red-300 hover:border-red-400 ring-2 ring-red-200'
                  : 'bg-white border-gray-200'
              ]"
            >
              <div class="flex flex-col gap-2 flex-1 min-w-0">
                <!-- Badge for practice level -->
                <div class="flex items-center gap-2 flex-wrap">
                  <span
                    v-if="getPhraseLevel(phrase.phraseId) === 'mastered'"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold"
                  >
                    <span class="material-symbols-outlined text-xs">check_circle</span>
                    Mastered
                  </span>
                  <span
                    v-else-if="getPhraseLevel(phrase.phraseId) === 'learning'"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold"
                  >
                    <span class="material-symbols-outlined text-xs">school</span>
                    Learning
                  </span>
                  <span v-if="phrase.emergency_flag" class="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                    <span class="material-symbols-outlined text-xs">emergency</span>
                    Emergency
                  </span>
                </div>

                <!-- Sinhala (show if sinhala or both) -->
                <div v-if="selectedLanguage === 'sinhala' || selectedLanguage === 'both'" class="space-y-1">
                  <p 
                    class="sinhala-text text-2xl font-bold text-charcoal truncate"
                    v-html="highlightText(phrase.sinhala_native, searchQuery)"
                  ></p>
                  <p 
                    class="text-sm font-bold text-primary uppercase tracking-wide"
                    v-html="highlightText(phrase.sinhala_latin, searchQuery)"
                  ></p>
                </div>
                
                <!-- Tamil (show if tamil or both) -->
                <div v-if="selectedLanguage === 'tamil' || selectedLanguage === 'both'" :class="selectedLanguage === 'both' ? 'mt-2 pt-2 border-t border-gray-200' : ''" class="space-y-1">
                  <p 
                    class="tamil-text text-2xl font-bold text-charcoal truncate"
                    v-html="highlightText(phrase.tamil_native, searchQuery)"
                  ></p>
                  <p 
                    class="text-sm font-bold text-secondary uppercase tracking-wide"
                    v-html="highlightText(phrase.tamil_latin, searchQuery)"
                  ></p>
                </div>
                
                <!-- Pronunciation (shown once) -->
                <p 
                  class="text-sm font-bold text-gray-500 uppercase tracking-wide"
                  v-html="highlightText(phrase.pronunciation, searchQuery)"
                ></p>
                
                <!-- English translation -->
                <p 
                  class="text-gray-600 text-sm"
                  v-html="highlightText(phrase.english, searchQuery)"
                ></p>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center gap-2 shrink-0">
                <!-- Speak Button -->
                <button 
                  @click="speakPhrase(phrase)"
                  :disabled="!canPlayPhrase(selectedLanguage)"
                  :class="[
                    'h-12 w-12 rounded-full transition-all flex items-center justify-center border relative',
                    isPlaying(phrase.phraseId)
                      ? 'bg-primary text-white border-primary animate-pulse'
                      : canPlayPhrase(selectedLanguage)
                        ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white border-primary/20'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                  ]"
                  :title="getPlayTooltip(selectedLanguage)"
                >
                  <span :class="[
                    'material-symbols-outlined',
                    isPlaying(phrase.phraseId) ? 'animate-pulse' : ''
                  ]">
                    {{ isPlaying(phrase.phraseId) ? 'stop' : 'volume_up' }}
                  </span>
                </button>
                
                <!-- Favorite Button -->
                <button 
                  @click="toggleFavorite(phrase.phraseId)"
                  :class="[
                    'h-12 w-12 rounded-full transition-all flex items-center justify-center border text-xl',
                    isFavorite(phrase.phraseId) 
                      ? 'bg-yellow-100 text-yellow-600 border-yellow-300 hover:bg-yellow-200' 
                      : 'bg-background-light text-gray-400 border-gray-200 hover:border-yellow-300 hover:text-yellow-500'
                  ]"
                  :title="isFavorite(phrase.phraseId) ? 'Remove from favorites' : 'Add to favorites'"
                >
                  {{ isFavorite(phrase.phraseId) ? '★' : '☆' }}
                </button>

                <!-- Details Button -->
                <button
                  @click="openDetails(phrase)"
                  class="h-12 w-12 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all flex items-center justify-center border border-gray-200"
                  title="View details"
                >
                  <span class="material-symbols-outlined">info</span>
                </button>
              </div>
            </div>
          </template>
      </div>
      <!-- End Phrases List -->
      </div>
      <!-- End Center Column -->

      <!-- Right Sidebar (Contextual Tips) - Shows on tablet below content, desktop on right -->
      <aside class="hidden lg:block">
        <div class="sticky top-4 space-y-5">
          
          <!-- Contextual Learning Panel -->
          <div v-if="selectedCategory && selectedCategory !== 'favorites'" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- When to Use This -->
            <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-5 border-b border-gray-200">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-2xl">lightbulb</span>
                <div>
                  <h4 class="font-bold text-charcoal mb-1">When to Use This</h4>
                  <p class="text-sm text-gray-700 leading-relaxed">{{ categoryUsageTip }}</p>
                </div>
              </div>
            </div>
            
            <!-- Cultural Tip -->
            <div v-if="categoryCulturalTip" class="p-5 border-b border-gray-200 bg-blue-50/30">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-blue-600 text-xl">info</span>
                <div>
                  <h5 class="font-bold text-sm text-blue-900 mb-1">Cultural Tip</h5>
                  <p class="text-xs text-blue-800 leading-relaxed">{{ categoryCulturalTip }}</p>
                </div>
              </div>
            </div>
            
            <!-- Related Phrases -->
            <div v-if="relatedPhrases.length > 0" class="p-5">
              <h5 class="font-bold text-sm text-charcoal mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">link</span>
                Related Phrases
              </h5>
              <div class="space-y-2">
                <button
                  v-for="phrase in relatedPhrases"
                  :key="phrase.phraseId"
                  @click="scrollToPhrase(phrase.phraseId)"
                  class="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-gray-200 transition-all group"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-bold text-primary group-hover:text-primary/80 truncate">{{ phrase.english }}</p>
                      <p class="text-xs text-gray-500 mt-0.5 truncate">{{ phrase.pronunciation }}</p>
                    </div>
                    <span class="material-symbols-outlined text-gray-400 text-sm group-hover:text-primary transition-colors">arrow_forward</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Progress Tracker -->
          <PhraseProgress
            ref="progressTracker"
            :phrases="phrasebookData.phrases"
            :categories="phrasebookData.categories"
          />
        </div>
      </aside>
      <!-- End Right Sidebar -->

      </div>
      <!-- End Grid Layout -->
      
      <!-- Tablet Contextual Panel (shows below main content on tablet) -->
      <div class="lg:hidden mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Contextual Learning Panel -->
        <div v-if="selectedCategory && selectedCategory !== 'favorites'" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <!-- When to Use This -->
          <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-5 border-b border-gray-200">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-2xl">lightbulb</span>
              <div>
                <h4 class="font-bold text-charcoal mb-1">When to Use This</h4>
                <p class="text-sm text-gray-700 leading-relaxed">{{ categoryUsageTip }}</p>
              </div>
            </div>
          </div>
          
          <!-- Cultural Tip -->
          <div v-if="categoryCulturalTip" class="p-5 border-b border-gray-200 bg-blue-50/30">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-blue-600 text-xl">info</span>
              <div>
                <h5 class="font-bold text-sm text-blue-900 mb-1">Cultural Tip</h5>
                <p class="text-xs text-blue-800 leading-relaxed">{{ categoryCulturalTip }}</p>
              </div>
            </div>
          </div>
          
          <!-- Related Phrases -->
          <div v-if="relatedPhrases.length > 0" class="p-5">
            <h5 class="font-bold text-sm text-charcoal mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">link</span>
              Related Phrases
            </h5>
            <div class="space-y-2">
              <button
                v-for="phrase in relatedPhrases"
                :key="phrase.phraseId"
                @click="scrollToPhrase(phrase.phraseId)"
                class="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-gray-200 transition-all group"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-bold text-primary group-hover:text-primary/80 truncate">{{ phrase.english }}</p>
                    <p class="text-xs text-gray-500 mt-0.5 truncate">{{ phrase.pronunciation }}</p>
                  </div>
                  <span class="material-symbols-outlined text-gray-400 text-sm group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Progress -->
        <div class="space-y-6">
          <PhraseProgress
            ref="progressTracker"
            :phrases="phrasebookData.phrases"
            :categories="phrasebookData.categories"
          />
        </div>
      </div>
      
    </div>
    <!-- End Main Content Container -->
  </div>

  <!-- Details Modal -->
  <Teleport to="body">
    <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeDetails">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div class="relative bg-white dark:bg-[#2a1d18] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white dark:bg-[#2a1d18] border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 class="text-xl font-bold text-charcoal dark:text-white">Phrase Details</h2>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-600 transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div v-if="selectedPhrase" class="p-6 space-y-6">
          <!-- Main Phrase Info -->
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
              <span class="material-symbols-outlined text-sm">{{ getCategoryIcon(selectedPhrase.category) }}</span>
              {{ getCategoryName(selectedPhrase.category) }}
            </div>
            
            <h3 class="text-3xl font-bold text-charcoal dark:text-white">{{ selectedPhrase.english }}</h3>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div class="flex-1">
                  <p class="text-xs text-gray-500 font-medium mb-1">SINHALA</p>
                  <p class="sinhala-text text-2xl font-bold text-charcoal dark:text-white">{{ selectedPhrase.sinhala_native }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ selectedPhrase.sinhala_latin }}</p>
                </div>
                <button
                  @click="() => selectedPhrase && speech.speak(selectedPhrase.sinhala_native, { lang: 'sinhala' })"
                  class="shrink-0 h-10 w-10 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-lg">volume_up</span>
                </button>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div class="flex-1">
                  <p class="text-xs text-gray-500 font-medium mb-1">TAMIL</p>
                  <p class="sinhala-text text-2xl font-bold text-charcoal dark:text-white">{{ selectedPhrase.tamil_native }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ selectedPhrase.tamil_latin }}</p>
                </div>
                <button
                  @click="() => selectedPhrase && speech.speak(selectedPhrase.tamil_native, { lang: 'tamil' })"
                  class="shrink-0 h-10 w-10 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-lg">volume_up</span>
                </button>
              </div>
            </div>

            <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p class="text-xs text-primary font-bold uppercase tracking-wide mb-1">Pronunciation</p>
              <p class="text-lg font-medium text-charcoal dark:text-white">{{ selectedPhrase.pronunciation }}</p>
            </div>
          </div>

          <!-- Cultural Context -->
          <div v-if="selectedPhrase.cultural_note" class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-blue-600 text-xl mt-0.5">info</span>
              <div class="flex-1">
                <p class="text-xs text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wide mb-1">Cultural Note</p>
                <p class="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">{{ selectedPhrase.cultural_note }}</p>
              </div>
            </div>
          </div>

          <!-- Usage Tips -->
          <div v-if="selectedPhrase.usage_tips" class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-green-600 text-xl mt-0.5">lightbulb</span>
              <div class="flex-1">
                <p class="text-xs text-green-700 dark:text-green-400 font-bold uppercase tracking-wide mb-1">Usage Tips</p>
                <p class="text-sm text-green-900 dark:text-green-200 leading-relaxed">{{ selectedPhrase.usage_tips }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button
              @click="toggleSavePhrase(selectedPhrase.phraseId)"
              :class="[
                'flex-1 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2',
                isSaved(selectedPhrase.phraseId)
                  ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
              ]"
            >
              <span class="text-xl">{{ isSaved(selectedPhrase.phraseId) ? '★' : '☆' }}</span>
              <span>{{ isSaved(selectedPhrase.phraseId) ? 'Saved' : 'Save' }}</span>
            </button>
            <button
              @click="markPhraseAsPracticed(selectedPhrase.phraseId)"
              class="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">check_circle</span>
              <span>Mark Practiced</span>
            </button>
          </div>
        </div>
        <div v-else class="p-6 text-center text-gray-500">
          <p>No details available.</p>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Learning Mode Modal -->
  <Teleport to="body">
    <div v-if="isLearningMode" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeLearningMode">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div class="relative bg-white dark:bg-[#2a1d18] rounded-2xl shadow-2xl w-full max-w-2xl">
        <!-- Header -->
        <div class="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-4 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold flex items-center gap-2">
                <span class="material-symbols-outlined">school</span>
                Learning Mode
              </h2>
              <p class="text-sm text-white/80 mt-1">{{ learningModeCategory ? getCategoryName(learningModeCategory) : 'All Categories' }}</p>
            </div>
            <button @click="closeLearningMode" class="text-white/80 hover:text-white transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="px-6 pt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-gray-600 dark:text-gray-400">Progress</span>
            <span class="text-sm font-bold text-purple-600">{{ learnedPhrasesCount }} / {{ learningPhrases.length }}</span>
          </div>
          <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
              :style="{ width: `${learningProgress}%` }"
            ></div>
          </div>
        </div>

        <!-- Flashcard -->
        <div v-if="currentLearningPhrase" class="p-8">
          <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-700 min-h-[300px] flex flex-col items-center justify-center">
            <!-- English Phrase -->
            <div class="text-center mb-6">
              <p class="text-3xl font-bold text-charcoal dark:text-white mb-2">{{ currentLearningPhrase.english }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLearningPhrase.pronunciation }}</p>
            </div>

            <!-- Translations (Hidden until revealed) -->
            <div v-if="isTranslationRevealed" class="w-full space-y-4 animate-fade-in">
              <!-- Sinhala -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p class="text-xs text-gray-500 font-bold uppercase mb-1">Sinhala</p>
                <p class="sinhala-text text-2xl font-bold text-charcoal dark:text-white mb-1">{{ currentLearningPhrase.sinhala_native }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ currentLearningPhrase.sinhala_latin }}</p>
              </div>

              <!-- Tamil -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p class="text-xs text-gray-500 font-bold uppercase mb-1">Tamil</p>
                <p class="sinhala-text text-2xl font-bold text-charcoal dark:text-white mb-1">{{ currentLearningPhrase.tamil_native }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ currentLearningPhrase.tamil_latin }}</p>
              </div>

              <!-- Cultural Note -->
              <div v-if="currentLearningPhrase.cultural_note" class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-blue-600 text-sm">info</span>
                  <p class="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">{{ currentLearningPhrase.cultural_note }}</p>
                </div>
              </div>
            </div>

            <!-- Reveal Prompt -->
            <div v-else class="text-center">
              <p class="text-gray-500 dark:text-gray-400 mb-4">Think about how you would say this...</p>
              <div class="animate-pulse">
                <span class="material-symbols-outlined text-6xl text-purple-300 dark:text-purple-600">visibility_off</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Completion State -->
        <div v-else class="p-8 text-center">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-700">
            <span class="material-symbols-outlined text-6xl text-green-600 mb-4">check_circle</span>
            <h3 class="text-2xl font-bold text-charcoal dark:text-white mb-2">Great Job!</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">You've completed all {{ learningPhrases.length }} phrases in this set.</p>
            <button
              @click="restartLearningMode"
              class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div v-if="currentLearningPhrase" class="px-6 pb-6 flex gap-3">
          <button
            v-if="!isTranslationRevealed"
            @click="revealTranslation"
            class="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined">visibility</span>
            <span>Reveal Translation</span>
          </button>
          
          <template v-else>
            <button
              @click="playLearningPhrase('sinhala')"
              :disabled="!sinhalaVoiceAvailable"
              class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">volume_up</span>
              <span>Sinhala</span>
            </button>
            
            <button
              @click="playLearningPhrase('tamil')"
              :disabled="!tamilVoiceAvailable"
              class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">volume_up</span>
              <span>Tamil</span>
            </button>
            
            <button
              @click="nextLearningPhrase"
              class="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Next Phrase</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Mobile Emergency Quick Access Button -->
  <Teleport to="body">
    <button
      v-if="!isLearningMode"
      @click="selectCategory('emergency')"
      class="fixed bottom-20 right-6 lg:hidden z-40 h-14 w-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      :class="selectedCategory === 'emergency' ? 'ring-4 ring-red-300' : ''"
      title="Emergency Phrases"
    >
      <span class="material-symbols-outlined text-2xl">emergency</span>
    </button>
  </Teleport>
  
  <!-- Mobile Quick Learn Floating Button -->
  <Teleport to="body">
    <button
      v-if="!isLearningMode"
      @click="toggleMobileQuickLearn"
      class="fixed bottom-6 right-6 lg:hidden z-40 h-14 w-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      title="Quick Learn"
    >
      <span class="material-symbols-outlined text-2xl">school</span>
    </button>
  </Teleport>
  
  <!-- Mobile Quick Learn Modal -->
  <Teleport to="body">
    <div
      v-if="showMobileQuickLearn"
      @click="showMobileQuickLearn = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden flex items-end"
    >
      <div
        @click.stop
        class="w-full bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto animate-slide-up"
      >
        <div class="sticky top-0 bg-gradient-to-br from-primary to-primary/80 text-white p-6 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold">Today's Useful Phrases</h3>
            <p class="text-white/80 text-sm mt-1">Master these essentials</p>
          </div>
          <button
            @click="showMobileQuickLearn = false"
            class="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div class="p-4">
          <button
            @click="shuffleQuickLearnPhrases"
            class="w-full py-3 bg-primary/10 hover:bg-primary/20 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-primary mb-4"
          >
            <span class="material-symbols-outlined">shuffle</span>
            <span>Shuffle Phrases</span>
          </button>
          
          <div class="space-y-3">
            <button
              v-for="(phrase, index) in quickLearnPhrases"
              :key="phrase.phraseId"
              @click="scrollToPhrase(phrase.phraseId); showMobileQuickLearn = false"
              class="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left group"
            >
              <div class="flex items-start gap-3">
                <div class="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  {{ index + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm text-primary group-hover:text-primary/80 transition-colors">{{ phrase.english }}</p>
                  <p class="text-xs text-gray-600 mt-0.5 truncate">{{ phrase.pronunciation }}</p>
                </div>
                <span class="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">arrow_forward</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>


<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useSpeech } from '~/composables/useSpeech'
import { useToast } from '~/composables/useToast'
import phrasebookDataImport from '~/assets/data/phrasebook.json'

// Import components
import PhraseQuiz from '~/components/Shared/PhraseQuiz.vue'
import PhraseProgress from '~/components/Shared/PhraseProgress.vue'
import CulturalTips from '~/components/Shared/CulturalTips.vue'
import CulturalNotes from '~/components/Shared/CulturalNotes.vue'

// Types
interface Phrase {
  phraseId: string
  category: string
  english: string
  sinhala_native: string
  sinhala_latin: string
  tamil_native: string
  tamil_latin: string
  pronunciation: string
  cultural_note?: string
  usage_tips?: string
  priority: number
  emergency_flag: boolean
}

// Composables
const speech = useSpeech()
const toast = useToast()
const route = useRoute()
const router = useRouter()

// Data
const phrasebookData = phrasebookDataImport as {
  categories: Array<{ id: string; name: string; icon: string; description: string }>
  phrases: Phrase[]
  etiquette_tips: Array<{
    title: string
    do: string[]
    dont: string[]
    icon: string
  }>
  cultural_notes: Array<{ title: string; description: string; icon: string }>
}

// State
const searchQuery = ref('')
const selectedLanguage = ref<'sinhala' | 'tamil' | 'both'>('sinhala')
const selectedCategory = ref<string | null>(null)
const savedPhrases = ref<string[]>([])
const favoritePhrases = ref<string[]>([])
const showDetailsModal = ref(false)
const selectedPhrase = ref<Phrase | null>(null)
const progressTracker = ref<InstanceType<typeof PhraseProgress> | null>(null)
const playingPhraseId = ref<string | null>(null)
const quickLearnPhrases = ref<Phrase[]>([])
const lastShuffleDate = ref<string>('')

// Learning Mode state
const isLearningMode = ref(false)
const learningModeCategory = ref<string | null>(null)
const currentLearningIndex = ref(0)
const isTranslationRevealed = ref(false)
const learnedPhrases = ref<string[]>([])

// Mobile Quick Learn state
const showMobileQuickLearn = ref(false)

// Computed
const displayCategories = computed(() => {
  const categories = [...phrasebookData.categories]
  
  // Add Favorites category at the beginning if there are any favorite phrases
  if (favoritePhrases.value.length > 0) {
    categories.unshift({
      id: 'favorites',
      name: 'Favorites',
      icon: 'star',
      description: `${favoritePhrases.value.length} favorite phrase${favoritePhrases.value.length > 1 ? 's' : ''}`
    })
  }
  
  return categories
})

const activeCategory = computed(() => {
  return displayCategories.value.find(c => c.id === selectedCategory.value)
})

const filteredPhrases = computed(() => {
  let result = phrasebookData.phrases

  // Filter by category
  if (selectedCategory.value === 'favorites') {
    // Show only favorited phrases
    result = result.filter(p => favoritePhrases.value.includes(p.phraseId))
  } else if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.english.toLowerCase().includes(query) ||
      p.sinhala_native.includes(query) ||
      p.tamil_native.includes(query) ||
      p.sinhala_latin.toLowerCase().includes(query) ||
      p.tamil_latin.toLowerCase().includes(query) ||
      p.pronunciation.toLowerCase().includes(query)
    )
    
    // Check if search contains emergency-related keywords
    const emergencyKeywords = ['emergency', 'help', 'police', 'hospital', 'danger', 'urgent', 'ambulance', 'fire', 'doctor']
    const isEmergencySearch = emergencyKeywords.some(keyword => query.includes(keyword))
    
    // If emergency search, prioritize emergency phrases to the top
    if (isEmergencySearch) {
      result = [
        ...result.filter(p => p.emergency_flag || p.category === 'emergency'),
        ...result.filter(p => !p.emergency_flag && p.category !== 'emergency')
      ]
    }
  }

  return result
})

const culturalTipsForCategory = computed(() => {
  // Since etiquette_tips don't have categories, just return all tips
  return phrasebookData.etiquette_tips
})

// Category-specific usage tips
const categoryUsageTips: Record<string, string> = {
  greetings: "Use these when meeting locals, entering shops, or starting conversations. A warm greeting opens hearts and shows respect.",
  emergency: "Use these loudly and clearly. Locals will help immediately. Keep your phone charged and emergency contacts saved.",
  dining: "Pointing at menu items helps. Learn these before ordering. Most restaurants have English menus in tourist areas.",
  transport: "Show these to drivers or station staff. Always confirm the price before getting in. Keep small bills ready.",
  shopping: "Use these at markets and shops. Bargaining is expected in local markets but not in fixed-price stores.",
  directions: "Combine with gestures and show addresses on your phone. Locals are very helpful with directions.",
  common: "These everyday phrases help you connect with locals and navigate daily situations with confidence."
}

const categoryUsageTip = computed(() => {
  if (!selectedCategory.value) return ''
  return categoryUsageTips[selectedCategory.value] || 'Use these phrases to communicate effectively in various situations.'
})

// Category cultural tip
const categoryCulturalTip = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'favorites') return ''
  
  // Try to get a cultural note from a phrase in the current category
  const categoryPhrases = filteredPhrases.value.filter(p => p.category === selectedCategory.value)
  const phraseWithNote = categoryPhrases.find(p => p.cultural_note)
  
  if (phraseWithNote && phraseWithNote.cultural_note) {
    return phraseWithNote.cultural_note
  }
  
  // Fallback to category-level tips
  const categoryTips: Record<string, string> = {
    greetings: "Sri Lankans often greet with a slight bow and hands together (Ayubowan). This shows deep respect.",
    emergency: "Always remain calm and polite. Sri Lankans respond well to politeness even in emergencies.",
    dining: "It's polite to wash hands before eating. Many locals eat with their right hand. Left hand is considered unclean.",
    transport: "Three-wheelers (tuk-tuks) are the most common transport. Always agree on fare before starting the journey.",
    shopping: "Bargaining is part of the culture at markets. Start at 50% of asking price and negotiate respectfully.",
    directions: "Sri Lankans may say 'yes' to be polite even if unsure. Ask multiple people to confirm directions.",
    common: "Showing respect to elders is deeply valued. Use polite forms when speaking to older people."
  }
  
  return categoryTips[selectedCategory.value] || ''
})

// Related phrases from other categories
const relatedPhrases = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'favorites') return []
  
  // Get phrases from other categories that might be useful
  const otherCategoryPhrases = phrasebookData.phrases.filter(p => p.category !== selectedCategory.value)
  
  // Shuffle and take 4
  const shuffled = [...otherCategoryPhrases].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 4)
})

const sinhalaVoiceAvailable = computed(() => speech.isLanguageAvailable('sinhala'))
const tamilVoiceAvailable = computed(() => speech.isLanguageAvailable('tamil'))

// Learning Mode computed properties
const learningPhrases = computed(() => {
  if (learningModeCategory.value) {
    return phrasebookData.phrases.filter(p => p.category === learningModeCategory.value)
  }
  return filteredPhrases.value
})

const currentLearningPhrase = computed(() => {
  if (currentLearningIndex.value < learningPhrases.value.length) {
    return learningPhrases.value[currentLearningIndex.value]
  }
  return null
})

const learnedPhrasesCount = computed(() => learnedPhrases.value.length)

const learningProgress = computed(() => {
  if (learningPhrases.value.length === 0) return 0
  return Math.round((learnedPhrasesCount.value / learningPhrases.value.length) * 100)
})

function isPlaying(phraseId: string): boolean {
  return playingPhraseId.value === phraseId && speech.isSpeaking.value
}

function canPlayPhrase(lang: 'sinhala' | 'tamil' | 'both'): boolean {
  if (!speech.isSupported.value) return false
  if (lang === 'both') return sinhalaVoiceAvailable.value || tamilVoiceAvailable.value
  return lang === 'sinhala' ? sinhalaVoiceAvailable.value : tamilVoiceAvailable.value
}

function getPlayTooltip(lang: 'sinhala' | 'tamil' | 'both'): string {
  if (!speech.isSupported.value) return 'Speech not supported in this browser'
  if (!canPlayPhrase(lang)) {
    const langName = lang === 'sinhala' ? 'Sinhala' : lang === 'tamil' ? 'Tamil' : 'Sinhala/Tamil'
    return `${langName} voice not available`
  }
  return 'Play pronunciation'
}

// Methods
function selectCategory(id: string | null) {
  selectedCategory.value = selectedCategory.value === id ? null : id
  
  // Update URL query param
  if (id) {
    router.push({ query: { category: id } })
  } else {
    router.push({ query: {} })
  }
}

function handleSearch() {
  // Debouncing is handled by the user typing
}

function clearSearch() {
  searchQuery.value = ''
  selectedCategory.value = null
}

function speakPhrase(phrase: Phrase) {
  // If this phrase is already playing, stop it
  if (isPlaying(phrase.phraseId)) {
    speech.stop()
    playingPhraseId.value = null
    return
  }
  
  // Stop any currently playing phrase
  if (speech.isSpeaking.value) {
    speech.stop()
  }
  
  // When 'both' is selected, default to Sinhala for audio
  const lang = selectedLanguage.value === 'both' ? 'sinhala' : selectedLanguage.value
  const text = lang === 'sinhala' ? phrase.sinhala_native : phrase.tamil_native
  
  // Set playing phrase ID before speaking
  playingPhraseId.value = phrase.phraseId
  
  speech.speak(text, { lang, rate: 0.8 })
  
  // Mark as practiced
  if (progressTracker.value) {
    progressTracker.value.markPracticed(phrase.phraseId)
  }
}

// Watch for speech ending to clear playing state
watch(() => speech.isSpeaking.value, (isSpeaking) => {
  if (!isSpeaking) {
    playingPhraseId.value = null
  }
})

function toggleSavePhrase(phraseId: string) {
  const index = savedPhrases.value.indexOf(phraseId)
  if (index > -1) {
    savedPhrases.value.splice(index, 1)
    toast.info('Removed from emergency set')
  } else {
    savedPhrases.value.push(phraseId)
    toast.success('Added to emergency set')
  }
  localStorage.setItem('ceylon_saved_phrases', JSON.stringify(savedPhrases.value))
}

function isSaved(phraseId: string): boolean {
  return savedPhrases.value.includes(phraseId)
}

function isFavorite(phraseId: string): boolean {
  return favoritePhrases.value.includes(phraseId)
}

function toggleFavorite(phraseId: string) {
  const index = favoritePhrases.value.indexOf(phraseId)
  if (index > -1) {
    favoritePhrases.value.splice(index, 1)
    toast.info('Removed from favorites')
  } else {
    favoritePhrases.value.push(phraseId)
    toast.success('Added to favorites')
  }
  
  // Persist to localStorage
  localStorage.setItem('ceylon_favorite_phrases', JSON.stringify(favoritePhrases.value))
}

function openDetails(phrase: Phrase) {
  selectedPhrase.value = phrase
  showDetailsModal.value = true
}

function closeDetails() {
  showDetailsModal.value = false
  selectedPhrase.value = null
}

function markPhraseAsPracticed(phraseId: string) {
  if (progressTracker.value) {
    progressTracker.value.markPracticed(phraseId)
    toast.success('Marked as practiced!')
    closeDetails()
  }
}

function getPhraseLevel(phraseId: string): 'new' | 'learning' | 'mastered' {
  return progressTracker.value?.getPhraseLevel(phraseId) || 'new'
}

function getCategoryIcon(categoryId: string): string {
  const category = phrasebookData.categories.find(c => c.id === categoryId)
  return category?.icon || 'translate'
}

function getCategoryName(categoryId: string): string {
  const category = phrasebookData.categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 text-charcoal font-bold">$1</mark>')
}

function downloadOfflineData() {
  try {
    const dataStr = JSON.stringify(phrasebookData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ceylonguides-phrasebook.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Phrasebook downloaded!')
  } catch (error) {
    console.error('Download failed:', error)
    toast.error('Failed to download')
  }
}
function shuffleQuickLearnPhrases() {
  // Priority categories
  const priorityCategories = ['greetings', 'emergency', 'dining']
  
  // Get phrases from priority categories
  const priorityPhrases = phrasebookData.phrases.filter(p => 
    priorityCategories.includes(p.category)
  )
  
  // Shuffle and take 4-5 phrases
  const shuffled = [...priorityPhrases].sort(() => Math.random() - 0.5)
  quickLearnPhrases.value = shuffled.slice(0, 4)
  
  // Store today's date
  const today = new Date().toDateString()
  lastShuffleDate.value = today
  localStorage.setItem('ceylon_quick_learn_date', today)
  localStorage.setItem('ceylon_quick_learn_phrases', JSON.stringify(quickLearnPhrases.value.map(p => p.phraseId)))
  
  toast.success('Phrases shuffled!')
}

function toggleMobileQuickLearn() {
  showMobileQuickLearn.value = !showMobileQuickLearn.value
}

function scrollToPhrase(phraseId: string) {
  // Find the phrase element and scroll to it
  const phraseElement = document.querySelector(`[data-phrase-id="${phraseId}"]`)
  if (phraseElement) {
    phraseElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Briefly highlight the phrase
    phraseElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
    setTimeout(() => {
      phraseElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
    }, 2000)
  }
}

// Learning Mode functions
function toggleLearningMode() {
  isLearningMode.value = !isLearningMode.value
  
  if (isLearningMode.value) {
    // Start learning mode with current category
    learningModeCategory.value = selectedCategory.value
    currentLearningIndex.value = 0
    isTranslationRevealed.value = false
    
    // Load learned phrases from localStorage
    const categoryKey = learningModeCategory.value || 'all'
    const saved = localStorage.getItem(`ceylon_learned_${categoryKey}`)
    if (saved) {
      try {
        learnedPhrases.value = JSON.parse(saved)
      } catch (e) {
        learnedPhrases.value = []
      }
    } else {
      learnedPhrases.value = []
    }
  }
}

function closeLearningMode() {
  isLearningMode.value = false
  
  // Save progress to localStorage
  const categoryKey = learningModeCategory.value || 'all'
  localStorage.setItem(`ceylon_learned_${categoryKey}`, JSON.stringify(learnedPhrases.value))
}

function revealTranslation() {
  isTranslationRevealed.value = true
}

function playLearningPhrase(lang: 'sinhala' | 'tamil') {
  if (!currentLearningPhrase.value) return
  
  const text = lang === 'sinhala' 
    ? currentLearningPhrase.value.sinhala_native 
    : currentLearningPhrase.value.tamil_native
  
  speech.speak(text, { lang, rate: 0.8 })
}

function nextLearningPhrase() {
  if (!currentLearningPhrase.value) return
  
  // Mark current phrase as learned
  const phraseId = currentLearningPhrase.value.phraseId
  if (!learnedPhrases.value.includes(phraseId)) {
    learnedPhrases.value.push(phraseId)
  }
  
  // Move to next phrase
  currentLearningIndex.value++
  isTranslationRevealed.value = false
  
  // If completed all phrases, save progress
  if (currentLearningIndex.value >= learningPhrases.value.length) {
    const categoryKey = learningModeCategory.value || 'all'
    localStorage.setItem(`ceylon_learned_${categoryKey}`, JSON.stringify(learnedPhrases.value))
    toast.success(`Completed all ${learningPhrases.value.length} phrases!`)
  }
}

function restartLearningMode() {
  currentLearningIndex.value = 0
  isTranslationRevealed.value = false
  learnedPhrases.value = []
  
  // Clear localStorage
  const categoryKey = learningModeCategory.value || 'all'
  localStorage.removeItem(`ceylon_learned_${categoryKey}`)
}

// Lifecycle
onMounted(() => {
  // Initialize category from URL query param, default to 'common'
  const categoryParam = route.query.category as string | undefined
  if (categoryParam && phrasebookData.categories.some(c => c.id === categoryParam)) {
    selectedCategory.value = categoryParam
  } else {
    // Set default category to 'common'
    selectedCategory.value = 'common'
    router.push({ query: { category: 'common' } })
  }
  
  // Load saved phrases from localStorage
  const saved = localStorage.getItem('ceylon_saved_phrases')
  if (saved) {
    try {
      savedPhrases.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse saved phrases:', e)
    }
  }
  
  // Load favorite phrases from localStorage
  const favorites = localStorage.getItem('ceylon_favorite_phrases')
  if (favorites) {
    try {
      favoritePhrases.value = JSON.parse(favorites)
    } catch (e) {
      console.error('Failed to parse favorite phrases:', e)
    }
  }
  
  // Initialize quick learn phrases
  const today = new Date().toDateString()
  const savedDate = localStorage.getItem('ceylon_quick_learn_date')
  const savedPhraseIds = localStorage.getItem('ceylon_quick_learn_phrases')
  
  if (savedDate === today && savedPhraseIds) {
    // Use saved phrases for today
    try {
      const phraseIds = JSON.parse(savedPhraseIds)
      quickLearnPhrases.value = phrasebookData.phrases.filter(p => phraseIds.includes(p.phraseId))
      lastShuffleDate.value = savedDate
    } catch (e) {
      console.error('Failed to parse quick learn phrases:', e)
      shuffleQuickLearnPhrases()
    }
  } else {
    // New day or no saved data, shuffle new phrases
    shuffleQuickLearnPhrases()
  }
  
  // Read category from URL query param
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
  }
})

// Watch for route query changes
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory as string
  }
})

// SEO
useHead({
  title: 'Phrasebook - Learn Sinhala & Tamil | CeylonGuides',
  meta: [
    { name: 'description', content: 'Master essential Sinhala and Tamil phrases for your Sri Lanka trip. Interactive audio, cultural tips, and emergency phrases.' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>

<style scoped>
.sinhala-text {
  font-family: "Noto Serif Sinhala", "Noto Sans Tamil", serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
</style>
