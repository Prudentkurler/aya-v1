'use client';

import Link from 'next/link';
import {
  Users,
  AlertCircle,
  Activity,
  Calendar,
  CheckCircle,
  TrendingUp,
  MapPin,
  Phone,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function CWHDashboard() {
  return (
    <DashboardLayout userType="cwh">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Community Health Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Monitor community health screening and follow-ups
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Community Size
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">127</p>
            </div>
            <Users className="w-8 h-8 text-blue-600 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Screenings This Month
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">34</p>
            </div>
            <Activity className="w-8 h-8 text-green-600 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                At-Risk Cases
              </p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">12</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-600 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Referrals Made
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">8</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Screening Events */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Upcoming Screening Events
          </h2>
          <div className="space-y-3">
            {[
              {
                name: 'Central Market Screening',
                date: 'Tomorrow, 9:00 AM',
                location: 'Accra Central Market',
                expected: 45,
              },
              {
                name: 'Community Center Health Drive',
                date: 'Friday, 2:00 PM',
                location: 'Osu Community Center',
                expected: 30,
              },
              {
                name: 'Rural Village Outreach',
                date: 'Next week, 10:00 AM',
                location: 'Tema Rural Health Center',
                expected: 60,
              },
            ].map((event, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{event.name}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Expected
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {event.expected}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-ups & Actions */}
        <div className="space-y-4">
          {/* Pending Follow-ups */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-600" />
              Pending Follow-ups
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Kofi Mensah', priority: 'High' },
                { name: 'Ama Adjei', priority: 'Medium' },
                { name: 'Yaw Owusu', priority: 'Medium' },
              ].map((person, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {person.name}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      person.priority === 'High'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {person.priority}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/cwh/followups"
              className="block mt-4 text-center py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm"
            >
              View All →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/cwh/screening"
                className="block w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-center text-sm"
              >
                Record Screening
              </Link>
              <Link
                href="/cwh/followups"
                className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center text-sm"
              >
                Make Follow-up
              </Link>
              <Link
                href="/cwh/community"
                className="block w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-center text-sm"
              >
                Manage Community
              </Link>
              <Link
                href="/cwh/metrics"
                className="block w-full px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors text-center text-sm"
              >
                View Metrics
              </Link>
            </div>
          </div>

          {/* Health Alerts */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-2">
              ⚠️ Community Alert
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              3 high-risk readings reported. Recommend clinic referrals.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
