# Production Features Quick Start

## Getting Started with the Production-Ready Frontend

### 1. Install & Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start dev server
npm run dev
```

### 2. Test Offline Functionality

```bash
# 1. Add a blood pressure reading
# 2. Open DevTools (F12)
# 3. Go to Network tab → set to "Offline"
# 4. Try adding another reading
# 5. Check DevTools → Application → IndexedDB → HealthDB
#    You should see the measurement stored locally
# 6. Go back to Network tab → set to "Online"
# 7. You should see a toast: "Synced 1 item"
```

### 3. Test Voice Features (require HTTPS or localhost)

```bash
# 1. Navigate to /measurements/add?type=bp (low literacy form)
# 2. Click the speaker icon (top right)
# 3. Grant microphone permission
# 4. Say numbers clearly (e.g., "120", "80")
# 5. Your voice should be transcribed
# 6. Click "Speak" to hear playback
```

### 4. Test Forms

**High-Literacy Form:**
```
GET /measurements/add
- Enter systolic and diastolic
- Toggle "Show additional details"
- Add heart rate, context, notes
- Submit
```

**Low-Literacy Form:**
```
GET /measurements/add?type=glucose (example with glucose)
- Use number pad (0-9)
- Tap "Next" to proceed
- Tap "Back" to correct
- Confirm and save
```

### 5. View Trends

```
GET /measurements/trends
- Select "Blood Pressure" or "Glucose"
- Choose time period (7d/30d/90d)
- See interactive chart with statistics
- Reference ranges shown below
```

### 6. Check AI Insights (Phase 2 Ready)

```
GET /insights
- BP and Glucose charts displayed
- Placeholder recommendations shown
- Framework ready for Gemini integration
```

## Key Configuration

### Environment Variables

```env
# Required for backend sync
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Optional
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENVIRONMENT=production
```

### Database Configuration

Located in `lib/db/schema.ts`:

```typescript
// Auto-initialized on first load
const db = new HealthDB();

// Tables automatically created:
- measurements
- medications
- medicationAdherence
- userProfile
- syncQueue
- familyGroups
- healthAlerts
```

## Testing Scenarios

### Scenario 1: Complete Offline Journey

1. Disable internet
2. Add BP reading (stored locally)
3. Add glucose reading (stored locally)
4. Check sync queue in IndexedDB
5. Re-enable internet
6. Watch toast notification: "Synced 2 items"
7. Verify readings synced to server

### Scenario 2: Critical Reading Alert

1. Open high-literacy BP form
2. Enter: Systolic 190, Diastolic 130
3. See red alert box appear
4. Submit
5. Should trigger critical alert modal
6. Modal shows urgent recommendations

### Scenario 3: Voice Data Entry

1. Open low-literacy BP form
2. Click speaker icon
3. Grant microphone access
4. Say "One two zero" for 120
5. Transcript appears
6. Click "Speak" to hear playback
7. Tap "Next" to proceed

### Scenario 4: Data Sync Retry

1. Go offline while sync is pending
2. Stay offline for 5+ minutes
3. Come back online
4. Background sync should retry
5. Check browser console: `console.log` shows retry attempts

### Scenario 5: Multi-Period Trend Analysis

1. Add measurements across different dates
2. Navigate to /measurements/trends
3. Try 7d view - see recent data
4. Switch to 30d view - broader patterns
5. Switch to 90d view - long-term trends

## Common Issues & Solutions

### Voice not working

**Problem**: Microphone button greyed out or disabled

**Solution**:
1. Check you're on `localhost` or `https://` (required by browsers)
2. Grant microphone permissions in browser settings
3. Check browser console for Web Speech API errors
4. Try in Chrome/Edge first (best Web Speech support)

### Sync not happening

**Problem**: Measurements added offline, but not syncing when online

**Solution**:
1. Check Network tab for failed API requests
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Check auth token exists: `localStorage.getItem('auth_token')`
4. Open DevTools → Application → IndexedDB → HealthDB → syncQueue
5. See if items are stuck in queue (check `attempts` field)

### Charts showing no data

**Problem**: Trends page shows "No data available yet"

**Solution**:
1. Add some measurements first
2. Refresh the page
3. Check measurements in IndexedDB (Application tab)
4. Verify date range includes your measurements
5. Try 90d period to see older data

### Forms not submitting

**Problem**: Button does nothing or shows error

**Solution**:
1. Check console for validation errors
2. Verify all required fields filled (red border indicates error)
3. Check IndexedDB has room (usually not the issue)
4. Try refreshing page
5. Check Network tab for API errors

## Performance Tips

1. **Reduce IndexedDB size**: Periodic cleanup
   ```typescript
   // Removes old sync queue items (7+ days old)
   await db.cleanupOldSyncQueue(7);
   ```

2. **Optimize charts**: Limit data points
   ```typescript
   // Request only 30 days instead of 90
   <HealthTrendChart period="30d" />
   ```

3. **Cache measurements locally**:
   ```typescript
   // Data persists in IndexedDB across sessions
   // No need to fetch from server repeatedly
   ```

## Debugging

### Enable detailed logging

```javascript
// In browser console
localStorage.setItem('DEBUG', 'true');

// Check measurements
db.measurements.toArray().then(m => console.log('Measurements:', m));

// Check sync queue
db.syncQueue.toArray().then(q => console.log('Sync Queue:', q));

// Check alerts
db.healthAlerts.toArray().then(a => console.log('Alerts:', a));
```

### Monitor sync process

```javascript
// Watch sync queue in real-time
setInterval(async () => {
  const queue = await db.syncQueue.toArray();
  console.log('Pending syncs:', queue.length);
}, 1000);
```

### Check online/offline status

```javascript
console.log('Current status:', navigator.onLine ? 'Online' : 'Offline');

// Watch for changes
window.addEventListener('online', () => console.log('Back online'));
window.addEventListener('offline', () => console.log('Gone offline'));
```

## Next Steps

### For Backend Team

1. Implement `/api/v1/measurements` endpoints (see `lib/api/client.ts`)
2. Handle batch sync at `/api/v1/measurements/sync`
3. Return `serverId` in sync responses
4. Implement AI insights endpoint (placeholder ready)
5. Set up push notification infrastructure

### For Frontend (Phase 2)

1. Integrate Gemini API for insights
2. Add i18n support (5 languages ready)
3. Implement medication reminders with push notifications
4. Add family/compound health group management
5. Create user preference/settings page

### For DevOps

1. Configure HTTPS for voice features
2. Set up CORS for API
3. Enable service worker caching
4. Configure environment variables
5. Set up monitoring and error tracking

## Resources

- **Dexie.js Docs**: https://dexie.org/
- **Recharts Docs**: https://recharts.org/
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **React Hook Form**: https://react-hook-form.com/
- **Sonner Toast**: https://sonner.emilkowal.ski/

---

Ready to go production! 🚀
