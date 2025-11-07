'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Activity, Pill, FileText, Send, Calendar, User, MapPin } from 'lucide-react';
import { db } from '@/lib/db/schema';
import type { CHWVisit } from '@/lib/types/chw-visit';

export default function VisitDetailPage() {
  const router = useRouter();
  const params = useParams();
  const visitId = params?.id as string;
  const [visit, setVisit] = useState<CHWVisit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (visitId) {
      loadVisit();
    }
  }, [visitId]);

  const loadVisit = async () => {
    try {
      const visitData = await db.chwVisits.get(Number(visitId));
      setVisit(visitData || null);
    } catch (error) {
      console.error('Error loading visit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout userType="cwh">
        <div className="text-center py-12">
          <div className="text-muted-foreground">Loading visit details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!visit) {
    return (
      <DashboardLayout userType="cwh">
        <div className="text-center py-12">
          <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Visit Not Found</h2>
          <p className="text-muted-foreground mb-6">The visit you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/cwh/visits')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Visits
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <DashboardLayout userType="cwh">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push('/cwh/visits')}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Visits
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Home className="h-8 w-8 text-blue-600" />
              Visit Details
            </h1>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(visit.status)}`}>
            {visit.status}
          </span>
        </div>

        {/* Patient & Visit Info */}
        <Card>
          <CardHeader>
            <CardTitle>Visit Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-medium text-gray-900 dark:text-white">{visit.patientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Visit Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(visit.visitDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              {visit.community && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Community</p>
                    <p className="font-medium text-gray-900 dark:text-white">{visit.community}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vitals */}
        {visit.vitals && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visit.vitals.bloodPressure && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {visit.vitals.bloodPressure}
                    </p>
                    <p className="text-xs text-muted-foreground">mmHg</p>
                  </div>
                )}
                {visit.vitals.heartRate && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Heart Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {visit.vitals.heartRate}
                    </p>
                    <p className="text-xs text-muted-foreground">bpm</p>
                  </div>
                )}
                {visit.vitals.temperature && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {visit.vitals.temperature}
                    </p>
                    <p className="text-xs text-muted-foreground">°C</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medication Adherence */}
        {visit.medicationAdherence && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-green-600" />
                Medication Adherence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {visit.medicationAdherence.medicationsTaken && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Medications Currently Taking</p>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {visit.medicationAdherence.medicationsTaken}
                  </p>
                </div>
              )}
              {visit.medicationAdherence.missedDoses !== undefined && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Missed Doses (Past Week)</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {visit.medicationAdherence.missedDoses}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Visit Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Visit Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {visit.concerns && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Patient Concerns</p>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{visit.concerns}</p>
              </div>
            )}
            {visit.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Additional Notes</p>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{visit.notes}</p>
              </div>
            )}
            {visit.recommendations && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Recommendations</p>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{visit.recommendations}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral */}
        {visit.needsReferral && (
          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Send className="h-5 w-5" />
                Referral Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Reason for Referral</p>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {visit.referralReason || 'No reason specified'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
