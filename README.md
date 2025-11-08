# Me Apomuden - Patient Health PWA

> **Your Health Companion** - Track blood pressure, glucose, and medications with an offline-first Progressive Web App designed for Ghana's healthcare system.

## 🌟 Key Features

### 📱 Progressive Web App (PWA)
- **Installable** - Add to home screen on any device
- **Offline-First** - Works without internet connection
- **Fast & Reliable** - Service worker caching for instant loading
- **Native Feel** - Full-screen app experience

### 🏥 Health Tracking
- **Blood Pressure Monitoring** - Track systolic, diastolic, and heart rate
- **Glucose Tracking** - Monitor blood glucose levels
- **Medication Management** - View and track medications
- **Health Alerts** - Toast notifications for critical readings
- **Trend Analysis** - Visual charts and insights

### 👥 Multi-Role Support
- **Patient Portal** - Self-tracking and monitoring
- **CHW (Community Health Worker)** - Patient registration, home visits, referrals
- **Clinician Portal** - ePrescriptions, alerts, case management

### 🔄 Offline Sync
- All data stored locally (IndexedDB via Dexie.js)
- Automatic background sync when online
- Conflict resolution for concurrent edits
- Retry queue for failed syncs

## 🚀 Quick Start

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 🎬 Demo Setup (For Video/Testing)

1. Navigate to `/admin` page
2. Click **"Seed Demo Data"** button
3. Refresh the page to see populated data
4. You now have demo patients, measurements, visits, prescriptions, and alerts!

## 📖 Documentation

- **[PWA Features Guide](./PWA_FEATURES_GUIDE.md)** - Installation, offline testing, notifications
- **[Production Quickstart](./PRODUCTION_FEATURES_QUICKSTART.md)** - Feature overview
- **[Dashboard Guide](./DASHBOARD_README.md)** - UI and navigation
- **[API Integration](./API_INTEGRATION_GUIDE.md)** - Backend integration guide

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui components
- **Offline Storage**: Dexie.js (IndexedDB)
- **PWA**: next-pwa, Service Workers
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod validation
- **Notifications**: Sonner (toast notifications)

## 🎯 Project Structure

```
aya-v1/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Patient dashboard
│   ├── measurements/      # BP & glucose tracking
│   ├── medications/       # Medication list
│   ├── cwh/              # Community Health Worker portal
│   ├── clinician/        # Clinician portal
│   └── admin/            # Demo data management
├── components/
│   ├── layout/           # Sidebar, navigation
│   ├── forms/            # Health data entry forms
│   ├── health/           # Health-specific components
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── db/               # Dexie database schema
│   ├── types/            # TypeScript types
│   ├── hooks/            # React hooks (offline, sync)
│   └── utils/            # Utilities, seed data
└── public/
    └── manifest.json     # PWA manifest
```

## 📱 PWA Installation

### Android / Desktop
1. Visit the app in Chrome/Edge
2. Look for the install prompt at the bottom
3. Or tap menu → "Install app"

### iOS (Safari)
1. Open in Safari
2. Tap Share button → "Add to Home Screen"

See **[PWA_FEATURES_GUIDE.md](./PWA_FEATURES_GUIDE.md)** for detailed instructions.

## 🧪 Testing Offline Mode

1. Open DevTools (F12) → Network tab
2. Check "Offline" checkbox
3. Navigate the app - it should work seamlessly!

## 🔔 Health Alerts & Notifications

The app monitors health data and shows toast notifications:
- **Critical Alerts** (Red) - Dangerous readings, immediate action needed
- **Warning Alerts** (Yellow) - Elevated readings, monitor closely  
- **Info Alerts** (Blue) - Reminders, tips, upcoming visits

## 🌍 Designed for Ghana

- Ghanaian patient names and communities
- Integration with Ghana Card and NHIS
- Community-based healthcare workflow
- Support for multiple languages (planned)
- Low-literacy UI modes

## 📊 Features Roadmap

- [x] Patient health tracking (BP, glucose)
- [x] Medication management
- [x] CHW patient registration
- [x] CHW home visits
- [x] ePrescriptions
- [x] Referral system
- [x] Offline-first architecture
- [x] PWA installation
- [x] Toast notifications
- [x] Demo data seeding
- [ ] Voice assistant (planned)
- [ ] Multi-language support
- [ ] Backend API integration
- [ ] User authentication
- [ ] Family group linking
- [ ] Health education content

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Deploy to Vercel
vercel --prod
```

### Other Platforms
- Netlify
- Cloudflare Pages
- AWS Amplify

**Note**: HTTPS is required for PWA features (service workers) in production.

## 🤝 Contributing

This project is part of Health-Tech-4-Africa initiative to improve healthcare access in Ghana.

## 📄 License

[Add your license here]

---

**Made with ❤️ for Ghana's healthcare system**
