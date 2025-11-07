'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, Save, Activity, Pill, Send } from 'lucide-react';
import { db } from '@/lib/db/schema';
import type { CHWVisit } from '@/lib/types/chw-visit';
import type { Measurement } from '@/lib/types/measurement';

export default function NewVisitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    community: '',
    // Vitals
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    // Medication adherence
    medicationsTaken: '',
    missedDoses: '',
    // Visit details
    concerns: '',
    notes: '',
    recommendations: '',
    // Referral
    needsReferral: false,
    referralReason: '',
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.patientId || !formData.patientName) {
      toast.error('Please fill in patient information');
      return;
    }

    setIsSubmitting(true);
    try {
      const chwUserId = 'chw-user-123'; // TODO: Get from auth context
      const now = new Date();

      // Create CHW visit record
      const visit: Omit<CHWVisit, 'id'> = {
        chwId: chwUserId,
        patientId: formData.patientId,
        patientName: formData.patientName,
        visitDate: now,
        status: 'completed',
        community: formData.community,
        vitals: {
          bloodPressure: formData.systolic && formData.diastolic 
            ? `${formData.systolic}/${formData.diastolic}`
            : undefined,
          heartRate: formData.heartRate ? parseInt(formData.heartRate) : undefined,
          temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
        },
        medicationAdherence: {
          medicationsTaken: formData.medicationsTaken,
          missedDoses: formData.missedDoses ? parseInt(formData.missedDoses) : 0,
        },
        concerns: formData.concerns,
        notes: formData.notes,
        recommendations: formData.recommendations,
        needsReferral: formData.needsReferral,
        referralReason: formData.referralReason,
        createdAt: now,
        updatedAt: now,
      };

      const visitId = await db.chwVisits.add(visit as any);

      // If vitals were recorded, create measurement record
      if (formData.systolic && formData.diastolic) {
        const measurement: Omit<Measurement, 'id'> = {
          userId: formData.patientId,
          type: 'blood_pressure',
          systolic: parseInt(formData.systolic),
          diastolic: parseInt(formData.diastolic),
          heartRate: formData.heartRate ? parseInt(formData.heartRate) : undefined,
          notes: `Recorded during CHW home visit (Visit ID: ${visitId})`,
          measuredAt: now,
          timestamp: now,
          synced: 0,
          createdAt: now,
          updatedAt: now,
        };

        await db.measurements.add(measurement as any);
      }

      // Add to sync queue if offline
      if (!navigator.onLine) {
        await db.addToSyncQueue(chwUserId, 'CREATE', 'chwVisit', Number(visitId), visit);
        toast.success('Visit recorded offline. Will sync when online.');
      } else {
        toast.success('Visit recorded successfully!');
      }

      // If referral is needed, navigate to create referral
      if (formData.needsReferral) {
        router.push(`/cwh/referrals/create?patientId=${formData.patientId}&visitId=${visitId}`);
      } else {
        router.push('/cwh/visits');
      }
    } catch (error) {
      console.error('Error recording visit:', error);
      toast.error('Failed to record visit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout userType="cwh">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Home className="h-8 w-8 text-blue-600" />
            Record Home Visit
          </h1>
          <p className="text-muted-foreground mt-1">Document patient vitals, medication adherence, and concerns</p>
        </div>

        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Enter the patient's details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleChange('patientId', e.target.value)}
                  placeholder="Enter patient ID"
                  required
                />
              </div>
              <div>
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleChange('patientName', e.target.value)}
                  placeholder="Enter patient name"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="community">Community</Label>
                <Input
                  id="community"
                  value={formData.community}
                  onChange={(e) => handleChange('community', e.target.value)}
                  placeholder="Enter community name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vitals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Vital Signs
            </CardTitle>
            <CardDescription>Record patient's vital measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
                <Input
                  id="systolic"
                  type="number"
                  value={formData.systolic}
                  onChange={(e) => handleChange('systolic', e.target.value)}
                  placeholder="120"
                />
              </div>
              <div>
                <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
                <Input
                  id="diastolic"
                  type="number"
                  value={formData.diastolic}
                  onChange={(e) => handleChange('diastolic', e.target.value)}
                  placeholder="80"
                />
              </div>
              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  value={formData.heartRate}
                  onChange={(e) => handleChange('heartRate', e.target.value)}
                  placeholder="72"
                />
              </div>
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  value={formData.temperature}
                  onChange={(e) => handleChange('temperature', e.target.value)}
                  placeholder="36.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medication Adherence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-green-600" />
              Medication Adherence
            </CardTitle>
            <CardDescription>Check if patient is taking medications correctly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="medicationsTaken">Medications Currently Taking</Label>
              <textarea
                id="medicationsTaken"
                value={formData.medicationsTaken}
                onChange={(e) => handleChange('medicationsTaken', e.target.value)}
                placeholder="List medications the patient is currently taking..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[80px] dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="missedDoses">Number of Missed Doses (Past Week)</Label>
              <Input
                id="missedDoses"
                type="number"
                value={formData.missedDoses}
                onChange={(e) => handleChange('missedDoses', e.target.value)}
                placeholder="0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Visit Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Visit Notes</CardTitle>
            <CardDescription>Document patient concerns and observations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="concerns">Patient Concerns</Label>
              <textarea
                id="concerns"
                value={formData.concerns}
                onChange={(e) => handleChange('concerns', e.target.value)}
                placeholder="What concerns does the patient have?"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[80px] dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Any additional observations or notes..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[80px] dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="recommendations">Recommendations</Label>
              <textarea
                id="recommendations"
                value={formData.recommendations}
                onChange={(e) => handleChange('recommendations', e.target.value)}
                placeholder="Health recommendations for the patient..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[80px] dark:bg-gray-800 dark:text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Referral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-orange-600" />
              Referral
            </CardTitle>
            <CardDescription>Does this patient need to see a clinician?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="needsReferral"
                checked={formData.needsReferral}
                onChange={(e) => handleChange('needsReferral', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="needsReferral" className="cursor-pointer">
                Patient needs referral to health facility
              </Label>
            </div>
            {formData.needsReferral && (
              <div>
                <Label htmlFor="referralReason">Reason for Referral</Label>
                <textarea
                  id="referralReason"
                  value={formData.referralReason}
                  onChange={(e) => handleChange('referralReason', e.target.value)}
                  placeholder="Why does this patient need to be referred?"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[80px] dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/cwh/visits')}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Visit'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
