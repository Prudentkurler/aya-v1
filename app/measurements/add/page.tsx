"use client";

import { useState } from "react";
import { BPEntryForm, GlucoseEntryForm } from "@/components/forms/measurement-forms";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function MeasurementsAddPage() {
  const [activeTab, setActiveTab] = useState<"bp" | "glucose">("bp");

  return (
    <DashboardLayout userType="patient">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          {activeTab === "glucose" ? "Log Glucose Reading" : "Log Blood Pressure Reading"}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Enter your health measurement below
        </p>
      </div>

      {/* Type Selector - Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("bp")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-center font-medium transition-colors ${
            activeTab === "bp"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          Blood Pressure
        </button>
        <button
          onClick={() => setActiveTab("glucose")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-center font-medium transition-colors ${
            activeTab === "glucose"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          Glucose
        </button>
      </div>

      {/* Form */}
      <div className="rounded-lg bg-white p-4 md:p-6 shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-2xl">
        {activeTab === "glucose" ? (
          <GlucoseEntryForm />
        ) : (
          <BPEntryForm />
        )}
      </div>
    </DashboardLayout>
  );
}
