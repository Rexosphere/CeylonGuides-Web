# Scam Alert Data Structure

## Overview

This document describes the comprehensive structured data system for the Ceylon Guides Scam Alert feature. All data is parsed from `scam.md` and serves as the single source of truth for the entire system.

## Data Files

### Core Data Module: `app/data/scamData.ts`

Main data module containing all structured data parsed from scam.md:

- **scamTypes**: Array of 16 comprehensive scam types
- **locations**: Array of 30 geographic locations with risk assessments
- **activities**: Array of 10 tourist activity types
- **reportingInfo**: Emergency contacts and victim guidance

### Type Definitions: `app/types/scamData.ts`

TypeScript interfaces for type safety:

- `ScamType`: Scam information structure
- `Location`: Geographic location with risk level
- `Activity`: Tourist activity with related scams
- `ReportingInfo`: Emergency contacts and guidance
- `ScamFilterState`: UI filter state
- `MapMarker`: Map visualization data

### Composable: `app/composables/useScamData.ts`

Vue composable providing:
- Reactive data access
- Filter logic (severity, category, location, activity, search)
- Computed statistics and counts
- Geolocation services
- Distance calculations

## Data Structures

### ScamType

```typescript
interface ScamType {
  id: string                  // Unique identifier (kebab-case)
  title: string               // Display name
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: 'transport' | 'shopping' | 'guides' | 'money' | 
            'nightlife' | 'temple' | 'beach' | 'safari' | 'general'
  description: string         // Detailed explanation
  realExamples: string[]      // 3-5 real-world examples
  preventionTips: string[]    // 3-6 actionable prevention tips
  commonLocations: string[]   // Array of location IDs
  tags: string[]              // Searchable keywords
}
```

**Current Scam Types (16 total):**

| ID | Title | Severity | Category |
|----|-------|----------|----------|
| tuktuk-overcharge | Tuk-Tuk Overcharging & Detours | high | transport |
| gemstone-scams | Gemstone Scams | **critical** | shopping |
| fake-tour-guides | Fake Tour Guides & Touts | high | guides |
| fake-monk-blessing | Fake Monk/Temple Blessing | medium | temple |
| currency-exchange | Currency Exchange & Card Fraud | high | money |
| spice-garden-scams | Spice Garden Scams | medium | shopping |
| stilt-fishermen-photos | Stilt Fishermen Photo Scams | medium | beach |
| surfboard-rental-damage | Surfboard Rental Damage | medium | beach |
| friendly-local-bar | Friendly Local Bar/Restaurant | high | nightlife |
| hotel-staff-impersonation | Hotel Staff Impersonation | high | guides |
| pickpocketing-schemes | Pickpocketing & Distraction | high | general |
| public-bus-overcharge | Public Bus Overcharging | low | transport |
| animal-charmer-scams | Animal Charmer Scams | low | general |
| fake-safari-guides | Fake Safari & Wildlife Guides | high | safari |
| visa-arrival-scams | Visa On Arrival Scams | medium | money |

### Location

```typescript
interface Location {
  id: string                  // Unique identifier (kebab-case)
  name: string                // Display name
  riskLevel: 'high' | 'medium' | 'low'
  coordinates: {
    lat: number               // Latitude
    lng: number               // Longitude
  }
  summary: string             // Brief risk description
  commonScams: string[]       // Array of scam type IDs
}
```

**High-Risk Locations (9 total):**
- colombo-pettah (Pettah Market)
- colombo-fort (Fort District)
- colombo-airport (BIA Airport)
- kandy-temple (Temple of the Tooth)
- kandy-downtown (City Center)
- galle-fort (UNESCO Fort)
- sigiriya (Ancient Rock)
- yala (National Park)
- ratnapura (Gem City)

### Activity

```typescript
interface Activity {
  id: string                  // Activity identifier
  label: string               // Display name
  relatedScams: string[]      // Array of scam type IDs
}
```

**Activities (10 total):**
1. transport - Transportation & Taxis
2. shopping - Shopping & Markets
3. sightseeing - Temples & Sightseeing
4. nightlife - Bars & Nightlife
5. beach - Beach & Water Sports
6. temple - Religious Sites
7. safari - Wildlife & Safaris
8. money - Money & Banking
9. accommodation - Hotels & Accommodation
10. general - General Tourist Areas

### ReportingInfo

```typescript
interface ReportingInfo {
  touristPoliceContact: {
    number: string            // Primary hotline: 1912
    description: string
  }
  emergencyNumbers: {
    police: string            // 119
    touristPolice: string     // 1912
    emergency: string         // 110
    consumerAffairs: string   // +94 11 2 421 451
  }
  whatToDoIfScammed: string[] // 12-step victim guidance
}
```

## Helper Functions

### Query Functions

```typescript
// Get specific items
getScamTypeById(id: string): ScamType | undefined
getLocationById(id: string): Location | undefined
getActivityById(id: string): Activity | undefined

// Filter by attributes
getScamsByCategory(category: string): ScamType[]
getScamsBySeverity(severity: string): ScamType[]
getScamsByLocation(locationId: string): ScamType[]
getLocationsByRisk(riskLevel: string): Location[]

// Special queries
getHighRiskLocations(): Location[]
getCriticalScams(): ScamType[]
searchScams(query: string): ScamType[]
```

## Usage Examples

### Basic Data Access

```typescript
import { scamTypes, locations, activities, reportingInfo } from '~/data/scamData'

// Get all scam types
console.log(scamTypes.length) // 16

// Get all locations
console.log(locations.length) // 30

// Get emergency numbers
console.log(reportingInfo.emergencyNumbers.touristPolice) // "1912"
```

### Using the Composable

```typescript
import { useScamData } from '~/composables/useScamData'

const {
  filteredScams,
  filteredLocations,
  stats,
  selectedSeverity,
  selectedCategory,
  searchQuery,
  resetFilters
} = useScamData()

// Filter by severity
selectedSeverity.value = 'critical'
console.log(filteredScams.value.length) // 1 (gemstone scams)

// Filter by category
selectedCategory.value = 'transport'
console.log(filteredScams.value.length) // 2

// Search
searchQuery.value = 'tuk-tuk'
console.log(filteredScams.value.length) // Scams mentioning tuk-tuk

// Get statistics
console.log(stats.value.totalScams) // 16
console.log(stats.value.criticalScams) // 1
console.log(stats.value.highRiskLocations) // 9
```

### Map Integration

```typescript
const { mapMarkers, filteredLocations } = useScamData()

// Get map markers for Leaflet
mapMarkers.value.forEach(marker => {
  // marker.position: [lat, lng]
  // marker.riskLevel: 'high' | 'medium' | 'low'
  // marker.scamCount: number
  // marker.scamTypes: string[]
})
```

### Geolocation Features

```typescript
const { getUserLocation, nearbyLocations, calculateDistance } = useScamData()

// Get user's location
await getUserLocation()

// Find nearby high-risk areas
console.log(nearbyLocations.value) // Locations within 50km, sorted by distance

// Calculate distance between two points
const distance = calculateDistance(6.9271, 79.8612, 7.2906, 80.6337)
console.log(distance) // Distance in kilometers
```

### Contextual Tips

```typescript
const { filteredScams, contextualTips } = useScamData()

// Filter to specific situation
selectedCategory.value = 'transport'
selectedLocation.value = 'colombo-airport'

// Get relevant tips
console.log(contextualTips.value)
// Returns top 10 prevention tips for filtered context
```

## Data Statistics

- **Total Scams**: 16 types
- **Total Locations**: 30 locations
- **Total Activities**: 10 categories
- **Emergency Contacts**: 4 numbers
- **Victim Guidance Steps**: 12 actions

### Severity Distribution
- **Critical**: 1 scam (6%)
- **High**: 8 scams (50%)
- **Medium**: 5 scams (31%)
- **Low**: 2 scams (13%)

### Risk Level Distribution
- **High Risk**: 9 locations (30%)
- **Medium Risk**: 18 locations (60%)
- **Low Risk**: 3 locations (10%)

### Category Distribution
- transport: 2 scams
- shopping: 2 scams
- guides: 2 scams
- money: 2 scams
- nightlife: 1 scam
- temple: 1 scam
- beach: 2 scams
- safari: 1 scam
- general: 2 scams

## Integration Points

### Components Using Data

1. **ScamMap.vue** - Uses `mapMarkers`, `filteredLocations`
2. **ScamFilters.vue** - Uses filters, categories, locations
3. **ScamSafetyAssistant.vue** - Uses `contextualTips`, `reportingInfo`, `filteredScams`
4. **scam-alerts.vue** - Main page using all data and filters

### API Routes (Future)

Data structure is designed to support future API endpoints:

```
GET /api/scams - List all scams
GET /api/scams/:id - Get specific scam
GET /api/locations - List all locations
GET /api/locations/:id - Get specific location
GET /api/activities - List all activities
GET /api/reporting - Get emergency info
```

## Maintenance

### Adding New Scams

1. Add entry to scam.md
2. Update `scamTypes` array in `app/data/scamData.ts`:

```typescript
{
  id: 'new-scam-id',
  title: 'New Scam Title',
  severity: 'high',
  category: 'transport',
  description: '...',
  realExamples: ['...'],
  preventionTips: ['...'],
  commonLocations: ['colombo-fort'],
  tags: ['tag1', 'tag2']
}
```

3. Update relevant locations' `commonScams` arrays
4. Update relevant activities' `relatedScams` arrays

### Adding New Locations

Add to `locations` array:

```typescript
{
  id: 'new-location-id',
  name: 'Location Name',
  riskLevel: 'medium',
  coordinates: { lat: 0.0000, lng: 0.0000 },
  summary: 'Risk description',
  commonScams: ['scam-id-1', 'scam-id-2']
}
```

### Updating Emergency Info

Modify `reportingInfo` object with latest contact numbers and procedures.

## Testing

Verify data integrity:

```typescript
import { scamTypes, locations } from '~/data/scamData'

// Verify all scam locations exist
scamTypes.forEach(scam => {
  scam.commonLocations.forEach(locId => {
    const loc = locations.find(l => l.id === locId)
    if (!loc) console.error(`Missing location: ${locId}`)
  })
})

// Verify all location scams exist
locations.forEach(location => {
  location.commonScams.forEach(scamId => {
    const scam = scamTypes.find(s => s.id === scamId)
    if (!scam) console.error(`Missing scam: ${scamId}`)
  })
})
```

## Performance

- All data is statically imported (tree-shakeable)
- No runtime parsing overhead
- Total data size: ~50KB uncompressed
- Gzipped: ~8KB
- All operations O(n) or better with Array methods
- Map coordinates pre-calculated (no geocoding needed)

## Future Enhancements

1. **Multilingual Support**: Add translation keys for all strings
2. **User Reports**: Allow tourists to submit new scam reports
3. **Real-time Updates**: Sync data from backend API
4. **Offline Mode**: Cache data in service worker
5. **Analytics**: Track which scams are most viewed/searched
6. **Notifications**: Alert users entering high-risk areas
7. **Social Sharing**: Share scam warnings on social media
8. **Photo Evidence**: Allow users to upload scam photos
9. **Community Ratings**: Let users rate scam prevalence
10. **AI Safety Assistant**: LLM-powered personalized advice
