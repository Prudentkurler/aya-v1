'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Phone, Mail, MapPin } from 'lucide-react';

export default function CommunityPage() {
  const community = [
    {
      id: 1,
      name: 'Kofi Mensah',
      age: 45,
      phone: '+233 24 123 4567',
      village: 'Tema Village',
      status: 'Active',
      lastVisit: '3 days ago',
    },
    {
      id: 2,
      name: 'Ama Adjei',
      age: 38,
      phone: '+233 24 234 5678',
      village: 'Central Tema',
      status: 'Active',
      lastVisit: '1 week ago',
    },
    {
      id: 3,
      name: 'Yaw Owusu',
      age: 52,
      phone: '+233 24 345 6789',
      village: 'South Tema',
      status: 'Inactive',
      lastVisit: '2 months ago',
    },
    {
      id: 4,
      name: 'Akosua Boateng',
      age: 41,
      phone: '+233 24 456 7890',
      village: 'Tema Village',
      status: 'Active',
      lastVisit: '5 days ago',
    },
    {
      id: 5,
      name: 'Kwame Asante',
      age: 56,
      phone: '+233 24 567 8901',
      village: 'East Tema',
      status: 'At-Risk',
      lastVisit: '1 day ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'At-Risk':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Inactive':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <DashboardLayout userType="cwh">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Community Members</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your community health program members</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or village..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-0 rounded-lg dark:bg-slate-800 dark:text-white"
            />
          </div>
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
                  Village
                </th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Last Visit
                </th>
                <th className="text-right px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {community.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{member.age}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {member.village}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                    {member.lastVisit}
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
