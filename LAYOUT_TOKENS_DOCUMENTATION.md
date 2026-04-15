# CeylonGuides Layout Token System Documentation

## Overview

The layout system is built on semantic spacing, responsive containers, and typography hierarchy to create visual cohesion across the platform. This document defines the standardized patterns for margins, padding, widths, and typography used throughout CeylonGuides.

---

## 1. Container System

### Standard Container Pattern

All page content uses the **max-w-7xl** standardized pattern:

```vue
<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- content -->
</div>
```

**Or use the PageContainer component:**

```vue
<PageContainer>
  <!-- content -->
</PageContainer>
```

### Breakpoints & Padding

| Breakpoint | Width | Horizontal Padding | Context |
|-----------|-------|-------------------|---------|
| Mobile (default) | 100% | `px-4` (1rem) | Screens < 640px |
| Tablet (sm:) | 100% | `sm:px-6` (1.5rem) | Screens 640px - 1024px |
| Desktop (lg:) | max-w-7xl (80rem) | `lg:px-8` (2rem) | Screens > 1024px |

**Key behaviors:**
- Mobile-first responsive design
- Consistent 1rem → 1.5rem → 2rem padding progression
- Max-width applied only on desktop (prevents awkward spacing on tablets)
- All containers are full-width until desktop breakpoint

---

## 2. Spacing System

### Vertical Spacing (Section Margins)

Sections use consistent vertical rhythm:

| Utility | Size | Usage |
|---------|------|-------|
| `py-12` | 3rem | Compact sections, subsections |
| `py-16` | 4rem | Standard section spacing |
| `py-20` | 5rem | Hero sections, major content blocks |
| `py-24` | 6rem | Large feature sections |
| `md:py-24` | Responsive | Sections that expand on tablet |

**Pattern:**
```vue
<section class="py-16 md:py-20">
  <PageContainer>
    <!-- content -->
  </PageContainer>
</section>
```

### Horizontal Spacing (Component Gaps)

| Utility | Size | Usage |
|---------|------|-------|
| `gap-2` | 0.5rem | Tight icon-text pairs |
| `gap-3` | 0.75rem | Badge groups, small lists |
| `gap-4` | 1rem | Standard component spacing |
| `gap-6` | 1.5rem | Card grids, feature sections |
| `gap-8` | 2rem | Major section grids |

---

## 3. Typography Hierarchy

### Font Families

| Font | Usage | Files |
|------|-------|-------|
| **Fraunces** (serif, bold) | Main headings, h1-h2 | Primary accent font |
| **Manrope** (sans-serif, regular) | Body text, paragraphs | Default readable font |
| **Noto Serif Sinhala** | Cultural content, Sinhala text | Cultural localization |
| **Inter** (sans-serif, display) | Secondary headings, UI | Display font fallback |

### Text Size Scale

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem | 1rem | Labels, badges |
| `text-sm` | 0.875rem | 1.25rem | Metadata, captions |
| `text-base` | 1rem | 1.5rem | Body text (default) |
| `text-lg` | 1.125rem | 1.75rem | Intro paragraphs |
| `text-xl` | 1.25rem | 1.75rem | Subheadings |
| `text-2xl` | 1.5rem | 2rem | Section titles |
| `text-3xl` | 1.875rem | 2.25rem | Subsection headings |
| `text-4xl` | 2.25rem | 2.5rem | Page titles |
| `text-5xl` | 3rem | 3.5rem | Hero titles |
| `text-6xl` | 3.75rem | 4.5rem | Major hero sections |
| `text-7xl` | 4.5rem | 5rem | Large hero displays |

### Typography Weights

| Weight | CSS Value | Usage |
|--------|-----------|-------|
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | UI elements, links |
| Semibold | 600 | Subheadings, emphasis |
| Bold | 700 | Headings, CTAs |
| Extrabold | 800 | Hero text, display |
| Black | 900 | Maximum emphasis |

---

## 4. Semantic Color Tokens

### Brand Colors

```tailwind
brand-primary: 0E3A52 (dark teal)
brand-primary-50: EAF3F8 (lightest)
brand-primary-900: 071F2C (darkest)

brand-secondary: 7A5A3A (warm brown)
brand-accent: EE6A35 (coral-orange)
```

### Semantic Tokens

```tailwind
semantic-success: 1D7A46 (green)
semantic-warning: C98212 (golden)
semantic-danger: C43D2F (red)
semantic-info: 2B6CB0 (blue)
```

### Surface Tokens (Backgrounds)

```tailwind
surface-canvas: #FFFFFF (light) / #1A1A1A (dark)
surface-subtle: #F5F5F5 (light) / #2A2A2A (dark)
surface-base: #FFFFFF (light) / #242424 (dark)
surface-elevated: #F8F8F8 (light) / #2A2A2A (dark)
surface-inverse: #1A1A1A (light) / #FFFFFF (dark)
```

### Text Tokens

```tailwind
text-strong: #1A1A1A (light) / #FFFFFF (dark) - Primary text
text-default: #333333 (light) / #E0E0E0 (dark) - Default text
text-muted: #666666 (light) / #A0A0A0 (dark) - Secondary text
text-soft: #999999 (light) / #808080 (dark) - Tertiary text
text-inverse: #FFFFFF (light) / #1A1A1A (dark) - On branded backgrounds
```

---

## 5. Layout Patterns

### Fixed Header Pattern

Header fixed at top with content scroll:

```vue
<nav class="fixed top-0 w-full z-50">
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
    <!-- nav content -->
  </div>
</nav>

<main class="flex-1 pt-20">
  <!-- pt-20 = ~5rem header buffer -->
  <PageContainer>
    <!-- page content -->
  </PageContainer>
</main>
```

**Z-index stacking order:**
- `z-50`: Header (fixed navigation)
- `z-40`: Dropdowns (below modals)
- `z-30`: Notifications/overlays
- `z-20`: Card shadows
- `z-10`: Hover states
- `z-0`: Default content

### Hero Section Pattern

```vue
<section class="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
  <!-- Background layer -->
  <div class="absolute inset-0 z-0">
    <img :src="image" class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/80"></div>
  </div>
  
  <!-- Content layer -->
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-20">
    <h1 class="text-5xl md:text-7xl font-display font-bold text-white">Title</h1>
  </div>
</section>
```

### Feature Grid Pattern

```vue
<section class="py-20 md:py-24">
  <PageContainer>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- cards -->
    </div>
  </PageContainer>
</section>
```

---

## 6. Component Size Standards

| Component | Width | Height | Padding |
|-----------|--------|--------|---------|
| Small Button | auto | 2.5rem (h-10) | `px-4 py-2.5` |
| Medium Button | auto | 3rem (h-12) | `px-6 py-3` |
| Large Button | auto | 3.5rem (h-14) | `px-8 py-3.5` |
| Input Field | 100% | 2.75rem (h-11) | `px-3 py-2` |
| Card | 100% | auto | `p-6` |
| Badge | auto | auto | `px-3 py-1` |

---

## 7. Dark Mode Implementation

Dark mode uses `dark:` prefix throughout:

```vue
<div class="bg-white dark:bg-surface-dark text-gray-900 dark:text-white">
  <!-- content -->
</div>
```

**Key dark mode tokens:**
- `dark:surface-dark` = #242424
- `dark:text-white` = #FFFFFF
- `dark:bg-black/50` = Transparent overlays
- `dark:border-white/10` = Subtle borders

---

## 8. Responsive Image Sizing

| Context | Width | Height | Object Fit |
|---------|-------|--------|-----------|
| Hero Background | 100% | Full parent | `object-cover` |
| Card Image | 100% | 16rem-20rem | `object-cover` |
| Avatar | 40px-64px | Square | `object-cover` |
| Icon | 16px-32px | Square | N/A |

---

## 9. Common Layout Recipes

### Centered Container with Sidebar

```vue
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <aside class="lg:col-span-3">
    <!-- sidebar -->
  </aside>
  <main class="lg:col-span-9">
    <!-- main content -->
  </main>
</div>
```

### Full-Width Section with Constrained Content

```vue
<section class="w-full bg-surface-base">
  <PageContainer class="py-16">
    <!-- centered content -->
  </PageContainer>
</section>
```

### Asymmetric Two-Column Layout

```vue
<div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
  <div class="lg:col-span-2">
    <!-- text content -->
  </div>
  <div class="lg:col-span-3">
    <!-- images or feature -->
  </div>
</div>
```

---

## 10. Migration Guide: Legacy → New Pattern

### Before (Legacy)
```vue
<div class="container mx-auto px-6">
  <h1 class="text-4xl">Title</h1>
</div>
```

### After (New Standard)
```vue
<PageContainer>
  <h1 class="text-4xl">Title</h1>
</PageContainer>
```

**Benefits:**
- Consistent responsive padding across all breakpoints
- Single source of truth for max-width (max-w-7xl = 80rem)
- Reduces code repetition in templates
- Future-proof: change container in one place affects all pages

---

## 11. Accessibility Considerations

### Focus Visibility

All interactive elements use:
```tailwind
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400 focus-visible:ring-offset-2 rounded-lg
```

### Reading Order

- Maintain semantic HTML (`<header>`, `<main>`, `<section>`)
- Use heading hierarchy (h1 → h2 → h3, no skipping)
- Ensure color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large)

### Mobile Usability

- Touch targets minimum 44×44px
- Viewport meta tag: `width=device-width, initial-scale=1`
- No horizontal scroll on mobile

---

## 12. Performance Considerations

### Lazy Loading

```vue
<img v-lazy src="image.jpg" alt="description" />
```

### Image Optimization

- Use `.avif` format for modern browsers
- Serve responsive images with `srcset`
- Optimize for mobile first (start with mobile image)

### CSS Loading

- Design tokens loaded via Tailwind JIT
- Page containers use utility classes (no additional CSS)
- Dark mode uses CSS class toggle (no theme provider needed)

---

## Implementation Checklist

- [x] Container pattern standardized (max-w-7xl)
- [x] Responsive padding applied (px-4 sm:px-6 lg:px-8)
- [x] PageContainer component created
- [x] 80+ files migrated to new pattern
- [x] Semantic tokens integrated
- [x] Dark mode support verified
- [x] Accessibility (focus-visible, aria-labels) implemented
- [x] Documentation complete

---

## Related Files

- **Layout system:** `/app/layouts/default.vue`
- **Container component:** `/app/components/Shared/PageContainer.vue`
- **Design tokens:** `/tailwind.config.js`
- **Header example:** `/app/components/Shared/Header.vue`
- **Footer example:** `/app/components/Shared/Footer.vue`
