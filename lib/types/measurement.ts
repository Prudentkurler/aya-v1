export type MeasurementType = "blood_pressure" | "glucose";

export interface Measurement {
  id?: string;
  serverId?: string;
  userId: string;
  type: MeasurementType;
  systolic?: number; // BP systolic
  diastolic?: number; // BP diastolic
  heartRate?: number; // Optional heart rate
  glucoseLevel?: number; // Glucose in mg/dL
  notes?: string;
  timestamp: Date;
  measuredAt: Date;
  synced: 0 | 1; // 0 = not synced, 1 = synced to server
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodPressureMeasurement extends Measurement {
  type: "blood_pressure";
  systolic: number;
  diastolic: number;
}

export interface GlucoseMeasurement extends Measurement {
  type: "glucose";
  glucoseLevel: number;
}

export interface MeasurementStats {
  average: number;
  min: number;
  max: number;
  count: number;
  trend: "up" | "down" | "stable";
}
