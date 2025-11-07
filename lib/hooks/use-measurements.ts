"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import type { Measurement } from "@/lib/types";

export function useMeasurements(type?: "bp" | "glucose") {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const data = await db.measurements.toArray();
        const filtered = type ? data.filter((m) => m.type === type) : data;
        const sorted = filtered.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setMeasurements(sorted);
      } catch (error) {
        console.error("Failed to fetch measurements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [type]);

  const addMeasurement = async (measurement: Measurement) => {
    try {
      await db.measurements.add(measurement);
      setMeasurements((prev) => [measurement, ...prev]);
    } catch (error) {
      console.error("Failed to add measurement:", error);
      throw error;
    }
  };

  return { measurements, loading, addMeasurement };
}
