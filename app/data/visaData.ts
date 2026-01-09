import { ref } from 'vue'
import visaRules from './visa.rules.json'

export interface VisaDetails {
    nationality: string
    fee: {
        eta: number
        on_arrival: number
        currency: string
    }
    category: 'Free' | 'SAARC' | 'Standard' | 'Reciprocal'
    duration: number
    notes: string[]
}

export function useVisaLogic() {
    function getVisaDetails(countryName: string): VisaDetails {
        // Default standard
        let category: VisaDetails['category'] = 'Standard'
        let fee = visaRules.fees.standard
        let notes: string[] = []

        // Check special lists
        if (visaRules.lists.special_reciprocal.includes(countryName)) {
            category = 'Reciprocal'
            fee = visaRules.fees.singapore_maldives_seychelles
            notes.push('Reciprocal visa-free entry. No ETA fee required.')
        }
        else if (visaRules.lists.free_visa.includes(countryName)) {
            category = 'Free'
            fee = visaRules.fees.free
            notes.push('Part of the 7-country Free Visa scheme (Pilot Project).')
        }
        else if (visaRules.lists.saarc.includes(countryName)) {
            category = 'SAARC'
            fee = visaRules.fees.saarc
            notes.push('Reduced fee for SAARC region nationals.')
        }

        return {
            nationality: countryName,
            fee: {
                eta: fee.eta,
                on_arrival: fee.on_arrival,
                currency: 'USD'
            },
            category,
            duration: visaRules.validity.initial,
            notes
        }
    }

    function calculateExtensionFee(nationality: string, days: number): { fee: number, bracket: string, warning?: string } {
        if (!nationality || nationality === 'General' || days <= 30) {
            return { fee: 0, bracket: 'Included in initial ETA' }
        }

        // Determine group
        let group = 'standard'
        if (nationality === 'United States' || nationality === 'USA') group = 'usa'
        else if (visaRules.lists.extension_group_a.includes(nationality)) group = 'group_a'
        else if (visaRules.lists.extension_group_c.includes(nationality)) group = 'group_c'

        // Cast to any to access dynamic group key safely in this context
        const fees = (visaRules.extension_fees as any)[group]

        let fee = 0
        let bracket = ''

        if (days <= 90) {
            bracket = '30-90 Days' // 1st extension
            fee = fees['30-90']
        } else if (days <= 180) {
            bracket = '91-180 Days' // 2nd extension
            fee = fees['91-180']
        } else {
            bracket = '181-270 Days' // 3rd extension
            fee = fees['181-270']
        }

        return { fee, bracket }
    }

    return {
        getVisaDetails,
        calculateExtensionFee
    }
}
