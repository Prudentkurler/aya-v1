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
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Health Measurements
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
              Track and manage your health readings
            </p>
          </div>
          <Link
            href="/measurements/add"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm md:text-base text-white hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
          >
            <span>+ Add Reading</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-3 md:space-y-4">
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
              className="rounded-lg bg-white p-3 md:p-4 shadow-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  {m.type === "blood_pressure" ? (
                    <>
                      <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">
                        Blood Pressure
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                        {m.systolic}/{m.diastolic} mmHg
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">
                        Glucose
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                        {m.glucoseLevel} mg/dL
                      </p>
                    </>
                  )}
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(m.measuredAt)} at {formatTime(m.measuredAt)}
                  </p>
                </div>
                <div
                  className={`rounded-full px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-white shrink-0 ${
                    m.type === "blood_pressure"
                      ? getBPStatusColor(m.systolic!) === "green"
                        ? "bg-green-500"
                        : getBPStatusColor(m.systolic!) === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      : getGlucoseStatusColor(m.glucoseLevel!) === "green"
                        ? "bg-green-500"
                        : getGlucoseStatusColor(m.glucoseLevel!) === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                >
                  {m.type === "blood_pressure" ? "BP" : "Glucose"}
                </div>
              </div>
              {m.notes && (
                <p className="mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400">
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
