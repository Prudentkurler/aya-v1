'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { BarChart3, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function MetricsPage() {
  const metrics = [
    { label: 'Total Screenings', value: '127', icon: Users, trend: '+12%' },
    { label: 'At-Risk Cases', value: '23', icon: AlertCircle, trend: '+3%' },
    { label: 'Referrals Made', value: '18', icon: TrendingUp, trend: '+5%' },
    { label: 'Follow-ups Completed', value: '89%', icon: BarChart3, trend: '+8%' },
  ];

  const communityData = [
    { village: 'Tema Village', population: 245, screened: 189, riskCases: 8 },
    { village: 'Central Tema', population: 312, screened: 267, riskCases: 12 },
    { village: 'South Tema', population: 198, screened: 145, riskCases: 5 },
    { village: 'East Tema', population: 276, screened: 198, riskCases: 6 },
    { village: 'North Tema', population: 187, screened: 112, riskCases: 4 },
  ];

  const conditions = [
    { condition: 'Hypertension', count: 34, percentage: 42 },
    { condition: 'Pre-diabetes', count: 28, percentage: 35 },
    { condition: 'Obesity', count: 15, percentage: 19 },
    { condition: 'Other', count: 3, percentage: 4 },
  ];

  return (
    <DashboardLayout userType="cwh">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Health Metrics</h1>
        <p className="text-slate-600 dark:text-slate-400">Monitor community health program metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {metric.label}
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metric.value}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                  {metric.trend}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Community Coverage */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Screening Coverage by Village
          </h2>
          <div className="space-y-4">
            {communityData.map((village) => (
              <div key={village.village}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {village.village}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {village.screened}/{village.population}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(village.screened / village.population) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {Math.round((village.screened / village.population) * 100)}% coverage • {village.riskCases} at-risk
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Health Conditions Detected
          </h2>
          <div className="space-y-4">
            {conditions.map((cond) => (
              <div key={cond.condition}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {cond.condition}
                  </span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {cond.count} ({cond.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      cond.condition === 'Hypertension'
                        ? 'bg-red-500'
                        : cond.condition === 'Pre-diabetes'
                          ? 'bg-yellow-500'
                          : cond.condition === 'Obesity'
                            ? 'bg-orange-500'
                            : 'bg-blue-500'
                    }`}
                    style={{ width: `${cond.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
