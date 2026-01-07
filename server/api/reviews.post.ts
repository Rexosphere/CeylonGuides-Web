import { defineEventHandler, readBody, createError } from 'h3'
import { promises as fs } from 'fs'
import { resolve } from 'path'

const DATA_DIR = resolve(process.cwd(), 'server/data')
const REVIEWS_FILE = resolve(DATA_DIR, 'reviews.json')

interface ReviewSubmission {
    restroomId: string
    rating: number // 1-5
    note?: string
    isFree?: boolean
    amountLKR?: number
    wheelchairAccessible?: boolean
    timestamp: string
}

async function ensureFile() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true })
        try {
            await fs.access(REVIEWS_FILE)
        } catch {
            await fs.writeFile(REVIEWS_FILE, '[]', 'utf-8')
        }
    } catch (e) {
        console.error('Failed to ensure reviews file:', e)
    }
}

export default defineEventHandler(async (event) => {
    await ensureFile()

    const body = await readBody<ReviewSubmission>(event)

    // Validation
    if (!body.restroomId || !body.rating || body.rating < 1 || body.rating > 5) {
        throw createError({
            statusCode: 400,
            message: 'Invalid review data'
        })
    }

    const newReview: ReviewSubmission = {
        restroomId: body.restroomId,
        rating: body.rating,
        note: body.note ? body.note.slice(0, 500) : undefined, // Limit note length
        isFree: body.isFree,
        amountLKR: body.amountLKR,
        wheelchairAccessible: body.wheelchairAccessible,
        timestamp: new Date().toISOString()
    }

    try {
        const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
        const reviews: ReviewSubmission[] = JSON.parse(data)

        reviews.push(newReview)

        await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8')

        return { success: true, review: newReview }
    } catch (e) {
        console.error('Failed to save review:', e)
        throw createError({
            statusCode: 500,
            message: 'Failed to save review'
        })
    }
})
