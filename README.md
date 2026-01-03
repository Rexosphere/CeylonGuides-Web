# 🇱🇰 CeylonGuide - Your AI Travel Companion for Sri Lanka

> **Problem**: Tourists in Sri Lanka face language barriers, scams, unreliable transport fares, and difficulty finding safe food options. Traditional travel apps lack local context and real-time community insights.

> **Solution**: CeylonGuide is an all-in-one travel companion powered by AI and crowd-sourced data, helping tourists navigate Sri Lanka safely, communicate locally, and discover authentic experiences.

> **Why Unique**: Unlike generic travel apps, CeylonGuide combines real-time scam alerts, fair fare calculators, hygiene-rated dining, and an AI assistant that understands Sri Lankan culture.

---

## ✨ Features

### Core Features
- 🗣️ **Phrasebook** - Learn Sinhala & Tamil with pronunciation
- ⚠️ **Scam Alerts** - Real-time crowd-sourced warnings with maps
- 🛺 **Fair Fare Calculator** - Know the right price for tuk-tuks & taxis
- 🍛 **Clean Dining** - Hygiene-rated restaurants with dietary filters
- 🌦️ **Weather & Safety** - Live weather with OpenWeatherMap integration
- 🚨 **Emergency Contacts** - One-tap access to police, hospitals, embassies

### Signature Features
- 🤖 **AI Travel Assistant** - Context-aware chatbot for Sri Lanka travel
- 📍 **Interactive Scam Map** - Visual hotspots with severity indicators
- ⭐ **Community Reviews** - Rate restaurants and facilities
- 🔍 **Global Search** - Find anything across all content

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Nuxt 4, Vue 3, TailwindCSS |
| **Backend** | Cloudflare Workers, Hono, D1 (SQLite) |
| **AI** | Rule-based + OpenAI ready |
| **Weather** | OpenWeatherMap API |
| **Hosting** | Cloudflare Pages + Workers |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│               Nuxt 4 + Vue 3 + TailwindCSS                  │
│                  (Cloudflare Pages)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
┌─────────────────────▼───────────────────────────────────────┐
│                        BACKEND                               │
│              Cloudflare Workers + Hono                       │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  /api/phrases   /api/scams   /api/transport         │   │
│   │  /api/dining    /api/safety  /api/emergency         │   │
│   │  /api/facilities /api/ai     /api/search            │   │
│   │  /api/accommodations /api/destinations /api/activities │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │ SQL
┌─────────────────────▼───────────────────────────────────────┐
│                    DATABASE                                  │
│               Cloudflare D1 (SQLite)                        │
│   users, phrases, scam_alerts, restaurants, safety_alerts   │
│   transport_routes, facilities, destinations, activities    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- npm

### 1. Clone & Install

```bash
# Frontend
cd CeylonGuides-Web
npm install
cp .env.example .env

# Backend
cd ../CeylonGuides-Backend
npm install
```

### 2. Setup Database

```bash
cd CeylonGuides-Backend

# Create local D1 database
npx wrangler d1 execute ceylonguide-db --file=./src/db/schema.sql

# Seed sample data
npx wrangler d1 execute ceylonguide-db --file=./src/db/seed.sql
```

### 3. Start Development

```bash
# Terminal 1: Backend (http://localhost:8787)
cd CeylonGuides-Backend
npm run dev

# Terminal 2: Frontend (http://localhost:3000)
cd CeylonGuides-Web
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` from `.env.example`:

```env
# Backend API URL
NUXT_PUBLIC_API_BASE=http://localhost:8787
```

---

## 🌐 Deployment

### Frontend (Cloudflare Pages)

```bash
cd CeylonGuides-Web
npm run build
# Deploy via Cloudflare Pages dashboard or wrangler
```

### Backend (Cloudflare Workers)

```bash
cd CeylonGuides-Backend

# Apply migrations to production D1
npx wrangler d1 execute ceylonguide-db --remote --file=./src/db/schema.sql
npx wrangler d1 execute ceylonguide-db --remote --file=./src/db/seed.sql

# Deploy worker
npm run deploy
```

---

## 🎬 Demo Script (5 min)

| Time | Page | Action |
|------|------|--------|
| 0:00 | Homepage | Show hero, explain problem/solution |
| 0:30 | Scam Alerts | View map, filter by category, report scam |
| 1:30 | Phrasebook | Browse phrases, play pronunciation |
| 2:15 | Transport | Calculate tuk-tuk fare |
| 3:00 | Clean Dining | Filter by Halal, leave review |
| 3:45 | Emergency | Show one-tap dialing |
| 4:15 | AI Chat | Ask "How do I say hello in Sinhala?" |
| 4:45 | Wrap-up | Summarize unique value proposition |

---

## 📸 Screenshots

> Add screenshots here

| Homepage | Scam Alerts | AI Chat |
|----------|-------------|---------|
| ![Homepage](screenshots/home.png) | ![Scams](screenshots/scams.png) | ![Chat](screenshots/chat.png) |

---

## 📚 API Documentation

View the API at: `http://localhost:8787/`

Full OpenAPI spec: [openapi.yaml](../CeylonGuides-Backend/openapi.yaml)

---

## 👥 Team

*Add team members here*

---

## 📄 License

MIT
