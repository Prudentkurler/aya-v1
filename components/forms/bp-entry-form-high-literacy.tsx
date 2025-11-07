'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { db } from '@/lib/db/schema';
import { validateBPReading } from '@/lib/utils/validators';
import type { Measurement } from '@/lib/types/measurement';

/**
 * High-literacy BP entry form
 * For users with higher education/comfort with detailed health data
 * Includes heart rate, detailed notes, contextual information
 */

const bpSchema = z.object({
  systolic: z
    .number()
    .min(40, 'Systolic pressure too low')
    .max(300, 'Systolic pressure too high'),
  diastolic: z
    .number()
    .min(20, 'Diastolic pressure too low')
    .max(200, 'Diastolic pressure too high'),
  heartRate: z.number().min(30, 'Heart rate too low').max(200, 'Heart rate too high').optional(),
  context: z.enum(['before_medication', 'after_medication', 'morning', 'evening', 'other']).optional(),
  notes: z.string().max(500, 'Notes too long').optional(),
  position: z.enum(['sitting', 'standing', 'lying']).optional(),
});

type BPFormData = z.infer<typeof bpSchema>;

interface BPEntryFormHighLiteracyProps {
  userId: string;
  onSuccess?: () => void;
  isLoading?: boolean;
}

export function BPEntryFormHighLiteracy({ userId, onSuccess, isLoading }: BPEntryFormHighLiteracyProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<BPFormData>({
    resolver: zodResolver(bpSchema),
    defaultValues: {
      position: 'sitting',
      context: 'other',
    },
  });

  const systolic = watch('systolic');
  const diastolic = watch('diastolic');

  // Real-time BP validation feedback
  const bpStatus = systolic && diastolic ? validateBPReading(systolic, diastolic) : null;

  const onSubmit = async (data: BPFormData) => {
    setIsSaving(true);
    try {
      const userId = 'demo-user-123'; // TODO: Get from auth
      const measurement: Measurement = {
        userId,
        type: 'blood_pressure',
        systolic: data.systolic,
        diastolic: data.diastolic,
        heartRate: data.heartRate,
        notes: [
          data.notes,
          `Context: ${data.context || 'not specified'}`,
          `Position: ${data.position || 'sitting'}`,
        ]
          .filter(Boolean)
          .join('\n'),
        measuredAt: new Date(),
        timestamp: new Date(),
        synced: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to local database
      const id = await db.measurements.add(measurement);

      // Add to sync queue if offline
      if (!navigator.onLine) {
        await db.addToSyncQueue(userId, 'CREATE', 'measurement', Number(id), measurement);
        toast.info('Measurement saved. Will sync when online.');
      } else {
        toast.success('Blood pressure recorded successfully!');
      }

      // Check for critical reading
      if (bpStatus?.isCritical) {
        await db.createAlert(
          userId,
          'critical',
          'Critical Blood Pressure Reading',
          `Your blood pressure (${data.systolic}/${data.diastolic}) is critically high. Please seek immediate medical attention.`,
          Number(id)
        );
        
        toast.error('⚠️ CRITICAL: Please seek medical attention immediately!');
      }

      reset();
    } catch (error) {
      console.error('Error saving BP measurement:', error);
      toast.error('Failed to save blood pressure reading');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Main BP Reading */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Systolic (top number) *
          </label>
          <input
            {...register('systolic', { valueAsNumber: true })}
            type="number"
            placeholder="120"
            className={`w-full px-4 py-3 text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 ${
              errors.systolic
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } dark:bg-gray-800 dark:text-white`}
            disabled={isLoading || isSaving}
          />
          {errors.systolic && <p className="mt-1 text-sm text-red-500">{errors.systolic.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Diastolic (bottom number) *
          </label>
          <input
            {...register('diastolic', { valueAsNumber: true })}
            type="number"
            placeholder="80"
            className={`w-full px-4 py-3 text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 ${
              errors.diastolic
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } dark:bg-gray-800 dark:text-white`}
            disabled={isLoading || isSaving}
          />
          {errors.diastolic && <p className="mt-1 text-sm text-red-500">{errors.diastolic.message}</p>}
        </div>
      </div>

      {/* BP Status Indicator */}
      {bpStatus && (
        <div
          className={`p-4 rounded-lg ${
            bpStatus.isCritical
              ? 'bg-red-100 dark:bg-red-900 border-l-4 border-red-500'
              : bpStatus.isHigh
                ? 'bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500'
                : 'bg-green-100 dark:bg-green-900 border-l-4 border-green-500'
          }`}
        >
          <p
            className={`font-semibold ${
              bpStatus.isCritical
                ? 'text-red-900 dark:text-red-100'
                : bpStatus.isHigh
                  ? 'text-yellow-900 dark:text-yellow-100'
                  : 'text-green-900 dark:text-green-100'
            }`}
          >
            {bpStatus.category}
          </p>
          <p
            className={`text-sm mt-1 ${
              bpStatus.isCritical
                ? 'text-red-800 dark:text-red-200'
                : bpStatus.isHigh
                  ? 'text-yellow-800 dark:text-yellow-200'
                  : 'text-green-800 dark:text-green-200'
            }`}
          >
            {bpStatus.recommendation}
          </p>
        </div>
      )}

      {/* Advanced Options */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showAdvanced ? '▼ Hide' : '▶ Show'} additional details
        </button>

        {showAdvanced && (
          <div className="mt-6 space-y-4">
            {/* Heart Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Heart Rate (optional)
              </label>
              <div className="flex items-center">
                <input
                  {...register('heartRate', { valueAsNumber: true })}
                  type="number"
                  placeholder="72"
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.heartRate
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  } dark:bg-gray-800 dark:text-white`}
                  disabled={isLoading || isSaving}
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">BPM</span>
              </div>
              {errors.heartRate && (
                <p className="mt-1 text-sm text-red-500">{errors.heartRate.message}</p>
              )}
            </div>

            {/* Body Position */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Body Position
              </label>
              <select
                {...register('position')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                disabled={isLoading || isSaving}
              >
                <option value="sitting">Sitting</option>
                <option value="standing">Standing</option>
                <option value="lying">Lying down</option>
              </select>
            </div>

            {/* Context */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                When was this measured?
              </label>
              <select
                {...register('context')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                disabled={isLoading || isSaving}
              >
                <option value="other">Other</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                <option value="before_medication">Before medication</option>
                <option value="after_medication">After medication</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Notes (optional)
              </label>
              <textarea
                {...register('notes')}
                placeholder="How are you feeling? Any stress or unusual symptoms?"
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.notes
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                } dark:bg-gray-800 dark:text-white`}
                disabled={isLoading || isSaving}
              />
              {errors.notes && <p className="mt-1 text-sm text-red-500">{errors.notes.message}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isSaving}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
      >
        {isSaving ? 'Saving...' : 'Save Blood Pressure Reading'}
      </button>
    </form>
  );
}
