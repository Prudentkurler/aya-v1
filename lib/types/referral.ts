export interface Referral {
  id?: number;
  serverId?: string;
  patientId: string;
  patientName: string;
  chwId: string;
  chwName?: string;
  facilityId?: string;
  facilityName?: string;
  reason: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  status: 'pending' | 'accepted' | 'completed' | 'rejected' | 'cancelled';
  symptoms?: string;
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
  };
  clinicianId?: string;
  clinicianNotes?: string;
  outcome?: string;
  referredAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  synced?: 0 | 1;
}
