import { db } from '../db/schema';
import type { Measurement } from '../types/measurement';
import type { Medication } from '../types/medication';
import type { UserProfile } from '../types/user';
import type { CHWVisit } from '../types/chw-visit';
import type { EPrescription } from '../types/eprescription';
import type { Referral } from '../types/referral';

/**
 * Seed demo data for testing and video demonstration
 */
export async function seedDemoData() {
  console.log('[Demo Data] Starting to seed demo data...');

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    // await db.measurements.clear();
    // await db.medications.clear();
    // await db.userProfile.clear();

    // Create demo patients
    const demoPatients: Omit<UserProfile, 'id'>[] = [
      {
        userId: 'patient-demo-001',
        firstName: 'Kwame',
        lastName: 'Mensah',
        phone: '0244567890',
        dateOfBirth: new Date('1975-03-15'),
        ghanaCardId: 'GHA-123456789-0',
        nhisNumber: 'NHIS-987654',
        community: 'Adenta',
        householdId: 'HH-1001',
        language: 'en',
        literacyLevel: 'high',
        photoUrl: '',
        fingerprintData: '',
        location: { latitude: 5.6537, longitude: -0.1870 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-002',
        firstName: 'Ama',
        lastName: 'Serwaa',
        phone: '0245678901',
        dateOfBirth: new Date('1980-07-22'),
        ghanaCardId: 'GHA-234567890-1',
        nhisNumber: 'NHIS-876543',
        community: 'Madina',
        householdId: 'HH-1002',
        language: 'en',
        literacyLevel: 'medium',
        photoUrl: '',
        fingerprintData: '',
        location: { latitude: 5.6892, longitude: -0.1683 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-003',
        firstName: 'Kofi',
        lastName: 'Osei',
        phone: '0246789012',
        dateOfBirth: new Date('1968-11-30'),
        ghanaCardId: 'GHA-345678901-2',
        nhisNumber: 'NHIS-765432',
        community: 'Legon',
        householdId: 'HH-1003',
        language: 'en',
        literacyLevel: 'high',
        photoUrl: '',
        fingerprintData: '',
        location: { latitude: 5.6500, longitude: -0.1870 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const patient of demoPatients) {
      await db.userProfile.add(patient as any);
    }
    console.log(`[Demo Data] Created ${demoPatients.length} demo patients`);

    // Create demo measurements
    const now = new Date();
    const demoMeasurements: Omit<Measurement, 'id'>[] = [
      // Recent BP measurements
      {
        userId: 'patient-demo-001',
        type: 'blood_pressure',
        systolic: 128,
        diastolic: 84,
        heartRate: 72,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        measuredAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        notes: 'Morning reading after breakfast',
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-001',
        type: 'blood_pressure',
        systolic: 135,
        diastolic: 88,
        heartRate: 78,
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        measuredAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        notes: 'Evening reading',
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-001',
        type: 'blood_pressure',
        systolic: 142,
        diastolic: 92,
        heartRate: 80,
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        measuredAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        notes: 'Felt stressed today',
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Glucose measurements
      {
        userId: 'patient-demo-001',
        type: 'glucose',
        glucoseLevel: 95,
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        measuredAt: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        notes: 'Fasting glucose',
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-001',
        type: 'glucose',
        glucoseLevel: 142,
        timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000),
        measuredAt: new Date(now.getTime() - 25 * 60 * 60 * 1000), // Yesterday
        notes: 'After lunch',
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Another patient's measurements
      {
        userId: 'patient-demo-002',
        type: 'blood_pressure',
        systolic: 145,
        diastolic: 95,
        heartRate: 85,
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
        measuredAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        notes: 'High reading - needs follow-up',
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-002',
        type: 'glucose',
        glucoseLevel: 165,
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        measuredAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        notes: 'Elevated glucose',
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const measurement of demoMeasurements) {
      await db.measurements.add(measurement as any);
    }
    console.log(`[Demo Data] Created ${demoMeasurements.length} demo measurements`);

    // Create demo medications
    const demoMedications: Omit<Medication, 'id'>[] = [
      {
        userId: 'patient-demo-001',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // Started 30 days ago
        instructions: 'Take in the morning with water. Prescribed by Dr. Nkrumah',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-001',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
        instructions: 'Take with meals. Prescribed by Dr. Nkrumah',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'patient-demo-002',
        name: 'Amlodipine',
        dosage: '5mg',
        frequency: 'Once daily',
        startDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        instructions: 'Take in the evening. Prescribed by Dr. Agyeman',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const medication of demoMedications) {
      await db.medications.add(medication as any);
    }
    console.log(`[Demo Data] Created ${demoMedications.length} demo medications`);

    // Create demo CHW visits
    const demoVisits: Omit<CHWVisit, 'id'>[] = [
      {
        patientId: 'patient-demo-001',
  patientName: 'Kwame Mensah',
  chwId: 'chw-demo-001',
        visitDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        status: 'completed',
        community: 'Adenta',
        vitals: {
          bloodPressure: '138/86',
          heartRate: 75,
          temperature: 36.8,
          weight: 78.5,
        },
        medicationAdherence: {
          medicationsTaken: 'Most medications taken',
          missedDoses: 2,
        },
        concerns: 'Patient reports occasional dizziness',
        recommendations: 'Continue current medication, schedule follow-up in 1 week',
        createdAt: new Date(),
        updatedAt: new Date(),
        synced: 0,
      },
      {
        patientId: 'patient-demo-002',
  patientName: 'Ama Serwaa',
  chwId: 'chw-demo-001',
        visitDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        status: 'completed',
        community: 'Madina',
        vitals: {
          bloodPressure: '145/95',
          heartRate: 88,
          temperature: 37.1,
          weight: 82.0,
        },
        medicationAdherence: {
          medicationsTaken: 'None taken',
          missedDoses: 10,
        },
        concerns: 'Non-adherence to medication, elevated BP. Side effects: Feeling tired',
        recommendations: 'Referral to clinician for medication review',
        needsReferral: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        synced: 0,
      },
    ];

    for (const visit of demoVisits) {
      await db.chwVisits.add(visit as any);
    }
    console.log(`[Demo Data] Created ${demoVisits.length} demo CHW visits`);

    // Create demo ePrescriptions
    const demoPrescriptions: Omit<EPrescription, 'id'>[] = [
      {
        patientId: 'patient-demo-001',
        patientName: 'Kwame Mensah',
        clinicianId: 'clinician-001',
        diagnosis: 'Hypertension Stage 1',
        medications: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
          { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days' },
        ],
  notes: 'Take medications with food. Monitor BP daily.',
        status: 'active',
        createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        synced: 0,
      },
    ];

    for (const prescription of demoPrescriptions) {
      await db.eprescriptions.add(prescription as any);
    }
    console.log(`[Demo Data] Created ${demoPrescriptions.length} demo prescriptions`);

    // Create demo referrals
    const demoReferrals: Omit<Referral, 'id'>[] = [
      {
        patientId: 'patient-demo-002',
        patientName: 'Ama Serwaa',
        chwId: 'chw-demo-001',
        chwName: 'Sarah Adjei',
  facilityName: 'Adenta Municipal Hospital',
        urgency: 'urgent',
        reason: 'Uncontrolled hypertension and medication non-adherence',
        symptoms: 'Headaches, dizziness, fatigue',
        vitals: {
          bloodPressure: '145/95',
          heartRate: 88,
          temperature: 37.1,
        },
        status: 'pending',
        referredAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        synced: 0,
      },
      {
        patientId: 'patient-demo-003',
        patientName: 'Kofi Osei',
        chwId: 'chw-demo-001',
        chwName: 'Sarah Adjei',
  facilityName: 'Legon Hospital',
        urgency: 'routine',
        reason: 'Routine diabetes check-up',
        symptoms: 'None',
        vitals: {
          bloodPressure: '128/82',
          heartRate: 72,
        },
        status: 'accepted',
        referredAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        acceptedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
        clinicianId: 'clinician-001',
        clinicianNotes: 'Scheduled for next week',
        createdAt: new Date(),
        updatedAt: new Date(),
        synced: 0,
      },
    ];

    for (const referral of demoReferrals) {
      await db.referrals.add(referral as any);
    }
    console.log(`[Demo Data] Created ${demoReferrals.length} demo referrals`);

    // Create demo health alerts
    const demoAlerts = [
      {
        userId: 'patient-demo-001',
        type: 'warning' as const,
        title: 'High Blood Pressure Reading',
        message: 'Your blood pressure reading of 142/92 is elevated. Please monitor closely and consult your healthcare provider if it remains high.',
        dismissed: false,
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
      {
        userId: 'patient-demo-002',
        type: 'critical' as const,
        title: 'Medication Adherence Alert',
        message: 'You have missed 10 doses of your medication. Please resume taking your medications as prescribed and contact your CHW.',
        dismissed: false,
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
      {
        userId: 'patient-demo-001',
        type: 'info' as const,
        title: 'Upcoming CHW Visit',
        message: 'Your community health worker will visit you within the next 3 days for a routine checkup.',
        dismissed: false,
        createdAt: new Date(now.getTime() - 30 * 60 * 1000),
      },
    ];

    for (const alert of demoAlerts) {
      await db.healthAlerts.add(alert as any);
    }
    console.log(`[Demo Data] Created ${demoAlerts.length} demo health alerts`);

    console.log('[Demo Data] ✅ Demo data seeding completed successfully!');
    return true;
  } catch (error) {
    console.error('[Demo Data] ❌ Error seeding demo data:', error);
    return false;
  }
}

/**
 * Clear all demo data
 */
export async function clearDemoData() {
  console.log('[Demo Data] Clearing all data...');
  try {
  await db.measurements.clear();
  await db.medications.clear();
  // Clear medication adherence records (table is named medicationAdherence in the schema)
  await db.medicationAdherence.clear();
    await db.chwVisits.clear();
    await db.eprescriptions.clear();
    await db.referrals.clear();
    await db.userProfile.clear();
    await db.syncQueue.clear();
    await db.healthAlerts.clear();
    console.log('[Demo Data] ✅ All data cleared successfully!');
    return true;
  } catch (error) {
    console.error('[Demo Data] ❌ Error clearing data:', error);
    return false;
  }
}
