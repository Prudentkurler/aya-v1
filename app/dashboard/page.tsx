'use client';

import Link from 'next/link';
import { Heart, TrendingUp, Pill, AlertCircle, Calendar, Activity } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

interface StatCard {
  label: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  color: 'blue' | 'red' | 'green' | 'yellow';
  icon: React.ReactNode;
}

export default function DashboardPage() {
  const stats: StatCard[] = [
    {
      label: 'Blood Pressure',
      value: '128/84',
      unit: 'mmHg',
      trend: 'stable',
      color: 'green',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      label: 'Blood Glucose',
      value: '95',
      unit: 'mg/dL',
      trend: 'down',
      color: 'green',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      label: 'Medication Adherence',
      value: '92%',
      trend: 'up',
      color: 'blue',
      icon: <Pill className="w-6 h-6" />,
    },
    {
      label: 'Health Score',
      value: '78/100',
      trend: 'stable',
      color: 'yellow',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    red: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    green: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  return (
    <DashboardLayout userType="patient">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome back, Kofi
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
          Here's your health snapshot for today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg border border-slate-200 p-4 md:p-6 dark:border-slate-800 ${colorClasses[stat.color]}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium opacity-75">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold mt-2">
                  {stat.value}
                  {stat.unit && <span className="text-base md:text-lg ml-1">{stat.unit}</span>}
                </p>
              </div>
              <div className="opacity-50">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className="mt-3 md:mt-4 text-xs font-medium">
                {stat.trend === 'up' && '↑ Improving'}
                {stat.trend === 'down' && '↓ Declining'}
                {stat.trend === 'stable' && '→ Stable'}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Measurements
            </h2>
            <div className="space-y-3 md:space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 md:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div>
                    <p className="text-sm md:text-base font-medium text-slate-900 dark:text-white">
                      {i === 1 ? 'Blood Pressure' : i === 2 ? 'Blood Glucose' : 'Weight'}
                    </p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                      {i === 1 ? 'Today at 08:30' : i === 2 ? 'Today at 12:00' : 'Yesterday at 07:00'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                      {i === 1 ? '128/84' : i === 2 ? '95' : '78.5'} {i === 1 ? 'mmHg' : i === 2 ? 'mg/dL' : 'kg'}
                    </p>
                    <p className="text-xs md:text-sm text-green-600 dark:text-green-400">Normal</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/measurements"
              className="block mt-4 text-center py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Upcoming */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              Upcoming
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Medication Reminder
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In 2 hours</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Clinic Appointment
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tomorrow at 10:00</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Health Check-in
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In 3 days</p>
              </div>
            </div>
          </div>

          {/* Quick Add */}
          <Link
            href="/measurements/add"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-center"
          >
            + Add Reading
          </Link>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-amber-900 dark:text-amber-200">
            Medication Reminder
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
            You have 2 medications to take today. Don't forget your afternoon dose!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
