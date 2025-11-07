"use client";

import { Suspense } from "react";
import { BPEntryForm, GlucoseEntryForm } from "@/components/forms/measurement-forms";
import { useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

function MeasurementsAddContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "bp";

  return (
    <DashboardLayout userType="patient">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {type === "glucose" ? "Log Glucose Reading" : "Log Blood Pressure Reading"}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Enter your health measurement below
        </p>
      </div>

      {/* Type Selector */}
      <div className="flex gap-2 mb-6">
        <a
          href="/measurements/add"
          className={`flex-1 rounded-lg px-4 py-2 text-center font-medium transition-colors ${
            type !== "glucose"
              ? "bg-blue-600 text-white"
              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          }`}
        >
          Blood Pressure
        </a>
        <a
          href="/measurements/add?type=glucose"
          className={`flex-1 rounded-lg px-4 py-2 text-center font-medium transition-colors ${
            type === "glucose"
              ? "bg-amber-600 text-white"
              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          }`}
        >
          Glucose
        </a>
      </div>

      {/* Form */}
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-2xl">
        {type === "glucose" ? (
          <GlucoseEntryForm />
        ) : (
          <BPEntryForm />
        )}
      </div>
    </DashboardLayout>
  );
}

export default function MeasurementsAddPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <MeasurementsAddContent />
    </Suspense>
  );
}
