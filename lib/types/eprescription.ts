export interface EPrescription {
  id?: number;
  serverId?: string;
  clinicianId: string;
  patientId: string;
  patientName: string;
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration?: string;
    instructions?: string;
  }>;
  status: 'active' | 'completed' | 'cancelled';
  nhisVerified?: boolean;
  dispensed?: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  synced?: 0 | 1;
}

