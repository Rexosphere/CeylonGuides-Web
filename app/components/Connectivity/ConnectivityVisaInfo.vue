<template>
    <div
        class="mb-12 bg-secondary/5 dark:bg-blue-900/10 border border-secondary/20 dark:border-blue-800/30 rounded-xl p-6">
        <div class="flex items-center gap-3 mb-4">
            <div class="bg-secondary/10 rounded p-1.5">
                <span class="material-icons text-secondary text-lg">badge</span>
            </div>
            <h3 class="font-bold text-primary dark:text-white text-sm">
                Digital Nomad Visa
                <span
                    class="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded-full ml-2 font-medium">Available</span>
            </h3>
        </div>
        <p class="text-xs text-text-muted mb-4">
            Valid for 1 year with possibility of renewal. Cost: $500 (covers spouse and dependents)
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            <!-- Requirements -->
            <div>
                <h4 class="font-bold text-text-main mb-2 text-[10px] uppercase tracking-wide">Requirements:</h4>
                <ul class="space-y-2">
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-secondary text-xs">check</span>
                        <span class="text-text-muted">Work remotely for clients/employer outside Sri Lanka</span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-secondary text-xs">check</span>
                        <span class="text-text-muted">Minimum $2,000/month income channeled through Sri Lankan
                            bank</span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-secondary text-xs">check</span>
                        <span class="text-text-muted">Valid passport with 6+ months validity</span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-secondary text-xs">check</span>
                        <span class="text-text-muted">Travel Insurance valid for entire stay</span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-secondary text-xs">check</span>
                        <span class="text-text-muted">Proof of remote work (contract/freelance agreements)</span>
                    </li>
                </ul>
            </div>

            <!-- Key Details -->
            <div>
                <h4 class="font-bold text-text-main mb-2 text-[10px] uppercase tracking-wide">Key Details:</h4>
                <ul class="space-y-2">
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-text-muted text-xs">payments</span>
                        <span class="text-text-muted">Min. Income: $2,000/month</span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-text-muted text-xs">calendar_today</span>
                        <span class="text-text-muted">Validity: 1 year (renewable)</span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <span class="material-icons text-text-muted text-xs">family_restroom</span>
                        <span class="text-text-muted">Family: Included</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
