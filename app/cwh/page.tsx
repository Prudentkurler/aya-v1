"use client";

import { SimpleSidebar } from "@/components/layout/simple-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Users, Activity, Clock, AlertCircle, CheckCircle, Calendar } from "lucide-react";

export default function CHWPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - Static positioning */}
      <div className="hidden md:block w-64">
        <SimpleSidebar userRole="chw" userName="Community Health Worker" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Community Health Worker Dashboard</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Manage your community patients and screenings
              </p>
            </div>
            <div className="flex items-center gap-2">
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
              <h2 className="text-2xl font-bold">Welcome, Sarah Osei</h2>
              <p className="text-muted-foreground">Community Health Worker - Dansoman District</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Community Patients</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">Active in your area</p>
                  <p className="text-xs text-green-600 mt-1">+8 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Screenings</CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                  <p className="text-xs text-muted-foreground mt-1">18 hypertension detected</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                  <p className="text-xs text-orange-600 mt-1">3 overdue</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                  <p className="text-xs text-red-600 mt-1">2 critical</p>
                </CardContent>
              </Card>
            </div>

            {/* Patients & Tasks */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Patients Needing Attention</CardTitle>
                  <CardDescription>High priority cases in your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ama Osei, 58F</p>
                      <p className="text-xs text-muted-foreground">BP: 168/102 mmHg - Today 9:15 AM</p>
                      <p className="text-xs text-muted-foreground">Dansoman, House #15B</p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Kofi Mensah, 62M</p>
                      <p className="text-xs text-muted-foreground">Missed medications: 3 days in a row</p>
                      <p className="text-xs text-muted-foreground">Mamprobi, Zone 4</p>
                    </div>
                    <Badge className="bg-orange-600">Moderate</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Yaa Asantewaa, 45F</p>
                      <p className="text-xs text-muted-foreground">Follow-up overdue by 5 days</p>
                      <p className="text-xs text-muted-foreground">New Town, Street 7</p>
                    </div>
                    <Badge className="bg-orange-600">Moderate</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Kwesi Boateng, 51M</p>
                      <p className="text-xs text-muted-foreground">BP trending up: 148/92 mmHg</p>
                      <p className="text-xs text-muted-foreground">Dansoman, Near Junction</p>
                    </div>
                    <Badge variant="outline">Monitor</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Schedule</CardTitle>
                  <CardDescription>Your activities for Nov 10, 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Home Visit - Kwame Nkrumah</p>
                      <p className="text-xs text-muted-foreground">8:30 AM - Completed</p>
                      <p className="text-xs text-muted-foreground">BP recorded: 135/88</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Follow-up - Abena Kuffour</p>
                      <p className="text-xs text-muted-foreground">11:00 AM - Completed</p>
                      <p className="text-xs text-muted-foreground">Medication adherence check</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Community Screening</p>
                      <p className="text-xs text-muted-foreground">2:00 PM - In Progress</p>
                      <p className="text-xs text-muted-foreground">Dansoman Community Center</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Health Education Session</p>
                      <p className="text-xs text-muted-foreground">4:30 PM - Upcoming</p>
                      <p className="text-xs text-muted-foreground">Topic: Hypertension Management</p>
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

