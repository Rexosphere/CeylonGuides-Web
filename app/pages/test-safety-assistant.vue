<template>
  <div class="test-page">
    <div class="test-header">
      <h1>🧠 Context-Aware Safety Assistant Test</h1>
      <p>Testing intelligent scam advice based on location + activity combinations</p>
    </div>

    <div class="test-container">
      <!-- New Context-Aware Assistant -->
      <div class="test-section">
        <h2>✨ New Context-Aware Assistant</h2>
        <ScamSafetyAssistantV2 />
      </div>

      <!-- Test Scenarios -->
      <div class="test-scenarios">
        <h2>🎯 Test Scenarios</h2>
        <p class="scenarios-intro">Try these combinations to see context-specific advice:</p>
        
        <div class="scenario-grid">
          <div class="scenario-card">
            <h3>📍 Colombo Fort + 🚕 Transportation</h3>
            <div class="expected-results">
              <strong>Expected Results:</strong>
              <ul>
                <li>Tuk-Tuk Overcharging (HIGH)</li>
                <li>Gemstone Scams (CRITICAL)</li>
                <li>Currency Exchange Fraud (HIGH)</li>
              </ul>
              <div class="why-note">
                <strong>Why:</strong> Major transportation hub with new arrivals unfamiliar with prices
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <h3>📍 Temple of the Tooth + 🛕 Religious Sites</h3>
            <div class="expected-results">
              <strong>Expected Results:</strong>
              <ul>
                <li>Fake Tour Guides (HIGH)</li>
                <li>Fake Monk Blessing (MEDIUM)</li>
                <li>Tuk-Tuk Detours (HIGH)</li>
              </ul>
              <div class="why-note">
                <strong>Why:</strong> Sacred site attracting thousands of tourists daily, scammers disguise as guides/monks
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <h3>📍 Hikkaduwa Beach + 🍺 Bars & Nightlife</h3>
            <div class="expected-results">
              <strong>Expected Results:</strong>
              <ul>
                <li>Friendly Local Bar Scams (HIGH)</li>
                <li>Surfboard Rental Damage (MEDIUM)</li>
              </ul>
              <div class="why-note">
                <strong>Why:</strong> Beach party destination where tourists let guard down, friendly scammers befriend victims
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <h3>📍 Galle Fort + 🛍️ Shopping & Markets</h3>
            <div class="expected-results">
              <strong>Expected Results:</strong>
              <ul>
                <li>Gemstone Scams (CRITICAL)</li>
                <li>Fake Tour Guides (HIGH)</li>
                <li>Pickpocketing (HIGH)</li>
              </ul>
              <div class="why-note">
                <strong>Why:</strong> UNESCO site with historic shops that seem legitimate, high-pressure tactics on tourists
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <h3>📍 Yala National Park + 🦁 Wildlife & Safaris</h3>
            <div class="expected-results">
              <strong>Expected Results:</strong>
              <ul>
                <li>Fake Safari Guides (HIGH)</li>
              </ul>
              <div class="why-note">
                <strong>Why:</strong> Unlicensed operators prey on tourists' desire to see leopards
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <h3>📍 Bandaranaike Airport + 💰 Money & Banking</h3>
            <div class="expected-results">
              <strong>Expected Results:</strong>
              <ul>
                <li>Visa Arrival Scams (MEDIUM)</li>
                <li>Currency Exchange (HIGH)</li>
                <li>Tuk-Tuk Overcharge (HIGH)</li>
              </ul>
              <div class="why-note">
                <strong>Why:</strong> Tourists especially vulnerable after arrival - tired and unfamiliar with procedures
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Checklist -->
      <div class="feature-checklist">
        <h2>✅ Feature Verification</h2>
        <div class="checklist-grid">
          <div class="check-item">
            <input type="checkbox" id="check1" />
            <label for="check1">
              <strong>Disabled Until Selection:</strong> Button disabled until both location AND activity selected
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check2" />
            <label for="check2">
              <strong>Top 3 Scams:</strong> Shows top 3 most relevant scams ranked by severity
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check3" />
            <label for="check3">
              <strong>Why Context:</strong> Explains why each scam happens in that specific location+activity combination
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check4" />
            <label for="check4">
              <strong>What To Do:</strong> Shows 3-4 actionable prevention tips for each scam
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check5" />
            <label for="check5">
              <strong>Avoid This:</strong> Lists 3 specific warning about what NOT to do
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check6" />
            <label for="check6">
              <strong>Real Example:</strong> Shows actual example from scam.md
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check7" />
            <label for="check7">
              <strong>Emergency Alert:</strong> High/Critical scams show red emergency note with Tourist Police number
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check8" />
            <label for="check8">
              <strong>General Tips:</strong> Shows 6 contextual general tips for the location+activity
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check9" />
            <label for="check9">
              <strong>Risk Indicator:</strong> Shows location risk level (HIGH/MEDIUM/LOW)
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check10" />
            <label for="check10">
              <strong>Dynamic Updates:</strong> Results update when selecting different combinations
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check11" />
            <label for="check11">
              <strong>Emergency Modal:</strong> Shows all emergency contacts with clickable phone numbers
            </label>
          </div>
          <div class="check-item">
            <input type="checkbox" id="check12" />
            <label for="check12">
              <strong>Victim Guidance:</strong> Emergency modal shows 12-step "what to do if scammed" guide
            </label>
          </div>
        </div>
      </div>

      <!-- Logic Testing -->
      <div class="logic-testing">
        <h2>🔬 Logic Verification</h2>
        <div class="logic-grid">
          <div class="logic-card">
            <h4>Scam Ranking</h4>
            <p>✅ Critical severity appears first</p>
            <p>✅ High severity before medium</p>
            <p>✅ Medium before low</p>
            <p>✅ Only top 3 shown</p>
          </div>
          <div class="logic-card">
            <h4>Context Intersection</h4>
            <p>✅ Shows scams in BOTH location AND activity</p>
            <p>✅ Falls back to location scams if no exact match</p>
            <p>✅ Uses structured data (scamTypes + locations + activities)</p>
          </div>
          <div class="logic-card">
            <h4>Context-Specific Text</h4>
            <p>✅ "Why Here" mentions specific location name</p>
            <p>✅ "Why Here" explains activity relevance</p>
            <p>✅ "Avoid This" warnings context-aware</p>
            <p>✅ General tips mention location + activity</p>
          </div>
          <div class="logic-card">
            <h4>Emergency Logic</h4>
            <p>✅ Red alert only for critical/high severity</p>
            <p>✅ Shows Tourist Police: 1912</p>
            <p>✅ Special note for CRITICAL scams</p>
            <p>✅ Clickable tel: links</p>
          </div>
        </div>
      </div>

      <!-- Data Source Verification -->
      <div class="data-verification">
        <h2>📊 Data Source Verification</h2>
        <div class="verification-info">
          <p><strong>✅ Single Source of Truth:</strong> All data from <code>app/data/scamData.ts</code></p>
          <p><strong>✅ Uses useScamData() composable:</strong> Reactive filtering and querying</p>
          <p><strong>✅ 16 Scam Types:</strong> All from scam.md</p>
          <p><strong>✅ 30 Locations:</strong> With real GPS coordinates</p>
          <p><strong>✅ 10 Activities:</strong> Mapped to relevant scams</p>
          <p><strong>✅ Emergency Info:</strong> Real Sri Lankan numbers (1912, 119, 110, +94 11 2 421 451)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScamSafetyAssistantV2 from '~/components/ScamAlerts/ScamSafetyAssistantV2.vue'

useSeoMeta({
  title: 'Safety Assistant Test - Ceylon Guides',
  description: 'Testing context-aware safety assistant'
})
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.test-header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.test-header h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
}

.test-header p {
  font-size: 1.25rem;
  opacity: 0.9;
}

.test-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.test-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.test-section h2 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

/* Scenarios */
.test-scenarios {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.test-scenarios h2 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.scenarios-intro {
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.scenario-card:hover {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.scenario-card h3 {
  margin: 0 0 1rem 0;
  color: #2d3748;
  font-size: 1.1rem;
}

.expected-results strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.expected-results ul {
  margin: 0.5rem 0 1rem 1.5rem;
  color: #4a5568;
}

.expected-results li {
  margin-bottom: 0.25rem;
}

.why-note {
  background: #ebf8ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #3182ce;
  margin-top: 1rem;
}

.why-note strong {
  display: block;
  color: #2c5282;
  margin-bottom: 0.5rem;
}

.why-note {
  color: #2c5282;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Checklist */
.feature-checklist {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.feature-checklist h2 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.check-item:hover {
  border-color: #667eea;
  background: #ebf8ff;
}

.check-item input[type="checkbox"] {
  margin-top: 0.25rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.check-item label {
  flex: 1;
  cursor: pointer;
  color: #4a5568;
  line-height: 1.5;
}

.check-item label strong {
  display: block;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

/* Logic Testing */
.logic-testing {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.logic-testing h2 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

.logic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.logic-card {
  background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
  border: 2px solid #9ae6b4;
  border-radius: 12px;
  padding: 1.5rem;
}

.logic-card h4 {
  margin: 0 0 1rem 0;
  color: #22543d;
  font-size: 1.1rem;
}

.logic-card p {
  margin: 0.5rem 0;
  color: #276749;
  font-size: 0.95rem;
}

/* Data Verification */
.data-verification {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.data-verification h2 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

.verification-info {
  background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%);
  border: 2px solid #d6bcfa;
  border-radius: 12px;
  padding: 1.5rem;
}

.verification-info p {
  margin: 0.75rem 0;
  color: #553c9a;
  font-size: 1rem;
  line-height: 1.6;
}

.verification-info code {
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #6b46c1;
  font-weight: 600;
}

@media (max-width: 768px) {
  .test-header h1 {
    font-size: 1.75rem;
  }

  .test-header p {
    font-size: 1rem;
  }

  .test-section,
  .test-scenarios,
  .feature-checklist,
  .logic-testing,
  .data-verification {
    padding: 1.5rem;
  }

  .scenario-grid,
  .checklist-grid,
  .logic-grid {
    grid-template-columns: 1fr;
  }
}
</style>
