'use client';

import Link from 'next/link';
import { Users, AlertCircle, TrendingUp, FileText, CheckCircle, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function ClinicianDashboard() {
  return (
    <DashboardLayout userType="clinician">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Clinical Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your patient cases and monitor health metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Active Patients
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">24</p>
            </div>
            <Users className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Critical Alerts
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">5</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Cases Resolved
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">18</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Pending Actions
              </p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">7</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Patients */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Patients Requiring Attention
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Ama Asare', condition: 'High BP Crisis', status: 'Critical' },
              { name: 'Kwesi Owusu', condition: 'Glucose Alert', status: 'Alert' },
              { name: 'Yaa Mensah', condition: 'Medication Non-adherence', status: 'Warning' },
              { name: 'Kofi Tawiah', condition: 'Follow-up Overdue', status: 'Follow-up' },
              { name: 'Abena Boateng', condition: 'Referral Needed', status: 'Referral' },
            ].map((patient, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{patient.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{patient.condition}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Critical'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : patient.status === 'Alert'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/clinician/patients"
            className="block mt-4 text-center py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
          >
            View All Patients →
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/clinician/patients"
                className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
              >
                View Patients
              </Link>
              <Link
                href="/clinician/alerts"
                className="block w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-center"
              >
                View Alerts
              </Link>
              <Link
                href="/clinician/reports"
                className="block w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-center"
              >
                Generate Report
              </Link>
              <Link
                href="/clinician/cases"
                className="block w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-center"
              >
                Manage Cases
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h3 className="font-semibold mb-3">Performance</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Case Resolution</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2"
                  style={{ width: '85%' }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span>Patient Satisfaction</span>
                <span className="font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2"
                  style={{ width: '96%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
