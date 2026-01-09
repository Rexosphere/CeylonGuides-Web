/**
 * Sanity Check for Medical Directory Data
 * 
 * This script validates that all data from medicalDirectoryData.ts
 * meets schema integrity requirements:
 * - Non-empty phone numbers
 * - Non-empty names
 * - Valid city values
 * - Consistent phone formats
 * 
 * Run with: npx tsx app/utils/validateMedicalData.ts
 */

import {
    medicalDirectoryData,
    hospitals,
    emergencyServices,
    healthAlerts,
    vaccinations
} from '~/data/medicalDirectoryData'

interface ValidationResult {
    valid: boolean
    errors: string[]
    warnings: string[]
    summary: {
        totalHospitals: number
        totalEmergencyServices: number
        totalHealthAlerts: number
        totalVaccinations: number
        hospitalsByCity: Record<string, number>
        hospitalsByType: Record<string, number>
    }
}

export function validateMedicalData(): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Validate hospitals
    hospitals.forEach((hospital, index) => {
        // Check required fields
        if (!hospital.name || hospital.name.trim() === '') {
            errors.push(`Hospital[${index}]: Name is empty`)
        }
        if (!hospital.phone || hospital.phone.trim() === '') {
            errors.push(`Hospital[${index}] (${hospital.name}): Phone is empty`)
        }
        if (!hospital.city || hospital.city.trim() === '') {
            errors.push(`Hospital[${index}] (${hospital.name}): City is empty`)
        }
        if (!hospital.id || hospital.id.trim() === '') {
            errors.push(`Hospital[${index}] (${hospital.name}): ID is empty`)
        }
        if (!hospital.type || !['private', 'public'].includes(hospital.type)) {
            errors.push(`Hospital[${index}] (${hospital.name}): Invalid type "${hospital.type}"`)
        }

        // Phone format validation
        const phonePattern = /^(\+94\s?\d{2}\s?\d{3}\s?\d{4}|\d{3}-\d{7}|\d{3}-\d{4})$/
        if (hospital.phone && !phonePattern.test(hospital.phone.replace(/\s/g, ''))) {
            warnings.push(`Hospital[${index}] (${hospital.name}): Phone format may be inconsistent: "${hospital.phone}"`)
        }

        // Optional field warnings
        if (!hospital.address) {
            warnings.push(`Hospital[${index}] (${hospital.name}): No address provided`)
        }
        if (!hospital.lat || !hospital.lng) {
            warnings.push(`Hospital[${index}] (${hospital.name}): No coordinates for map display`)
        }
    })

    // Validate emergency services
    emergencyServices.forEach((service, index) => {
        if (!service.name || service.name.trim() === '') {
            errors.push(`EmergencyService[${index}]: Name is empty`)
        }
        if (!service.phone || service.phone.trim() === '') {
            errors.push(`EmergencyService[${index}] (${service.name}): Phone is empty`)
        }
    })

    // Validate health alerts
    healthAlerts.forEach((alert, index) => {
        if (!alert.title || alert.title.trim() === '') {
            errors.push(`HealthAlert[${index}]: Title is empty`)
        }
        if (!alert.description || alert.description.trim() === '') {
            errors.push(`HealthAlert[${index}] (${alert.title}): Description is empty`)
        }
        if (alert.prevention.length === 0) {
            warnings.push(`HealthAlert[${index}] (${alert.title}): No prevention tips provided`)
        }
    })

    // Validate vaccinations
    vaccinations.forEach((vaccination, index) => {
        if (!vaccination.name || vaccination.name.trim() === '') {
            errors.push(`Vaccination[${index}]: Name is empty`)
        }
        if (!vaccination.description || vaccination.description.trim() === '') {
            errors.push(`Vaccination[${index}] (${vaccination.name}): Description is empty`)
        }
    })

    // Generate summary
    const hospitalsByCity: Record<string, number> = {}
    const hospitalsByType: Record<string, number> = { private: 0, public: 0 }

    hospitals.forEach(h => {
        hospitalsByCity[h.city] = (hospitalsByCity[h.city] || 0) + 1
        hospitalsByType[h.type] = (hospitalsByType[h.type] || 0) + 1
    })

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        summary: {
            totalHospitals: hospitals.length,
            totalEmergencyServices: emergencyServices.length,
            totalHealthAlerts: healthAlerts.length,
            totalVaccinations: vaccinations.length,
            hospitalsByCity,
            hospitalsByType
        }
    }
}

// Run validation if executed directly
if (typeof process !== 'undefined') {
    const result = validateMedicalData()

    console.log('\n🏥 Medical Directory Data Validation')
    console.log('=====================================\n')

    console.log('📊 SUMMARY:')
    console.log(`   Total Hospitals: ${result.summary.totalHospitals}`)
    console.log(`   - Private: ${result.summary.hospitalsByType.private}`)
    console.log(`   - Public: ${result.summary.hospitalsByType.public}`)
    console.log(`   Emergency Services: ${result.summary.totalEmergencyServices}`)
    console.log(`   Health Alerts: ${result.summary.totalHealthAlerts}`)
    console.log(`   Vaccinations: ${result.summary.totalVaccinations}`)
    console.log('')
    console.log('   Hospitals by City:')
    Object.entries(result.summary.hospitalsByCity).forEach(([city, count]) => {
        console.log(`     - ${city}: ${count}`)
    })
    console.log('')

    if (result.errors.length > 0) {
        console.log('❌ ERRORS:')
        result.errors.forEach(e => console.log(`   ${e}`))
        console.log('')
    }

    if (result.warnings.length > 0) {
        console.log('⚠️ WARNINGS:')
        result.warnings.forEach(w => console.log(`   ${w}`))
        console.log('')
    }

    if (result.valid) {
        console.log('✅ All schema integrity checks PASSED!')
    } else {
        console.log('❌ Validation FAILED with errors above.')
        process.exit(1)
    }
}
