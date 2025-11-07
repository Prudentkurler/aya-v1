'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';

export default function ScreeningPage() {
  const screenings = [
    {
      id: 1,
      name: 'Central Market Screening',
      date: 'Tomorrow',
      time: '09:00 - 12:00',
      location: 'Accra Central Market',
      expectedVisitors: 45,
      registered: 32,
      status: 'Upcoming',
    },
    {
      id: 2,
      name: 'Community Center Drive',
      date: 'Friday',
      time: '14:00 - 17:00',
      location: 'Osu Community Center',
      expectedVisitors: 30,
      registered: 28,
      status: 'Upcoming',
    },
    {
      id: 3,
      name: 'Rural Village Outreach',
      date: 'Next Week',
      time: '10:00 - 14:00',
      location: 'Tema Rural Health Center',
      expectedVisitors: 60,
      registered: 0,
      status: 'Planning',
    },
    {
      id: 4,
      name: 'East Tema Clinic Health Drive',
      date: 'Last Month',
      time: '09:00 - 16:00',
      location: 'East Tema Clinic',
      expectedVisitors: 75,
      registered: 75,
      status: 'Completed',
    },
  ];

  return (
    <DashboardLayout userType="cwh">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Screening Events</h1>
          <p className="text-slate-600 dark:text-slate-400">Schedule and manage health screening events</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          + New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {screenings.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{event.name}</h3>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Completed'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : event.status === 'Upcoming'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{event.registered} / {event.expectedVisitors} Registered</span>
              </div>
            </div>

            <div className="mb-6 w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(event.registered / event.expectedVisitors) * 100}%` }}
              />
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Manage Event
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
