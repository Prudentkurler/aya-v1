'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  TrendingUp,
  AlertCircle,
  MapPin,
  Calendar,
  UserCheck,
  Building2,
  Activity,
  Phone,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Patient {
  id: string;
  name: string;
  age: number;
  compound: string;
  lastVisit: string;
  status: 'good' | 'moderate' | 'critical';
  bpReading: string;
  adherence: number;
}

const DEMO_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Yaa Asantewaa',
    age: 68,
    compound: 'Adeyemi Compound',
    lastVisit: '2 days ago',
    status: 'good',
    bpReading: '128/82',
    adherence: 95,
  },
  {
    id: '2',
    name: 'Kofi Mensah',
    age: 52,
    compound: 'Nkrumah Compound',
    lastVisit: '1 week ago',
    status: 'moderate',
    bpReading: '142/88',
    adherence: 72,
  },
  {
    id: '3',
    name: 'Kwame Asare',
    age: 45,
    compound: 'Adeyemi Compound',
    lastVisit: '3 days ago',
    status: 'critical',
    bpReading: '165/102',
    adherence: 45,
  },
];

function getStatusColor(status: 'good' | 'moderate' | 'critical') {
  switch (status) {
    case 'good':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'moderate':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }
}

export function CHWDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community Health Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor community screening, visits, and follow-ups
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 compounds assigned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Screenings This Month</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-ups</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Due this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button className="w-full justify-start" variant="outline">
          <UserCheck className="h-4 w-4 mr-2" />
          Schedule Visit
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Log Screening
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Building2 className="h-4 w-4 mr-2" />
          View Compounds
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <MapPin className="h-4 w-4 mr-2" />
          Plan Route
        </Button>
      </div>

      {/* Recent Activity & Patients Needing Attention */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest community health activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Home visit completed', patient: 'Yaa Asantewaa', time: '2 hours ago', icon: UserCheck, color: 'text-green-600' },
                { action: 'BP screening', patient: 'Kofi Mensah', time: '5 hours ago', icon: Activity, color: 'text-blue-600' },
                { action: 'Critical alert raised', patient: 'Kwame Asare', time: '1 day ago', icon: AlertCircle, color: 'text-red-600' },
                { action: 'Follow-up scheduled', patient: 'Akua Afriyie', time: '2 days ago', icon: Calendar, color: 'text-purple-600' },
                { action: 'Community screening', compound: 'Adeyemi Compound', time: '3 days ago', icon: Building2, color: 'text-amber-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`mt-0.5 rounded-full p-2 bg-muted ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.patient || item.compound}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>Scheduled activities for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Follow-up Visit</p>
                  <p className="text-xs text-muted-foreground truncate">Kofi Mensah - 10:00 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Community Screening</p>
                  <p className="text-xs text-muted-foreground truncate">Nkrumah Compound - 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Home Visit</p>
                  <p className="text-xs text-muted-foreground truncate">Akua Afriyie - 4:00 PM</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-2">
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Requiring Attention */}
      <Card>
        <CardHeader>
          <CardTitle>Patients Requiring Attention</CardTitle>
          <CardDescription>Critical and moderate cases needing follow-up</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {DEMO_PATIENTS.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={`/avatars/${patient.id}.png`} />
                    <AvatarFallback>
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold truncate">{patient.name}</p>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {patient.age}y
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {patient.compound}
                      </span>
                      <span>BP: {patient.bpReading}</span>
                      <span>Adherence: {patient.adherence}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    Last: {patient.lastVisit}
                  </span>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
