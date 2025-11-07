'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Archive, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function CasesPage() {
  const cases = [
    {
      id: 1,
      patient: 'Ama Asare',
      diagnosis: 'Hypertension Stage 2',
      status: 'Active',
      opened: 'Oct 15, 2025',
      notes: 'Requires intensive monitoring',
    },
    {
      id: 2,
      patient: 'Kwesi Owusu',
      diagnosis: 'Type 2 Diabetes',
      status: 'Active',
      opened: 'Aug 20, 2025',
      notes: 'Blood glucose control needed',
    },
    {
      id: 3,
      patient: 'Yaa Mensah',
      diagnosis: 'Pre-hypertension',
      status: 'Monitoring',
      opened: 'Sep 10, 2025',
      notes: 'Lifestyle modification ongoing',
    },
    {
      id: 4,
      patient: 'Kofi Tawiah',
      diagnosis: 'Hypertension + Diabetes',
      status: 'Resolved',
      opened: 'Jun 1, 2025',
      notes: 'Patient improved, managed',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'Monitoring':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'Resolved':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Monitoring':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'Resolved':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout userType="clinician">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Case Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Track and manage active patient cases</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300 mb-2">Active Cases</p>
          <p className="text-3xl font-bold text-red-700 dark:text-red-400">12</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">Monitoring</p>
          <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">8</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-700 dark:text-green-300 mb-2">Resolved</p>
          <p className="text-3xl font-bold text-green-700 dark:text-green-400">24</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">Total Cases</p>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">44</p>
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-lg">{c.patient}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{c.diagnosis}</p>
              </div>
              <div className={`px-4 py-2 rounded-full border font-medium text-sm flex items-center gap-2 ${getStatusColor(c.status)}`}>
                {getStatusIcon(c.status)}
                {c.status}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Opened</p>
                <p className="font-medium text-slate-700 dark:text-slate-300">{c.opened}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Notes</p>
                <p className="font-medium text-slate-700 dark:text-slate-300">{c.notes}</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
