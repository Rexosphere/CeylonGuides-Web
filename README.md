# CeylonGuides - Tourist Safety Platform

> Real-time scam alerts, emergency tools, and AI travel assistant for safer travel in Sri Lanka

## 🎯 Problem We Solve

Tourists in Sri Lanka face scams, language barriers, and unreliable information about transport fares, safe dining, and emergencies. Traditional travel apps lack local context and real-time community insights, leaving travelers vulnerable.

## ✨ Key Features

- 🚨 **Community Scam Alerts** - Map-based reports with verification and severity ratings
- 🆘 **Emergency Hub** - Tap-to-call emergency services, embassies, and quick phrases
- 🍽️ **Clean Dining** - Restaurant reviews with hygiene ratings and dietary filters (Halal, Vegan)
- 🤖 **AI Travel Assistant** - Context-aware chatbot with deep-linking to relevant pages
- 📖 **Phrasebook** - Sinhala/Tamil translations with pronunciation and etiquette tips
- 🛺 **Fair Fare Calculator** - Know the right price for tuk-tuks and taxis

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend running at `http://localhost:8787` (see `CeylonGuides-Backend`)

### Environment Setup
```bash
cp .env.example .env
```

Required vars:
```
NUXT_PUBLIC_API_BASE=http://localhost:8787
```

### Run Locally
```bash
npm install
npm run dev
```

App will be at `http://localhost:3000`

---

## 📁 Project Structure

```
app/
├── pages/           # Routes (scam-alerts, phrasebook, clean-dining, etc)
├── components/      # Reusable UI (AIChatWidget, SearchBar, Header)
├── composables/     # useApi.ts - Typed API client layer
└── layouts/         # default.vue with global components
```

---

## 🎬 Demo Flow (3 min)

| Time | Page | Action |
|------|------|--------|
| 0:00 | **Scam Alerts** | Filter by category → View map → Report scam → Confirm existing |
| 1:00 | **Clean Dining** | Search restaurants → Filter by Halal → Submit review |
| 1:45 | **AI Chat** | Ask "What scams should I avoid?" → Follow deep-link to Emergency |
| 2:15 | **Phrasebook** | Search phrases → Switch language → View etiquette tips |
| 2:45 | **Emergency** | Show tap-to-call → Quick phrases |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Nuxt 4 (Vue 3) |
| **Styling** | Tailwind CSS |
| **Backend** | Cloudflare Workers + Hono + D1 |
| **AI** | Rule-based + OpenAI-ready |

---

## 📡 API Docs

Backend OpenAPI spec: `../CeylonGuides-Backend/openapi.yaml`

Full endpoint list at: `http://localhost:8787/`

---

## 🚀 Deployment

```bash
npm run build
# Deploy to Cloudflare Pages
```

---

Built for **Dev{thon} 3.0** by Rexosphere
