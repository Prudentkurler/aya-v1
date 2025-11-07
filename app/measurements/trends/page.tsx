'use client';

import { useState, useEffect } from 'react';
import { HealthTrendChart } from '@/components/health/health-trend-chart';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function TrendsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [measurementType, setMeasurementType] = useState<'blood_pressure' | 'glucose'>(
    'blood_pressure'
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Get user ID from localStorage (would be from auth context in production)
    const storedUserId = localStorage.getItem('user_id') || 'user_' + Date.now();
    setUserId(storedUserId);
  }, []);

  if (!isMounted || !userId) {
    return (
      <DashboardLayout userType="patient">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="patient">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Health Trends
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Monitor your health patterns over time
        </p>
      </div>

      <div className="space-y-6">
        {/* Controls */}
        <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="space-y-4">
            {/* Measurement Type Toggle */}
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Measurement Type
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setMeasurementType('blood_pressure')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    measurementType === 'blood_pressure'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Blood Pressure
                </button>
                <button
                  onClick={() => setMeasurementType('glucose')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    measurementType === 'glucose'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Glucose
                </button>
              </div>
            </div>

            {/* Period Toggle */}
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Time Period
              </p>
              <div className="flex gap-2">
                {(['7d', '30d', '90d'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      period === p
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <HealthTrendChart userId={userId} type={measurementType} period={period} height={400} />
        </div>

        {/* Health Tips */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Track Your Progress</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                Regular monitoring helps you understand your health patterns and work with your doctor to make better decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Critical Alert Info */}
        <div className="rounded-lg bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 border border-red-200 dark:border-red-800">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">Critical Readings</h3>
              <ul className="text-sm text-red-800 dark:text-red-200 mt-2 space-y-1">
                <li>• BP {'≥'}180/120: Seek immediate medical attention</li>
                <li>• Glucose {'<'} 70: Treat for low blood sugar</li>
                <li>• Glucose {'>'} 400: Consider medical evaluation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/measurements/add"
          className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-center transition-colors"
        >
          + Log a New Reading
        </Link>
      </div>
    </DashboardLayout>
  );
}
