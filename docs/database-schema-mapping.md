# ME APOMUDEN - Database Schema Mapping

This document maps the ME APOMUDEN technical specification requirements to the Dexie.js local database schema implemented in `aya-v1`.

## Schema Location: `lib/db/schema.ts`
## Type Definitions: `lib/types/`

---

### 1. `userProfile` Table

| ME APOMUDEN Requirement | `UserProfile` Interface Field | Data Type | Dexie Index | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Patient Demographics | `userId`, `firstName`, `lastName`, `dateOfBirth`, `gender` | `string`, `Date` | `userId` (Primary Key) | Core patient information. |
| Ghana Card Number | `ghanaCardId` | `string` | - | For linking with NIA. |
| NHIS Number | `nhisNumber` | `string` | - | For e-prescription verification. |
| Contact Information | `phone` | `string` | - | |
| Location | `community`, `householdId`, `location` | `string`, `string`, `{lat, lon}` | - | GPS coordinates for mapping. |
| Biometric Data | `photoUrl`, `fingerprintData` | `string` | - | `fingerprintData` is a placeholder for the actual biometric representation. |
| Health Info | `bloodType`, `medicalHistory`, `allergies` | `string` | - | Basic medical background. |
| App Preferences | `language`, `literacyLevel` | `'en' | 'tw'`, `'high' | 'low'` | - | For UI/UX adaptation. |

---

### 2. `measurements` Table

| ME APOMUDEN Requirement | `Measurement` Interface Field | Data Type | Dexie Index | Notes |
| :--- | :--- | :--- | :--- | :--- |
| BP & Glucose Readings | `type`, `systolic`, `diastolic`, `glucoseLevel` | `'blood_pressure' | 'glucose'`, `number` | `[userId+type+measuredAt]` | Stores time-series measurement data. |
| Measurement Metadata | `measuredAt`, `notes`, `synced` | `Date`, `string`, `0 | 1` | `synced` | Tracks sync status with the backend. |
| Server ID | `serverId` | `string` | `serverId` | Stores the ID from the central server after sync. |

---

### 3. `eprescriptions` Table

| ME APOMUDEN Requirement | `EPrescription` Interface Field | Data Type | Dexie Index | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Prescription Details | `userId`, `clinicianId`, `medications` | `string`, `string`, `Array<object>` | `userId`, `clinicianId` | Contains the list of prescribed drugs. |
| Verification & Status | `nhisVerified`, `dispensed` | `boolean` | - | Tracks the lifecycle of the prescription. |
| Sync Fields | `serverId`, `synced`, `createdAt` | `string`, `boolean`, `number` | `synced` | For offline-first capability. |

---

### 4. `chwVisits` Table

| ME APOMUDEN Requirement | `CHWVisit` Interface Field | Data Type | Dexie Index | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Visit Information | `userId`, `chwId`, `visitDate`, `reason` | `string`, `string`, `number` | `[userId+chwId+visitDate]` | Records a home visit by a CHW. |
| Visit Details | `activities`, `notes`, `nextVisitDate` | `string[]`, `string`, `number` | - | Captures what happened during the visit. |
| Sync Fields | `serverId`, `synced` | `string`, `boolean` | `synced` | For offline-first capability. |

---

### 5. `referrals` Table

| ME APOMUDEN Requirement | `Referral` Interface Field | Data Type | Dexie Index | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Referral Details | `userId`, `chwId`, `facilityId`, `reason` | `string`, `string`, `string` | `[userId+chwId]` | Manages patient referrals to clinics. |
| Referral Status | `status` | `'pending' | 'completed' | 'cancelled'` | `status` | Tracks the referral process. |
| Sync Fields | `serverId`, `synced`, `createdAt` | `string`, `boolean`, `number` | `synced` | For offline-first capability. |

---

### 6. `syncQueue` Table

| ME APOMUDEN Requirement | `SyncQueueItem` Interface Field | Data Type | Dexie Index | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Offline-First Support | `operation`, `entity`, `entityId`, `data` | `'CREATE' | 'UPDATE'`, `string`, `number`, `object` | `[userId+operation]` | The core of the offline-first architecture. Queues all DB changes when offline. |
| Sync Management | `attempts`, `maxRetries`, `lastError` | `number`, `number`, `string` | `attempts` | Manages the retry logic for syncing. |

---

### 7. Other Tables

- **`medications`**: Tracks medication details prescribed to a user.
- **`medicationAdherence`**: Logs patient-reported adherence to a specific medication.
- **`healthAlerts`**: Stores system-generated alerts based on measurement data.
- **`healthEducation`**: Stores health education content.
- **`familyGroups`**: Manages patient-created family/compound groups.
