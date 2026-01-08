<template>
  <section class="py-16 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Trusted ATMs & Exchange</h2>
          <p class="text-text-muted dark:text-gray-400 mb-8 leading-relaxed">
            Avoid unauthorized money changers. Stick to registered banks and official ATMs for the best rates and
            safety.
          </p>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <span class="material-icons">account_balance</span>
              </div>
              <div>
                <h3 class="font-bold text-primary dark:text-white mb-1">Trusted Banks</h3>
                <p class="text-xs text-text-muted dark:text-gray-400 leading-relaxed">
                  Commercial Bank, Sampath Bank, Hatton National Bank (HNB), Bank of Ceylon (BOC)
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <span class="material-icons">payments</span>
              </div>
              <div>
                <h3 class="font-bold text-primary dark:text-white mb-1">ATM Limits & Fees</h3>
                <p class="text-xs text-text-muted dark:text-gray-400 leading-relaxed">
                  ATMs typically charge up to Rs1,000 per withdrawal. Some BOC machines may be fee-free. Your home bank
                  may also charge currency conversion fees.
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mt-8 mb-6 text-xs text-text-muted">
            <strong>2</strong> ATMs found in view
          </div>
          <button
            class="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
            <span class="material-icons">near_me</span> Find Nearest ATM
          </button>
        </div>
        <div
          class="relative h-[500px] rounded-2xl overflow-hidden shadow-card border border-gray-200 dark:border-gray-700 bg-gray-200 group">
          <img alt="ATM Map" class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOR5YxA3cS9ZWn9ykUUc77dEs4YeAKXIyGs1fQWvnAqgPNnRAWtx2G3RAz_bVoNzJdcmMXXu6Tb_kjgfQGq9N8y2MuNlGgHD9MrT5_DP0nhVmGmgvmRSSrPvh_2jgVKLmsLUP-aVaLcc4JINVlWjOdA5t1ysodoVwh5ik98n4_-ZOcUhrqGjm54BE4qyyIgmP-vdMJdSHZfnK-D9oo3wb34oAa3CRfriDOnHxdmGLFNsz7CtfXuDBPh71UCbS7DeSq44Oe2iUl9UI" />
          <div class="absolute top-4 right-4 flex flex-col gap-2">
            <button class="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 text-gray-700"><span
                class="material-icons">add</span></button>
            <button class="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 text-gray-700"><span
                class="material-icons">remove</span></button>
          </div>
          <div
            class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg text-xs font-bold text-primary flex items-center gap-2 cursor-pointer hover:bg-gray-50">
            <span class="material-icons text-sm">my_location</span> Use my location
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
