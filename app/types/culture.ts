/**
 * Culture Page TypeScript Interfaces
 * All data structures for the Cultural Etiquette page
 */

// ============================================================================
// Navigation & Structure
// ============================================================================

export interface SectionNavItem {
    id: string
    title: string
    icon: string
}

// ============================================================================
// Guideline Cards
// ============================================================================

export type GuidelineType = 'do' | 'dont' | 'info'

export interface GuidelineCard {
    id: string
    title: string
    type: GuidelineType
    bullets: string[]
    icon: string
    tags?: string[]
}

// ============================================================================
// Dress Code
// ============================================================================

export interface DressCodeRule {
    id: string
    label: string
    isAllowed: boolean
    description: string
}

// ============================================================================
// Photography
// ============================================================================

export type SeverityLevel = 'high' | 'medium' | 'low'

export interface PhotoRule {
    id: string
    label: string
    severity: SeverityLevel
    description: string
    tags: string[]
}

// ============================================================================
// Cultural Events & Festivals
// ============================================================================

export type EventCategory = 'buddhist' | 'hindu' | 'national' | 'multi-faith'

export interface CulturalEvent {
    id: string
    title: string
    monthLabel: string
    category: EventCategory
    description: string
    etiquetteTips: string[]
    notes?: string[]
    dateRange?: string
}

// ============================================================================
// Greetings & Social Customs
// ============================================================================

export interface GreetingPhrase {
    id: string
    phrase: string
    language: 'sinhala' | 'tamil' | 'english'
    meaning: string
    context: string
}

export interface SocialCustom {
    id: string
    title: string
    description: string
    icon: string
    importance: 'critical' | 'important' | 'recommended'
}

// ============================================================================
// Temple Guidelines
// ============================================================================

export interface TempleGuideline {
    id: string
    title: string
    icon: string
    rules: string[]
    prohibited?: string[]
}

// ============================================================================
// Transport Etiquette
// ============================================================================

export interface TransportRule {
    id: string
    location: string
    rule: string
    icon: string
}

// ============================================================================
// Hero Section
// ============================================================================

export interface CultureHero {
    title: string
    subtitle: string
    description: string
    quickStats: { label: string; value: string; icon: string }[]
}

// ============================================================================
// Complete Page Data
// ============================================================================

export interface CultureSection {
    id: string
    title: string
    icon: string
    description?: string
}

export interface CulturePageData {
    hero: CultureHero
    navigation: SectionNavItem[]
    quickGuidelines: GuidelineCard[]
    templeGuidelines: TempleGuideline[]
    dressCode: DressCodeRule[]
    photoRules: PhotoRule[]
    greetings: GreetingPhrase[]
    socialCustoms: SocialCustom[]
    transportRules: TransportRule[]
    festivals: CulturalEvent[]
    sections: CultureSection[]
}

// ============================================================================
// Validation Helpers
// ============================================================================

export function validateGuidelineCard(card: GuidelineCard): boolean {
    return !!(
        card.id?.trim() &&
        card.title?.trim() &&
        card.bullets?.length > 0 &&
        card.bullets.every(b => b.trim())
    )
}

export function validateCulturalEvent(event: CulturalEvent): boolean {
    return !!(
        event.id?.trim() &&
        event.title?.trim() &&
        event.description?.trim() &&
        event.etiquetteTips?.length > 0
    )
}

export function validateDressCodeRule(rule: DressCodeRule): boolean {
    return !!(
        rule.id?.trim() &&
        rule.label?.trim() &&
        rule.description?.trim()
    )
}

export function validatePhotoRule(rule: PhotoRule): boolean {
    return !!(
        rule.id?.trim() &&
        rule.label?.trim() &&
        rule.description?.trim()
    )
}
