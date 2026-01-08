import { defineEventHandler, readBody, createError } from 'h3'

// Stub endpoint for submitting a new scam report
// In a real application, this would insert into a database
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validate required fields
    if (!body.title || !body.description || !body.category || !body.location_name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: title, description, category, location_name'
        })
    }

    // In production, this would create a new scam report in the database
    // For this demo, we just return success with a mock ID

    return {
        success: true,
        message: 'Scam report submitted successfully',
        data: {
            id: `user-report-${Date.now()}`,
            ...body,
            severity: body.severity || 'MEDIUM',
            report_count: 1,
            is_verified: false,
            last_reported: new Date().toISOString()
        }
    }
})
