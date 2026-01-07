
interface OpenMeteoHourlyResponse {
    current: {
        apparent_temperature: number
        relative_humidity_2m: number
        wind_speed_10m: number
    }
    hourly: {
        time: string[]
        temperature_2m: number[]
        weather_code: number[]
    }
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const latParam = query.lat
    const lonParam = query.lon

    if (!latParam || !lonParam) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Latitude (lat) and Longitude (lon) are required',
        })
    }

    const lat = parseFloat(String(latParam))
    const lon = parseFloat(String(lonParam))

    try {
        const response = await $fetch<OpenMeteoHourlyResponse>('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: lat,
                longitude: lon,
                current: 'apparent_temperature,relative_humidity_2m,wind_speed_10m',
                hourly: 'temperature_2m,weather_code',
                timezone: 'auto',
                forecast_days: 1
            }
        })

        const getWeatherDescription = (code: number): string => {
            const codes: Record<number, string> = {
                0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
                45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
                55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
                71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
                80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
                95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
            }
            return codes[code] || 'Unknown'
        }

        // Normalize hourly data
        const hourlyData = response.hourly.time.map((time, index) => ({
            time,
            tempC: response.hourly.temperature_2m[index],
            weatherCode: response.hourly.weather_code[index],
            conditionText: getWeatherDescription(response.hourly.weather_code[index] ?? 0)
        }))

        // Filter for next 24 hours from now
        const now = new Date()
        const next24h = hourlyData.filter(h => new Date(h.time) > now).slice(0, 24)

        return {
            current: {
                feelsLikeC: response.current.apparent_temperature,
                humidity: response.current.relative_humidity_2m,
                windKmh: response.current.wind_speed_10m
            },
            hourly: next24h
        }

    } catch (error) {
        console.error('Hourly Weather API Error:', error)
        throw createError({
            statusCode: 502,
            statusMessage: 'Failed to fetch hourly weather data',
        })
    }
})
