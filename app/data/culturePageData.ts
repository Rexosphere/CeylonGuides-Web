/**
 * Culture Page Data
 * 
 * IMPORTANT: All content sourced from /culture.md
 * This is the single source of truth for the Cultural Etiquette page.
 * If culture.md changes, update this file accordingly.
 * No component should hardcode etiquette rules, bullets, or do/don't content.
 */

import type {
    CulturePageData,
    SectionNavItem,
    GuidelineCard,
    TempleGuideline,
    DressCodeRule,
    PhotoRule,
    GreetingPhrase,
    SocialCustom,
    TransportRule,
    CulturalEvent,
    CultureHero,
    CultureSection,
} from '../types/culture'

// ============================================================================
// Navigation
// ============================================================================

export const sectionNavigation: SectionNavItem[] = [
    { id: 'temples', title: 'Temple Etiquette', icon: 'temple_buddhist' },
    { id: 'greetings', title: 'Greetings & Customs', icon: 'waving_hand' },
    { id: 'photography', title: 'Photography', icon: 'photo_camera' },
    { id: 'festivals', title: 'Festivals', icon: 'celebration' },
    { id: 'transport', title: 'Transport', icon: 'directions_bus' },
]

// ============================================================================
// Hero Section
// ============================================================================

export const cultureHero: CultureHero = {
    title: 'Sri Lanka Cultural Etiquette',
    subtitle: 'Navigate local customs with confidence',
    description: 'Sri Lanka is a land of ancient traditions, vibrant festivals, and warm hospitality. Understanding local customs will enrich your experience and show respect for the culture.',
    quickStats: [
        { label: 'Major Religions', value: '4', icon: 'groups' },
        { label: 'Official Languages', value: '2', icon: 'translate' },
        { label: 'UNESCO Sites', value: '8', icon: 'castle' },
    ]
}

// ============================================================================
// Quick Guidelines (Do/Don't Cards)
// ============================================================================

export const quickGuidelines: GuidelineCard[] = [
    // DO cards
    {
        id: 'do-greetings',
        title: 'Greetings',
        type: 'do',
        icon: 'waving_hand',
        bullets: [
            'Say "Ayubowan" (Sinhala) or "Vanakkam" (Tamil) with palms pressed together',
            'Greet elders and monks first',
            'Use "Mr./Mrs./Miss" with surnames in formal settings',
            'Add "Sir" or "Madam" when addressing respected individuals',
        ],
        tags: ['social', 'essential']
    },
    {
        id: 'do-temples',
        title: 'Temple Visits',
        type: 'do',
        icon: 'temple_buddhist',
        bullets: [
            'Cover shoulders and knees (bring a sarong)',
            'Remove shoes, hats, and socks when required',
            'Stand when monks or nuns enter the room',
            'Walk calmly and speak softly',
            'Back out of shrines without turning your back to Buddha',
        ],
        tags: ['religious', 'essential']
    },
    {
        id: 'do-dining',
        title: 'Dining & Gifts',
        type: 'do',
        icon: 'restaurant',
        bullets: [
            'Use right hand for eating, giving, and receiving',
            'Finish all food on your plate to avoid waste',
            'Hold offerings with both hands',
            'Accept food and drinks when offered — it\'s considered polite',
        ],
        tags: ['social', 'dining']
    },
    {
        id: 'do-public',
        title: 'Public Behavior',
        type: 'do',
        icon: 'groups',
        bullets: [
            'Dress modestly, especially in rural areas',
            'Give up front bus/train seats to clergy',
            'Keep voices low and be polite',
            'Save face — avoid openly criticizing others',
        ],
        tags: ['social', 'transport']
    },
    // DON'T cards
    {
        id: 'dont-temples',
        title: 'Temple Don\'ts',
        type: 'dont',
        icon: 'block',
        bullets: [
            'Never turn your back to Buddha statues',
            'No flash photography on ancient murals',
            'Don\'t take selfies with Buddha statues',
            'Never touch Buddha statues or paintings',
            'Don\'t wear clothes depicting Buddha',
        ],
        tags: ['religious', 'critical']
    },
    {
        id: 'dont-social',
        title: 'Social Don\'ts',
        type: 'dont',
        icon: 'do_not_touch',
        bullets: [
            'Never touch anyone\'s head without permission',
            'Women should not touch Buddhist monks',
            'Avoid public displays of affection (kissing, hugging)',
            'Don\'t point with your index finger — use whole hand',
            'Don\'t raise your voice in disputes',
        ],
        tags: ['social', 'critical']
    },
    {
        id: 'dont-photo',
        title: 'Photography Don\'ts',
        type: 'dont',
        icon: 'no_photography',
        bullets: [
            'Never photograph monks without explicit consent',
            'No drones at temples, stupas, or heritage sites',
            'Don\'t film religious ceremonies without permission',
            'Avoid photographing people without asking first',
        ],
        tags: ['photography', 'critical']
    },
    // INFO cards
    {
        id: 'info-tattoos',
        title: 'Buddha Tattoos Warning',
        type: 'info',
        icon: 'warning',
        bullets: [
            'Buddha tattoos are extremely offensive in Sri Lanka',
            'Tourists have been refused entry or deported',
            'Keep any Buddha tattoos covered at ALL times',
            'This applies island-wide, not just at temples',
        ],
        tags: ['critical', 'legal']
    },
]

// ============================================================================
// Temple Guidelines
// ============================================================================

export const templeGuidelines: TempleGuideline[] = [
    {
        id: 'temple-dress',
        title: 'Dress Code',
        icon: 'checkroom',
        rules: [
            'Cover shoulders and knees at all times',
            'Bring a sarong or shawl — many temples lend one at entrance',
            'Remove shoes, hats, and sometimes socks before entering',
            'Muslim headscarves (Burqa, Niqab, Hijab) are not allowed in Buddhist temples',
            'Wear socks if the stone is too hot from tropical sun',
        ],
        prohibited: [
            'Sleeveless tops or shorts',
            'Hats inside shrines',
            'Clothes depicting Buddha or deities',
            'Leather items at Hindu temples (belts, wallets)',
        ]
    },
    {
        id: 'temple-behavior',
        title: 'Behavior Inside',
        icon: 'self_improvement',
        rules: [
            'Maintain silence or speak in hushed tones',
            'Sit lower than any monks present',
            'Stand when a monk or nun enters the room',
            'When leaving after praying, back out without turning your back to altar',
            'Tourists can participate respectfully (offer flowers, light incense)',
        ],
        prohibited: [
            'Pointing feet toward sacred objects or monks',
            'Smelling flowers on the temple altar',
            'Alcohol on temple premises',
            'Feeding animals that roam the temples',
        ]
    },
    {
        id: 'temple-photo',
        title: 'Photography',
        icon: 'photo_camera',
        rules: [
            'Photography is generally allowed in Buddhist temples',
            'No flash photography on ancient frescoes (e.g., Sigiriya)',
            'Never stand with back to Buddha statues for photos',
            'Always check for posted signs or ask temple officials',
            'Be discreet and avoid disturbing worshippers',
        ],
        prohibited: [
            'Flash on murals or paintings',
            'Selfies with Buddha statues',
            'Filming ceremonies without permission',
            'Drones — banned at all temples and heritage sites',
        ]
    },
    {
        id: 'temple-tooth',
        title: 'Temple of the Tooth (Kandy)',
        icon: 'temple_buddhist',
        rules: [
            'Ceremonies occur 3 times daily (morning, noon, evening) — 1 hour each',
            'Inner chamber opens only during ceremonies',
            'You will see the outer container, not the tooth relic itself',
            'Drummers and flautists perform during ceremonies',
        ],
        prohibited: [
            'Cameras, phones, and bags inside inner chamber',
            'Hats',
            'Large bags (use lockers)',
        ]
    },
    {
        id: 'temple-hindu',
        title: 'Hindu Temple Variations',
        icon: 'temple_hindu',
        rules: [
            'Non-Hindus may not be permitted in inner shrines',
            'Men may need to remove their shirts before entering',
            'Unless with experienced guide, avoid inner shrine to prevent offense',
        ],
        prohibited: [
            'Leather items (sacred cows are venerated)',
            'Women may be barred from certain areas',
        ]
    },
]

// ============================================================================
// Dress Code Rules
// ============================================================================

export const dressCodeRules: DressCodeRule[] = [
    {
        id: 'dress-shoulders',
        label: 'Shoulders covered',
        isAllowed: true,
        description: 'Cover shoulders at temples, religious sites, and rural areas'
    },
    {
        id: 'dress-knees',
        label: 'Knees covered',
        isAllowed: true,
        description: 'Cover knees at temples and sacred sites — bring a sarong'
    },
    {
        id: 'dress-shoes',
        label: 'Shoes removed',
        isAllowed: true,
        description: 'Remove shoes before entering inner halls — wear socks if stone is hot'
    },
    {
        id: 'dress-sleeveless',
        label: 'Sleeveless tops',
        isAllowed: false,
        description: 'Not appropriate for temples or religious sites'
    },
    {
        id: 'dress-shorts',
        label: 'Shorts / mini-skirts',
        isAllowed: false,
        description: 'Not appropriate for temples — consider wearing below-knee length'
    },
    {
        id: 'dress-buddha-clothes',
        label: 'Buddha imagery on clothing',
        isAllowed: false,
        description: 'Extremely offensive — can result in refusal of entry'
    },
    {
        id: 'dress-headcover-muslim',
        label: 'Muslim headcovers',
        isAllowed: false,
        description: 'Burqa, Niqab, Chador, Hijab not allowed in Buddhist temples'
    },
    {
        id: 'dress-leather-hindu',
        label: 'Leather (Hindu temples)',
        isAllowed: false,
        description: 'Leather belts, wallets, shoes forbidden at Hindu temples'
    },
]

// ============================================================================
// Photography Rules
// ============================================================================

export const photoRules: PhotoRule[] = [
    {
        id: 'photo-buddha-back',
        label: 'Standing with back to Buddha',
        severity: 'high',
        description: 'Never take photos with your back to a Buddha statue — always face the statue with reverence',
        tags: ['temples', 'critical']
    },
    {
        id: 'photo-selfie-buddha',
        label: 'Selfies with Buddha statues',
        severity: 'high',
        description: 'Selfies with Buddha are considered extremely disrespectful — tourists have been deported',
        tags: ['temples', 'legal', 'critical']
    },
    {
        id: 'photo-monks',
        label: 'Photographing monks',
        severity: 'high',
        description: 'Never photograph monks without explicit consent — never pose next to or touch a monk for photos',
        tags: ['people', 'consent', 'critical']
    },
    {
        id: 'photo-flash',
        label: 'Flash on murals',
        severity: 'high',
        description: 'No flash photography on ancient frescoes (e.g., Sigiriya cave paintings) — can cause damage',
        tags: ['temples', 'heritage']
    },
    {
        id: 'photo-drones',
        label: 'Drone photography',
        severity: 'high',
        description: 'Drones are banned at all temples, stupas, heritage sites, and over processions',
        tags: ['temples', 'legal', 'heritage']
    },
    {
        id: 'photo-ceremonies',
        label: 'Filming ceremonies',
        severity: 'medium',
        description: 'Do not film religious ceremonies (pujas) unless you have explicit permission',
        tags: ['temples', 'consent']
    },
    {
        id: 'photo-people',
        label: 'Photographing people',
        severity: 'medium',
        description: 'Always ask before photographing people, especially women, children, or monks',
        tags: ['people', 'consent']
    },
    {
        id: 'photo-inner-shrines',
        label: 'Inner shrine photography',
        severity: 'medium',
        description: 'Many temple interiors prohibit any photography — check for posted rules',
        tags: ['temples']
    },
]

// ============================================================================
// Greetings & Phrases
// ============================================================================

export const greetings: GreetingPhrase[] = [
    {
        id: 'greet-ayubowan',
        phrase: 'Ayubowan',
        language: 'sinhala',
        meaning: 'May you live long',
        context: 'Most common Sinhala greeting — palms pressed together (Anjali Mudra)'
    },
    {
        id: 'greet-vanakkam',
        phrase: 'Vanakkam',
        language: 'tamil',
        meaning: 'May you be blessed with a long life',
        context: 'Traditional Tamil greeting — palms pressed together'
    },
    {
        id: 'greet-kohomada',
        phrase: 'Kohomada?',
        language: 'sinhala',
        meaning: 'How do you do?',
        context: 'Casual informal greeting'
    },
    {
        id: 'greet-good-morning',
        phrase: 'Subha Udesanak Wewa',
        language: 'sinhala',
        meaning: 'Good Morning',
        context: 'Morning greeting'
    },
    {
        id: 'greet-thanks-sinhala',
        phrase: 'Bohoma Sthuthi',
        language: 'sinhala',
        meaning: 'Thank you very much',
        context: 'Formal and respectful — "Istuti" is shorter version'
    },
    {
        id: 'greet-thanks-tamil',
        phrase: 'Nanri / Nandri',
        language: 'tamil',
        meaning: 'Thank you',
        context: 'Tamil expression of gratitude'
    },
    {
        id: 'greet-new-year',
        phrase: 'Suba Aluth Avuruddak Wewa',
        language: 'sinhala',
        meaning: 'Happy New Year',
        context: 'Used during Sinhala & Tamil New Year (April 13-14)'
    },
    {
        id: 'greet-see-you',
        phrase: 'Heta Awasarai',
        language: 'sinhala',
        meaning: 'See you tomorrow',
        context: 'Sri Lankans rarely say "goodbye" — considered too final'
    },
]

// ============================================================================
// Social Customs
// ============================================================================

export const socialCustoms: SocialCustom[] = [
    {
        id: 'custom-right-hand',
        title: 'Right Hand Rule',
        description: 'Always use right hand (or both hands) for giving/receiving money, gifts, or food. Left hand is considered unclean. Use right hand only when eating with hands.',
        icon: 'pan_tool',
        importance: 'critical'
    },
    {
        id: 'custom-head',
        title: 'Head is Sacred',
        description: 'Never touch anyone\'s head without permission — the head is the most sacred part of the body. This is especially important with children.',
        icon: 'psychology',
        importance: 'critical'
    },
    {
        id: 'custom-monks-women',
        title: 'Women & Monks',
        description: 'Women must not touch Buddhist monks or sit next to them. Use traditional greeting instead of handshakes. If a monk needs to hand something to a woman, they place it on a surface first.',
        icon: 'self_improvement',
        importance: 'critical'
    },
    {
        id: 'custom-pda',
        title: 'Public Displays of Affection',
        description: 'PDA is social taboo — kissing/hugging in public is frowned upon. Holding hands is generally acceptable. Couples hide behind umbrellas in parks. Beach parties/clubs are more relaxed.',
        icon: 'favorite',
        importance: 'important'
    },
    {
        id: 'custom-elders',
        title: 'Respecting Elders',
        description: 'Greet the oldest person first. Some may touch the ground or elder\'s feet as respect ("worshipping elders"). This gesture is also used when encountering monks.',
        icon: 'elderly',
        importance: 'important'
    },
    {
        id: 'custom-face',
        title: 'Saving Face',
        description: 'Avoid openly criticizing someone — putting others in awkward positions is rude. Communication tends to be polite and indirect.',
        icon: 'sentiment_satisfied',
        importance: 'important'
    },
    {
        id: 'custom-voice',
        title: 'Keep Voice Low',
        description: 'Raising your voice in a dispute is counterproductive and makes you look ill-bred. Stay calm and polite even in disagreements.',
        icon: 'volume_off',
        importance: 'recommended'
    },
    {
        id: 'custom-pointing',
        title: 'No Finger Pointing',
        description: 'Don\'t point with your index finger — use your whole hand or chin to indicate direction.',
        icon: 'touch_app',
        importance: 'recommended'
    },
]

// ============================================================================
// Transport Rules
// ============================================================================

export const transportRules: TransportRule[] = [
    {
        id: 'transport-clergy-seats',
        location: 'Public Buses & Trains',
        rule: 'First two seats behind driver are reserved for Buddhist clergy. All passengers (even children/elderly) will immediately give up these seats if a monk or nun boards.',
        icon: 'event_seat'
    },
    {
        id: 'transport-monks-women',
        location: 'Public Transport',
        rule: 'Women often move so monks can sit — monks traditionally do not sit beside unrelated women.',
        icon: 'airline_seat_recline_normal'
    },
]

// ============================================================================
// Cultural Events & Festivals
// ============================================================================

export const festivals: CulturalEvent[] = [
    {
        id: 'festival-vesak',
        title: 'Vesak',
        monthLabel: 'May',
        category: 'buddhist',
        dateRange: 'May 12, 2025 (varies with full moon)',
        description: 'Sri Lanka\'s biggest Buddhist festival celebrating Buddha\'s birth, enlightenment, and passing. Temples and streets decorated with illuminated pandals (story boards) and vesak lanterns. Over 300 pandols across the country.',
        etiquetteTips: [
            'Join calm celebrations — observe quietly',
            'Partake of vegetarian dansal (free food) offerings',
            'Admire lantern displays respectfully',
            'Dress in white if visiting temples (many devotees do)',
        ],
        notes: [
            'Alcohol and meat sales banned during Vesak week',
            'Nuwara Eliya: State Vesak Festival May 10-16, 2025',
            'Colombo: Buddha Rashmi at Gangaramaya Temple May 13-16',
            'Dansals offer free vegetarian meals and refreshments to all',
        ]
    },
    {
        id: 'festival-new-year',
        title: 'Sinhala & Tamil New Year',
        monthLabel: 'April',
        category: 'multi-faith',
        dateRange: 'April 13-14, 2025',
        description: 'Traditional New Year (Aluth Avurudda / Puthandu) marking end of harvest and sun\'s transit into Aries. Island-wide holiday for Buddhists and Hindus. Families follow auspicious rituals, play folk games, light fireworks, and feast on sweets.',
        etiquetteTips: [
            'Greet with "Suba Aluth Avuruddak Wewa" (Happy New Year)',
            'Respectfully enjoy invitations to join games or meals',
            'Locals happy to share festive spirit',
            'Plan ahead — most shops and offices close for a week',
        ],
        notes: [
            'Special sweets: kavum, kokis, plantains',
            'Rituals: lighting oil lamp, boiling milk for kiribath rice',
            'Homes and shops cleaned and decorated in advance',
        ]
    },
    {
        id: 'festival-perahera',
        title: 'Kandy Esala Perahera',
        monthLabel: 'July/August',
        category: 'buddhist',
        description: '10-day nighttime procession in Kandy honoring the Sacred Tooth Relic. Grand parade with ornately decorated elephants, traditional dancers, drummers, and flag-bearers lit by torches. Concludes with water-cutting ritual at Mahaweli River.',
        etiquetteTips: [
            'Stay on sidewalks behind barriers',
            'Yield best spots to elders',
            'Do not touch or feed elephants',
            'Keep quiet when procession nears temples',
            'Wear white or light clothing as sign of purity',
        ],
        notes: [
            'Kumbal Perahera: first procession (5 days)',
            'Randoli Perahera: Sacred Tooth Relic (5 days)',
            'Maha Randoli Perahera: grandest final procession',
            'Book accommodations early — Kandy gets packed',
            'Look for local guesthouses for authentic experience',
        ]
    },
]

// ============================================================================
// Sections
// ============================================================================

export const cultureSections: CultureSection[] = [
    { id: 'temples', title: 'Temple Etiquette', icon: 'temple_buddhist', description: 'Sacred sites and respectful behavior' },
    { id: 'greetings', title: 'Greetings & Customs', icon: 'waving_hand', description: 'Social interactions and local phrases' },
    { id: 'photography', title: 'Photography', icon: 'photo_camera', description: 'What you can and cannot photograph' },
    { id: 'festivals', title: 'Festivals', icon: 'celebration', description: 'Major cultural events and how to participate' },
    { id: 'transport', title: 'Public Transport', icon: 'directions_bus', description: 'Etiquette on buses and trains' },
]

// ============================================================================
// Complete Page Data Export
// ============================================================================

export const culturePageData: CulturePageData = {
    hero: cultureHero,
    navigation: sectionNavigation,
    quickGuidelines,
    templeGuidelines,
    dressCode: dressCodeRules,
    photoRules,
    greetings,
    socialCustoms,
    transportRules,
    festivals,
    sections: cultureSections,
}

// ============================================================================
// Helper Functions
// ============================================================================

export function getGuidelinesByType(type: 'do' | 'dont' | 'info'): GuidelineCard[] {
    return quickGuidelines.filter(g => g.type === type)
}

export function getDoGuidelines(): GuidelineCard[] {
    return getGuidelinesByType('do')
}

export function getDontGuidelines(): GuidelineCard[] {
    return getGuidelinesByType('dont')
}

export function getInfoGuidelines(): GuidelineCard[] {
    return getGuidelinesByType('info')
}

export function getPhotoRulesBySeverity(severity: 'high' | 'medium' | 'low'): PhotoRule[] {
    return photoRules.filter(r => r.severity === severity)
}

export function getFestivalsByCategory(category: string): CulturalEvent[] {
    return festivals.filter(f => f.category === category)
}

export function getCustomsByImportance(importance: 'critical' | 'important' | 'recommended'): SocialCustom[] {
    return socialCustoms.filter(c => c.importance === importance)
}

export function getAllowedDressCode(): DressCodeRule[] {
    return dressCodeRules.filter(r => r.isAllowed)
}

export function getProhibitedDressCode(): DressCodeRule[] {
    return dressCodeRules.filter(r => !r.isAllowed)
}

// ============================================================================
// Validation (run at build time or in development)
// ============================================================================

export function validateCultureData(): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validate guidelines
    quickGuidelines.forEach(g => {
        if (!g.id?.trim()) errors.push(`Guideline missing id`)
        if (!g.title?.trim()) errors.push(`Guideline ${g.id} missing title`)
        if (!g.bullets?.length) errors.push(`Guideline ${g.id} has no bullets`)
    })

    // Validate festivals
    festivals.forEach(f => {
        if (!f.id?.trim()) errors.push(`Festival missing id`)
        if (!f.title?.trim()) errors.push(`Festival ${f.id} missing title`)
        if (!f.description?.trim()) errors.push(`Festival ${f.id} missing description`)
        if (!f.etiquetteTips?.length) errors.push(`Festival ${f.id} has no etiquette tips`)
    })

    // Validate dress code
    dressCodeRules.forEach(r => {
        if (!r.id?.trim()) errors.push(`Dress code rule missing id`)
        if (!r.label?.trim()) errors.push(`Dress code ${r.id} missing label`)
    })

    // Validate photo rules
    photoRules.forEach(r => {
        if (!r.id?.trim()) errors.push(`Photo rule missing id`)
        if (!r.label?.trim()) errors.push(`Photo rule ${r.id} missing label`)
    })

    return {
        valid: errors.length === 0,
        errors
    }
}

// Export default for convenience
export default culturePageData
