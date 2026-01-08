<template>
  <section>
    <div class="flex items-center gap-2 mb-6">
      <span class="material-symbols-outlined text-primary">shopping_bag</span>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Curated Finds: What to Buy</h2>
    </div>
    <p class="text-slate-500 dark:text-slate-400 mb-8 max-w-3xl leading-relaxed">From world-famous Ceylon tea to
      intricate hand-carved masks, discover the treasures that define our island's craftsmanship.</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden">
          <img alt="Ceylon Tea" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-qfwqgPwYu0AM_5ShFiOnrK0QBEvwQnJZSwModRBFGU1Vc3olZXh9wKRr9Nb9J5cGcOXJSmHKN4YXxxFTC3qBZOGs86iI1_JqgDcTiJmiuD3QWCtpehh_cHaEbJFyZw_IvYL6sryMW1olIw6QwLKnNlaAweCH5TiepGTZIhVWjwO0fHMbmM5VmjkEbzm0LMF27k4AotdZHuDIszz6fG6-H8-rnLVsJCKUF3jqBjHc5wXueE53wcnPXeIwMokAa4H_nFOqrDuaGjU" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Ceylon Tea</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$5-20</p>
        </div>
      </div>
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden relative">
          <span
            class="absolute top-2 right-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Certified</span>
          <img alt="Blue Sapphires" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5vhbIYKd0SZ6YJJVzMLLz9iOt7hyYTCqpj2qpkJfLyNCp_XANB6NDT52oc0eVZFkb3K_mmqC_k99Wv5j8ZXsQTTuRTYR99jdKlyiiz9E7MWVOWniRn0Q3-cgx8Zp-gcGR9tGsLb0mgidUSnKFrUS87t1WYAlZUu6mcvo63LMbOSQDe_c3bcRxH5yqcXmmAkA_EzcxeoOrvKM9fb6acaiioHgc-sxU_c4uyqtWVKeIWwV1xmCXaTALhHSq0o7itRR7f3PR8XFayXo" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Blue Sapphires</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$200-5000+</p>
        </div>
      </div>
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden">
          <img alt="Handloom &amp; Batik"
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuANJvvEnigQmOfeO0xHevICcViifhLrYfTh7Af7cHIGycevI2B1MzCvXC3giA-9jqz0PenjdBlaE3T5jhyJY9jrPWoE-iEnn1JNs4qSn7_SRSbrtNAOsNfEaWqzKDfdl8m4hm1iiJM0nE_9LAv2FRDjs2pNAk7FJhlCKYMuKOWse-7WAdBuPWCEhSGb-PxRkfZu9hycEtESwmopTuPCQJbj_7vERPwpwxp8H47o0UBwd-4hIJcYnDjsMjvzBNWATP0D2A7uJli9phY" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Handloom &amp; Batik</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$25-150</p>
        </div>
      </div>
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden">
          <img alt="Ceylon Spices" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwMV0u1DIhP3-varnR_5ClzybJVtvkvf3xq4At8VLN8Hfijvez7JNOeHNXiEglFdtj_LhTggM3IV5_YYAiykMfyQMZRIOC1SeecJNgcd3Xs_DdxwW8sUEs7zQYFbcdozrVlaEewoLekFWnakf5VghEYm2pRdTountSICkheQ0pinPglocA4dSc2vkRM6B4iu4q0JpDT_e64_2_tglwk9b4K3orJhXkTfwQHS2Niqrd9HIbXCBLfFDcVXTwgh0QAx5K8YlH0L-1kbQ" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Ceylon Spices</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$4-20</p>
        </div>
      </div>
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden">
          <img alt="Raksha Masks" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzGvjLfhmDjXl5rHJwY28dK51ZaYb_qFbn71IAdpVnhfYq-M1i7_D-VV5IVSuJGt3FV-_rRYmICuCovvLQoJtK7Wtg7KBrm05U7kBAi5ZSrRFotb5En3VXGXrPYqBW9yYNcWnCduB0ptwOAb85Cv3JTPLf7WeIlQxmaLrKpNUuXWiTngtKYnjbBkk6sMAfollNhwsNpUMWGcxAJ_Al5rTR0orL9VL6D7mJtYKL87O3VZi_IBq2KUZwS4K5tbYW--OlhDHrboYAs5k" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Raksha Masks</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$10-100</p>
        </div>
      </div>
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden">
          <img alt="Ayurvedic Products" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr_NQwQHmUAzulaXnQajCez-Yo5aawBMLTAYZu1yCXMwsu8AU9WNVhSXoysZtgihn92hxx-qlH2CoZvIr7rb6ipuKY8iftdfk7hvwUJY_anwfjotWqkjHGKlNyB2XXT8BPJY8LLRokglv09SH-Sxkjc538j184W4Hkl9h5WZOc-6-P0wzto1pNQu9D7RS6lKm902lsoQH88xSEEQg-N09JqzefTElDciuQgRV-AwqPAT5ErHgMdS0R3zNNT_arNOMtwirTlH3Jpyg" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Ayurvedic Products</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$5-60</p>
        </div>
      </div>
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden">
          <img alt="Wooden Elephants" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3nU8_dCQ5k-Yb6oUsBMnVV_WL49_Kia0l9MjYdYWmwBURVWZFcCCUWUCvqnRCvT81FilA2eIr2bpX4F19Zzbttc6MbAuapp6jopj9IrjEUQHBxnUm83EV23jGTD3werkUDGdI3tHJ8C6i6wdPSCtanuMhciZU2OsOULWawoSlznKbiqWKYS1zT9os05hO8ebGfNBTP8S8Rrn6qd3DaC347701ihMo3LWbN-mjJ0D6zslLHIbeR-MHFzeMA2SPi78rDYW8AI1-PuQ" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Wooden Elephants</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$5-80</p>
        </div>
      </div>
      <div
        class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition border border-slate-200 dark:border-slate-700">
        <div class="h-40 overflow-hidden">
          <img alt="Lacquerware" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfSBGm3cUmjUC4bOcd90OjOfSKzu4Q2yIveQG1hLibeXAKW4dlUZ61nS6Yx9Hzxmipo7x3kjbwg5vCine8JmO8-pdbAFlBFMt5D-Hbh6eHbsV7J4QvxClAqUFulBd0vEWQKL6w5GkpL-Zo8AY_eXC3WwqNvaPPsarCMTlDQka7FX-EBs5SthIRlCsJRPkr-zE1GTDe8obuY1zWub2geDLyT5raqXg3X2UAy-u7bzv1kYzanXeqHy6vWsF4k1-ly6oViUHLqwc4Ytc" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-slate-800 dark:text-white mb-1">Lacquerware</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">$12-100</p>
        </div>
      </div>
    </div>
  </section>
</template>
