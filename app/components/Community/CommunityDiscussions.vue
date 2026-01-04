<template>
  <div class="lg:col-span-8 flex flex-col gap-4">
    <h3 class="text-text-main dark:text-white text-xl font-bold mb-2">Latest Discussions</h3>
    
    <!-- Discussion Card 1 -->
    <div class="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark hover:border-primary/30 transition-colors">
      <div class="flex gap-4">
        <div class="flex flex-col items-center gap-1 min-w-[40px]">
          <div 
            class="w-10 h-10 rounded-full bg-gray-200 bg-cover" 
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsLbsDPPo7Nr42lIOBrMac8YuHjCCOinC61dTmGdd9j7MGnrjeKtWN2owmhz2XKWDeDKPPM-drUzyd47SKzJKV03WNymjiPd09PHyIC41gGLXfdlLQRavGdM-_yD8OXuHSTvY-O4uPqu6mZmg-cEb-T8TDBFs3RCBi7JZTiBLypXeGBfQuIJtA0SXGujNSz1GH_GSE_Uv83A3I7mp2S5gG-DWZmppsH2srcF42RK4EuzUJxT1e4yJ82X0MnAeT2PIsbdPz3Oo40co")'
          ></div>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-bold text-text-main dark:text-white">Elena R.</span>
            <span class="text-xs text-text-subtle">• 3h ago</span>
            <span class="ml-auto px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold">Q&A</span>
          </div>
          <h4 class="text-lg font-bold text-text-main dark:text-white mb-2 cursor-pointer hover:text-primary transition-colors">Best cooking class in Kandy?</h4>
          <p class="text-text-subtle dark:text-gray-300 text-sm mb-4 leading-relaxed">
            Hi everyone! I'm visiting Kandy next month and would love to learn how to make authentic Sri Lankan curry. Has anyone tried a class they would highly recommend? Looking for something intimate and local.
          </p>
          <div class="flex items-center gap-6">
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-[18px]">thumb_up</span>
              12               </button>
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-[18px]">chat_bubble</span>
              8 Replies
            </button>
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium ml-auto">
              <span class="material-symbols-outlined text-[18px]">share</span>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Discussion Card 2 -->
    <div class="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark hover:border-primary/30 transition-colors">
      <div class="flex gap-4">
        <div class="flex flex-col items-center gap-1 min-w-[40px]">
          <div 
            class="w-10 h-10 rounded-full bg-gray-200 bg-cover" 
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQKbh_ZkK7GDCIUZTXU1AjTQe2EJQc_q3769fizN-oKBTrcbkN9VmKrCIpqZIzSOkG06c3vlACi_BxlABLg7osbswfxyB0ex44vbyl6ttb_T6dqA2YwZDpSXkmwdOdPjgxUosStIoJfPUwqtSuJBi4TnBcS85npDPLb6S_6_rxOI5duzxw8dXqgrQLeuGXYFQmQ68LPUvG6PjIAEbHbw8PwZajzm9xtLxBGUzA4Up9PRNvwAvdz-4sCTTclvr54rZR_abTSzGTKQ4")'
          ></div>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-bold text-text-main dark:text-white">James W.</span>
            <span class="text-xs text-text-subtle">• 6h ago</span>
            <span class="ml-auto px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">Tips</span>
          </div>
          <h4 class="text-lg font-bold text-text-main dark:text-white mb-2 cursor-pointer hover:text-primary transition-colors">Don't forget your leech socks in Sinharaja!</h4>
          <p class="text-text-subtle dark:text-gray-300 text-sm mb-4 leading-relaxed">
            Just came back from a trek in the Sinharaja Rain Forest. It was absolutely stunning, but the leeches were out in full force due to the recent rains. Make sure to pack leech socks or salt!
          </p>
          <!-- Attached Image Preview -->
          <div 
            class="mb-4 rounded-lg overflow-hidden h-48 w-full md:w-2/3 bg-cover bg-center" 
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBf6W4e9Qlt4ux-sjERVAaAxDa_utHM0IlSjOfQe8BL0mUa7p6jOccTjZVvPeHfX0IK26g-C02c1RnluNQhMNiIQYoCNjnTwmqMcoGvlx6d4O3qklx2S0J6o8bqMn21nzARHV5DxVh-30eu1aEkJop0WJPuEHo3SOp3wjsW_n6mtvzNJ-EXCbeUvcJz2LkPf7Zq9Lq98d_j16dI8a-1pd37NPNFO2iYlnrennB8bRcaBJSt7VNc_x0ipZ0XKyx-L2MEbdwhQUM2DaY");'
          ></div>
          <div class="flex items-center gap-6">
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-[18px]">thumb_up</span>
              45
            </button>
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-[18px]">chat_bubble</span>
              15 Replies
            </button>
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium ml-auto">
              <span class="material-symbols-outlined text-[18px]">share</span>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Discussion Card 3 -->
    <div class="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark hover:border-primary/30 transition-colors">
      <div class="flex gap-4">
        <div class="flex flex-col items-center gap-1 min-w-[40px]">
          <div 
            class="w-10 h-10 rounded-full bg-gray-200 bg-cover" 
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfUzSq--dFWFxxoeLrgW7a2Gg6j225YjOPc4RuK2UWP_HAOzTweyu1p6ItS2CPGNOWRDC6uhmtilG5Gb3aI6yTsGInXdJHQjPzd2FItdiRM2JKpl6RbNl5PvnTH7jt5jbqfZR8s6v8cJkA3eswQPzCJJCmgY9Wgtp2yhT_cK_8n4oiAQdMZUDk-HzaJtg1cWFOPdUbUXkExhu0FLIpj8l9pEtXzhycAu8v50TP0D-mbWTB2r2F7IDW6Hsh6W4OxaQpUmvSTb3GELA")'
          ></div>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-bold text-text-main dark:text-white">Priya D.</span>
            <span class="text-xs text-text-subtle">• 1d ago</span>
            <span class="ml-auto px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold">Meetup</span>
          </div>
          <h4 class="text-lg font-bold text-text-main dark:text-white mb-2 cursor-pointer hover:text-primary transition-colors">Solo traveler in Nuwara Eliya - 15th to 18th</h4>
          <p class="text-text-subtle dark:text-gray-300 text-sm mb-4 leading-relaxed">
            Hey community! I'll be in Nuwara Eliya for a few days. Planning to visit Horton Plains and some tea factories. If anyone wants to share a van or grab a coffee, hit me up!
          </p>
          <div class="flex items-center gap-6">
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-[18px]">thumb_up</span>
              5
            </button>
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-[18px]">chat_bubble</span>
              2 Replies
            </button>
            <button class="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors text-sm font-medium ml-auto">
              <span class="material-symbols-outlined text-[18px]">share</span>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <button class="w-full py-3 mt-2 rounded-xl text-primary font-bold bg-primary/10 hover:bg-primary/20 transition-colors">
      Load More Discussions
    </button>
  </div>
</template>

<script setup lang="ts">
</script>
