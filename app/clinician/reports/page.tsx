'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { FileText, Download, Share2 } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: 'Monthly Patient Health Report',
      date: 'November 2025',
      type: 'Monthly Summary',
      patients: 24,
    },
    {
      id: 2,
      name: 'Critical Cases Report',
      date: 'Week of Nov 1-7',
      type: 'Critical Cases',
      patients: 5,
    },
    {
      id: 3,
      name: 'Medication Adherence Report',
      date: 'October 2025',
      type: 'Adherence',
      patients: 24,
    },
    {
      id: 4,
      name: 'BP Trends Analysis',
      date: 'Last 3 months',
      type: 'Trend Analysis',
      patients: 24,
    },
  ];

  return (
    <DashboardLayout userType="clinician">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports</h1>
        <p className="text-slate-600 dark:text-slate-400">Generate and manage clinical reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generate Report Card */}
        <div className="col-span-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Generate New Report</h2>
          <p className="mb-6 text-blue-100">
            Create custom reports for your patient population
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 rounded-lg transition-colors">
            + Create Report
          </button>
        </div>

        {/* Reports List */}
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{report.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{report.date}</p>
              </div>
            </div>
            <div className="mb-4 space-y-1 text-sm">
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-medium">Type:</span> {report.type}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-medium">Patients:</span> {report.patients}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg font-medium text-sm transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
