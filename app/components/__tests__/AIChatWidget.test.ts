import { describe, it, expect } from 'vitest';

describe('AI Chat Widget Logic', () => {

    // XSS Prevention
    describe('HTML Escaping', () => {
        function escapeHtml(str: string): string {
            const htmlEscapes: Record<string, string> = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
        }

        it('escapes script tags to prevent XSS', () => {
            const maliciousInput = '<script>alert("XSS")</script>';
            const escaped = escapeHtml(maliciousInput);

            expect(escaped).not.toContain('<script>');
            expect(escaped).toContain('&lt;script&gt;');
        });

        it('escapes HTML attributes', () => {
            const input = '<img onerror="alert(1)" src="x">';
            const escaped = escapeHtml(input);

            // Escaping converts special chars but 'onerror' text remains (just not executable)
            expect(escaped).toContain('&lt;img');
            expect(escaped).toContain('&quot;');
            expect(escaped).not.toContain('<img');
        });

        it('escapes ampersands', () => {
            const input = 'Tom & Jerry';
            const escaped = escapeHtml(input);

            expect(escaped).toBe('Tom &amp; Jerry');
        });

        it('handles empty strings', () => {
            expect(escapeHtml('')).toBe('');
        });
    });

    // Action Label Formatting
    describe('Action Labels', () => {
        function formatActionLabel(action: string): string {
            if (action.startsWith('navigate:')) {
                return '→ Go there';
            }
            const labels: Record<string, string> = {
                'scam-alerts': '⚠️ View Scams',
                'emergency': '🚨 Emergency',
                'safety-mode': '🛡️ Safety Mode',
                'transport': '🚖 Transport',
                'phrasebook': '📖 Phrases',
                'clean-dining': '🍽️ Dining',
                'facilities': '🚻 Facilities'
            };
            return labels[action] || action.charAt(0).toUpperCase() + action.slice(1).replace(/-/g, ' ');
        }

        it('formats known actions with emojis', () => {
            expect(formatActionLabel('scam-alerts')).toBe('⚠️ View Scams');
            expect(formatActionLabel('safety-mode')).toBe('🛡️ Safety Mode');
        });

        it('handles navigate: prefix', () => {
            expect(formatActionLabel('navigate:/scam-alerts')).toBe('→ Go there');
        });

        it('capitalizes unknown actions', () => {
            expect(formatActionLabel('unknown-action')).toBe('Unknown action');
        });
    });

    // Quick Action Routing
    describe('Quick Action Routing', () => {
        const routes: Record<string, string> = {
            'emergency': '/safety-mode',
            'scam-report': '/scam-alerts',
            'fare-check': '/transport',
            'find-food': '/clean-dining'
        };

        it('maps emergency to safety-mode', () => {
            expect(routes['emergency']).toBe('/safety-mode');
        });

        it('maps scam-report to scam-alerts', () => {
            expect(routes['scam-report']).toBe('/scam-alerts');
        });

        it('maps fare-check to transport', () => {
            expect(routes['fare-check']).toBe('/transport');
        });

        it('maps find-food to clean-dining', () => {
            expect(routes['find-food']).toBe('/clean-dining');
        });
    });

    // Message Formatting
    describe('Message Formatting', () => {
        function formatMessage(content: string): string {
            let escaped = content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            escaped = escaped.replace(/\n/g, '<br>');

            return escaped;
        }

        it('converts bold markdown to strong tags', () => {
            const result = formatMessage('This is **bold** text');
            expect(result).toContain('<strong>bold</strong>');
        });

        it('converts newlines to br tags', () => {
            const result = formatMessage('Line 1\nLine 2');
            expect(result).toContain('<br>');
        });

        it('escapes HTML before applying formatting', () => {
            const result = formatMessage('<script>**alert(1)**</script>');
            expect(result).toContain('&lt;script&gt;');
            expect(result).toContain('<strong>alert(1)</strong>');
        });
    });

});
