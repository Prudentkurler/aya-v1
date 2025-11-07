'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { HealthTrendChart } from '@/components/health/health-trend-chart';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

/**
 * Health Insights page
 * AI-powered health recommendations and insights
 * Phase 2: Integration with Gemini API for intelligent analysis
 */

export default function InsightsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const storedUserId = localStorage.getItem('user_id') || 'user_' + Date.now();
    setUserId(storedUserId);
    setLoading(false);
  }, []);

  if (!isMounted || loading) {
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
          Health Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          AI-powered recommendations based on your health data
        </p>
      </div>

      <div className="space-y-6">
        {/* Beta Notice */}
          <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                  AI-Powered Insights (Beta)
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                  This page uses Gemini AI to analyze your health data and provide personalized
                  recommendations. More insights coming as you log more measurements!
                </p>
              </div>
            </div>
          </div>

          {userId && (
            <>
              {/* Blood Pressure Insights */}
              <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Blood Pressure Analysis
                  </h2>
                </div>

                {/* Chart */}
                <div className="mb-6">
                  <HealthTrendChart
                    userId={userId}
                    type="blood_pressure"
                    period="30d"
                    height={300}
                  />
                </div>

                {/* Placeholder Insights */}
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      📊 Trends
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      Add more measurements to see blood pressure trends over time.
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✓ Good News
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Keep logging your readings regularly. Consistent monitoring is key to managing
                      your health.
                    </p>
                  </div>
                </div>
              </div>

              {/* Glucose Insights */}
              <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Glucose Analysis
                  </h2>
                </div>

                {/* Chart */}
                <div className="mb-6">
                  <HealthTrendChart userId={userId} type="glucose" period="30d" height={300} />
                </div>

                {/* Placeholder Insights */}
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      📊 Trends
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Add more glucose readings to see patterns and trends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Personalized Recommendations
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                      🎯 Measurement Frequency
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                      Log blood pressure and glucose readings regularly (daily or as recommended by your
                      doctor) for better insights.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      💊 Medication Adherence
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                      Track your medication usage in the Medications section to get adherence insights.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 rounded-lg">
                    <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                      📝 Context Matters
                    </p>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                      Add notes about when you measure (morning, evening, before/after medication) for
                      better analysis.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✓ Healthy Habits
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Regular exercise, reduced salt intake, and stress management can help improve your
                      health metrics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase 2 Integration Info */}
              <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 border border-indigo-200 dark:border-indigo-800">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">
                      Coming Soon: Gemini Integration
                    </h3>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 mt-1">
                      In the next phase, we'll integrate Google's Gemini AI to provide:
                    </p>
                    <ul className="text-sm text-indigo-800 dark:text-indigo-200 mt-2 space-y-1 ml-4">
                      <li>• Intelligent health trend analysis</li>
                      <li>• Personalized recommendations based on your data</li>
                      <li>• Pattern recognition for early warnings</li>
                      <li>• Contextual health advice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Call to Action */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/measurements/add"
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-center transition-colors"
            >
              Log a Measurement
            </Link>
            <Link
              href="/measurements/trends"
              className="rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-center transition-colors"
            >
              View Trends
            </Link>
          </div>
      </div>
    </DashboardLayout>
  );
}
