// =============================================================================
// SIM CARDS & CONNECTIVITY DATA MODULE
// Structured data from sim.md research - drives all UI components
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export type TouristRatingLabel = 'Excellent' | 'Very Good' | 'Good' | 'Fair'
export type BestForTag = 'weekender' | 'explorer' | 'nomad' | 'budget' | 'short_trip'
export type BuyLocation = 'airport' | 'city' | 'online'
export type RegionKey = 'colombo_west' | 'hill_country' | 'south_coast' | 'east_coast' | 'cultural_triangle' | 'north' | 'arugam_bay'

export interface Provider {
    id: string
    name: string
    brandColor?: string
    marketShareApprox?: number
    coverageScore: 1 | 2 | 3 | 4 | 5
    speedScore: 1 | 2 | 3 | 4 | 5
    touristRatingLabel: TouristRatingLabel
    bestFor: string[]
    esimAvailable: boolean
    has5G: boolean
    notes: string
}

export interface TouristPlan {
    id: string
    providerId: string
    name: string
    validityDays: number
    dataGB: number
    localCalls: string
    intlCalls?: string
    freebies: string[]
    priceLKR: number
    priceUSD: number
    bestForTag: BestForTag
    whereToBuy: BuyLocation[]
}

export interface RegionCoverage {
    regionKey: RegionKey
    regionName: string
    description: string
    coordinates: { lat: number; lng: number }
    recommendedProviders: string[] // ordered best → worst
    notes: string
}

export interface AirportLocation {
    id: string
    name: string
    code: string
    providersAvailable: string[]
    coordinates: { lat: number; lng: number }
    notes?: string
}

export interface CityBuyingTip {
    tip: string
    icon?: string
}

export interface PurchaseLocations {
    airportLocations: AirportLocation[]
    cityBuyingTips: CityBuyingTip[]
    registrationRequirements: string[]
}

export interface CoworkingSpace {
    id: string
    name: string
    city: string
    area?: string
    priceApprox?: number
    wifiSpeed?: string
    features: string[]
    coordinates?: { lat: number; lng: number }
    notes?: string
}

export interface WifiAndNomad {
    coworkingSpaces: CoworkingSpace[]
    powerCutsNotes: string[]
    bestPractices: string[]
    digitalNomadVisa: {
        available: boolean
        cost: number
        validityYears: number
        minMonthlyIncome: number
        requirements: string[]
        coversFamily: boolean
    }
}

// -----------------------------------------------------------------------------
// PROVIDERS
// -----------------------------------------------------------------------------

export const providers: Provider[] = [
    {
        id: 'dialog',
        name: 'Dialog Axiata',
        brandColor: '#E31837',
        marketShareApprox: 50,
        coverageScore: 5,
        speedScore: 5,
        touristRatingLabel: 'Excellent',
        bestFor: ['urban', 'rural', 'east_coast', 'hill_country', 'nomad'],
        esimAvailable: true,
        has5G: true,
        notes: 'Market leader with widest 4G/5G coverage. 220+ active 5G sites. Best overall network experience per Opensignal 2025.'
    },
    {
        id: 'mobitel',
        name: 'SLT-Mobitel',
        brandColor: '#0066B3',
        marketShareApprox: 28,
        coverageScore: 5,
        speedScore: 5,
        touristRatingLabel: 'Excellent',
        bestFor: ['urban', 'rural', 'hill_country', 'budget'],
        esimAvailable: true,
        has5G: true,
        notes: 'Fastest network speeds. Excellent rural coverage. Competitive tourist packages with great value.'
    },
    {
        id: 'hutch',
        name: 'Hutch',
        brandColor: '#FF6600',
        marketShareApprox: 26,
        coverageScore: 3,
        speedScore: 3,
        touristRatingLabel: 'Good',
        bestFor: ['urban', 'budget'],
        esimAvailable: true,
        has5G: false,
        notes: 'Most affordable plans. Good urban coverage. Average 7.4 Mbps download. Spotty in rural/remote areas.'
    },
    {
        id: 'airtel',
        name: 'Airtel',
        brandColor: '#ED1C24',
        marketShareApprox: 5,
        coverageScore: 2,
        speedScore: 3,
        touristRatingLabel: 'Fair',
        bestFor: ['urban'],
        esimAvailable: false,
        has5G: false,
        notes: 'Licensed via Dialog. Main coverage in cities only. Very limited rural presence.'
    }
]

// -----------------------------------------------------------------------------
// TOURIST PLANS
// -----------------------------------------------------------------------------

export const touristPlans: TouristPlan[] = [
    // Dialog Plans
    {
        id: 'dialog-basic',
        providerId: 'dialog',
        name: 'Dialog Tourist Basic',
        validityDays: 30,
        dataGB: 20,
        localCalls: 'Rs. 174 call credit',
        freebies: ['4G/5G access', 'Hotspot enabled'],
        priceLKR: 1399,
        priceUSD: 4,
        bestForTag: 'weekender',
        whereToBuy: ['airport', 'city', 'online']
    },
    {
        id: 'dialog-plus',
        providerId: 'dialog',
        name: 'Dialog Tourist Plus',
        validityDays: 30,
        dataGB: 30,
        localCalls: 'Rs. 164 call credit',
        freebies: ['4G/5G access', 'Hotspot enabled', 'International roaming ready'],
        priceLKR: 1799,
        priceUSD: 5,
        bestForTag: 'explorer',
        whereToBuy: ['airport', 'city', 'online']
    },
    {
        id: 'dialog-premium',
        providerId: 'dialog',
        name: 'Dialog Tourist Premium',
        validityDays: 30,
        dataGB: 50,
        localCalls: 'Rs. 250 call credit',
        freebies: ['4G/5G access', 'Hotspot enabled', 'Priority support'],
        priceLKR: 2450,
        priceUSD: 7,
        bestForTag: 'nomad',
        whereToBuy: ['airport', 'city', 'online']
    },
    // Mobitel Plans
    {
        id: 'mobitel-7day',
        providerId: 'mobitel',
        name: 'Mobitel 7-Day Plan',
        validityDays: 7,
        dataGB: 15,
        localCalls: 'Unlimited local calls',
        freebies: ['1,000 SMS', '4G access'],
        priceLKR: 821,
        priceUSD: 3,
        bestForTag: 'short_trip',
        whereToBuy: ['airport', 'city', 'online']
    },
    {
        id: 'mobitel-30day',
        providerId: 'mobitel',
        name: 'Mobitel 30-Day Plan',
        validityDays: 30,
        dataGB: 30,
        localCalls: 'Pay-as-you-go',
        freebies: ['4G access', 'Hotspot enabled', 'Best value'],
        priceLKR: 1540,
        priceUSD: 5,
        bestForTag: 'explorer',
        whereToBuy: ['airport', 'city', 'online']
    },
    // Hutch Plans
    {
        id: 'hutch-tourist',
        providerId: 'hutch',
        name: 'Hutch Tourist SIM',
        validityDays: 30,
        dataGB: 10,
        localCalls: '500 local minutes',
        intlCalls: '50 international minutes',
        freebies: ['Budget friendly'],
        priceLKR: 999,
        priceUSD: 3,
        bestForTag: 'budget',
        whereToBuy: ['airport', 'city']
    },
    {
        id: 'hutch-esim-premium',
        providerId: 'hutch',
        name: 'Hutch eSIM Premium',
        validityDays: 30,
        dataGB: 125,
        localCalls: 'Unlimited local calls',
        intlCalls: 'Rs. 500 IDD credit',
        freebies: ['eSIM - no physical card', 'Most data for price'],
        priceLKR: 3000,
        priceUSD: 10,
        bestForTag: 'nomad',
        whereToBuy: ['online']
    },
    {
        id: 'hutch-esim-basic',
        providerId: 'hutch',
        name: 'Hutch eSIM 14-Day',
        validityDays: 14,
        dataGB: 50,
        localCalls: 'Unlimited local calls',
        intlCalls: 'Rs. 200 IDD credit',
        freebies: ['eSIM - no physical card'],
        priceLKR: 2100,
        priceUSD: 7,
        bestForTag: 'explorer',
        whereToBuy: ['online']
    }
]

// -----------------------------------------------------------------------------
// REGION COVERAGE
// -----------------------------------------------------------------------------

export const regionCoverage: RegionCoverage[] = [
    {
        regionKey: 'colombo_west',
        regionName: 'Colombo & Western Province',
        description: 'Capital region with excellent coverage from all networks',
        coordinates: { lat: 6.9271, lng: 79.8612 },
        recommendedProviders: ['dialog', 'mobitel', 'hutch', 'airtel'],
        notes: 'All four networks provide excellent 4G. 5G available in central Colombo.'
    },
    {
        regionKey: 'hill_country',
        regionName: 'Central Highlands',
        description: 'Kandy, Nuwara Eliya, Ella - hill country with variable coverage',
        coordinates: { lat: 7.2906, lng: 80.6337 },
        recommendedProviders: ['dialog', 'mobitel', 'hutch'],
        notes: 'Dialog and Mobitel most reliable. Hutch moderate. Airtel limited to towns only.'
    },
    {
        regionKey: 'south_coast',
        regionName: 'Southern Coast',
        description: 'Galle, Mirissa, Unawatuna, Weligama, Hiriketiya - popular beaches',
        coordinates: { lat: 6.0535, lng: 80.2210 },
        recommendedProviders: ['dialog', 'mobitel', 'hutch'],
        notes: 'All networks offer good coverage. Digital nomad hotspot with excellent WiFi infrastructure.'
    },
    {
        regionKey: 'east_coast',
        regionName: 'East Coast',
        description: 'Trincomalee, Batticaloa, Pasikuda - less developed infrastructure',
        coordinates: { lat: 8.5874, lng: 81.2152 },
        recommendedProviders: ['dialog', 'mobitel'],
        notes: 'Dialog provides most comprehensive coverage. Hutch/Airtel limited.'
    },
    {
        regionKey: 'cultural_triangle',
        regionName: 'Cultural Triangle',
        description: 'Sigiriya, Polonnaruwa, Anuradhapura, Dambulla - ancient cities',
        coordinates: { lat: 7.9570, lng: 80.7603 },
        recommendedProviders: ['dialog', 'mobitel'],
        notes: 'Dialog and Mobitel reliable at major sites. Coverage can drop between attractions.'
    },
    {
        regionKey: 'north',
        regionName: 'Jaffna Peninsula',
        description: 'Northern region with improving but variable coverage',
        coordinates: { lat: 9.6615, lng: 80.0255 },
        recommendedProviders: ['dialog', 'mobitel', 'hutch'],
        notes: 'Coverage improving rapidly. Dialog and Mobitel best. Some remote areas still limited.'
    },
    {
        regionKey: 'arugam_bay',
        regionName: 'Arugam Bay',
        description: 'Surf town on east coast - high season May-September',
        coordinates: { lat: 6.8390, lng: 81.8369 },
        recommendedProviders: ['dialog', 'mobitel'],
        notes: 'Growing digital nomad scene. Dialog most reliable. WiFi at most cafes/accommodations.'
    }
]

// -----------------------------------------------------------------------------
// PURCHASE LOCATIONS
// -----------------------------------------------------------------------------

export const purchaseLocations: PurchaseLocations = {
    airportLocations: [
        {
            id: 'bia',
            name: 'Bandaranaike International Airport',
            code: 'CMB',
            providersAvailable: ['dialog', 'mobitel', 'hutch'],
            coordinates: { lat: 7.1802, lng: 79.8845 },
            notes: 'Dialog store in arrival lobby. All major providers available. Prices slightly higher than city.'
        },
        {
            id: 'mattala',
            name: 'Mattala Rajapaksa International Airport',
            code: 'HRI',
            providersAvailable: ['mobitel', 'hutch'],
            coordinates: { lat: 6.2918, lng: 81.1228 },
            notes: 'Limited options. Consider buying in nearby Hambantota city for better deals.'
        },
        {
            id: 'jaffna',
            name: 'Jaffna International Airport',
            code: 'JAF',
            providersAvailable: ['mobitel'],
            coordinates: { lat: 9.7925, lng: 80.0694 },
            notes: 'Only Mobitel available. Consider buying in Jaffna city for more options.'
        }
    ],
    cityBuyingTips: [
        { tip: 'City stores offer better prices than airports', icon: 'savings' },
        { tip: 'Dialog, Mobitel, Hutch retail stores in all major cities', icon: 'storefront' },
        { tip: 'Available at Singer, Softlogic, and Keells supermarkets', icon: 'shopping_cart' },
        { tip: 'Activation takes 15-30 minutes at store', icon: 'schedule' },
        { tip: 'Staff can help configure phone settings', icon: 'support_agent' }
    ],
    registrationRequirements: [
        'Valid passport (mandatory for SIM registration)',
        'Passport-sized photo (or one will be taken at store)',
        'Sri Lankan address (hotel address is acceptable)'
    ]
}

// -----------------------------------------------------------------------------
// WIFI AND DIGITAL NOMAD INFO
// -----------------------------------------------------------------------------

// Initial dummy public WiFi spots for the map
export const publicWifiZones = [
    { name: 'Colombo Lotus Tower', coordinates: { lat: 6.9258, lng: 79.8587 }, notes: 'Free public WiFi in lobby area' },
    { name: 'Independence Square', coordinates: { lat: 6.9044, lng: 79.8696 }, notes: 'Google Station / Dialog WiFi zone' },
    { name: 'Galle Fort Law Courts Square', coordinates: { lat: 6.0305, lng: 80.2160 }, notes: 'Public WiFi zone' },
    { name: 'Kandy City Centre', coordinates: { lat: 7.2936, lng: 80.6350 }, notes: 'Mall WiFi' }
]

export const wifiAndNomad: WifiAndNomad = {
    coworkingSpaces: [
        // Colombo
        {
            id: 'regus-colombo',
            name: 'Regus',
            city: 'Colombo',
            features: ['High-speed internet', 'Professional atmosphere', 'Meeting rooms', 'Multiple locations'],
            coordinates: { lat: 6.9271, lng: 79.8612 },
            notes: 'International chain with premium facilities'
        },
        {
            id: 'ihatch-colombo',
            name: 'iHatch',
            city: 'Colombo',
            features: ['Startup friendly', 'Events & networking', 'Modern workspace'],
            coordinates: { lat: 6.9147, lng: 79.8738 },
            notes: 'Popular with local tech community'
        },
        {
            id: 'hub-colombo',
            name: 'The Hub',
            city: 'Colombo',
            features: ['Community focused', 'Events', 'Mentorship programs'],
            coordinates: { lat: 6.9034, lng: 79.8617 },
            notes: 'Great for networking'
        },
        // South Coast - Ahangama
        {
            id: 'nets-ahangama',
            name: 'NETS Cowork & Colive',
            city: 'Ahangama',
            area: 'South Coast',
            priceApprox: 150,
            features: ['Solar powered', 'Pool access', 'Beachside location', 'Coliving available'],
            coordinates: { lat: 5.9680, lng: 80.3647 },
            notes: 'Opened 2023. Eco-friendly with backup power.'
        },
        {
            id: 'focus-ahangama',
            name: 'Focus Hub Co-Working',
            city: 'Ahangama',
            area: 'South Coast',
            priceApprox: 120,
            features: ['Generator backup', 'Air conditioning', 'Quiet environment'],
            coordinates: { lat: 5.9695, lng: 80.3660 },
            notes: 'Reliable power and AC'
        },
        // Weligama
        {
            id: 'outpost-weligama',
            name: 'Outpost',
            city: 'Weligama',
            area: 'South Coast',
            features: ['Reliable WiFi', 'Beach community', 'Accommodation available', 'Events'],
            coordinates: { lat: 5.9728, lng: 80.4287 },
            notes: 'Built-in expat community. Very popular.'
        },
        {
            id: 'sugar-weligama',
            name: 'Sugar Hostel',
            city: 'Weligama',
            area: 'South Coast',
            features: ['High-speed WiFi', 'Coliving', 'Air conditioned rooms', 'Budget friendly'],
            coordinates: { lat: 5.9740, lng: 80.4300 },
            notes: 'Good for budget-conscious nomads'
        },
        {
            id: 'planb-weligama',
            name: 'Plan B Café',
            city: 'Weligama',
            area: 'South Coast',
            wifiSpeed: '600 Mbps',
            features: ['Up to 600 Mbps WiFi', 'Café atmosphere', 'Great coffee', 'Flexible hours'],
            coordinates: { lat: 5.9755, lng: 80.4320 },
            notes: 'Best WiFi speeds on the south coast'
        },
        // Hiriketiya
        {
            id: 'homebase-hiriketiya',
            name: 'HomeBase Hiriketiya',
            city: 'Hiriketiya',
            area: 'South Coast',
            features: ['Work-friendly areas', 'Good WiFi', 'Beach proximity', 'Community vibes'],
            coordinates: { lat: 5.9540, lng: 80.7070 },
            notes: 'Quiet bay perfect for focused work'
        },
        {
            id: 'clics-hiriketiya',
            name: 'CLICS Coliving',
            city: 'Hiriketiya',
            area: 'South Coast',
            features: ['Coliving', 'Workspace included', 'Community events'],
            coordinates: { lat: 5.9550, lng: 80.7080 },
            notes: 'All-inclusive coliving experience'
        },
        // Kandy
        {
            id: 'officeone-kandy',
            name: 'Office One Kandy',
            city: 'Kandy',
            area: 'Hill Country',
            features: ['Central location', 'Professional setup', 'Meeting rooms', 'AC'],
            coordinates: { lat: 7.2906, lng: 80.6337 },
            notes: 'Best professional option in Kandy'
        },
        {
            id: 'arcade-kandy',
            name: 'ARCADE Co-Working Space & Cafe',
            city: 'Kandy',
            area: 'Hill Country',
            features: ['Café atmosphere', 'Flexible hours', 'Community events', 'Good coffee'],
            coordinates: { lat: 7.2915, lng: 80.6345 },
            notes: 'Relaxed vibe in historic city'
        }
    ],
    powerCutsNotes: [
        'Power outages are common, especially outside Colombo',
        'Most coworking spaces have generators or battery backup',
        'Always carry a power bank for mobile devices',
        'Hotels often have backup power but WiFi may drop',
        'Check if accommodation has inverter/generator before booking'
    ],
    bestPractices: [
        'Use WiFi at hotels/cafes and disable background data to extend plan lifespan',
        'Choose Dialog or Mobitel for best coverage if traveling to rural areas',
        'Consider eSIM for convenience if your device supports it',
        'Purchase SIM in city for better deals than airport (10-20% cheaper)',
        'Top up data at any Dialog/Mobitel shop or via their apps',
        'Enable WiFi calling for better indoor coverage',
        'Download offline maps before leaving major cities',
        'Speed test your connection before important video calls'
    ],
    digitalNomadVisa: {
        available: true,
        cost: 500, // USD
        validityYears: 1,
        minMonthlyIncome: 2000, // USD
        requirements: [
            'Work remotely for clients/employer outside Sri Lanka',
            'Minimum $2,000/month income channeled through Sri Lankan bank',
            'Valid passport with 6+ months validity',
            'Travel insurance valid for entire stay',
            'Proof of remote work (contract/freelance agreements)'
        ],
        coversFamily: true // Includes spouse and dependents
    }
}

// -----------------------------------------------------------------------------
// RECOMMENDATIONS PRESETS
// -----------------------------------------------------------------------------

export const recommendations = {
    tourist: {
        title: 'For Most Tourists',
        providers: ['dialog', 'mobitel'],
        suggestedPlans: ['dialog-plus', 'mobitel-30day'],
        description: 'Best coverage and value. Purchase at airport for convenience or city for better prices.'
    },
    nomad: {
        title: 'For Digital Nomads',
        providers: ['dialog', 'mobitel'],
        suggestedPlans: ['dialog-premium', 'hutch-esim-premium'],
        description: 'Base on south coast for best infrastructure. Use Dialog/Mobitel for reliable connectivity.',
        recommendedAreas: ['Weligama', 'Ahangama', 'Hiriketiya']
    },
    budget: {
        title: 'For Budget Travelers',
        providers: ['hutch', 'mobitel'],
        suggestedPlans: ['hutch-tourist', 'mobitel-7day'],
        description: 'Hutch offers most affordable plans. Adequate for urban areas. May struggle in remote regions.'
    },
    shortTrip: {
        title: 'For Short Trips (< 1 week)',
        providers: ['mobitel'],
        suggestedPlans: ['mobitel-7day'],
        description: 'Mobitel 7-day plan offers best value for short visits with unlimited calls.'
    }
}

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

export function getProviderById(id: string): Provider | undefined {
    return providers.find(p => p.id === id)
}

export function getPlansByProvider(providerId: string): TouristPlan[] {
    return touristPlans.filter(p => p.providerId === providerId)
}

export function getPlanById(id: string): TouristPlan | undefined {
    return touristPlans.find(p => p.id === id)
}

export function getRegionByKey(key: RegionKey): RegionCoverage | undefined {
    return regionCoverage.find(r => r.regionKey === key)
}

export function getCoworkingByCity(city: string): CoworkingSpace[] {
    return wifiAndNomad.coworkingSpaces.filter(s =>
        s.city.toLowerCase() === city.toLowerCase() ||
        s.area?.toLowerCase() === city.toLowerCase()
    )
}

export function getCoverageScoreLabel(score: number): string {
    switch (score) {
        case 5: return 'Excellent'
        case 4: return 'Very Good'
        case 3: return 'Good'
        case 2: return 'Fair'
        case 1: return 'Limited'
        default: return 'Unknown'
    }
}

export function getCoverageColor(score: number): string {
    switch (score) {
        case 5: return 'bg-green-500'
        case 4: return 'bg-blue-500'
        case 3: return 'bg-amber-500'
        case 2: return 'bg-orange-500'
        case 1: return 'bg-red-500'
        default: return 'bg-gray-400'
    }
}

export function getBestForTagLabel(tag: BestForTag): string {
    switch (tag) {
        case 'weekender': return '🏖️ Weekender'
        case 'explorer': return '🧭 Explorer'
        case 'nomad': return '💻 Digital Nomad'
        case 'budget': return '💰 Budget'
        case 'short_trip': return '⚡ Short Trip'
        default: return tag
    }
}

export function formatPriceLKR(amount: number): string {
    return `₨${amount.toLocaleString()}`
}

export function formatPriceUSD(amount: number): string {
    return `$${amount}`
}

export interface ConnectivityEssential {
    id: string
    title: string
    icon: string
    summary: string
    details: string[]
    warning?: string
}

export const connectivityEssentials: ConnectivityEssential[] = [
    {
        id: 'buy',
        title: 'Where to Buy',
        icon: 'flight_land', // Material Symbol
        summary: 'Airport Arrival Lobby (24/7)',
        details: [
            'Dialog, Mobitel, Hutch counters at Arrival lobby',
            'Prices slightly higher than city but convenient',
            'City: Arcades, retail chains (Keells, Singer) offer deals',
            'Passport required for registration'
        ]
    },
    {
        id: 'apn',
        title: 'APN Settings',
        icon: 'settings_ethernet',
        summary: 'Usually Automatic',
        details: [
            'Dialog: "dialogbb"',
            'Mobitel: "mobitel"',
            'Hutch: "hutch3g"',
            'Restart phone after installing SIM'
        ],
        warning: 'If data fails, ensure APN is set correctly.'
    },
    {
        id: 'topup',
        title: 'Top Up Anywhere',
        icon: 'payments',
        summary: 'Easy Reload Options',
        details: [
            'Use Provider Apps (MyDialog, SelfCare)',
            'Supermarkets (Keells, Cargills) checkout counters',
            'Communication shops in every town',
            'Online banking or Daraz app'
        ]
    },
    {
        id: 'coverage',
        title: 'Coverage & Gaps',
        icon: 'signal_cellular_off',
        summary: 'Varies by Terrain',
        details: [
            'Colombo/West Coast: Excellent 4G/5G',
            'Hill Country: Signal drops common (Dialog/Mobitel best)',
            'Power cuts may affect towers (check via apps)',
            'Download offline maps for remote areas'
        ],
        warning: 'Stick to Dialog/Mobitel for deep rural travel.'
    }
]
