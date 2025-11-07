export interface CHWVisit {
  id?: number;
  serverId?: string;
  chwId: string;
  patientId: string;
  patientName: string;
  visitDate: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  community?: string;
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
  };
  medicationAdherence?: {
    medicationsTaken: string;
    missedDoses: number;
  };
  concerns?: string;
  notes?: string;
  recommendations?: string;
  needsReferral?: boolean;
  referralReason?: string;
  nextVisitDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  synced?: 0 | 1;
}

