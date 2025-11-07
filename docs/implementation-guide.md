# ME APOMUDEN - Implementation Guide

This document provides a technical roadmap for adapting the `aya-v1` Next.js application to meet the requirements of the ME APOMUDEN Digital Health Platform specification.

---

## 1. Core Architectural Changes

### 1.1. Role-Based Access Control (RBAC) & Layouts

The existing `DashboardLayout` needs to be enhanced to handle three distinct user roles: `patient`, `chw`, and `clinician`.

-   **`components/layout/dashboard-layout.tsx`**:
    -   Modify the component to accept the `userType` prop.
    -   Conditionally render the sidebar navigation (`components/layout/sidebar-nav.tsx`) based on the `userType`.
    -   Create separate navigation link configurations for each role.

### 1.2. Enhanced Data Sync Logic

The existing sync mechanism in `lib/db/schema.ts` must be expanded to handle the new entities.

-   **`lib/db/schema.ts`**:
    -   Update the `SyncQueueItem` `entity` type to include `'eprescription'`, `'chwVisit'`, `'referral'`.
    -   Expand the `markSyncQueueItemSuccess` method to handle the new entities, updating their `synced` and `serverId` fields upon successful API confirmation.
-   **`lib/sync-manager.ts` (New File)**:
    -   Create a dedicated sync manager to orchestrate the process.
    -   This manager will be triggered by a `useEffect` hook in the main `DashboardLayout` or by a periodic background worker.
    -   It will fetch items from `db.getSyncQueueForUser()` and make the corresponding API calls.

---

## 2. Frontend Implementation (Next.js Pages & Components)

### 2.1. Patient Enrollment Flow (CHW Role)

-   **New Page: `app/chw/patients/register/page.tsx`**:
    -   A multi-step form for patient registration.
    -   **Step 1: Ghana Card Scan**:
        -   Implement a component `components/ghana-card-scanner.tsx` that uses a library like `react-qr-reader`.
        -   On scan, make a (mocked) API call to the NIA endpoint: `GET /api/nia?cardId=...`.
        -   Prefill the form with the returned data.
    -   **Step 2: Biometrics**:
        -   Create a component `components/biometric-capture.tsx`.
        -   Use the browser's `MediaDevices.getUserMedia()` for photo capture.
        -   For fingerprint, integrate a placeholder UI that simulates a fingerprint scan.
    -   **Step 3: Additional Details**:
        -   Form fields for `nhisNumber`, `community`, `householdId`, etc.
    -   **On Submit**:
        -   Save all data to the `userProfile` table in Dexie.
        -   Add a `'CREATE'` operation to the `syncQueue`.

### 2.2. CHW Module

-   **New Page: `app/chw/dashboard/page.tsx`**:
    -   Display a list of assigned patients.
    -   Show recent alerts for their patients.
    -   Provide shortcuts to register a new patient or start a visit.
-   **New Page: `app/chw/visits/[patientId]/page.tsx`**:
    -   A dashboard for conducting a home visit.
    -   **Vitals Section**: Reuse the measurement components from the patient dashboard (`app/measurements/add`).
    -   **Medication Adherence Section**: A checklist based on the patient's active medications.
    -   **Notes Section**: A textarea for visit notes.
    -   **Referral Form**: A simple form to create a `Referral` object.
    -   **On "End Visit"**:
        -   Save the `CHWVisit` object to Dexie.
        -   Save any new `Measurement`, `MedicationAdherence`, or `Referral` objects.
        -   Add all new records to the `syncQueue`.

### 2.3. Clinician Module

-   **New Page: `app/clinician/patients/[patientId]/eprescription/page.tsx`**:
    -   A form to create a new e-prescription.
    -   Allow searching for medications and adding them to the prescription list.
    -   Include fields for dosage, frequency, and duration.
    -   **On "Submit Prescription"**:
        -   Display the patient's `nhisNumber`.
        -   A button to "Verify with NHIS" which triggers the backend verification flow.
        -   Save the `EPrescription` to Dexie and add it to the `syncQueue`.

---

## 3. Backend Implementation (API Routes)

All API routes will be created under `app/api/`. They will serve as the interface between the offline-first client and the central database.

### 3.1. Patient API

-   **`POST /api/patients`**:
    -   **Controller**: `app/api/patients/route.ts`
    -   **Action**: Create a new patient profile. Receives data from the CHW's sync process.
    -   **Logic**:
        1.  Validate incoming data.
        2.  Handle biometric data upload to a secure storage (e.g., S3) and save the URL.
        3.  Save the `UserProfile` to the central Postgres database.
        4.  Return the `serverId` for the new profile.

### 3.2. ePrescription API

-   **`POST /api/prescriptions`**:
    -   **Controller**: `app/api/prescriptions/route.ts`
    -   **Action**: Create a new e-prescription.
    -   **Logic**:
        1.  Receive prescription data from the clinician's client.
        2.  Make a call to the external NHIS API for verification.
        3.  Save the `EPrescription` with its `nhisVerified` status.
        4.  Return the `serverId`.

### 3.3. CHW Visit API

-   **`POST /api/visits`**:
    -   **Controller**: `app/api/visits/route.ts`
    -   **Action**: Log a new CHW home visit.
    -   **Logic**:
        1.  Receive visit data (`CHWVisit` object).
        2.  Save to the central database.
        3.  Return the `serverId`.

### 3.4. DHIMS2 Export (Scheduled Job)

-   This will be a server-side process, not a direct API route.
-   **Location**: `lib/jobs/dhims2-exporter.ts`
-   **Trigger**: A cron job (e.g., using Vercel Cron or a separate scheduler).
-   **Logic**:
    1.  Run a complex SQL query against the central database to aggregate the required indicators.
    2.  Format the data into the specified CSV or JSON structure.
    3.  Push the file to the DHIMS2 endpoint.
    4.  Log the result of the export.

---

## 4. Next Steps & Priorities

1.  **Implement RBAC**: Update `DashboardLayout` and create role-specific navigation menus. This is foundational.
2.  **Build the CHW Patient Registration Flow**: Create the new pages and components for a CHW to register a patient. This is the most complex new UI flow.
3.  **Develop Backend Stubs**: Create the basic API route files (`route.ts`) for each new entity with placeholder logic.
4.  **Flesh out the Sync Manager**: Implement the `sync-manager.ts` to handle the full loop of fetching from `syncQueue`, calling the API, and updating the local record.
5.  **Build out other modules** (CHW Visits, Clinician ePrescriptions) iteratively.
