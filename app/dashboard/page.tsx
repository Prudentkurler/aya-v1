"use client";

import { SimpleSidebar } from "@/components/layout/simple-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Heart, Activity, Pill, Plus, Calendar, AlertCircle } from "lucide-react";
import { AudioGuide } from "@/components/dashboard/audio-guide";
import { TutorialOverlay } from "@/components/dashboard/tutorial-overlay";
import { PATIENT_TUTORIAL_STEPS } from "@/lib/tutorial-steps";

export default function DashboardPage() {
  const welcomeMessage = "Welcome back, Kwame! Your health summary for today shows your blood pressure at 132 over 86, glucose at 98, and medication adherence at 85 percent. Keep up the good work!";

  return (
    <div className="flex min-h-screen w-full">
      {/* Tutorial Overlay - First Visit */}
      <TutorialOverlay 
        steps={PATIENT_TUTORIAL_STEPS}
        storageKey="patient-dashboard-tutorial"
        userRole="patient"
      />

      {/* Sidebar - Static positioning */}
      <div className="hidden md:block w-64">
        <SimpleSidebar userRole="patient" userName="Patient User" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">My Health Dashboard</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Track your health, stay connected with your care team
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
              <h2 className="text-2xl font-bold">Welcome back, Kwame!</h2>
              <p className="text-muted-foreground">Here's your health summary for today</p>
            </div>

            {/* Health Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                  <Heart className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">132/86</div>
                  <p className="text-xs text-muted-foreground">mmHg • Today 8:30 AM</p>
                  <Badge variant="outline" className="mt-2">Normal Range</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Glucose</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98</div>
                  <p className="text-xs text-muted-foreground">mg/dL • Fasting</p>
                  <Badge variant="outline" className="mt-2">Normal</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Medication Adherence</CardTitle>
                  <Pill className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <Progress value={85} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest health records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                    <Heart className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Blood Pressure Recorded</p>
                    <p className="text-xs text-muted-foreground">132/86 mmHg - Today 8:30 AM</p>
                  </div>
                  <Badge>Normal</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                    <Pill className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medication Taken</p>
                    <p className="text-xs text-muted-foreground">Lisinopril 10mg - Today 7:00 AM</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Glucose Checked</p>
                    <p className="text-xs text-muted-foreground">98 mg/dL - Yesterday 7:15 AM</p>
                  </div>
                  <Badge>Normal</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions & Upcoming */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Log your health data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Log Blood Pressure
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Record Glucose Level
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Mark Medication Taken
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>Your schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Doctor Follow-up</p>
                      <p className="text-xs text-muted-foreground">Nov 15, 2025 - 2:00 PM</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Medication Reminder</p>
                      <p className="text-xs text-muted-foreground">Amlodipine 5mg - Today 8:00 PM</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Community Screening</p>
                      <p className="text-xs text-muted-foreground">Nov 12, 2025 - 9:00 AM</p>
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
