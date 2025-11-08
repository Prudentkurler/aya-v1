'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Bell, FilePlus2, Home, TrendingUp, AlertCircle, Send } from 'lucide-react';
import Link from 'next/link';

export default function CHWDashboard() {
  const stats = [
    { title: 'Assigned Patients', value: '127', subtitle: 'in your community', icon: Users, color: 'text-blue-600' },
    { title: 'Home Visits This Week', value: '23', subtitle: '5 scheduled today', icon: Home, color: 'text-green-600' },
    { title: 'Pending Alerts', value: '8', subtitle: 'require attention', icon: Bell, color: 'text-red-600' },
    { title: 'Active Referrals', value: '12', subtitle: '3 pending review', icon: Send, color: 'text-purple-600' },
  ];

  const recentVisits = [
    { name: 'Ama Serwaa', community: 'Adenta', time: '2 hours ago', status: 'Normal', statusColor: 'text-green-600' },
    { name: 'Kwame Mensah', community: 'Madina', time: '4 hours ago', status: 'Alert', statusColor: 'text-red-600' },
    { name: 'Kofi Osei', community: 'Legon', time: 'Yesterday', status: 'Normal', statusColor: 'text-green-600' },
  ];

  const upcomingTasks = [
    { task: 'Home visit - Akua Asante', time: 'Today, 2:00 PM', priority: 'High' },
    { task: 'Follow-up - Kwesi Boateng', time: 'Today, 4:00 PM', priority: 'Medium' },
    { task: 'BP Check - Yaa Mensah', time: 'Tomorrow, 10:00 AM', priority: 'Low' },
  ];

  return (
    <DashboardLayout userType="cwh">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome, CHW Sarah
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
          Here's your community health overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3 mb-6 md:mb-8">
        {/* Recent Visits */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Recent Home Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentVisits.map((visit, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <p className="font-medium text-sm md:text-base">{visit.name}</p>
                      <p className="text-xs md:text-sm text-slate-500">{visit.community} • {visit.time}</p>
                    </div>
                    <span className={`text-xs md:text-sm font-semibold ${visit.statusColor}`}>{visit.status}</span>
                  </div>
                ))}
              </div>
              <Link href="/cwh/visits">
                <Button variant="outline" className="w-full mt-4">View All Visits</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${
                    task.priority === 'High' ? 'bg-red-50 dark:bg-red-900/20' :
                    task.priority === 'Medium' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <p className="text-xs md:text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-slate-500 mt-1">{task.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Link href="/cwh/patients/register" className="flex-1">
            <Button className="w-full">
              <FilePlus2 className="mr-2 h-4 w-4" /> Register New Patient
            </Button>
          </Link>
          <Link href="/cwh/visits/new" className="flex-1">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" /> Start Home Visit
            </Button>
          </Link>
          <Link href="/cwh/referrals" className="flex-1">
            <Button variant="outline" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Create Referral
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Alert Banner */}
      <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-amber-900 dark:text-amber-200 text-sm md:text-base">
            8 Patients Need Follow-up
          </p>
          <p className="text-xs md:text-sm text-amber-800 dark:text-amber-300 mt-1">
            You have 8 patients with pending alerts that require attention. Review them in the Alerts section.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
