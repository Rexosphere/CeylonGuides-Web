import { defineEventHandler } from 'h3'
import { promises as fs } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Resolving to project root/server/data
// Note: In production this path strategy might differ, but for dev this works.
// Better to use process.cwd()
const DATA_DIR = resolve(process.cwd(), 'server/data')
const REVIEWS_FILE = resolve(DATA_DIR, 'reviews.json')

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

export default defineEventHandler(async () => {
    await ensureFile()
    try {
        const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (e) {
        console.error('Failed to read reviews:', e)
        return []
    }
})
