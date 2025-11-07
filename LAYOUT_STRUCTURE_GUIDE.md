# 📐 Dashboard Layout Structure - Consistent Across All Pages

## Visual Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                      TOP NAVIGATION BAR                         │
│  [Logo]  [Search...]              [Online] [🔔] [👤] [Menu]    │
└─────────────────────────────────────────────────────────────────┘
┌────────────┬──────────────────────────────────────────────────────┐
│            │                                                      │
│  SIDEBAR   │                    PAGE CONTENT                     │
│            │                                                      │
│  • Home    │  [Page Title]                                       │
│  • Menu 1  │  [Page Description]                                 │
│  • Menu 2  │                                                      │
│  • Menu 3  │  ┌────────────────────────────────────────────────┐ │
│  • Menu 4  │  │                                                │ │
│  • Menu 5  │  │          Main Content Area                     │ │
│            │  │  - Cards, tables, forms, charts               │ │
│            │  │  - Fully responsive                           │ │
│            │  │  - Consistent spacing & styling               │ │
│            │  │                                                │ │
│  ━━━━━━━━━ │  └────────────────────────────────────────────────┘ │
│            │                                                      │
│ [Settings] │  [Footer/Additional Info]                          │
└────────────┴──────────────────────────────────────────────────────┘
```

## Page Structure Hierarchy

```
DashboardLayout
├── AppSidebar
│   ├── Logo Section
│   ├── Menu Items (Dynamic based on userType)
│   │   ├── Home / Dashboard
│   │   ├── Primary Section
│   │   ├── Secondary Section (expandable)
│   │   ├── ...
│   │   └── Settings
│   └── Mobile Hamburger Toggle
│
├── TopNav
│   ├── Left: Search Bar
│   ├── Center: (Logo area)
│   ├── Right:
│   │   ├── Online/Offline Status
│   │   ├── Notifications Bell
│   │   ├── User Avatar
│   │   └── Menu Dropdown
│   └── Mobile Responsive
│
└── Main Content Area
    ├── Page Header (Title + Description)
    ├── Page Content
    │   ├── Cards / Stats
    │   ├── Tables / Lists
    │   ├── Forms
    │   ├── Charts
    │   └── Alerts / Banners
    └── Footer / CTA Buttons
```

## User Type Navigation Examples

### 👨‍🏥 CLINICIAN Dashboard
```
Sidebar Menu:
├── 🏠 Dashboard
├── 👥 Patients
│   ├── Patients List
│   ├── Alerts
│   └── Cases
├── 📋 Patient Care (expandable)
│   ├── Cases
│   ├── Alerts
│   └── Reports
├── 📄 Reports
├── ⚙️ Settings
└── 🚪 Sign Out
```

### 👩‍⚕️ PATIENT Dashboard
```
Sidebar Menu:
├── 🏠 Dashboard
├── 📊 Health (expandable)
│   ├── Measurements
│   ├── Trends
│   └── Insights
├── 💊 Medications
│   ├── List
│   └── Add
├── 👤 Profile
├── ⚙️ Settings
└── 🚪 Sign Out
```

### 🌍 CWH Dashboard
```
Sidebar Menu:
├── 🏠 Dashboard
├── 👥 Community
├── 🏥 Health Programs (expandable)
│   ├── Screening
│   ├── Follow-ups
│   └── Metrics
├── 📊 Reports
├── ⚙️ Settings
└── 🚪 Sign Out
```

## Consistency Checklist

✅ **All 24 Dashboard Pages Include:**

| Element | Clinician | Patient | CWH |
|---------|-----------|---------|-----|
| Sidebar | ✓ | ✓ | ✓ |
| Top Nav | ✓ | ✓ | ✓ |
| Page Header | ✓ | ✓ | ✓ |
| Search Bar | ✓ | ✓ | ✓ |
| Status Indicator | ✓ | ✓ | ✓ |
| Notifications | ✓ | ✓ | ✓ |
| User Avatar | ✓ | ✓ | ✓ |
| Responsive | ✓ | ✓ | ✓ |
| Dark Mode | ✓ | ✓ | ✓ |
| Mobile Menu | ✓ | ✓ | ✓ |

## Responsive Breakpoints

```
Mobile (< 768px)
├── Hamburger Menu Icon
├── Top Nav (compact)
└── Single Column Layout

Tablet (768px - 1024px)
├── Collapsible Sidebar
├── Top Nav (normal)
└── 2-Column Layout

Desktop (> 1024px)
├── Permanent Sidebar
├── Full Top Nav
└── Multi-Column Layout with Grid
```

## Color System (Consistent)

```
Light Mode:
├── Background: slate-50
├── Cards: white
├── Text: slate-900
├── Borders: slate-200
└── Accents: blue/green/red/purple

Dark Mode:
├── Background: slate-950
├── Cards: slate-800
├── Text: white
├── Borders: slate-700
└── Accents: bright variants
```

## Navigation Flow

```
Landing Page (/)
    ↓
[Patient] [Clinician] [CWH]
    ↓           ↓         ↓
    │           │         │
    ├─→ /dashboard      /clinician       /cwh
    │       ├─→ /measurements
    │       │   ├─→ /measurements/add
    │       │   └─→ /measurements/trends
    │       ├─→ /medications/list
    │       ├─→ /medications/add
    │       ├─→ /profile
    │       └─→ /insights
    │
    └─→ /clinician/patients
        /clinician/alerts
        /clinician/cases
        /clinician/reports
        /clinician/settings
    
    └─→ /cwh/community
        /cwh/screening
        /cwh/followups
        /cwh/metrics
        /cwh/settings
```

## Mobile vs Desktop View Comparison

### Desktop View
```
┌─────────────────────────────────────────┐
│ 🏠 [Search...] [●●●●●] [🔔] [👤] [≡]   │ ← TopNav (fixed)
├──────────┬──────────────────────────────┤
│  Sidebar │                              │
│  ▼       │                              │
│          │   Dashboard Content          │
│  Home    │   - 4 KPI Cards (2x2)       │
│  Item 1  │   - Data Table (6 cols)      │
│  Item 2  │   - Charts (3 items)         │
│  Item 3  │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Mobile View
```
┌─────────────────────────┐
│ ☰ [●●●●●] [🔔] [👤]   │ ← TopNav (compact)
├─────────────────────────┤
│  [Menu content slides   │
│   from left when ☰      │
│   is tapped]            │
│                         │
│  Dashboard Content      │
│  - 4 KPI Cards (1x4)   │
│  - Data Table (horiz.  │
│    scroll)              │
│  - Charts (full width)  │
│                         │
└─────────────────────────┘
```

## Theme Support

```
Light Theme (Default)
├── Clean white backgrounds
├── Dark text
├── Bright accent colors
└── High contrast

Dark Theme (Toggle in Settings)
├── Dark gray backgrounds
├── Light text
├── Muted accent colors
└── Reduced eye strain
```

---

**All 24 pages now follow this consistent structure! 🎉**
