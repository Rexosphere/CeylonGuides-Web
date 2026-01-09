/**
 * Culture Guide PDF Download Utility
 * 
 * Generates a print-friendly HTML document from culturePageData.ts
 * and opens print dialog for PDF export.
 */

import {
    cultureHero,
    templeGuidelines,
    dressCodeRules,
    photoRules,
    quickGuidelines,
    festivals,
    greetings,
    socialCustoms
} from '~/data/culturePageData'

/**
 * Generate and download a PDF of the Sri Lanka Cultural Etiquette Guide
 */
export function downloadCultureGuide(): void {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
        alert('Please allow popups to download the PDF guide.')
        return
    }

    const html = generatePrintableHTML()
    printWindow.document.write(html)
    printWindow.document.close()

    // Wait for content to load then trigger print
    printWindow.onload = () => {
        setTimeout(() => {
            printWindow.print()
        }, 500)
    }
}

/**
 * Generate print-friendly HTML content
 */
function generatePrintableHTML(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sri Lanka Cultural Etiquette Guide - CeylonGuide</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #333;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      font-size: 24pt;
      color: #0f766e;
      margin-bottom: 8px;
      border-bottom: 3px solid #0f766e;
      padding-bottom: 8px;
    }
    
    h2 {
      font-size: 14pt;
      color: #0f766e;
      margin: 20px 0 10px 0;
      page-break-after: avoid;
    }
    
    h3 {
      font-size: 12pt;
      color: #444;
      margin: 12px 0 6px 0;
    }
    
    p {
      margin-bottom: 8px;
    }
    
    .subtitle {
      color: #666;
      font-size: 12pt;
      margin-bottom: 20px;
    }
    
    .section {
      margin-bottom: 24px;
      page-break-inside: avoid;
    }
    
    .two-column {
      display: flex;
      gap: 20px;
    }
    
    .column {
      flex: 1;
    }
    
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    
    .card-do {
      border-color: #10b981;
      background: #f0fdf4;
    }
    
    .card-dont {
      border-color: #ef4444;
      background: #fef2f2;
    }
    
    .card-info {
      border-color: #f59e0b;
      background: #fffbeb;
    }
    
    .card-title {
      font-weight: bold;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .badge {
      font-size: 9pt;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .badge-do { background: #10b981; color: white; }
    .badge-dont { background: #ef4444; color: white; }
    .badge-info { background: #f59e0b; color: white; }
    
    ul {
      margin-left: 16px;
      margin-bottom: 8px;
    }
    
    li {
      margin-bottom: 4px;
    }
    
    .check { color: #10b981; }
    .cross { color: #ef4444; }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .festival-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px;
      background: #fafafa;
    }
    
    .festival-month {
      font-size: 10pt;
      font-weight: bold;
      color: #0f766e;
      margin-bottom: 4px;
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 1px solid #ddd;
      font-size: 9pt;
      color: #666;
      text-align: center;
    }
    
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <h1>${cultureHero.title}</h1>
  <p class="subtitle">${cultureHero.description}</p>

  <!-- Quick Guidelines -->
  <div class="section">
    <h2>✅ Quick Do's & Don'ts</h2>
    <div class="grid">
      ${quickGuidelines.map(g => `
        <div class="card card-${g.type}">
          <div class="card-title">
            <span class="badge badge-${g.type}">${g.type === 'do' ? 'DO' : g.type === 'dont' ? "DON'T" : 'INFO'}</span>
            ${g.title}
          </div>
          <ul>
            ${g.bullets.slice(0, 3).map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Temple Dress Code -->
  <div class="section">
    <h2>👗 Temple Dress Code</h2>
    <div class="two-column">
      <div class="column">
        <h3 class="check">✓ Appropriate</h3>
        <ul>
          ${dressCodeRules.filter(r => r.isAllowed).map(r => `<li><strong>${r.label}</strong> — ${r.description}</li>`).join('')}
        </ul>
      </div>
      <div class="column">
        <h3 class="cross">✗ Inappropriate</h3>
        <ul>
          ${dressCodeRules.filter(r => !r.isAllowed).map(r => `<li><strong>${r.label}</strong> — ${r.description}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>

  <!-- Photography Rules -->
  <div class="section">
    <h2>📷 Photography Guidelines</h2>
    <ul>
      ${photoRules.map(r => `
        <li>
          <strong>${r.severity === 'high' ? '⛔' : '⚠️'} ${r.label}</strong> — ${r.description}
        </li>
      `).join('')}
    </ul>
  </div>

  <!-- Useful Phrases -->
  <div class="section">
    <h2>🗣️ Useful Phrases</h2>
    <div class="grid">
      ${greetings.slice(0, 6).map(g => `
        <div>
          <strong>${g.phrase}</strong> (${g.language})<br>
          <em>${g.meaning}</em>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Social Customs -->
  <div class="section">
    <h2>🤝 Important Social Customs</h2>
    <ul>
      ${socialCustoms.filter(c => c.importance === 'critical').map(c => `
        <li><strong>${c.title}</strong> — ${c.description}</li>
      `).join('')}
    </ul>
  </div>

  <!-- Festival Calendar -->
  <div class="section">
    <h2>🎉 Major Festivals</h2>
    ${festivals.map(f => `
      <div class="festival-card">
        <div class="festival-month">📅 ${f.monthLabel}${f.dateRange ? ` • ${f.dateRange}` : ''}</div>
        <h3>${f.title}</h3>
        <p>${f.description.substring(0, 200)}...</p>
        <p><strong>Tips:</strong> ${f.etiquetteTips.slice(0, 2).join(' • ')}</p>
      </div>
    `).join('')}
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>Generated by CeylonGuide • ${new Date().toLocaleDateString()}</p>
    <p>Visit ceylonguide.com for the complete interactive guide</p>
  </div>
</body>
</html>
  `.trim()
}

export default downloadCultureGuide
