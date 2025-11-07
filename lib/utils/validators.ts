/**
 * Blood pressure validation ranges based on WHO/ACC guidelines
 * Adapted for Ghanaian population
 */
export const BP_RANGES = {
  optimal: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } },
  elevated: {
    systolic: { min: 120, max: 130 },
    diastolic: { min: 80, max: 80 },
  },
  stage1: { systolic: { min: 130, max: 140 }, diastolic: { min: 80, max: 90 } },
  stage2: {
    systolic: { min: 140, max: 180 },
    diastolic: { min: 90, max: 120 },
  },
  crisis: { systolic: { min: 180, max: Infinity }, diastolic: { min: 120, max: Infinity } },
};

export const GLUCOSE_RANGES = {
  low: { value: { min: 0, max: 70 } },
  normal: { value: { min: 70, max: 100 } },
  prediabetic: { value: { min: 100, max: 126 } },
  diabetic: { value: { min: 126, max: Infinity } },
};

export function validateBloodPressure(
  systolic: number,
  diastolic: number
): {
  valid: boolean;
  status: "optimal" | "elevated" | "stage1" | "stage2" | "crisis" | "invalid";
  message: string;
} {
  if (systolic < 50 || systolic > 300 || diastolic < 30 || diastolic > 200) {
    return {
      valid: false,
      status: "invalid",
      message: "Blood pressure reading is outside normal range",
    };
  }

  if (systolic >= 180 || diastolic >= 120) {
    return {
      valid: true,
      status: "crisis",
      message: "⚠️ High! Please seek medical attention immediately.",
    };
  }

  if (systolic >= 140 || diastolic >= 90) {
    return {
      valid: true,
      status: "stage2",
      message: "Elevated. Monitor closely and follow treatment plan.",
    };
  }

  if (systolic >= 130 || diastolic >= 80) {
    return {
      valid: true,
      status: "stage1",
      message: "Moderately elevated. Continue monitoring.",
    };
  }

  if (systolic >= 120) {
    return {
      valid: true,
      status: "elevated",
      message: "Slightly elevated. Stay active.",
    };
  }

  return {
    valid: true,
    status: "optimal",
    message: "✓ Excellent! Keep it up.",
  };
}

/**
 * Enhanced BP validation with more details
 */
export function validateBPReading(systolic: number, diastolic: number) {
  const validation = validateBloodPressure(systolic, diastolic);
  const isCritical = systolic >= 180 || diastolic >= 120;
  const isHigh = systolic >= 140 || diastolic >= 90;

  return {
    valid: validation.valid,
    status: validation.status,
    category: validation.status.charAt(0).toUpperCase() + validation.status.slice(1),
    recommendation: validation.message,
    isCritical,
    isHigh,
  };
}

export function validateGlucose(glucose: number): {
  valid: boolean;
  status: "low" | "normal" | "prediabetic" | "diabetic" | "invalid";
  message: string;
} {
  if (glucose < 40 || glucose > 600) {
    return {
      valid: false,
      status: "invalid",
      message: "Glucose reading is outside normal range",
    };
  }

  if (glucose < 70) {
    return {
      valid: true,
      status: "low",
      message: "⚠️ Low! Eat something with sugar.",
    };
  }

  if (glucose < 100) {
    return {
      valid: true,
      status: "normal",
      message: "✓ Normal fasting glucose.",
    };
  }

  if (glucose < 126) {
    return {
      valid: true,
      status: "prediabetic",
      message: "Prediabetic range. Monitor diet.",
    };
  }

  return {
    valid: true,
    status: "diabetic",
    message: "Diabetic range. Follow treatment plan.",
  };
}
