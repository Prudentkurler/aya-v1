"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { db } from "@/lib/db";
import type { Medication } from "@/lib/types";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const medicationSchema = z.object({
  name: z.string().min(1, "Medication name required"),
  dosage: z.string().min(1, "Dosage required"),
  frequency: z.enum(["once-daily", "twice-daily", "three-times", "as-needed"]),
  notes: z.string().optional(),
});

type MedicationFormData = z.infer<typeof medicationSchema>;

export default function MedicationsAddPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
  });

  const onSubmit = async (data: MedicationFormData) => {
    const medication: Medication = {
      id: Date.now().toString(),
      ...data,
      prescribedDate: new Date(),
      active: true,
      synced: false,
    };

    try {
      await db.medications.add(medication);
      setMedications((prev) => [medication, ...prev]);
      reset();
      alert("Medication added successfully!");
    } catch (error) {
      console.error("Failed to add medication:", error);
      alert("Failed to add medication");
    }
  };

  return (
    <DashboardLayout userType="patient">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Add Medication
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Record a new medication in your list
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl">
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Medication Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="e.g., Lisinopril"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Dosage
              </label>
              <input
                {...register("dosage")}
                type="text"
                placeholder="e.g., 10mg"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
              {errors.dosage && (
                <p className="mt-1 text-sm text-red-500">{errors.dosage.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Frequency
              </label>
              <select
                {...register("frequency")}
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="once-daily">Once Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="three-times">Three Times Daily</option>
                <option value="as-needed">As Needed</option>
              </select>
              {errors.frequency && (
                <p className="mt-1 text-sm text-red-500">{errors.frequency.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Notes (optional)
              </label>
              <textarea
                {...register("notes")}
                placeholder="Any special instructions?"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 transition-colors dark:bg-green-700 dark:hover:bg-green-600"
            >
              Save Medication
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
