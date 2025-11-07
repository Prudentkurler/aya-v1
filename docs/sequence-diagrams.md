# ME APOMUDEN - Sequence Diagrams

This document illustrates the sequence of interactions for critical workflows within the ME APOMUDEN platform.

## 1. Patient Enrollment (by CHW)

This diagram shows the process of a CHW enrolling a new patient using a mobile device, including Ghana Card QR scan and biometric capture.

```mermaid
sequenceDiagram
    participant CHW_App as CHW Mobile App (Frontend)
    participant LocalDB as Dexie.js (Offline DB)
    participant BackendAPI as ME APOMUDEN API
    participant NIA_API as National ID Authority API
    participant S3 as Biometric Storage (S3)

    CHW_App->>CHW_App: Start New Patient Enrollment
    CHW_App->>CHW_App: Open Camera for QR Scan
    CHW_App-->>NIA_API: Scan Ghana Card QR -> Request Patient Data
    NIA_API-->>CHW_App: Return Basic Patient Info
    CHW_App->>CHW_App: Display Prefilled Form
    CHW_App->>CHW_App: Capture Fingerprint/Photo
    CHW_App->>LocalDB: Save Patient Data (Profile, Biometrics) with 'pending' sync status
    LocalDB-->>CHW_App: Confirm Local Save (Patient ID)

    Note over CHW_App, S3: Later, when online...
    CHW_App->>BackendAPI: Sync New Patient Data
    BackendAPI->>S3: Upload Biometric Data
    S3-->>BackendAPI: Return Storage URL
    BackendAPI->>BackendAPI: Save Patient Record with Biometric URL
    BackendAPI-->>CHW_App: Confirm Sync
    CHW_App->>LocalDB: Update Patient Sync Status to 'synced'
```

## 2. ePrescription & NHIS Verification

This diagram shows a clinician creating an e-prescription and the system verifying it against the NHIS database.

```mermaid
sequenceDiagram
    participant Clinician_UI as Clinician Dashboard
    participant LocalDB as Dexie.js (Offline DB)
    participant BackendAPI as ME APOMUDEN API
    participant NHIS_API as NHIS API

    Clinician_UI->>Clinician_UI: Open Patient Dashboard
    Clinician_UI->>Clinician_UI: Create New ePrescription
    Clinician_UI->>LocalDB: Save ePrescription with 'pending' sync status
    LocalDB-->>Clinician_UI: Confirm Local Save

    Note over Clinician_UI, BackendAPI: When online...
    Clinician_UI->>BackendAPI: Sync ePrescription
    BackendAPI->>NHIS_API: Verify Patient NHIS Number & Prescription
    NHIS_API-->>BackendAPI: Return Verification Status (Active/Inactive)
    BackendAPI->>BackendAPI: Update ePrescription with NHIS status
    BackendAPI-->>Clinician_UI: Confirm Sync & Verification
    Clinician_UI->>LocalDB: Update ePrescription sync & verification status
```

## 3. CHW Home Visit & Data Sync

This diagram shows a CHW conducting a home visit, recording data offline, and syncing it later.

```mermaid
sequenceDiagram
    participant CHW_App as CHW Mobile App (Frontend)
    participant LocalDB as Dexie.js (Offline DB)
    participant BackendAPI as ME APOMUDEN API

    CHW_App->>LocalDB: Load Patient Profile for Visit
    LocalDB-->>CHW_App: Display Patient Data
    CHW_App->>CHW_App: Record Vitals (BP, Glucose)
    CHW_App->>LocalDB: Save Measurement
    CHW_App->>CHW_App: Record Medication Adherence
    CHW_App->>LocalDB: Save Adherence Data
    CHW_App->>CHW_App: Create Referral if needed
    CHW_App->>LocalDB: Save Referral
    CHW_App->>LocalDB: Save Visit Summary (CHWVisit)
    LocalDB-->>CHW_App: All data saved locally for offline use

    Note over CHW_App, BackendAPI: When network is available...
    CHW_App->>BackendAPI: Start Sync Process (SyncQueue)
    loop For each item in SyncQueue
        CHW_App->>BackendAPI: Send (Measurement, Adherence, Visit, etc.)
        BackendAPI-->>CHW_App: Confirm Item Received
        CHW_App->>LocalDB: Mark item as 'synced'
    end
```

## 4. DHIMS2 Data Export

This diagram shows the automated process of aggregating data and exporting it for DHIMS2.

```mermaid
sequenceDiagram
    participant Scheduler as Cron Job/Scheduler
    participant BackendAPI as ME APOMUDEN API
    participant DB as Central Database (Postgres)
    participant DHIMS2_Endpoint as DHIMS2 API/File Endpoint

    Scheduler->>BackendAPI: Trigger Monthly DHIMS2 Export Job
    BackendAPI->>DB: Query for aggregated indicators (e.g., new hypertension cases, # of CHW visits)
    DB-->>BackendAPI: Return Aggregated Data
    BackendAPI->>BackendAPI: Format data into DHIMS2 required format (e.g., CSV, JSON)
    BackendAPI->>DHIMS2_Endpoint: Push Formatted Data
    DHIMS2_Endpoint-->>BackendAPI: Acknowledge Receipt
    BackendAPI->>DB: Log successful export event
```
