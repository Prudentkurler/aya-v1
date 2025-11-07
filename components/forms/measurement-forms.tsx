"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMeasurements } from "@/lib/hooks/use-measurements";
import { validateBloodPressure, validateGlucose } from "@/lib/utils/validators";
import { useRouter } from "next/navigation";
import type { Measurement } from "@/lib/types";

const bpSchema = z.object({
  systolic: z.number().min(50).max(300),
  diastolic: z.number().min(30).max(200),
  notes: z.string().optional(),
});

const glucoseSchema = z.object({
  glucose: z.number().min(40).max(600),
  notes: z.string().optional(),
});

type BPFormData = z.infer<typeof bpSchema>;
type GlucoseFormData = z.infer<typeof glucoseSchema>;

export function BPEntryForm() {
  const router = useRouter();
  const { addMeasurement } = useMeasurements("bp");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BPFormData>({
    resolver: zodResolver(bpSchema),
  });

  const onSubmit = async (data: BPFormData) => {
    const validation = validateBloodPressure(data.systolic, data.diastolic);

    const measurement: Measurement = {
      id: Date.now().toString(),
      type: "bp",
      value: data.systolic,
      secondaryValue: data.diastolic,
      unit: "mmHg",
      timestamp: new Date(),
      notes: data.notes,
      synced: false,
    };

    try {
      await addMeasurement(measurement);
      // Show alert with status
      alert(`BP Recorded: ${data.systolic}/${data.diastolic}\n${validation.message}`);
      router.push("/measurements");
    } catch (error) {
      console.error("Failed to save measurement:", error);
      alert("Failed to save measurement");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Systolic (Top number)
        </label>
        <input
          {...register("systolic", { valueAsNumber: true })}
          type="number"
          placeholder="e.g., 120"
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        {errors.systolic && (
          <p className="mt-1 text-sm text-red-500">{errors.systolic.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Diastolic (Bottom number)
        </label>
        <input
          {...register("diastolic", { valueAsNumber: true })}
          type="number"
          placeholder="e.g., 80"
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        {errors.diastolic && (
          <p className="mt-1 text-sm text-red-500">{errors.diastolic.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Notes (optional)
        </label>
        <textarea
          {...register("notes")}
          placeholder="How do you feel? Any symptoms?"
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        Save BP Reading
      </button>
    </form>
  );
}

export function GlucoseEntryForm() {
  const router = useRouter();
  const { addMeasurement } = useMeasurements("glucose");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GlucoseFormData>({
    resolver: zodResolver(glucoseSchema),
  });

  const onSubmit = async (data: GlucoseFormData) => {
    const validation = validateGlucose(data.glucose);

    const measurement: Measurement = {
      id: Date.now().toString(),
      type: "glucose",
      value: data.glucose,
      unit: "mg/dL",
      timestamp: new Date(),
      notes: data.notes,
      synced: false,
    };

    try {
      await addMeasurement(measurement);
      alert(`Glucose Recorded: ${data.glucose} mg/dL\n${validation.message}`);
      router.push("/measurements");
    } catch (error) {
      console.error("Failed to save measurement:", error);
      alert("Failed to save measurement");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Glucose Level (mg/dL)
        </label>
        <input
          {...register("glucose", { valueAsNumber: true })}
          type="number"
          placeholder="e.g., 120"
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        {errors.glucose && (
          <p className="mt-1 text-sm text-red-500">{errors.glucose.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Notes (optional)
        </label>
        <textarea
          {...register("notes")}
          placeholder="Time of day? What did you eat?"
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
      >
        Save Glucose Reading
      </button>
    </form>
  );
}
