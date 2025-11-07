export interface EPrescription {
  id?: number;
  serverId?: string;
  userId: string;
  clinicianId: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
  }>;
  nhisVerified: boolean;
  dispensed: boolean;
  createdAt: number;
  synced: boolean;
}
