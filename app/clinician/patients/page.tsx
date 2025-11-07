'use client';

import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function PatientsPage() {
  const patients = [
    { id: 1, name: 'Ama Asare', age: 45, status: 'Critical', bp: '180/120', lastSeen: '2 hours ago' },
    { id: 2, name: 'Kwesi Owusu', age: 52, status: 'Alert', bp: '155/95', lastSeen: '6 hours ago' },
    { id: 3, name: 'Yaa Mensah', age: 38, status: 'Warning', bp: '140/90', lastSeen: '1 day ago' },
    { id: 4, name: 'Kofi Tawiah', age: 61, status: 'Follow-up', bp: '135/85', lastSeen: '3 days ago' },
    { id: 5, name: 'Abena Boateng', age: 42, status: 'Stable', bp: '125/80', lastSeen: '5 days ago' },
    { id: 6, name: 'Nii Armah', age: 55, status: 'Stable', bp: '128/82', lastSeen: '1 week ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Alert':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Warning':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Follow-up':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  return (
    <DashboardLayout userType="clinician">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Patients</h1>
        <p className="text-slate-600 dark:text-slate-400">View and manage your patient list</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-0 rounded-lg dark:bg-slate-800 dark:text-white"
            />
          </div>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Name
                </th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Age
                </th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  BP
                </th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Last Seen
                </th>
                <th className="text-right px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{patient.age}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {patient.bp}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                    {patient.lastSeen}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
