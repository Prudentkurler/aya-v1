'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Activity, Pill, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export function PatientDashboard() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Health Dashboard</h2>
        <p className="text-sm text-muted-foreground">Your health overview</p>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128/84</div>
            <p className="text-xs text-muted-foreground">mmHg</p>
            <Badge variant="outline" className="mt-2">Normal</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blood Glucose</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">mg/dL</p>
            <Badge variant="outline" className="mt-2">Good</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Medication</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Adherence</p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Appointments */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Heart className="mr-2 h-4 w-4" />
              Log Blood Pressure
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Log Blood Glucose
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Pill className="mr-2 h-4 w-4" />
              Take Medication
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Doctor Visit</p>
                <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Pill className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Medication Due</p>
                <p className="text-xs text-muted-foreground">In 2 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
