<template>
  <div class="flex flex-col bg-background-light dark:bg-background-dark font-display text-charcoal dark:text-white min-h-screen">
    <Header variant="solid" />
    
    <main class="flex-1 py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="mb-12">
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy & Terms</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">Last updated: {{ new Date().toLocaleDateString() }}</p>
        </div>

        <!-- Privacy Policy Section -->
        <section class="mb-16 bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/10">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <span class="material-symbols-outlined text-accent">shield</span>
            Privacy Policy
          </h2>
          
          <div class="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Information We Collect</h3>
              <p class="mb-3">CeylonWiki collects minimal information necessary to provide our services:</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>User-submitted scam reports and safety alerts</li>
                <li>Location data (only when you explicitly enable "Near Me" features)</li>
                <li>Basic analytics to improve our service</li>
                <li>Authentication information if you create an account</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">How We Use Your Information</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li>To display relevant scam alerts and safety information</li>
                <li>To improve our database and recommendations</li>
                <li>To verify and moderate user-submitted content</li>
                <li>To send important safety updates (if you opt-in)</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Location Data</h3>
              <p>When you use the "Near Me" feature:</p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Your location is processed <strong>locally in your browser</strong></li>
                <li>We <strong>never store</strong> your precise GPS coordinates</li>
                <li>Location data is only used to filter nearby alerts</li>
                <li>You can disable this feature at any time</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Data Security</h3>
              <p>We implement industry-standard security measures to protect your data. All communication with our servers is encrypted using HTTPS.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Third-Party Services</h3>
              <p>We may use third-party services for:</p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Maps and location services</li>
                <li>Analytics (anonymized)</li>
                <li>Content delivery networks (CDN)</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Your Rights</h3>
              <p>You have the right to:</p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of data collection</li>
                <li>Request data portability</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Terms of Service Section -->
        <section class="mb-16 bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/10">
          <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
            <span class="material-symbols-outlined text-accent">gavel</span>
            Terms of Service
          </h2>
          
          <div class="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Acceptance of Terms</h3>
              <p>By accessing and using CeylonWiki, you accept and agree to be bound by these terms and conditions.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">User-Generated Content</h3>
              <p>When submitting scam reports or reviews:</p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Content must be truthful and based on your personal experience</li>
                <li>No false, misleading, or defamatory information</li>
                <li>No personal information about others</li>
                <li>We reserve the right to moderate and remove inappropriate content</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Disclaimer</h3>
              <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded">
                <p class="font-medium">CeylonWiki provides information for educational and safety purposes. While we strive for accuracy:</p>
                <ul class="list-disc pl-6 space-y-1 mt-2">
                  <li>Information is community-sourced and may not always be current</li>
                  <li>We cannot guarantee the accuracy of all reports</li>
                  <li>Use information at your own discretion</li>
                  <li>Always exercise personal judgment and caution</li>
                  <li>We are not liable for any losses or damages</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Prohibited Uses</h3>
              <p>You may not use CeylonWiki to:</p>
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Post false or malicious reports</li>
                <li>Harass or defame individuals or businesses</li>
                <li>Violate any local laws or regulations</li>
                <li>Attempt to compromise the security of our services</li>
                <li>Use automated systems to scrape or abuse our platform</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Intellectual Property</h3>
              <p>All content, design, and functionality of CeylonWiki is owned by us or our licensors and is protected by copyright and trademark laws.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-charcoal dark:text-white">Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.</p>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-8 text-white">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
            <span class="material-symbols-outlined">mail</span>
            Questions or Concerns?
          </h2>
          <p class="mb-4">If you have any questions about our privacy policy or terms of service, please contact us:</p>
          <NuxtLink 
            to="/contact" 
            class="inline-flex items-center gap-2 px-6 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span class="material-symbols-outlined">contact_support</span>
            Contact Us
          </NuxtLink>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy & Terms of Service - CeylonWiki',
  description: 'Learn about how CeylonWiki protects your privacy and our terms of service for using the platform.',
  ogTitle: 'Privacy Policy & Terms - CeylonWiki',
  ogDescription: 'Your privacy matters. Read about our data protection practices and terms of service.',
})
</script>
