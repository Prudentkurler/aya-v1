'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, AlertCircle, FileText, Calendar } from 'lucide-react';

export function ClinicianDashboard() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Clinical Dashboard</h2>
        <p className="text-sm text-muted-foreground">Patient care overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Under care</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Critical</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Cases & Schedule */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Critical Patient Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Kwame Osei', mrn: 'MRN-2024-1456', diagnosis: 'Uncontrolled HTN', adherence: 42 },
              { name: 'Efua Mensah', mrn: 'MRN-2024-1389', diagnosis: 'Type 2 Diabetes', adherence: 58 },
              { name: 'Yaw Boateng', mrn: 'MRN-2024-1523', diagnosis: 'HTN + Diabetes', adherence: 65 }
            ].map((patient) => (
              <div key={patient.mrn} className="border-b pb-3 last:border-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-medium text-sm">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.mrn}</p>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <p className="text-xs mb-2">{patient.diagnosis}</p>
                <div className="flex items-center gap-2">
                  <Progress value={patient.adherence} className="flex-1" />
                  <span className="text-xs text-muted-foreground">{patient.adherence}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 border-b pb-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Morning Clinic</p>
                <p className="text-xs text-muted-foreground">8:00 AM - 12:00 PM • 6 patients</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b pb-2">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Ward Rounds</p>
                <p className="text-xs text-muted-foreground">1:00 PM - 3:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Case Review</p>
                <p className="text-xs text-muted-foreground">4:00 PM - 5:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
