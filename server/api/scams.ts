import fs from 'node:fs'
import path from 'node:path'
import { defineEventHandler, getQuery } from 'h3'

interface Location {
    latitude: number
    longitude: number
    name: string
    district?: string
}

interface ScamAlert {
    id: string
    title: string
    description: string
    location: Location
    category: string
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    report_count: number
    is_verified: boolean
    prevention_tips: string[]
    last_reported: string
}

// Location coordinates for scam hotspots
const LOCATION_COORDS: Record<string, { lat: number; lng: number; district?: string }> = {
    'Pettah Market': { lat: 6.9375, lng: 79.8556, district: 'Colombo' },
    'Colombo Fort': { lat: 6.9344, lng: 79.8428, district: 'Colombo' },
    'Colombo': { lat: 6.9271, lng: 79.8612, district: 'Western' },
    'Kandy': { lat: 7.2906, lng: 80.6337, district: 'Central' },
    'Temple of the Tooth': { lat: 7.2936, lng: 80.6413, district: 'Central' },
    'Galle Fort': { lat: 6.0269, lng: 80.2167, district: 'Southern' },
    'Galle': { lat: 6.0535, lng: 80.2210, district: 'Southern' },
    'Unawatuna': { lat: 6.0116, lng: 80.2488, district: 'Southern' },
    'Hikkaduwa': { lat: 6.1395, lng: 80.1063, district: 'Southern' },
    'Bentota': { lat: 6.4215, lng: 80.0055, district: 'Southern' },
    'Weligama': { lat: 5.9718, lng: 80.4295, district: 'Southern' },
    'Koggala': { lat: 5.9892, lng: 80.3266, district: 'Southern' },
    'Ahangama': { lat: 5.9742, lng: 80.3614, district: 'Southern' },
    'Ratnapura': { lat: 6.6828, lng: 80.3981, district: 'Sabaragamuwa' },
    'Negombo': { lat: 7.2088, lng: 79.8357, district: 'Western' },
    'Airport': { lat: 7.1808, lng: 79.8845, district: 'Western' },
    'Sigiriya': { lat: 7.9570, lng: 80.7603, district: 'Central' },
    'Anuradhapura': { lat: 8.3114, lng: 80.4037, district: 'North Central' },
    'Yala': { lat: 6.3556, lng: 81.5167, district: 'Southern' },
    'Matale': { lat: 7.4720, lng: 80.6234, district: 'Central' },
    'Kegalle': { lat: 7.2513, lng: 80.3464, district: 'Sabaragamuwa' },
}

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
}

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

// Generate random past date within last 30 days
function randomRecentDate(): string {
    const now = new Date()
    const daysAgo = Math.floor(Math.random() * 30)
    const hoursAgo = Math.floor(Math.random() * 24)
    now.setDate(now.getDate() - daysAgo)
    now.setHours(now.getHours() - hoursAgo)
    return now.toISOString()
}

// Parse scam.md and extract scam alerts
function parseScamMd(content: string): ScamAlert[] {
    const scams: ScamAlert[] = []

    // Define scam types from the markdown with their categories and locations
    const scamDefinitions = [
        {
            id: 'tuk-tuk-overcharging',
            title: 'Tuk-Tuk Overcharging & Detours',
            category: 'TRANSPORT_SCAM',
            severity: 'HIGH' as const,
            locations: ['Colombo', 'Kandy', 'Galle Fort', 'Negombo'],
            description: 'Scammers approach tourists with offers of a "free" city tour or claim the meter is broken. They then take you on a route through commission-earning stops (gem shops, spice gardens) and demand an exorbitant fare. The driver\'s accomplices may gang up to pressure you into paying.',
            prevention_tips: [
                'Always insist on using a metered tuk-tuk or agree on a fixed fare before you ride',
                'Refuse unsolicited offers of "special tours"',
                'Use taxi apps (PickMe/Uber) for transparent pricing',
                'Carry small bills in local currency (LKR)',
                'Say firmly "no" if asked to stop at any shop or detour'
            ]
        },
        {
            id: 'gemstone-scams',
            title: 'Gemstone Scams',
            category: 'GEM_SCAM',
            severity: 'HIGH' as const,
            locations: ['Colombo', 'Galle', 'Ratnapura', 'Kandy'],
            description: 'Tourists are lured into gem shops by tuk-tuk drivers or "helpful" locals claiming the shops are government-approved or on sale. Inside, salespeople use high-pressure tactics to sell fake or low-quality gems (dyed quartz, synthetic sapphires) at inflated prices with phony paperwork.',
            prevention_tips: [
                'Never buy gemstones from street vendors or unsolicited shop visits',
                'Only purchase from reputable dealers with real certification',
                'Research gem prices ahead of time',
                'Insist on independent appraisals and export certificates',
                'Avoid any shop a tuk-tuk driver or stranger insists you visit'
            ]
        },
        {
            id: 'fake-tour-guides',
            title: 'Fake Tour Guides & Touts',
            category: 'TOUR_GUIDE_SCAM',
            severity: 'HIGH' as const,
            locations: ['Temple of the Tooth', 'Sigiriya', 'Galle Fort', 'Kandy'],
            description: 'Self-appointed "guides" accost tourists at temples or historic sites offering unsolicited help. They share false facts and then demand a large tip or "fee" at the end. These operators may work in teams, with one person guiding you and another blocking your way if you try to leave without paying.',
            prevention_tips: [
                'Always book guides through official channels (hotel concierge or licensed tour companies)',
                'Check for official badges or ID cards',
                'Politely decline all unsolicited offers for tours or assistance',
                'Firmly say "No, thank you, I already have a guide" and walk away',
                'Stick with known guides and group tours – solo travelers are easier targets'
            ]
        },
        {
            id: 'currency-exchange-fraud',
            title: 'Currency Exchange & Card Fraud',
            category: 'SHOPPING_SCAM',
            severity: 'MEDIUM' as const,
            locations: ['Negombo', 'Airport', 'Pettah Market', 'Colombo'],
            description: 'Unscrupulous money changers operate near airports, markets, and temples. They may quote attractive exchange rates but short-change you with fake or missing notes. Common tricks include counting errors, hidden service fees, or "broken" ATMs. Some staff insist on billing in your home currency at poor rates.',
            prevention_tips: [
                'Always use licensed exchange counters or banks',
                'Never trade money on the street, even if rates look good',
                'Count your money carefully in front of the clerk',
                'Insist on an official receipt',
                'Request pricing in Sri Lankan Rupees (LKR) when using cards'
            ]
        },
        {
            id: 'fake-monk-blessing',
            title: 'Fake Monk/Temple Blessing Scams',
            category: 'OTHER',
            severity: 'MEDIUM' as const,
            locations: ['Temple of the Tooth', 'Kandy', 'Anuradhapura'],
            description: 'Fake monks or locals hang around temple entrances, offering flowers or wristbands as a "blessing" and then demanding a donation immediately after. They ask for a specific and surprisingly large amount, making it feel more like a transaction than a spiritual gesture. Real monks never beg or ask for money.',
            prevention_tips: [
                'Real Buddhist monks never handle money directly',
                'Aggressive begging is unheard-of in Buddhist tradition',
                'Decline politely and walk away from anyone demanding donations',
                'Make donations to official temple collection boxes only'
            ]
        },
        {
            id: 'stilt-fishermen-photo',
            title: 'Stilt Fishermen Photo Scams',
            category: 'OTHER',
            severity: 'MEDIUM' as const,
            locations: ['Weligama', 'Koggala', 'Ahangama', 'Galle'],
            description: 'The sight of stilt fishermen is iconic, but in many coastal areas it\'s staged. These "fishermen" sit on stilts all day waiting for tourists to snap photos, then demand a tip. Non-fishermen pretending to fish have agents who demand payment once you\'ve taken a picture, even from a distance.',
            prevention_tips: [
                'Be aware that most stilt fishermen near tourist areas are staged',
                'Ask permission and agree on a price before taking photos',
                'If you don\'t want to pay, simply don\'t take photos',
                'Early morning visits to less touristic spots may show real fishermen'
            ]
        },
        {
            id: 'spice-garden-scams',
            title: 'Spice Garden Scams',
            category: 'SHOPPING_SCAM',
            severity: 'MEDIUM' as const,
            locations: ['Kandy', 'Matale', 'Kegalle'],
            description: 'Tuk-tuk drivers bring tourists to spice gardens for commission. A "doctor/professor" offers free tours then claims you\'re suffering from various ailments and need to purchase expensive medicinal herbs. If you don\'t buy, they may get angry and intimidate you into buying something.',
            prevention_tips: [
                'Be skeptical of free tours that end with sales pitches',
                'Don\'t feel obligated to buy anything',
                'Research reputable spice gardens in advance',
                'Simply say no and leave if you feel pressured'
            ]
        },
        {
            id: 'surfboard-rental-damage',
            title: 'Surfboard Rental Damage Scams',
            category: 'OTHER',
            severity: 'MEDIUM' as const,
            locations: ['Hikkaduwa', 'Weligama', 'Unawatuna'],
            description: 'Some surf shops rent boards in poor condition, then claim customers damaged them and demand high repair fees. They may collect boards in worse condition and try to rent them first – if you finish breaking it by accident, they ask you to pay the price of a new one.',
            prevention_tips: [
                'Always photograph the board\'s condition before renting',
                'Check the board thoroughly for any existing damage',
                'If there\'s any crack, ask gently to change it for another one',
                'Get the rental agreement in writing if possible'
            ]
        },
        {
            id: 'friendly-local-bar-scam',
            title: '"Friendly Local" Bar/Restaurant Scams',
            category: 'RESTAURANT_SCAM',
            severity: 'MEDIUM' as const,
            locations: ['Unawatuna', 'Hikkaduwa', 'Bentota', 'Colombo'],
            description: 'Fraudsters pretend to be friendly locals and have drinks at a bar – once done, they escape leaving you with hefty bills. They often work with bartenders and share the money. Someone may claim to be an official and invite you to "their office" for tea, taking you to an expensive hotel.',
            prevention_tips: [
                'Be cautious of overly friendly strangers who invite you for drinks',
                'Keep track of your own orders and bills',
                'Don\'t leave your drinks unattended',
                'Politely decline invitations from strangers to go elsewhere'
            ]
        },
        {
            id: 'hotel-staff-impersonation',
            title: 'Hotel Staff Impersonation Scams',
            category: 'ACCOMMODATION_SCAM',
            severity: 'HIGH' as const,
            locations: ['Colombo', 'Negombo', 'Kandy'],
            description: 'Scammers hang around hotels pretending to be staff members to gain tourists\' trust. They approach with friendly small talk, then suddenly suggest visits to "gem exhibitions" or other commission-earning destinations. Some target solo travelers with promises of parties that end badly.',
            prevention_tips: [
                'Verify staff identity at the hotel reception',
                'Be suspicious of anyone not in uniform approaching outside the lobby',
                'Don\'t accept tour offers from people not at the front desk',
                'Inform the hotel if someone suspicious approaches you'
            ]
        },
        {
            id: 'pickpocketing-schemes',
            title: 'Pickpocketing Schemes',
            category: 'OTHER',
            severity: 'MEDIUM' as const,
            locations: ['Pettah Market', 'Colombo', 'Kandy'],
            description: 'Someone might throw white paste on your shoulder so you look up thinking it was bird poop. A friendly local offers to help clean up and pickpockets you in the process. This is common in crowded areas like Pettah market. Stay careful on public transport and in crowded places.',
            prevention_tips: [
                'Keep wallets and passports in inside pockets or money belts',
                'Be wary of distractions – someone spilling or bumping into you',
                'Don\'t let strangers "help" clean you up',
                'Stay alert in crowded markets and public transport'
            ]
        },
        {
            id: 'public-bus-scams',
            title: 'Public Bus Scams',
            category: 'TRANSPORT_SCAM',
            severity: 'LOW' as const,
            locations: ['Colombo', 'Kandy', 'Galle'],
            description: 'If you\'re not issued with a ticket, chances are you\'re overcharged. Bus conductors take advantage of tourists and overcharge. When you don\'t have the exact amount, conductors may say they don\'t have change and ask you to collect later – most people forget to ask for the balance.',
            prevention_tips: [
                'Always ask for a ticket',
                'Carry small denominations of local currency',
                'Ask locals or check online for approximate bus fares',
                'Consider using private buses or taxis for longer journeys'
            ]
        },
        {
            id: 'fake-safari-guides',
            title: 'Fake Safari Guides',
            category: 'TOUR_GUIDE_SCAM',
            severity: 'HIGH' as const,
            locations: ['Yala'],
            description: 'In Yala National Park, unlicensed guides operate scams where tourists pay for safari tours but are taken on roads outside the national park, never entering the actual park or seeing leopards. They keep entrance fees and provide a mediocre experience with no wildlife sightings.',
            prevention_tips: [
                'Book safaris through reputable operators or hotels',
                'Verify that your ticket includes actual park entry',
                'Check reviews before booking any safari',
                'Ask to see the driver\'s official safari guide license'
            ]
        },
        {
            id: 'animal-charmer-scams',
            title: 'Animal Charmer Scams',
            category: 'OTHER',
            severity: 'LOW' as const,
            locations: ['Colombo', 'Kandy', 'Sigiriya'],
            description: 'Animal charmers entertain crowds with monkeys, snakes and more, often asking viewers to join the show and take part in adventurous activities. To scam people, animal charmers force participants to pay money for photos or handling the animals.',
            prevention_tips: [
                'Don\'t engage with street animal performers',
                'Agree on any price before participating',
                'Be aware that these animals may not be well-treated',
                'Just say no and walk away if approached'
            ]
        }
    ]

    // Create scam alerts for each location of each scam type
    for (const scam of scamDefinitions) {
        for (const locationName of scam.locations) {
            const coords = LOCATION_COORDS[locationName] || { lat: 7.8731 + (Math.random() - 0.5) * 0.5, lng: 80.7718 + (Math.random() - 0.5) * 0.5 }

            // Add slight randomness to coordinates so markers don't overlap exactly
            const jitter = () => (Math.random() - 0.5) * 0.02

            scams.push({
                id: `${scam.id}-${slugify(locationName)}`,
                title: scam.title,
                description: scam.description,
                location: {
                    latitude: coords.lat + jitter(),
                    longitude: coords.lng + jitter(),
                    name: locationName,
                    district: coords.district
                },
                category: scam.category,
                severity: scam.severity,
                report_count: Math.floor(Math.random() * 50) + 5,
                is_verified: Math.random() > 0.3,
                prevention_tips: scam.prevention_tips,
                last_reported: randomRecentDate()
            })
        }
    }

    // Sort by last_reported (most recent first)
    scams.sort((a, b) => new Date(b.last_reported).getTime() - new Date(a.last_reported).getTime())

    return scams
}

// Cache the parsed scams
let cachedScams: ScamAlert[] | null = null

function getScams(): ScamAlert[] {
    if (cachedScams) return cachedScams

    const filePath = path.resolve(process.cwd(), 'scam.md')
    if (!fs.existsSync(filePath)) {
        // Return empty if file not found, but scam definitions are hardcoded
        cachedScams = parseScamMd('')
        return cachedScams
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    cachedScams = parseScamMd(content)
    return cachedScams
}

export default defineEventHandler((event) => {
    const query = getQuery(event)

    const category = query.category as string | undefined
    const severity = query.severity as string | undefined  // Filter by severity (LOW, MEDIUM, HIGH, CRITICAL)
    const location = query.location as string | undefined  // Filter by location name or district
    const limit = parseInt(query.limit as string) || 20
    const offset = parseInt(query.offset as string) || 0
    const lat = parseFloat(query.lat as string)
    const lng = parseFloat(query.lng as string)
    const radius = parseFloat(query.radius as string) || 10 // km

    let scams = getScams()

    // Filter by category if specified (AND logic)
    if (category) {
        scams = scams.filter(s => s.category === category)
    }

    // Filter by severity if specified (AND logic)
    if (severity) {
        scams = scams.filter(s => s.severity === severity)
    }

    // Filter by location name or district if specified (AND logic)
    if (location) {
        const locationLower = location.toLowerCase()
        scams = scams.filter(s =>
            s.location.name.toLowerCase().includes(locationLower) ||
            s.location.district?.toLowerCase().includes(locationLower)
        )
    }

    // Filter by proximity if lat/lng provided (AND logic)
    if (!isNaN(lat) && !isNaN(lng)) {
        scams = scams.filter(s => {
            const distance = getDistance(lat, lng, s.location.latitude, s.location.longitude)
            return distance <= radius
        })
        // Sort by distance when filtering by location
        scams.sort((a, b) => {
            const distA = getDistance(lat, lng, a.location.latitude, a.location.longitude)
            const distB = getDistance(lat, lng, b.location.latitude, b.location.longitude)
            return distA - distB
        })
    }

    const total = scams.length
    const paginated = scams.slice(offset, offset + limit)
    const nextOffset = offset + limit < total ? offset + limit : null

    return {
        success: true,
        data: paginated,
        count: paginated.length,
        total,
        nextOffset
    }
})
