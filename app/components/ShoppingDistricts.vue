<template>
  <div class="w-full px-4 md:px-20 lg:px-40 py-5 flex justify-center bg-white dark:bg-[#181311] border-y border-gray-100 dark:border-neutral-800">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <h2 class="text-text-main dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5">Key Shopping Districts</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <!-- District Card 1 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Busy street of Pettah market Colombo" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlnLJMuGN21EhG4Gj_PtL9kIdN0HU5hufig5l17XYbtAcCoNyXUY7-MTxOljstkvixDBy6C6nUqCsb8QaOwQ5RJLqXET56U6RXrxnYgVFwEAUe9JFXBHpvBdY-MgQnh1urR-MSpHndVK-uhUqGq2J3GX0Y6EmitH_YdEWbhTkdyJ1NLMjZvApSLuFkpb1QQjg56vZBdADr_feUSjJTdmgBJLbxno0RTGfAKvx9FfbR0u1fMQOHnYKHT07-osdpadWnk06nsRBxqW8');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Colombo 11</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Pettah Market</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">A chaotic, colorful maze of wholesale goods, fabrics, and electronics. The heartbeat of Colombo.</p>
          </div>
        </div>
        <!-- District Card 2 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Old colonial streets of Galle Fort" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAM9naUV22K0xWpjdwVj-yUTi7-sv09DDjmOHix1la6F4g7qhAp5Ze3hBSOadndgxNZGDgaE8IrQDJXB3-B6xpbzAkhtp_95DePz_3JIVK8VH34aZQu4HqM6urTYhRcmemBsOW2YvT4f3aOn8XFba7kxiVpixUaTWOP1UVOQpP4PxCAjXCby0Xwh-eAGKX7v3IVIbkY9mD4Vw4BWbplI8oEGkBvQTgT-tAHTtaHCveoTbF3c73S7wkGiDSwx_QTqaH-HY774s_qBIk');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Galle</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Galle Fort</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">Upscale boutiques set in colonial Dutch architecture. Perfect for gems, art, and linen.</p>
          </div>
        </div>
        <!-- District Card 3 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Laksala souvenir shop interior" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8DToGXKaIMLfwHzFjmxMSUULfiBnEEspvpNSoTawKlK9oPxugeleClk2zKN6KI73KPegs04uGPFpBV0SBWj4vtBiROsVFrS0xTANQaKg4eDgFJySj-1CXQbZGPadujBxXb7mqS_rhlOCoOqfV25mzAAB1EqakrFVp5ka_1w6T6eQLxSIDU56AgVj364AiNBrDTTue-e_uFnY3TON1gF3GMmn9GyqGX5-0KxkQ5D9C8KdYMf6rAza5aj0-lZSJuJ5As_tmn_RITs4');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Islandwide</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Laksala</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">State-owned gift shop ensuring authenticity and fixed prices. Great for beginners.</p>
          </div>
        </div>
        <!-- District Card 4 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Modern Odel shopping mall entrance" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwx2MA9r2NdxMhaLuu4IGVWoZfViyiLp56G3hJ70U9a6_WJuijUK3LsCqfFIBimnZbEVEcNoM231EjK84s61LrPJCfVIvjWSQHEuYgJzNL8NWOx44OCcGsz5izl4VAAILhlUJolqh-lzqXY7z1NCg3fDuRBdlQYsDbx5oSzaqdnC_DVd9kCNNwo6CGd6XkJYqCHYpl3DAGPu5TzmMvTgo8Jkj_PK63aSZQMlIVXQ3VWuGxSbSS9B9OCyFpjHC-DMaOGTBYczjd-WM');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Colombo 07</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Odel</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">Sri Lanka's premier department store for fashion, tea, and souvenirs in a chic setting.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
