"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import type { Medication } from "@/lib/types";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function MedicationsListPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const data = await db.medications.toArray();
        // Filter out medications with endDate in the past
        const activeMeds = data.filter((m) => !m.endDate || new Date(m.endDate) > new Date());
        setMedications(activeMeds);
      } catch (error) {
        console.error("Failed to fetch medications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const toggleMedication = async (medication: Medication) => {
    try {
      const newEndDate = medication.endDate ? undefined : new Date();
      await db.medications.update(medication.id!, {
        endDate: newEndDate,
        updatedAt: new Date(),
      });
      setMedications((prev) =>
        prev.map((m) =>
          m.id === medication.id ? { ...m, endDate: newEndDate } : m
        )
      );
    } catch (error) {
      console.error("Failed to update medication:", error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userType="patient">
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading medications...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="patient">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Medications
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your active medications
            </p>
          </div>
          <a
            href="/medications/add"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors"
          >
            <span>+ Add</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {medications.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500">No medications added yet.</p>
            <a
              href="/medications/add"
              className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors"
            >
              Add Your First Medication
            </a>
          </div>
        ) : (
          medications.map((med) => (
            <div
              key={med.id}
              className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {med.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {med.dosage} • {med.frequency}
                  </p>
                  {med.instructions && (
                    <p className="mt-1 text-xs text-slate-500">{med.instructions}</p>
                  )}
                </div>
                <button
                  onClick={() => toggleMedication(med)}
                  className={`rounded-full px-3 py-1 text-sm font-medium text-white transition-colors ${
                    !med.endDate ? "bg-green-500 hover:bg-green-600" : "bg-slate-400 hover:bg-slate-500"
                  }`}
                >
                  {!med.endDate ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
