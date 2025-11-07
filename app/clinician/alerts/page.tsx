'use client';

import Link from 'next/link';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      patient: 'Ama Asare',
      type: 'Critical BP',
      message: 'BP reading 180/120 - Immediate attention required',
      severity: 'critical',
      time: '2 hours ago',
    },
    {
      id: 2,
      patient: 'Kwesi Owusu',
      type: 'High Glucose',
      message: 'Glucose 320 mg/dL - Above safe threshold',
      severity: 'alert',
      time: '4 hours ago',
    },
    {
      id: 3,
      patient: 'Yaa Mensah',
      type: 'Medication Non-adherence',
      message: 'Missed 3 consecutive medication doses',
      severity: 'warning',
      time: '1 day ago',
    },
    {
      id: 4,
      patient: 'Kofi Tawiah',
      type: 'Follow-up Overdue',
      message: 'Follow-up appointment overdue by 5 days',
      severity: 'warning',
      time: '2 days ago',
    },
    {
      id: 5,
      patient: 'Abena Boateng',
      type: 'Referral Needed',
      message: 'Requires specialist referral - Endocrinology',
      severity: 'info',
      time: '3 days ago',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'alert':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'warning':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <DashboardLayout userType="clinician">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Clinical Alerts</h1>
        <p className="text-slate-600 dark:text-slate-400">Monitor critical patient alerts</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{alert.patient}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
                      {alert.type}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{alert.message}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                    Review
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">{alert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
