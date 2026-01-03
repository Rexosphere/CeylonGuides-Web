/**
 * Safe HTML utilities for CeylonGuide
 * Prevents XSS attacks while allowing basic formatting
 */

/**
 * Escape HTML entities to prevent XSS attacks
 */
export function escapeHtml(text: string): string {
    const htmlEscapes: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }
    return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char)
}

/**
 * Format text with safe HTML rendering
 * 1. Escape all HTML entities first (prevents XSS)
 * 2. Convert **bold** to <strong>
 * 3. Convert newlines to <br>
 */
export function formatSafeHtml(content: string): string {
    let escaped = escapeHtml(content)
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    escaped = escaped.replace(/\n/g, '<br>')
    return escaped
}

// ============================================
// Self-test (run with: npx tsx utils/safeHtml.ts)
// ============================================
// @ts-expect-error - This code only runs in Node.js environment during testing
if (typeof process !== 'undefined' && import.meta.url.endsWith(process.argv[1]?.replace(/^file:\/\//, '') || '')) {
    console.log('Running safeHtml tests...\n')

    const tests = [
        {
            name: 'Basic XSS prevention',
            input: '<script>alert("xss")</script>',
            expected: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
        },
        {
            name: 'Bold formatting',
            input: 'Hello **world**!',
            expected: 'Hello <strong>world</strong>!'
        },
        {
            name: 'Newline conversion',
            input: 'Line 1\nLine 2',
            expected: 'Line 1<br>Line 2'
        },
        {
            name: 'XSS in bold attempt',
            input: '**<script>evil()</script>**',
            expected: '<strong>&lt;script&gt;evil()&lt;/script&gt;</strong>'
        },
        {
            name: 'Mixed content',
            input: 'Hello **bold** & "quoted" <tag>',
            expected: 'Hello <strong>bold</strong> &amp; &quot;quoted&quot; &lt;tag&gt;'
        }
    ]

    let passed = 0
    let failed = 0

    for (const test of tests) {
        const result = formatSafeHtml(test.input)
        if (result === test.expected) {
            console.log(`✅ ${test.name}`)
            passed++
        } else {
            console.log(`❌ ${test.name}`)
            console.log(`   Input:    ${test.input}`)
            console.log(`   Expected: ${test.expected}`)
            console.log(`   Got:      ${result}`)
            failed++
        }
    }

    console.log(`\n${passed} passed, ${failed} failed`)
    // @ts-expect-error - process.exit only runs in Node.js environment during testing
    process.exit(failed > 0 ? 1 : 0)
}
