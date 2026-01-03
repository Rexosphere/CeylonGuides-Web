<template>
  <div class="mb-12">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-text-main dark:text-white text-2xl font-bold tracking-tight">Trending in Sri Lanka</h2>
      <a class="text-primary text-sm font-bold hover:underline" href="#">View all</a>
    </div>
    
    <div class="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <!-- Card 1 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKDgqVjdjCA5PE78D1m_hDURLaVSUL7aycjaMyuvvN1D9AvpTrLcohFQk4_PPCbmuPhgVmn0oMB3nMMPt5noK9PkZh9Iydf7MRCsgrxrKQKs79o5BKgiXs3sZdDujd0ShHdp_h4W-2KdGoKpCwzVoRn1LA14AFaqGwT4A50XWZ716pYpasWyTA_7cnKUuTmncrJQdw3tCKtSuqVOKm6zPxBwEX3FZwsyVsX0KKkyqeli2LeIrpk5OLoIOylpFVYyH1pDtfZwLMX9A");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wide">Trip Report</span>
            <span class="text-xs text-text-subtle">2 days ago</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">The Ultimate 10-day Itinerary: Kandy to Ella by Train</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAI2fgqArhl9L8zZ0FYfp9esoFPbjDfwUppMtZT9KpFtI5A7P6lWJiLRTt72JuSRNA4HRUp6qyMywEQNI_768HMFvdvDYaVlAC1xRCMbrbn2Kf49sGyONHtaM6ZZ7CDzbr12iETtEQ8Ac6kmZ7H9Fnx9B4_6mVchOxiGMsuer6B8b1eH0Z8R0flRMpX4VRTIITlgN0LMw2ysMnDyxDNVd_HU-8gD7BvmnN3uG7OlOd9Ak_OS5doeh-3wdQyfqbxMuVm9xmI3LrN0kE")'
            ></div>
            <span class="text-sm text-text-subtle">Sarah Jenkins</span>
          </div>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWb4QGJ7lcfvi5uIOLUrvmHa0bhpzhQKhuxc31lBIl7QfZrYwy8xGC4SQz0LtJ03IRX3TIY-JvOQc26e-3Dzm6FMydzDzHyOdUxgG-4jc02BS81EYw-m5DL_SOtHIN-vuQEqne6YWUCh7FvEalJd89_3a1L_PbYcQpqfYX6vYudJrXTMh08mIKvsH9cO8xOWsNr3F7UNeSw-bQ0r1_IKDlpTctEJt5UF0nYOPr33J7aidblSCkrXd30RsHU8-OczdGggrAQ9CNLKA");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide">Guide</span>
            <span class="text-xs text-text-subtle">5 hours ago</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">Hidden spots for the best sunset in Galle Fort</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmXtaRtQBi8etLPtOhYE63ZgXx6_4i_s-59x4yB_6NW1ke5jO1_0mvUApHw0u0QdMq6wG0KdRlCx08OjuwqImRoW_y_RATDw6XdX4emEZcquK0HUQ2qgx4ZD2mwqY0F4RixeY42Myz8paUOeYQk3d578VeiEeKKQLIjP3_RZUzFPe7U1wdBG8KBolpGgwZ3oKDbNPqyQupbuyiGqwGRuUlEqbydGgLlydRKcMEVxO2CuSkjWRN93lh_5OWxrPnY9ZE8V3boRDD3NE")'
            ></div>
            <span class="text-sm text-text-subtle">Mark Thompson</span>
          </div>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBY-E2diWBhTqc5xfY2DMxcP4CRjIv59CCTqOPztEqPE454Gd8AauVuj3OXh5GSYFB1K22orelmNt_AApsvlQ-KIAieKIpaJeU9VhVyIYiRP5lOLvWuWljKK_kN5t6LAfs38m5ufa8QPFtzlqHM0kDBAxJkdPYi5_LgLx4cwsf1b2I-O4y0UCY_DG5FSZ1JQaNmoS8yBOMYcp1_-DXMAwjIXl4FGhlrcrEEz9tHiBIfiYZgY5Se4mWvtxe7hnYGpTsLWk6pQB2_pzw");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wide">Q&A</span>
            <span class="text-xs text-text-subtle">1 day ago</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">Is it better to hike Sigiriya in the morning or evening?</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWmWl6RqbBmK4DuyTJajDJjnS0SvFjtMKmI2vbaE1Ab5A0UVPm1Vwg7_sLHQcxzfaSItGpym2Dk8AtZ6HUcIDSj9d8pu4FqQ-0ecmlw5oBSRkxjTd0UoES8cN-ZP9GYJ_y1fDKvI-jqrwJpSaukkXHZrA56-D5sOi_wgAu8m1TtrcwYpKq-6Vld3hyajFilJ0RVUto-W78Do1aFzvZ-99F2JGC_PUJShMkr24Vwp8DX6ZlGfdWm2JeiNIqcdSmQpeXk6gj-xkaxHg")'
            ></div>
            <span class="text-sm text-text-subtle">Alex & Sam</span>
          </div>
        </div>
      </div>
      
      <!-- Card 4 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_nOvVjwZShh32TzAJcAmXXPGGzWW-B3aNnt1xU6nHtUFwTiMPUgfG_QeKA1RMDOTOo_9eEedOWOd2VOMmRezt1D03iCbnoVXBi-UMBlXTIgIICir-qMfCkWpw8up3o6jKRnOygOIuRjV_495f0pF3BRKtnz3dwcbgBoe5xwojgzDfo6KU2xNJ5oAM_wfvLHXGf2Oq8d7Xw0j8gnNEsHN476eNm-7OhTDzS8exAnENsFhDEuFRK9bpUlUgQCZMfAMAR8Q2Hb3V66Q");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wide">Meetup</span>
            <span class="text-xs text-text-subtle">Just now</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">Anyone in Mirissa next week for surfing?</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDeF_MLpMg9bMose7kW-_4Mc2C939ye5xvY6nC9b-m_ckhdwzIbk1iJjSZJxP2keWVbrmPk4_rzBP4Jgpgr5rlgD04QHObwZRkNtmnk5eIr9eP0cFgVoBKyd0eOdeGt_F5J7zmr7e_knqEclRHvlsXmJojl25mu3imafVKEkH3v6H2QJTjwfDhHfKYjawXzP6cfy6ZezQ4ulS2IcJwDyIT_XbJpkog7mmFBCLzFGAxmc3W1V96B6yWrPXEybnzi5TT6VRHgF8JOKk")'
            ></div>
            <span class="text-sm text-text-subtle">Kai S.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
