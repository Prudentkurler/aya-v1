"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function ProfilePage() {
  return (
    <DashboardLayout userType="patient">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Profile & Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Profile Card */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-900">
              👤
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Patient User
              </p>
              <p className="text-sm text-slate-500">
                Email: user@example.com
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 dark:border-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Age:</span>
              <span className="font-medium text-slate-900 dark:text-white">
                45 years
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Gender:</span>
              <span className="font-medium text-slate-900 dark:text-white">
                Male
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">
                Conditions:
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                Hypertension
              </span>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Settings
          </h2>
          <button className="w-full rounded-lg bg-white px-4 py-3 text-left font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors">
            🌙 Dark Mode
          </button>
          <button className="w-full rounded-lg bg-white px-4 py-3 text-left font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors">
            🌍 Language
          </button>
          <button className="w-full rounded-lg bg-white px-4 py-3 text-left font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors">
            🔔 Notifications
          </button>
        </div>

        {/* Sign Out */}
        <button className="w-full rounded-lg bg-red-50 px-4 py-3 font-medium text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 transition-colors">
          🚪 Sign Out
        </button>
      </div>
    </DashboardLayout>
  );
}
