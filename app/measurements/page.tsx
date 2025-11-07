"use client";

import { useMeasurements } from "@/lib/hooks/use-measurements";
import { formatDate, formatTime, getBPStatusColor, getGlucoseStatusColor } from "@/lib/utils/formatters";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function MeasurementsPage() {
  const { measurements, loading } = useMeasurements();

  if (loading) {
    return (
      <DashboardLayout userType="patient">
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading measurements...</p>
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
              Health Measurements
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Track and manage your health readings
            </p>
          </div>
          <Link
            href="/measurements/add"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            <span>+ Add Reading</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {measurements.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No measurements yet.</p>
            <Link
              href="/measurements/add"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              Log Your First Reading
            </Link>
          </div>
        ) : (
          measurements.map((m) => (
            <div
              key={m.id}
              className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  {m.type === "bp" ? (
                    <>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Blood Pressure
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {m.value}/{m.secondaryValue} mmHg
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Glucose
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {m.value} mg/dL
                      </p>
                    </>
                  )}
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(m.timestamp)} at {formatTime(m.timestamp)}
                  </p>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-sm font-medium text-white ${
                    m.type === "bp"
                      ? getBPStatusColor(m.value) === "green"
                        ? "bg-green-500"
                        : getBPStatusColor(m.value) === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      : getGlucoseStatusColor(m.value) === "green"
                        ? "bg-green-500"
                        : getGlucoseStatusColor(m.value) === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                >
                  {m.type === "bp" ? "BP" : "Glucose"}
                </div>
              </div>
              {m.notes && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Note: {m.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
