export interface City {
    id: string
    name: string
    regionKey: string
    lat: number
    lon: number
    displayLabel: string
}

export interface Region {
    key: string
    label: string
    primaryCityId?: string
    cityIds: string[]
}

export const cities: City[] = [
    {
        id: 'colombo',
        name: 'Colombo',
        regionKey: 'west_south',
        lat: 6.9271,
        lon: 79.8612,
        displayLabel: 'West Coast'
    },
    {
        id: 'galle',
        name: 'Galle',
        regionKey: 'west_south',
        lat: 6.0535,
        lon: 80.2210,
        displayLabel: 'South Coast'
    },
    {
        id: 'kandy',
        name: 'Kandy',
        regionKey: 'hill_country',
        lat: 7.2906,
        lon: 80.6337,
        displayLabel: 'Central Hills'
    },
    {
        id: 'trincomalee',
        name: 'Trincomalee',
        regionKey: 'east',
        lat: 8.5711,
        lon: 81.2335,
        displayLabel: 'East Coast'
    },
    {
        id: 'jaffna',
        name: 'Jaffna',
        regionKey: 'northern',
        lat: 9.6615,
        lon: 80.0255,
        displayLabel: 'Northern'
    }
]

export const regions: Region[] = [
    {
        key: 'all',
        label: 'All Regions',
        cityIds: ['colombo', 'galle', 'kandy', 'trincomalee', 'jaffna']
    },
    {
        key: 'west_south',
        label: 'West & South',
        primaryCityId: 'colombo',
        cityIds: ['colombo', 'galle']
    },
    {
        key: 'east',
        label: 'East Coast',
        primaryCityId: 'trincomalee',
        cityIds: ['trincomalee']
    },
    {
        key: 'hill_country',
        label: 'Hill Country',
        primaryCityId: 'kandy',
        cityIds: ['kandy']
    },
    {
        key: 'cultural_triangle',
        label: 'Cultural Triangle',
        // No specific city from the requested list falls strictly here, 
        // but often Kandy is considered a gateway. Leaving empty as per strict list.
        cityIds: []
    },
    {
        key: 'northern',
        label: 'Northern',
        primaryCityId: 'jaffna',
        cityIds: ['jaffna']
    }
]

// --- Seasonal Data Helpers ---

export interface SeasonalInfo {
    label: string
    condition: 'peak' | 'good' | 'mixed' | 'monsoon'
    tip: string
}

export const getSeasonalInfo = (regionKey: string, monthIndex: number): SeasonalInfo => {
    // 0 = Jan, 11 = Dec

    // West & South: Peak (Dec-Mar), Monsoon (May-Sep)
    if (regionKey === 'west_south' || regionKey === 'colombo') {
        if ([11, 0, 1, 2].includes(monthIndex)) return { label: 'Peak Season', condition: 'peak', tip: 'Perfect for beaches. Book early!' }
        if ([3, 9, 10].includes(monthIndex)) return { label: 'Shoulder Season', condition: 'mixed', tip: 'Expect some rain, but lower prices.' }
        return { label: 'Monsoon Season', condition: 'monsoon', tip: 'South-west monsoon. Seas rough, rain frequent.' }
    }

    // East: Peak (May-Sep), Monsoon (Oct-Jan)
    if (regionKey === 'east' || regionKey === 'trincomalee') {
        if ([4, 5, 6, 7, 8].includes(monthIndex)) return { label: 'Peak Season', condition: 'peak', tip: 'Calm seas, perfect for diving.' }
        if ([2, 3, 9].includes(monthIndex)) return { label: 'Shoulder Season', condition: 'mixed', tip: 'Transition period. Good balance.' }
        return { label: 'Monsoon Season', condition: 'monsoon', tip: 'North-east monsoon. Heavy rains likely.' }
    }

    // Hill Country: Dry (Jan-Mar), Wet (Oct-Dec)
    if (regionKey === 'hill_country' || regionKey === 'kandy') {
        if ([0, 1, 2].includes(monthIndex)) return { label: 'Dry Season', condition: 'peak', tip: 'Best for hiking and tea plantations.' }
        if ([3, 4, 5, 6, 7, 8].includes(monthIndex)) return { label: 'Mixed Weather', condition: 'mixed', tip: 'Pleasant, occasional showers.' }
        return { label: 'Wet Season', condition: 'monsoon', tip: 'Misty and rainy. Bring warm clothes.' }
    }

    // Northern: Dry (Jan-Sep), Wet (Oct-Dec)
    if (regionKey === 'northern' || regionKey === 'jaffna') {
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8].includes(monthIndex)) return { label: 'Dry Season', condition: 'peak', tip: 'Hot and dry. Great for culture.' }
        return { label: 'Wet Season', condition: 'monsoon', tip: 'Northeast monsoon influences.' }
    }

    // Default fallback
    return { label: 'Good Season', condition: 'good', tip: 'Sri Lanka is a year-round destination.' }
}

export interface Recommendation {
    regionKey: string
    destinations: string[]
    reason: string
}

export const getMonthlyRecommendations = (monthIndex: number): Recommendation[] => {
    // 0 = Jan, 11 = Dec

    // Maha Season (Dec-Mar): West & South are best
    if ([11, 0, 1, 2].includes(monthIndex)) {
        return [
            {
                regionKey: 'west_south',
                destinations: ['Galle', 'Mirissa', 'Hikkaduwa'],
                reason: 'Sunny skies & calm seas. Perfect for beaches and whales.'
            },
            {
                regionKey: 'hill_country',
                destinations: ['Ella', 'Nuwara Eliya'],
                reason: 'Drier and cooler. Ideal for hiking and tea trails.'
            }
        ]
    }

    // Yala Season (May-Sep): East is best
    if ([4, 5, 6, 7, 8].includes(monthIndex)) {
        return [
            {
                regionKey: 'east',
                destinations: ['Trincomalee', 'Arugam Bay', 'Pasikudah'],
                reason: 'Best beach weather. Great for surfing and diving.'
            },
            {
                regionKey: 'cultural_triangle',
                destinations: ['Sigiriya', 'Polonnaruwa'],
                reason: 'Less rain than the south coast.'
            }
        ]
    }

    // Inter-monsoon / Shoulder (Apr, Oct, Nov)
    if (monthIndex === 3) { // April
        return [
            {
                regionKey: 'hill_country',
                destinations: ['Kandy', 'Ella'],
                reason: 'Lush greenery after rains, often pleasant.'
            },
            {
                regionKey: 'northern',
                destinations: ['Jaffna'],
                reason: 'Hot but culturally vibrant. New Year season.'
            }
        ]
    }

    // Oct/Nov - Unpredictable but North/North-Central often clearer
    return [
        {
            regionKey: 'northern',
            destinations: ['Jaffna', 'Mannar'],
            reason: 'Often escapes the heaviest inter-monsoon showers.'
        },
        {
            regionKey: 'cultural_triangle',
            destinations: ['Anuradhapura'],
            reason: 'Rich history, mix of sun and showers.'
        }
    ]
}
