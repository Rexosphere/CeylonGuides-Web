import { defineEventHandler, getRouterParam, createError } from 'h3'
import path from 'node:path'
import fs from 'node:fs'

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

// Import the same location coords and scam definitions
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

function randomRecentDate(): string {
    const now = new Date()
    const daysAgo = Math.floor(Math.random() * 30)
    const hoursAgo = Math.floor(Math.random() * 24)
    now.setDate(now.getDate() - daysAgo)
    now.setHours(now.getHours() - hoursAgo)
    return now.toISOString()
}

function parseScamMd(): ScamAlert[] {
    const scams: ScamAlert[] = []

    const scamDefinitions = [
        {
            id: 'tuk-tuk-overcharging',
            title: 'Tuk-Tuk Overcharging & Detours',
            category: 'TRANSPORT_SCAM',
            severity: 'HIGH' as const,
            locations: ['Colombo', 'Kandy', 'Galle Fort', 'Negombo'],
            description: 'Scammers approach tourists with offers of a "free" city tour or claim the meter is broken. They then take you on a route through commission-earning stops (gem shops, spice gardens) and demand an exorbitant fare.',
            prevention_tips: [
                'Always insist on using a metered tuk-tuk or agree on a fixed fare before you ride',
                'Refuse unsolicited offers of "special tours"',
                'Use taxi apps (PickMe/Uber) for transparent pricing',
                'Carry small bills in local currency (LKR)'
            ]
        },
        {
            id: 'gemstone-scams',
            title: 'Gemstone Scams',
            category: 'GEM_SCAM',
            severity: 'HIGH' as const,
            locations: ['Colombo', 'Galle', 'Ratnapura', 'Kandy'],
            description: 'Tourists are lured into gem shops by tuk-tuk drivers or "helpful" locals claiming the shops are government-approved. Salespeople use high-pressure tactics to sell fake or low-quality gems at inflated prices.',
            prevention_tips: [
                'Never buy gemstones from street vendors or unsolicited shop visits',
                'Only purchase from reputable dealers with real certification',
                'Research gem prices ahead of time',
                'Avoid any shop a tuk-tuk driver or stranger insists you visit'
            ]
        },
        {
            id: 'fake-tour-guides',
            title: 'Fake Tour Guides & Touts',
            category: 'TOUR_GUIDE_SCAM',
            severity: 'HIGH' as const,
            locations: ['Temple of the Tooth', 'Sigiriya', 'Galle Fort', 'Kandy'],
            description: 'Self-appointed "guides" accost tourists at temples or historic sites offering unsolicited help. They share false facts and then demand a large tip or "fee" at the end.',
            prevention_tips: [
                'Always book guides through official channels',
                'Check for official badges or ID cards',
                'Politely decline all unsolicited offers for tours'
            ]
        },
        {
            id: 'currency-exchange-fraud',
            title: 'Currency Exchange & Card Fraud',
            category: 'SHOPPING_SCAM',
            severity: 'MEDIUM' as const,
            locations: ['Negombo', 'Airport', 'Pettah Market', 'Colombo'],
            description: 'Unscrupulous money changers may quote attractive exchange rates but short-change you with fake or missing notes. Common tricks include counting errors and hidden service fees.',
            prevention_tips: [
                'Always use licensed exchange counters or banks',
                'Never trade money on the street',
                'Count your money carefully in front of the clerk'
            ]
        },
        {
            id: 'fake-monk-blessing',
            title: 'Fake Monk/Temple Blessing Scams',
            category: 'OTHER',
            severity: 'MEDIUM' as const,
            locations: ['Temple of the Tooth', 'Kandy', 'Anuradhapura'],
            description: 'Fake monks or locals offer flowers or wristbands as a "blessing" then demand a large donation. Real Buddhist monks never handle money directly.',
            prevention_tips: [
                'Real Buddhist monks never handle money directly',
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
            description: 'Staged "fishermen" sit on stilts waiting for tourists to take photos, then demand tips. Agents may demand payment even for photos taken from a distance.',
            prevention_tips: [
                'Be aware that most stilt fishermen near tourist areas are staged',
                'Ask permission and agree on a price before taking photos'
            ]
        },
        {
            id: 'spice-garden-scams',
            title: 'Spice Garden Scams',
            category: 'SHOPPING_SCAM',
            severity: 'MEDIUM' as const,
            locations: ['Kandy', 'Matale', 'Kegalle'],
            description: 'Tuk-tuk drivers bring tourists to spice gardens for commission. A "doctor" offers free tours then pressures you to buy expensive herbs.',
            prevention_tips: [
                'Be skeptical of free tours that end with sales pitches',
                'Don\'t feel obligated to buy anything'
            ]
        },
        {
            id: 'surfboard-rental-damage',
            title: 'Surfboard Rental Damage Scams',
            category: 'OTHER',
            severity: 'MEDIUM' as const,
            locations: ['Hikkaduwa', 'Weligama', 'Unawatuna'],
            description: 'Some surf shops rent boards in poor condition then claim customers damaged them, demanding high repair fees.',
            prevention_tips: [
                'Always photograph the board\'s condition before renting',
                'Check the board thoroughly for any existing damage'
            ]
        },
        {
            id: 'friendly-local-bar-scam',
            title: '"Friendly Local" Bar/Restaurant Scams',
            category: 'RESTAURANT_SCAM',
            severity: 'MEDIUM' as const,
            locations: ['Unawatuna', 'Hikkaduwa', 'Bentota', 'Colombo'],
            description: 'Fraudsters pretend to be friendly locals, have drinks with you, then escape leaving you with hefty bills. They often work with bartenders.',
            prevention_tips: [
                'Be cautious of overly friendly strangers who invite you for drinks',
                'Keep track of your own orders and bills'
            ]
        },
        {
            id: 'hotel-staff-impersonation',
            title: 'Hotel Staff Impersonation Scams',
            category: 'ACCOMMODATION_SCAM',
            severity: 'HIGH' as const,
            locations: ['Colombo', 'Negombo', 'Kandy'],
            description: 'Scammers pretend to be hotel staff to gain trust, then suggest visits to "gem exhibitions" or other commission-earning destinations.',
            prevention_tips: [
                'Verify staff identity at the hotel reception',
                'Be suspicious of anyone not in uniform approaching outside the lobby'
            ]
        },
        {
            id: 'pickpocketing-schemes',
            title: 'Pickpocketing Schemes',
            category: 'OTHER',
            severity: 'MEDIUM' as const,
            locations: ['Pettah Market', 'Colombo', 'Kandy'],
            description: 'Someone throws paste on your shoulder, then a "helpful" local offers to clean you up while pickpocketing you.',
            prevention_tips: [
                'Keep wallets and passports in inside pockets or money belts',
                'Be wary of distractions'
            ]
        },
        {
            id: 'public-bus-scams',
            title: 'Public Bus Scams',
            category: 'TRANSPORT_SCAM',
            severity: 'LOW' as const,
            locations: ['Colombo', 'Kandy', 'Galle'],
            description: 'Bus conductors overcharge tourists without issuing tickets, or claim they don\'t have change.',
            prevention_tips: [
                'Always ask for a ticket',
                'Carry small denominations of local currency'
            ]
        },
        {
            id: 'fake-safari-guides',
            title: 'Fake Safari Guides',
            category: 'TOUR_GUIDE_SCAM',
            severity: 'HIGH' as const,
            locations: ['Yala'],
            description: 'Unlicensed guides take tourists on roads outside the national park, never entering it, while keeping entrance fees.',
            prevention_tips: [
                'Book safaris through reputable operators or hotels',
                'Verify that your ticket includes actual park entry'
            ]
        },
        {
            id: 'animal-charmer-scams',
            title: 'Animal Charmer Scams',
            category: 'OTHER',
            severity: 'LOW' as const,
            locations: ['Colombo', 'Kandy', 'Sigiriya'],
            description: 'Animal charmers force participants to pay money for photos or handling animals after engaging with their show.',
            prevention_tips: [
                'Don\'t engage with street animal performers',
                'Agree on any price before participating'
            ]
        }
    ]

    for (const scam of scamDefinitions) {
        for (const locationName of scam.locations) {
            const coords = LOCATION_COORDS[locationName] || { lat: 7.8731, lng: 80.7718 }
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

    return scams
}

let cachedScams: ScamAlert[] | null = null

function getScams(): ScamAlert[] {
    if (cachedScams) return cachedScams
    cachedScams = parseScamMd()
    return cachedScams
}

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Scam ID is required'
        })
    }

    const scams = getScams()
    const scam = scams.find(s => s.id === id)

    if (!scam) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Scam not found'
        })
    }

    return {
        success: true,
        data: scam
    }
})
