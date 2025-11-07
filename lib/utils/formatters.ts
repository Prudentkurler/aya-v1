export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toFixed(decimals);
}

export function getBPStatusColor(systolic: number): "green" | "yellow" | "red" {
  if (systolic >= 180) return "red";
  if (systolic >= 140) return "red";
  if (systolic >= 130) return "yellow";
  return "green";
}

export function getGlucoseStatusColor(
  glucose: number
): "red" | "yellow" | "green" {
  if (glucose < 70 || glucose > 200) return "red";
  if (glucose >= 100 || glucose < 80) return "yellow";
  return "green";
}

export function abbreviateMeasurementType(
  type: "bp" | "glucose"
): "BP" | "Glucose" {
  return type === "bp" ? "BP" : "Glucose";
}
