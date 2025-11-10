'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  TrendingUp,
  AlertCircle,
  FileText,
  Calendar,
  Pill,
  Activity,
  ChevronRight,
  Clock,
  CheckCircle2,
  Send,
  UserCog,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Patient {
  id: string;
  name: string;
  age: number;
  mrn: string;
  diagnosis: string;
  lastVisit: string;
  status: 'stable' | 'monitoring' | 'critical';
  bpReading: string;
  adherence: number;
}

const DEMO_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Yaa Asantewaa',
    age: 68,
    mrn: 'MRN-2024-0156',
    diagnosis: 'Stage 2 Hypertension',
    lastVisit: '2024-11-05',
    status: 'stable',
    bpReading: '128/82',
    adherence: 95,
  },
  {
    id: '2',
    name: 'Kofi Mensah',
    age: 52,
    mrn: 'MRN-2024-0178',
    diagnosis: 'Stage 1 Hypertension',
    lastVisit: '2024-11-01',
    status: 'monitoring',
    bpReading: '142/88',
    adherence: 72,
  },
  {
    id: '3',
    name: 'Kwame Asare',
    age: 45,
    mrn: 'MRN-2024-0189',
    diagnosis: 'Stage 2 Hypertension + Diabetes',
    lastVisit: '2024-10-28',
    status: 'critical',
    bpReading: '165/102',
    adherence: 45,
  },
  {
    id: '4',
    name: 'Akua Afriyie',
    age: 58,
    mrn: 'MRN-2024-0201',
    diagnosis: 'Prehypertension',
    lastVisit: '2024-11-06',
    status: 'stable',
    bpReading: '122/78',
    adherence: 88,
  },
];

function getStatusColor(status: 'stable' | 'monitoring' | 'critical') {
  switch (status) {
    case 'stable':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'monitoring':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }
}

export function ClinicianDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clinical Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage patient cases, review reports, and monitor treatment outcomes
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Under active treatment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases Resolved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button className="w-full justify-start" variant="outline">
          <UserCog className="h-4 w-4 mr-2" />
          New Patient
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Send className="h-4 w-4 mr-2" />
          Create Referral
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Pill className="h-4 w-4 mr-2" />
          E-Prescription
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          View Reports
        </Button>
      </div>

      {/* Recent Activity & Upcoming Appointments */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Clinical Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Clinical Activity</CardTitle>
            <CardDescription>Latest patient interactions and case updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Critical alert reviewed', patient: 'Kwame Asare', time: '1 hour ago', icon: AlertCircle, color: 'text-red-600' },
                { action: 'Prescription updated', patient: 'Yaa Asantewaa', time: '3 hours ago', icon: Pill, color: 'text-blue-600' },
                { action: 'Case notes updated', patient: 'Kofi Mensah', time: '5 hours ago', icon: FileText, color: 'text-purple-600' },
                { action: 'Referral created', patient: 'Akua Afriyie', time: '1 day ago', icon: Send, color: 'text-green-600' },
                { action: 'Lab results reviewed', patient: 'Ama Serwaa', time: '2 days ago', icon: Activity, color: 'text-amber-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`mt-0.5 rounded-full p-2 bg-muted ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.patient}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Appointments and consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Follow-up Consultation</p>
                  <p className="text-xs text-muted-foreground truncate">Yaa Asantewaa - 10:00 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">New Patient Intake</p>
                  <p className="text-xs text-muted-foreground truncate">Emmanuel Osei - 11:30 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Activity className="h-5 w-5 text-purple-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Lab Review</p>
                  <p className="text-xs text-muted-foreground truncate">Kofi Mensah - 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <UserCog className="h-5 w-5 text-green-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Case Review</p>
                  <p className="text-xs text-muted-foreground truncate">Akua Afriyie - 3:30 PM</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-2">
                View Full Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Patient Cases</CardTitle>
          <CardDescription>Patients under your care requiring monitoring or intervention</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y max-h-[500px] overflow-y-auto">
            {DEMO_PATIENTS.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={`/avatars/${patient.id}.png`} />
                    <AvatarFallback className="text-xs">
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
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {patient.mrn} • {patient.diagnosis}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>BP: {patient.bpReading}</span>
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Adherence Progress */}
                  <div className="hidden md:block text-right min-w-[100px]">
                    <p className="text-sm font-medium mb-1">
                      Adherence: {patient.adherence}%
                    </p>
                    <Progress value={patient.adherence} className="h-2" />
                  </div>

                  {/* Action */}
                  <Button variant="ghost" size="icon" className="shrink-0">
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
