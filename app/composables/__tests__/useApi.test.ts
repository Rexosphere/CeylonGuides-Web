import { describe, it, expect } from 'vitest';

describe('URL Building Utility', () => {

    function buildUrl(base: string, path: string, params?: Record<string, any>): string {
        const url = new URL(path, base);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        return url.toString();
    }

    it('builds correct scam alert URLs', () => {
        const url = buildUrl('http://localhost:8787', '/api/scams', {
            category: 'TRANSPORT_SCAM',
            severity: 'HIGH'
        });

        expect(url).toContain('/api/scams');
        expect(url).toContain('category=TRANSPORT_SCAM');
        expect(url).toContain('severity=HIGH');
    });

    it('handles undefined query params correctly', () => {
        const url = buildUrl('http://localhost:8787', '/api/scams', {
            category: undefined,
            severity: 'HIGH'
        });

        expect(url).not.toContain('category');
        expect(url).toContain('severity=HIGH');
    });

    it('handles null query params correctly', () => {
        const url = buildUrl('http://localhost:8787', '/api/dining', {
            dietary: null,
            hygiene: 'EXCELLENT'
        });

        expect(url).not.toContain('dietary');
        expect(url).toContain('hygiene=EXCELLENT');
    });

    it('builds URL without params', () => {
        const url = buildUrl('http://localhost:8787', '/api/phrases');

        expect(url).toBe('http://localhost:8787/api/phrases');
    });

    it('handles array-like params', () => {
        const categories = ['TRANSPORT_SCAM', 'VENDOR_SCAM'];
        const url = buildUrl('http://localhost:8787', '/api/scams', {
            categories: categories.join(',')
        });

        expect(url).toContain('categories=TRANSPORT_SCAM%2CVENDOR_SCAM');
    });

});

describe('API Response Handling', () => {

    it('extracts data array from standard response', () => {
        const response = {
            success: true,
            data: [{ id: '1' }, { id: '2' }]
        };

        const items = response.data || [];
        expect(items.length).toBe(2);
    });

    it('handles empty data gracefully', () => {
        const response = {
            success: true,
            data: []
        };

        const items = response.data || [];
        expect(items.length).toBe(0);
    });

    it('handles missing data field', () => {
        const response = {
            success: false,
            error: 'Not found'
        };

        const items = (response as any).data || [];
        expect(items.length).toBe(0);
    });

});
