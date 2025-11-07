export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: "once-daily" | "twice-daily" | "three-times" | "as-needed";
  prescribedDate: Date;
  notes?: string;
  active: boolean;
  synced: boolean;
}

export interface MedicationAdherence {
  medicationId: string;
  date: Date;
  taken: boolean;
}
