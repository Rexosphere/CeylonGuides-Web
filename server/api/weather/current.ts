
// Define exact response shape for type safety
interface OpenMeteoResponse {
    current: {
        temperature_2m: number
        weather_code: number
        wind_speed_10m: number
        relative_humidity_2m: number | null
        time: string
    }
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const latParam = query.lat
    const lonParam = query.lon

    // 1. Validation
    if (!latParam || !lonParam) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Latitude (lat) and Longitude (lon) are required',
        })
    }

    const lat = parseFloat(String(latParam))
    const lon = parseFloat(String(lonParam))

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid coordinates provided',
        })
    }

    try {
        // 2. Call Open-Meteo with explicit generic
        const response = await $fetch<OpenMeteoResponse>('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: lat,
                longitude: lon,
                current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
                timezone: 'auto'
            }
        })

        const current = response.current

        // WMO Weather interpretation
        const getWeatherDescription = (code: number): string => {
            const codes: Record<number, string> = {
                0: 'Clear sky',
                1: 'Mainly clear',
                2: 'Partly cloudy',
                3: 'Overcast',
                45: 'Fog',
                48: 'Depositing rime fog',
                51: 'Light drizzle',
                53: 'Moderate drizzle',
                55: 'Dense drizzle',
                56: 'Light freezing drizzle',
                57: 'Dense freezing drizzle',
                61: 'Slight rain',
                63: 'Moderate rain',
                65: 'Heavy rain',
                66: 'Light freezing rain',
                67: 'Heavy freezing rain',
                71: 'Slight snow fall',
                73: 'Moderate snow fall',
                75: 'Heavy snow fall',
                77: 'Snow grains',
                80: 'Slight rain showers',
                81: 'Moderate rain showers',
                82: 'Violent rain showers',
                85: 'Slight snow showers',
                86: 'Heavy snow showers',
                95: 'Thunderstorm',
                96: 'Thunderstorm with slight hail',
                99: 'Thunderstorm with heavy hail',
            }
            return codes[code] || 'Unknown'
        }

        // 3. Normalize Response
        return {
            temperatureC: current.temperature_2m,
            weatherCode: current.weather_code,
            conditionText: getWeatherDescription(current.weather_code),
            windKmh: current.wind_speed_10m,
            humidityPercent: current.relative_humidity_2m ?? null,
            observedAt: current.time,
            fetchedAt: new Date().toISOString()
        }

    } catch (error) {
        console.error('Weather API Error:', error)
        throw createError({
            statusCode: 502,
            statusMessage: 'Failed to fetch weather data from upstream provider',
        })
    }
})
