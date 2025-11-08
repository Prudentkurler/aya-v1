# 🎬 Quick Demo Script - Me Apomuden PWA

## ⚡ 2-Minute Demo Script

### 1️⃣ Initial Setup (10 seconds)
```
1. Open http://localhost:3000
2. Navigate to /admin
3. Click "Seed Demo Data"
4. See success toast ✅
5. Refresh page
```

### 2️⃣ Feature Walkthrough (90 seconds)

#### PWA Install Prompt (10 sec)
- Wait 3 seconds → Install banner appears at bottom
- Show "Install App" and "Later" buttons
- Click "Install" (or show how to dismiss)

#### Patient Dashboard (15 sec)
- Show overview stats (BP, glucose, medications)
- Point out responsive layout
- Show quick actions

#### Health Alerts Toast (10 sec)
- Toasts appear automatically in top-right
- Show different severities (Critical red, Warning yellow, Info blue)
- Click "Dismiss" on one

#### Add Measurement (15 sec)
- Navigate to /measurements/add
- Show **inline tabs** (BP vs Glucose)
- Fill in BP reading quickly
- Submit → See success toast

#### Offline Mode Demo (30 sec)
- Open DevTools (F12)
- Network tab → Check "Offline"
- Navigate to different pages (Dashboard, Medications, Measurements)
- All pages load instantly! 🎉
- Add a new measurement offline
- Show "Data will sync when online"

#### Go Back Online (10 sec)
- Uncheck "Offline" in DevTools
- Show sync happening
- Data appears on dashboard

---

## 📋 Full 5-Minute Detailed Demo

### Intro (30 sec)
> "This is Me Apomuden, a Progressive Web App for tracking blood pressure and glucose in Ghana. It works completely offline and can be installed like a native app."

### Section 1: Installation (45 sec)
1. Show install prompt appearing
2. Explain it works on Android, iOS, Desktop
3. Demo install on Chrome/Edge
4. Show installed app in apps list
5. Open as standalone app

### Section 2: Patient Features (60 sec)
1. **Dashboard** - Overview with stats and trends
2. **Measurements**:
   - Show trend charts
   - Navigate to Add Measurement
   - Demo inline tabs (no page reload!)
   - Add BP reading with demo values
3. **Medications**:
   - Show medication list
   - Add new medication
   - Show dosage schedule

### Section 3: CHW Portal (60 sec)
1. Navigate to /cwh/dashboard
2. Show patient list and stats
3. Open /cwh/patients/register
4. Demo patient registration with "Fill Demo" button
5. Show stepper UI and form validation
6. Navigate to /cwh/visits
7. Show home visit records

### Section 4: Clinician Portal (45 sec)
1. Navigate to /clinician
2. Show ePrescriptions list
3. Create new prescription
4. Show referrals received
5. Review alerts and cases

### Section 5: Offline Capabilities (60 sec)
1. Open DevTools Network tab
2. Enable Offline mode
3. Navigate across all sections
4. Add new BP measurement
5. Add new medication
6. Show everything still works!
7. Check sync queue building up
8. Go online → sync happens
9. Refresh to see synced data

### Section 6: Notifications (30 sec)
1. Show health alert toasts appearing
2. Explain severity levels
3. Dismiss critical alert
4. Show admin page for seeding more alerts

### Closing (30 sec)
> "All data is stored locally on the device, syncs when online, and the app works perfectly even without internet. Perfect for rural healthcare settings in Ghana."

---

## 🎯 Key Points to Highlight

### PWA Features
- ✅ Installable on all devices
- ✅ Works offline completely
- ✅ Fast loading (service worker cache)
- ✅ Native app experience

### Offline-First
- ✅ All data in IndexedDB (local)
- ✅ Add/edit/view without internet
- ✅ Auto-sync when online
- ✅ Conflict resolution

### Health Features
- ✅ BP and glucose tracking
- ✅ Medication management
- ✅ Health alerts with toasts
- ✅ Trend visualization

### Multi-Role
- ✅ Patient self-tracking
- ✅ CHW field work
- ✅ Clinician prescriptions

### Ghana-Specific
- ✅ Ghana Card integration
- ✅ NHIS support
- ✅ Community-based workflow
- ✅ Local names and locations

---

## 🛠️ Pre-Demo Checklist

- [ ] Run `npm run dev` (server at localhost:3000)
- [ ] Seed demo data via /admin page
- [ ] Clear browser cache for fresh demo
- [ ] Test offline mode works
- [ ] Prepare DevTools window (F12)
- [ ] Close unnecessary browser tabs
- [ ] Test on mobile device (optional)
- [ ] Charge laptop/device fully
- [ ] Record with good lighting
- [ ] Use screen recording software

---

## 🎥 Recording Tips

### Setup
- Use OBS, Loom, or built-in screen recorder
- 1080p resolution minimum
- Show browser window + DevTools side-by-side
- Enable microphone for narration

### During Recording
- Speak clearly and not too fast
- Pause before transitions
- Point out key features with cursor
- Show URL bar to prove it's a web app
- Zoom in on important UI elements

### Mistakes
- Don't worry! You can edit
- Pause and re-do sections
- Cut out long loading times
- Add text overlays in editing

---

## 💡 Pro Tips

1. **Toast Timing** - Health alerts appear after page load (30 sec interval)
2. **Install Prompt** - Shows 3 seconds after first visit
3. **Offline Test** - Use DevTools, not actual network disconnect (easier to toggle)
4. **Demo Data** - Re-seed if you mess up data during recording
5. **Multiple Takes** - Record each section separately, combine in editing
6. **Mobile Demo** - Use Chrome DevTools device emulation for quick mobile view
7. **Network Tab** - Show service worker intercepting requests
8. **Application Tab** - Show IndexedDB with actual data

---

## 📱 Mobile Recording Setup

If recording on actual mobile device:

### Android
1. Enable Developer Options
2. Enable USB Debugging
3. Connect to computer
4. Use `scrcpy` or Android Studio screen mirror
5. Or use built-in screen recorder

### iOS
1. Connect to Mac via cable
2. Use QuickTime Player → New Movie Recording
3. Select iPhone as camera source
4. Or use iOS built-in screen recording

---

## 🎬 Sample Narration Script

```
[00:00 - Intro]
"Hello! Today I'm showing Me Apomuden, a Progressive Web App 
for blood pressure and glucose tracking in Ghana."

[00:15 - Install]
"First, notice the install prompt at the bottom. This web app 
can be installed like a native app on any device."

[00:30 - Dashboard]
"Here's the patient dashboard with an overview of vital signs, 
recent measurements, and health alerts."

[00:45 - Add Measurement]
"Let me add a new blood pressure reading. Notice the inline tabs
- I can switch between BP and glucose without changing pages."

[01:00 - Offline]
"Now here's the magic - I'm going to turn off the network 
completely using DevTools..."

[01:10 - Offline Demo]
"...and the app still works perfectly! I can navigate, view data,
and even add new measurements. Everything is stored locally."

[01:30 - Sync]
"When I go back online, the data syncs automatically to the server."

[01:45 - CHW/Clinician]
"The app also has portals for Community Health Workers and Clinicians
for registrations, home visits, and prescriptions."

[02:00 - Closing]
"Perfect for rural areas with intermittent internet. All built as
a web app - no app store needed!"
```

---

**Ready to record? Go for it! 🎬🎉**
