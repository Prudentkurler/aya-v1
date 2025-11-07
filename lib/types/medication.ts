export interface Medication {
  id?: string;
  serverId?: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  instructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicationAdherence {
  medicationId: string;
  date: Date;
  taken: boolean;
}
