"use client";

import { SimpleSidebar } from "@/components/layout/simple-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Users, FileText, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { AudioGuide } from "@/components/dashboard/audio-guide";
import { TutorialOverlay } from "@/components/dashboard/tutorial-overlay";
import { CLINICIAN_TUTORIAL_STEPS } from "@/lib/tutorial-steps";

export default function ClinicianPage() {
  const welcomeMessage = "Welcome Doctor Adjei, Physician at Korle Bu Teaching Hospital. You have 38 active patients under your care, with 7 critical alerts requiring urgent review. 23 cases have been resolved this week.";

  return (
    <div className="flex min-h-screen w-full">
      {/* Tutorial Overlay - First Visit */}
      <TutorialOverlay 
        steps={CLINICIAN_TUTORIAL_STEPS}
        storageKey="clinician-dashboard-tutorial"
        userRole="clinician"
      />

      {/* Sidebar - Static positioning */}
      <div className="hidden md:block w-64">
        <SimpleSidebar userRole="clinician" userName="Dr. Clinician" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Clinician Dashboard</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Manage patient cases and clinical reviews
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AudioGuide text={welcomeMessage} />
              <Badge variant="outline" className="hidden sm:flex">
                Offline Ready
              </Badge>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Welcome Message */}
            <div>
              <h2 className="text-2xl font-bold">Welcome, Dr. Adjei</h2>
              <p className="text-muted-foreground">Physician - Korle Bu Teaching Hospital</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-xs text-muted-foreground">Under your care</p>
                  <p className="text-xs text-green-600 mt-1">+5 new referrals</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Urgent review needed</p>
                  <p className="text-xs text-red-600 mt-1">3 in last 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cases Resolved</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                  <p className="text-xs text-muted-foreground mt-1">92% resolution rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                  <FileText className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                  <p className="text-xs text-orange-600 mt-1">4 due today</p>
                </CardContent>
              </Card>
            </div>

            {/* Patient Cases & Schedule */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Patient Cases</CardTitle>
                  <CardDescription>High priority cases requiring clinical attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Akosua Boateng, 52F</p>
                      <p className="text-xs text-muted-foreground">MRN: 2024-HTN-0156 • Hypertension Stage 2</p>
                      <p className="text-xs text-muted-foreground">BP: 172/105 mmHg - Requires medication adjustment</p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Kofi Mensah, 58M</p>
                      <p className="text-xs text-muted-foreground">MRN: 2024-DM-0298 • Type 2 Diabetes</p>
                      <p className="text-xs text-muted-foreground">HbA1c: 8.2% - Poor glycemic control</p>
                    </div>
                    <Badge className="bg-orange-600">Monitoring</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Abena Kuffour, 61F</p>
                      <p className="text-xs text-muted-foreground">MRN: 2024-HTN-0189 • Essential Hypertension</p>
                      <p className="text-xs text-muted-foreground">BP: 142/88 mmHg - Stable, continue current therapy</p>
                    </div>
                    <Badge variant="outline">Stable</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Yaw Owusu, 47M</p>
                      <p className="text-xs text-muted-foreground">MRN: 2024-HTN-0203 • New Diagnosis</p>
                      <p className="text-xs text-muted-foreground">BP: 155/98 mmHg - Initial workup pending</p>
                    </div>
                    <Badge className="bg-orange-600">Monitoring</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Schedule</CardTitle>
                  <CardDescription>Your clinical activities for Nov 10, 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Morning Ward Rounds</p>
                      <p className="text-xs text-muted-foreground">7:30 AM - Completed</p>
                      <p className="text-xs text-muted-foreground">12 patients reviewed</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Outpatient Clinic</p>
                      <p className="text-xs text-muted-foreground">10:00 AM - Completed</p>
                      <p className="text-xs text-muted-foreground">8 consultations done</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Critical Patient Review</p>
                      <p className="text-xs text-muted-foreground">2:30 PM - In Progress</p>
                      <p className="text-xs text-muted-foreground">Akosua Boateng - HTN management</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Clinical Team Meeting</p>
                      <p className="text-xs text-muted-foreground">4:00 PM - Upcoming</p>
                      <p className="text-xs text-muted-foreground">Case discussions and handover</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

