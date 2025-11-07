# 🗺️ Dashboard Navigation Map

## URL Routes Structure

```
ROOT (/)
│
├── LANDING PAGE
│   └── Role Selector Cards
│       ├── Patient Card → /dashboard
│       ├── Clinician Card → /clinician
│       └── CWH Card → /cwh
│
├── PATIENT SECTION (/dashboard layout)
│   │
│   ├── /dashboard ⭐
│   │   └── Patient Home Dashboard
│   │       ├── Health Metrics (4 cards)
│   │       ├── Recent Measurements
│   │       └── Upcoming Appointments
│   │
│   ├── /measurements
│   │   └── Measurements List View
│   │       ├── Recent readings table
│   │       ├── Search & sort
│   │       └── View All link
│   │
│   ├── /measurements/add 📋
│   │   └── Add New Measurement Form
│   │       ├── High-literacy version
│   │       └── Low-literacy version
│   │
│   ├── /measurements/trends 📊
│   │   └── Health Trends Charts
│   │       ├── BP trends
│   │       ├── Glucose trends
│   │       └── 7/30/90 day views
│   │
│   ├── /medications/list
│   │   └── Medication List View
│   │       ├── Active medications
│   │       └── Add new button
│   │
│   ├── /medications/add 💊
│   │   └── Add Medication Form
│   │       ├── Name, dosage, frequency
│   │       └── Reminders
│   │
│   ├── /profile ⚙️
│   │   └── User Profile & Settings
│   │       ├── Personal info
│   │       ├── Health data
│   │       └── Preferences
│   │
│   └── /insights 🧠
│       └── AI Health Insights
│           ├── BP trends chart
│           ├── Glucose trends chart
│           ├── AI recommendations (Phase 2)
│           └── Health tips
│
├── CLINICIAN SECTION (/clinician layout)
│   │
│   ├── /clinician ⭐
│   │   └── Clinician Dashboard
│   │       ├── KPI Cards (4)
│   │       ├── Critical Patients List
│   │       └── Quick Actions
│   │
│   ├── /clinician/patients 👥
│   │   └── Patient Management
│   │       ├── Searchable table
│   │       ├── Status indicators
│   │       ├── Last seen dates
│   │       └── View details link
│   │
│   ├── /clinician/alerts 🚨
│   │   └── Critical Alerts Monitor
│   │       ├── Critical alerts (red)
│   │       ├── High alerts (yellow)
│   │       ├── Medium alerts (blue)
│   │       └── Review buttons
│   │
│   ├── /clinician/cases 📋
│   │   └── Case Management
│   │       ├── Active cases (12)
│   │       ├── Monitoring (8)
│   │       ├── Resolved (24)
│   │       └── Case cards with details
│   │
│   ├── /clinician/reports 📄
│   │   └── Report Generation
│   │       ├── Monthly reports
│   │       ├── Critical case reports
│   │       ├── Adherence reports
│   │       ├── Trend analysis
│   │       ├── Download buttons
│   │       └── Share options
│   │
│   └── /clinician/settings ⚙️
│       └── Clinician Settings
│           ├── Profile info (name, email, license)
│           ├── Notifications toggle
│           ├── Password & 2FA
│           ├── Active devices
│           └── Privacy controls
│
└── CWH SECTION (/cwh layout)
    │
    ├── /cwh ⭐
    │   └── CWH Dashboard
    │       ├── Community size (127)
    │       ├── Screenings this month (34)
    │       ├── At-risk cases (12)
    │       ├── Referrals (8)
    │       ├── Upcoming events (3)
    │       └── Quick actions (4)
    │
    ├── /cwh/community 👥
    │   └── Community Members Management
    │       ├── Searchable member table
    │       ├── Status (Active/Inactive/At-Risk)
    │       ├── Village info
    │       ├── Last visit dates
    │       ├── Contact info
    │       └── View details link
    │
    ├── /cwh/screening 📅
    │   └── Screening Events Management
    │       ├── Upcoming events
    │       ├── Event details (date, time, location)
    │       ├── Expected vs registered visitors
    │       ├── Progress bars
    │       ├── Status (Upcoming/Planning/Completed)
    │       └── Manage event button
    │
    ├── /cwh/followups 📱
    │   └── Patient Follow-up Tracking
    │       ├── Pending follow-ups (5)
    │       ├── Follow-up reason
    │       ├── Priority level (High/Med/Low)
    │       ├── Status (Pending/In Progress/Completed/Overdue)
    │       ├── Due dates
    │       ├── Notes
    │       ├── Call now button
    │       └── View details
    │
    ├── /cwh/metrics 📊
    │   └── Community Health Metrics
    │       ├── Key metrics (4 cards)
    │       ├── Screening coverage by village
    │       │   └── Progress bars for each village
    │       ├── Health conditions detected
    │       │   ├── Hypertension (42%)
    │       │   ├── Pre-diabetes (35%)
    │       │   ├── Obesity (19%)
    │       │   └── Other (4%)
    │       └── Statistical breakdown
    │
    └── /cwh/settings ⚙️
        └── CWH Settings
            ├── Profile info (name, email, community)
            ├── Notifications toggle
            ├── Password & 2FA
            ├── Help & FAQ
            ├── Contact support
            └── App version info
```

## 🎯 User Flows

### Patient User Flow
```
/ (Landing)
  ↓
[Select Patient Card]
  ↓
/dashboard (Home)
  ├→ /measurements (View all)
  ├→ /measurements/add (Log new)
  ├→ /measurements/trends (See trends)
  ├→ /medications/list (View meds)
  ├→ /medications/add (Add med)
  ├→ /profile (Settings)
  └→ /insights (AI insights)
```

### Clinician User Flow
```
/ (Landing)
  ↓
[Select Clinician Card]
  ↓
/clinician (Home)
  ├→ /clinician/patients (View roster)
  ├→ /clinician/alerts (Monitor alerts)
  ├→ /clinician/cases (Manage cases)
  ├→ /clinician/reports (Generate reports)
  └→ /clinician/settings (Configure)
```

### CWH User Flow
```
/ (Landing)
  ↓
[Select CWH Card]
  ↓
/cwh (Home)
  ├→ /cwh/community (Manage members)
  ├→ /cwh/screening (Schedule events)
  ├→ /cwh/followups (Track visits)
  ├→ /cwh/metrics (View statistics)
  └→ /cwh/settings (Configure)
```

## 📊 Page Statistics

### Total Pages: 24

| Role | Count | Pages |
|------|-------|-------|
| Landing | 1 | / |
| Patient | 8 | dashboard, measurements (list/add/trends), medications (list/add), profile, insights |
| Clinician | 6 | dashboard, patients, alerts, cases, reports, settings |
| CWH | 6 | dashboard, community, screening, followups, metrics, settings |
| **Total** | **24** | — |

## 🎨 Navigation Components

### Sidebar Navigation (AppSidebar)
```
Menu Structure:
├── Home / Dashboard (main nav item)
├── Health / Patient Care (expandable group)
│   ├── Sub-item 1
│   ├── Sub-item 2
│   └── Sub-item 3
├── Regular Menu Item
├── Item with badge count (e.g., Alerts: 5)
└── Settings (bottom)
```

### Top Navigation (TopNav)
```
Left: Search bar
Center: (Logo area)
Right:
├── Online/Offline indicator
├── Notifications bell
├── User avatar
└── (Logout ready)
```

## 🔄 Component Hierarchy

```
<RootLayout>
  └── <TopNav>  (Global)
  
  <AppSidebar>  (Role-based)
    ├── Logo section
    ├── Menu items (dynamic per role)
    └── Footer (logout)
  
  <DashboardLayout>
    └── <TopNav>
    └── <AppSidebar>
    └── <main>
      └── Page content
```

## 🌐 URL Patterns

### Patient Routes
```
/dashboard              - Home
/measurements           - List
/measurements/add       - Form
/measurements/trends    - Charts
/medications/list       - List
/medications/add        - Form
/profile                - Settings
/insights               - AI page
```

### Clinician Routes
```
/clinician              - Home
/clinician/patients     - List
/clinician/alerts       - List
/clinician/cases        - List
/clinician/reports      - Report hub
/clinician/settings     - Settings
```

### CWH Routes
```
/cwh                    - Home
/cwh/community          - List
/cwh/screening          - Calendar
/cwh/followups          - Tracker
/cwh/metrics            - Stats
/cwh/settings           - Settings
```

## 🚀 Navigation Features

✅ **Role-Based** - Different menus per user type
✅ **Responsive** - Mobile hamburger menu
✅ **Active State** - Current page highlighted
✅ **Badge Counts** - Shows important numbers
✅ **Expandable Groups** - Collapsible submenus
✅ **Quick Search** - Global search in top nav
✅ **Status Indicator** - Online/offline in top nav
✅ **User Menu** - Ready for logout/profile

---

**All 24 pages are fully functional and ready for backend integration!**
