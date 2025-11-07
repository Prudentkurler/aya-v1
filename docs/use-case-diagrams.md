# ME APOMUDEN - Use Case Diagrams

This document outlines the primary use cases for the ME APOMUDEN platform, categorized by user role.

## 1. Patient Use Cases

```mermaid
graph TD
    A[Patient] --> B{Enroll in Program};
    A --> C{Record Health Measurement};
    C --> C1(Record Blood Pressure);
    C --> C2(Record Blood Glucose);
    A --> D{View Health Data};
    D --> D1(View Measurements);
    D --> D2(View Trends);
    D --> D3(View Health Insights);
    A --> E{Manage Medications};
    E --> E1(View ePrescription);
    E --> E2(Record Adherence);
    A --> F{Manage Profile};
    F --> F1(Update Personal Info);
    F --> F2(Manage Family Group);
    A --> G(Receive Health Education);
    A --> H(Acknowledge Health Alert);

    subgraph "Enrollment"
        B
    end

    subgraph "Data Management"
        C
        D
    end

    subgraph "Medication"
        E
    end
```

## 2. Community Health Worker (CHW) Use Cases

```mermaid
graph TD
    CHW[Community Health Worker] --> PAT(Access Patient);
    PAT --> P1(Search Patient);
    PAT --> P2(View Patient Dashboard);

    CHW --> REG(Register New Patient);
    REG --> REG1(Capture Ghana Card Data);
    REG --> REG2(Record Biometrics);

    CHW --> HV(Conduct Home Visit);
    HV --> HV1(Record Patient Vitals);
    HV --> HV2(Provide Health Education);
    HV --> HV3(Check Medication Adherence);
    HV --> HV4(Schedule Follow-up);

    CHW --> REF(Create Referral);
    CHW --> AL(View Patient Alerts);
```

## 3. Clinician Use Cases

```mermaid
graph TD
    CL[Clinician] --> PD(Access Patient Dashboard);
    PD --> PD1(Search for Patient);
    PD --> PD2(View Patient's Full Health Record);

    CL --> EP(Manage ePrescriptions);
    EP --> EP1(Create New ePrescription);
    EP --> EP2(Verify with NHIS);
    EP --> EP3(View Prescription History);

    CL --> RV(Review Patient Data);
    RV --> RV1(Analyze Measurement Trends);
    RV --> RV2(Review CHW Visit Notes);
    RV --> RV3(Acknowledge Critical Alerts);

    CL --> RP(View Reports);
    RP --> RP1(Generate DHIMS2 Report);
```

## 4. System Administrator Use Cases

```mermaid
graph TD
    SA[System Admin] --> UM(Manage Users);
    UM --> UM1(Create CHW/Clinician Accounts);
    UM --> UM2(Assign Roles & Facilities);
    UM --> UM3(Deactivate Users);

    SA --> SM(System Monitoring);
    SM --> SM1(View Audit Logs);
    SM --> SM2(Check System Health);

    SA --> CM(Content Management);
    CM --> CM1(Upload Health Education Materials);
```
