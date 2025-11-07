export interface CHWVisit {
  id?: number;
  serverId?: string;
  userId: string;
  chwId: string;
  visitDate: number;
  reason: string;
  activities: string[]; // e.g., 'Blood Pressure Check', 'Medication Adherence Counseling'
  notes?: string;
  nextVisitDate?: number;
  synced: boolean;
}
