'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Phone, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function FollowupsPage() {
  const followups = [
    {
      id: 1,
      name: 'Kofi Mensah',
      reason: 'Post-screening follow-up',
      priority: 'High',
      dueDate: 'Tomorrow',
      status: 'Pending',
      notes: 'High BP reading - needs monitoring',
    },
    {
      id: 2,
      name: 'Ama Adjei',
      reason: 'Medication adherence check',
      priority: 'Medium',
      dueDate: 'This week',
      status: 'In Progress',
      notes: 'Diabetes medication compliance',
    },
    {
      id: 3,
      name: 'Yaw Owusu',
      reason: 'Clinic referral follow-up',
      priority: 'High',
      dueDate: 'Overdue',
      status: 'Overdue',
      notes: 'Was referred to specialist - check if visited',
    },
    {
      id: 4,
      name: 'Akosua Boateng',
      reason: 'Lifestyle counseling',
      priority: 'Low',
      dueDate: 'Next week',
      status: 'Pending',
      notes: 'Exercise and diet guidance needed',
    },
    {
      id: 5,
      name: 'Kwame Asante',
      reason: 'Health monitoring',
      priority: 'Medium',
      dueDate: '2 days ago',
      status: 'Completed',
      notes: 'BP and glucose checked - normal',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'Overdue':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'Overdue':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'In Progress':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <DashboardLayout userType="cwh">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Follow-ups</h1>
        <p className="text-slate-600 dark:text-slate-400">Track and manage patient follow-up visits</p>
      </div>

      <div className="space-y-4">
        {followups.map((followup) => (
          <div
            key={followup.id}
            className={`border rounded-lg p-6 ${getStatusColor(followup.status)}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getStatusIcon(followup.status)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-lg">
                      {followup.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {followup.reason}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        followup.priority === 'High'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : followup.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {followup.priority}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        followup.status === 'Completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : followup.status === 'Overdue'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}
                    >
                      {followup.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Due Date</p>
                    <p className="font-medium text-slate-900 dark:text-white">{followup.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Notes</p>
                    <p className="font-medium text-slate-900 dark:text-white">{followup.notes}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </button>
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
