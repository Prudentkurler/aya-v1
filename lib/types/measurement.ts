export type MeasurementType = "bp" | "glucose";

export interface Measurement {
  id: string;
  type: MeasurementType;
  value: number;
  secondaryValue?: number; // For BP (diastolic)
  timestamp: Date;
  notes?: string;
  unit: "mmHg" | "mg/dL";
  synced: boolean;
}

export interface BloodPressureMeasurement extends Measurement {
  type: "bp";
  value: number; // systolic
  secondaryValue: number; // diastolic
  unit: "mmHg";
}

export interface GlucoseMeasurement extends Measurement {
  type: "glucose";
  value: number;
  unit: "mg/dL";
}

export interface MeasurementStats {
  average: number;
  min: number;
  max: number;
  count: number;
  trend: "up" | "down" | "stable";
}
