
import fs from 'node:fs'
import path from 'node:path'
import { defineEventHandler } from 'h3'

interface Amenity {
    icon: string
    label: string
}

interface Accommodation {
    id: string
    image: string
    title: string
    location: string
    type: string
    tag?: string
    isSafetyCertified?: boolean
    safetyScore?: number // Mocked
    amenities: Amenity[]
    price: number
    rating: number
    reviews: number
    lat?: number
    lng?: number
    description?: string
    region?: string
}

// Image pool for fallback
const IMAGE_POOL = [
    '/images/downloaded_2a958f931436.avif', // Nice villa
    '/images/downloaded_151b36c7aade.avif', // Pool view
    '/images/downloaded_3d3dcfa78790.avif', // Hero style
    '/images/downloaded_7bb9f5cc5d8e.avif', // Nature
    '/images/downloaded_be46d60c414a.avif', // Luxury
    '/images/downloaded_c08da80504a7.avif', // Resort
    '/images/downloaded_5dcf59d2f707.avif', // Beach
    '/images/downloaded_135ae74fa037.avif', // Interior
    '/images/downloaded_5ff6b6bbf9ad.avif', // Garden
    '/images/downloaded_3a8fa6a7d1ee.avif', // Cozy
]

// City Coordinates Map
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
    'Colombo': { lat: 6.9271, lng: 79.8612 },
    'Negombo': { lat: 7.2088, lng: 79.8357 },
    'Kandy': { lat: 7.2906, lng: 80.6337 },
    'Galle': { lat: 6.0535, lng: 80.2210 },
    'Sigiriya': { lat: 7.9570, lng: 80.7603 },
    'Dambulla': { lat: 7.8731, lng: 80.7718 },
    'Nuwara Eliya': { lat: 6.9497, lng: 80.7891 },
    'Ella': { lat: 6.8667, lng: 81.0466 },
    'Tangalle': { lat: 6.0244, lng: 80.7941 },
    'Dickwella': { lat: 5.9656, lng: 80.6978 },
    'Udawalawe': { lat: 6.4746, lng: 80.8833 },
    'Matale': { lat: 7.4720, lng: 80.6234 },
    'Kotugoda': { lat: 7.1650, lng: 79.9000 },
    'Arugam Bay': { lat: 6.8412, lng: 81.8347 },
    'Trincomalee': { lat: 8.5874, lng: 81.2152 },
    'Jaffna': { lat: 9.6615, lng: 80.0255 },
    'Bentota': { lat: 6.4215, lng: 80.0055 },
    'Unawatuna': { lat: 6.0116, lng: 80.2488 },
    'Mirissa': { lat: 5.9482, lng: 80.4716 },
    'Hikkaduwa': { lat: 6.1395, lng: 80.1063 },
    'Tissamaharama': { lat: 6.2731, lng: 81.2856 },
    'Yala': { lat: 6.3556, lng: 81.5167 },
    'Haputale': { lat: 6.7694, lng: 80.9576 },
}

// Amenity Keyword Mapper
function mapAmenities(text: string): Amenity[] {
    const lower = text.toLowerCase()
    const list: Amenity[] = []

    if (lower.includes('pool')) list.push({ icon: 'pool', label: 'Pool' })
    if (lower.includes('wi-fi') || lower.includes('wifi')) list.push({ icon: 'wifi', label: 'WiFi' })
    if (lower.includes('spa')) list.push({ icon: 'spa', label: 'Spa' })
    if (lower.includes('breakfast')) list.push({ icon: 'free_breakfast', label: 'Breakfast' })
    if (lower.includes('parking')) list.push({ icon: 'local_parking', label: 'Parking' })
    if (lower.includes('restaurant') || lower.includes('dining')) list.push({ icon: 'restaurant', label: 'Restaurant' })
    if (lower.includes('shuttle') || lower.includes('airport')) list.push({ icon: 'airport_shuttle', label: 'Shuttle' })
    if (lower.includes('garden')) list.push({ icon: 'yard', label: 'Garden' })
    if (lower.includes('gym') || lower.includes('fitness')) list.push({ icon: 'fitness_center', label: 'Gym' })
    if (lower.includes('air-conditioning') || lower.includes('ac')) list.push({ icon: 'ac_unit', label: 'A/C' })

    return list
}

function slugify(text: string) {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
}

export default defineEventHandler((event) => {
    const filePath = path.resolve(process.cwd(), 'accommodation.md')

    if (!fs.existsSync(filePath)) {
        return { success: false, data: [], error: 'File not found' }
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')

    const accommodations: Accommodation[] = []
    let currentRegion = ''
    let imageIndex = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i] // Keep raw line for indentation check
        if (!line) continue
        const trimmed = line.trim()

        if (!trimmed) continue

        // Header Detection (Regions)
        // Heuristic: Not indented, not part of intro, usually Title Case
        if (!line.startsWith(' ') && !line.startsWith('\t')) {
            // Skip known non-region headers
            if (trimmed.startsWith('Sri Lanka Travel') || trimmed.startsWith('Map of') || trimmed.startsWith('Sources:') || trimmed.startsWith('##') || trimmed.startsWith('###')) {
                continue
            }
            // Assuming it's a region
            currentRegion = trimmed
            continue
        }

        // Item Detection (Indented)
        if ((line.startsWith(' ') || line.startsWith('\t')) && trimmed.length > 20 && trimmed.includes('Rating:')) {
            // Parse main line
            // Format: Name, City (District) – Type. Rating: ...

            try {
                const titlePart = trimmed.split('–')[0] || trimmed.split('-')[0]
                if (!titlePart) continue
                const restPart = trimmed.substring(titlePart.length + 1) // +1 for dash

                // Title parsing: "Belmont Boutique Hotel, Negombo (Gampaha District)"
                const lastCommaIndex = titlePart.lastIndexOf(',')
                const title = titlePart.substring(0, lastCommaIndex).trim()
                const location = titlePart.substring(lastCommaIndex + 1).trim() // "Negombo (Gampaha District)"

                // Type parsing: "4-star hotel. Rating: ..."
                const typeEndIndex = restPart.indexOf('. Rating:')
                const type = restPart.substring(0, typeEndIndex).trim()

                // Rating parsing: "Rating: 9.0/10 (1,612 reviews);"
                const ratingMatch = restPart.match(/Rating:\s*([\d.]+)\/10\s*\(([\d,]+)\s*reviews\)/)
                const rating = ratingMatch && ratingMatch[1] ? parseFloat(ratingMatch[1]) : 0
                const reviews = ratingMatch && ratingMatch[2] ? parseInt(ratingMatch[2].replace(/,/g, '')) : 0

                // Price parsing: "From: ~$99."
                const priceMatch = restPart.match(/From:\s*[~$]*([\d]+)/)
                const price = priceMatch && priceMatch[1] ? parseInt(priceMatch[1]) : 50 // Default

                // Amenity parsing: "Amenities include ... Desc:"
                const amenitiesStart = restPart.indexOf('Amenities')
                const descStart = restPart.indexOf('Desc:')

                let amenitiesText = ''
                let descText = ''

                if (amenitiesStart !== -1 && descStart !== -1) {
                    amenitiesText = restPart.substring(amenitiesStart, descStart).trim()
                    // Clean up "Amenities: " or "Amenities include "
                    amenitiesText = amenitiesText.replace(/^Amenities[:\s]*(include)?/, '')
                    // Desc
                    descText = restPart.substring(descStart).replace(/^Desc:\s*[“"]/, '').replace(/[”"]$/, '')
                }

                const amenities = mapAmenities(amenitiesText)

                // Mock safety score
                const safetyScore = Math.floor(Math.random() * 20) + 80

                // Geocoding
                const cityOnly = location?.split('(')[0]?.trim() || location
                const coords = CITY_COORDS[cityOnly] || { lat: 7.8731 + (Math.random() - 0.5), lng: 80.7718 + (Math.random() - 0.5) } // Default random near center if unknown

                accommodations.push({
                    id: slugify(title),
                    title: title,
                    location: cityOnly, // Clean location
                    type: type.toUpperCase().replace(/\s+/g, '_'),
                    amenities: amenities,
                    price: price,
                    rating: rating,
                    reviews: reviews,
                    image: (IMAGE_POOL[imageIndex % IMAGE_POOL.length] as string),
                    isSafetyCertified: Math.random() > 0.3, // Mock based on description if possible, else random or true
                    safetyScore: safetyScore,
                    tag: rating > 9.5 ? 'Top Rated' : (price < 40 ? 'Best Value' : undefined),
                    region: currentRegion,
                    description: descText,
                    lat: coords.lat,
                    lng: coords.lng + (Math.random() * 0.02 - 0.01) // Jitter for same city
                })

                imageIndex++

            } catch (e) {
                console.warn('Failed to parse line:', trimmed, e)
            }
        }
    }

    // Filter out any parse failures
    const cleanAccommodations = accommodations.filter(a => a.title && a.price)

    // Sort by rating default
    cleanAccommodations.sort((a, b) => b.rating - a.rating)

    return {
        success: true,
        data: cleanAccommodations
    }
})
