# Report a Scam Feature Documentation

## Overview
The "Report a Scam" feature allows users to submit scam reports directly from the scam alerts page. Reports are stored locally in the browser and can be managed by the user.

## Features Implemented

### 1. Report Submission Modal (ReportScamModal.vue)
A 3-step wizard modal for submitting scam reports:

#### Step 1: Location Selection
- Interactive Leaflet map centered on Sri Lanka
- Click anywhere on the map to place a red marker
- Shows selected coordinates in lat/lng format
- Visual confirmation with marker popup

#### Step 2: Scam Details
- **Scam Type Dropdown**: Select from all existing scam types in the database
- **Description Textarea**: Write detailed description (required, 500 char limit with counter)
- **Severity Selector** (Optional): Choose from Critical, High, Medium, or Low with color-coded buttons
- **Anonymous Checkbox**: Option to report anonymously (identity not shared)

#### Step 3: Review & Submit
- Preview all entered information before submission
- Emergency contacts section with:
  - 👮 Tourist Police: 1912 (24/7, English-speaking)
  - 🚔 Emergency: 119
- Privacy note about immediate help availability
- Submit button with loading state

### 2. Page Integration (scam-alerts.vue)

#### Hero Section Additions
- **"Report a Scam" Button**: Green gradient button in hero section
- **"My Reports" Button**: Shows count of submitted reports (only visible when reports exist)

#### My Reports Section
- Collapsible section showing user's submitted reports
- Grid layout with report cards displaying:
  - Severity badge (color-coded)
  - Pending status indicator
  - Scam type title
  - Description (truncated to 3 lines)
  - Location coordinates
  - Relative time (e.g., "2h ago", "3d ago")
  - Delete button for removing reports
- Smooth slide-down animation when opened
- Auto-shows after new report submission

### 3. Data Management

#### LocalStorage Schema
```typescript
interface ScamReport {
  id: string              // Unique timestamp-based ID
  location: {
    lat: number
    lng: number
  }
  scamType: string        // ID of scam type from database
  description: string     // User's detailed description
  severity: string        // 'critical' | 'high' | 'medium' | 'low'
  anonymous: boolean      // Whether report is anonymous
  status: 'pending'       // Status of report
  timestamp: string       // ISO 8601 timestamp
}
```

#### Storage Key
- `scamReports` in localStorage
- Persists across browser sessions
- JSON serialized array of reports

### 4. User Flows

#### Submitting a Report
1. Click "Report a Scam" button in hero section
2. Modal opens with Step 1 (Location)
3. Click on map to place marker at scam location
4. Click "Next" to proceed to Step 2 (Details)
5. Select scam type from dropdown
6. Write description of what happened
7. Optionally select severity level
8. Check "Report anonymously" if desired
9. Click "Next" to proceed to Step 3 (Review)
10. Review all information
11. See emergency contact info (Tourist Police 1912, Emergency 119)
12. Click "Submit Report"
13. Success message shows briefly
14. Modal auto-closes after 2 seconds
15. "My Reports" section opens automatically

#### Viewing Reports
1. Click "My Reports" button (shows count badge)
2. Section expands with grid of submitted reports
3. Each card shows summary of report
4. Click delete button to remove a report (with confirmation)
5. Click close button (×) to hide section

#### Deleting Reports
1. Open "My Reports" section
2. Find report to delete
3. Click delete button (🗑️)
4. Confirm deletion in browser prompt
5. Report removed from display and localStorage

## Technical Details

### Components

#### ReportScamModal.vue
- **Props**: 
  - `show: boolean` - Controls modal visibility
  - `scamTypes: ScamType[]` - Array of all available scam types
- **Emits**:
  - `close` - Fired when modal should close
  - `submit: [report: ScamReport]` - Fired on successful submission
- **Features**:
  - Leaflet map integration for location selection
  - 3-step wizard with progress indicator
  - Form validation (required fields, character limits)
  - Emergency contact display
  - LocalStorage integration
  - Responsive design with mobile optimization

### State Management (scam-alerts.vue)
```typescript
const showReportModal = ref(false)        // Modal visibility
const showMyReports = ref(false)          // Reports section visibility
const userReports = ref<ScamReport[]>([]) // Array of user's reports
```

### Functions
- `handleReportSubmit(report)` - Reloads reports from localStorage after submission
- `deleteReport(reportId)` - Removes report with confirmation
- `getScamTitle(scamId)` - Gets scam type title from ID
- `formatReportTime(timestamp)` - Formats timestamp to relative time

### Styling
- Modal overlay with blur backdrop
- Color-coded severity badges (red/orange/yellow/green)
- Smooth animations (slide-down, fade-in)
- Responsive grid layouts
- Mobile-optimized with stacked layouts on small screens

## User Experience Highlights

1. **Progressive Disclosure**: 3-step wizard prevents overwhelming users
2. **Visual Feedback**: Map markers, success messages, loading states
3. **Safety First**: Emergency contacts prominently displayed
4. **Privacy Option**: Anonymous reporting encourages participation
5. **Confirmation**: Review step lets users verify before submitting
6. **Persistence**: Reports saved locally across sessions
7. **Management**: Easy deletion of submitted reports
8. **Responsive**: Works on mobile, tablet, and desktop

## Future Enhancements (Not Implemented)
- Server-side storage with API integration
- Report moderation and approval workflow
- Public display of verified reports on map
- Report statistics and analytics
- Email notifications for report status updates
- Photo upload capability
- Report editing functionality
- Export reports as PDF

## Testing Checklist
- [x] Modal opens when clicking "Report a Scam"
- [x] Map allows placing markers
- [x] Form validation works (required fields)
- [x] All steps can be completed
- [x] Report saves to localStorage
- [x] Report appears in "My Reports" section
- [x] Delete functionality works with confirmation
- [x] Modal closes on success
- [x] Emergency contacts are visible
- [x] Responsive on mobile devices
- [x] No console errors
- [x] TypeScript types are correct
