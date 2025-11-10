'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  Activity,
  Pill,
  TrendingUp,
  Calendar,
  Bell,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface HealthMetric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
  trend?: string;
  lastReading: string;
}

const DEMO_METRICS: HealthMetric[] = [
  {
    label: 'Blood Pressure',
    value: '128/84',
    status: 'good',
    icon: <Heart className="h-5 w-5" />,
    trend: 'Stable',
    lastReading: '2 hours ago',
  },
  {
    label: 'Blood Glucose',
    value: '95 mg/dL',
    status: 'good',
    icon: <Activity className="h-5 w-5" />,
    trend: 'Improving',
    lastReading: '1 day ago',
  },
  {
    label: 'Medication Adherence',
    value: '92%',
    status: 'good',
    icon: <Pill className="h-5 w-5" />,
    trend: '+5% this week',
    lastReading: 'Today',
  },
];

function getStatusColor(status: 'good' | 'warning' | 'critical') {
  switch (status) {
    case 'good':
      return 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400';
    case 'warning':
      return 'text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400';
    case 'critical':
      return 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400';
  }
}

function getStatusIcon(status: 'good' | 'warning' | 'critical') {
  switch (status) {
    case 'good':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4" />;
    case 'critical':
      return <AlertCircle className="h-4 w-4" />;
  }
}

export function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Kofi</h1>
        <p className="text-muted-foreground mt-1">
          Here's your health overview for today • {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {DEMO_METRICS.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <div className={getStatusColor(metric.status) + ' p-2 rounded-lg'}>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{metric.lastReading}</p>
                <Badge variant="outline" className="text-xs">
                  {getStatusIcon(metric.status)}
                  <span className="ml-1">{metric.trend}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your health readings from the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: 'Today, 10:30 AM', type: 'Blood Pressure', value: '128/84 mmHg', status: 'good' as const },
                { date: 'Yesterday, 9:15 AM', type: 'Blood Glucose', value: '95 mg/dL', status: 'good' as const },
                { date: '2 days ago', type: 'Medication', value: 'Took all medications', status: 'good' as const },
                { date: '3 days ago', type: 'Blood Pressure', value: '132/86 mmHg', status: 'warning' as const },
                { date: '5 days ago', type: 'Blood Glucose', value: '102 mg/dL', status: 'good' as const },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{activity.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/measurements/add">
                <Activity className="h-4 w-4 mr-2" />
                Log BP Reading
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/measurements/add">
                <Activity className="h-4 w-4 mr-2" />
                Log Glucose
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/medications/list">
                <Pill className="h-4 w-4 mr-2" />
                View Medications
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/measurements/trends">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Trends
              </Link>
            </Button>
            
            <Separator className="my-4" />
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Need Help?</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click the "?" icon in the sidebar to view the tutorial guide anytime.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming & Reminders */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">CHW Visit - Abena</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Clinic Follow-up</p>
                  <p className="text-xs text-muted-foreground">Next Monday, 9:00 AM</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Medication Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="font-medium text-sm">Amlodipine 5mg</p>
                    <p className="text-xs text-muted-foreground">Due in 2 hours (8:00 PM)</p>
                  </div>
                </div>
                <Button size="sm">Mark Taken</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-sm">Metformin 500mg</p>
                    <p className="text-xs text-muted-foreground">Taken at 8:00 AM ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
