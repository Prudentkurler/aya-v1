'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, AlertCircle, Activity } from 'lucide-react';
import { db } from '@/lib/db/schema';
import type { Referral } from '@/lib/types/referral';

interface ReferralFormProps {
  patientId?: string;
  patientName?: string;
  visitId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReferralForm({ patientId, patientName, visitId, onSuccess, onCancel }: ReferralFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientId: patientId || '',
    patientName: patientName || '',
    facilityName: '',
    reason: '',
    urgency: 'routine' as 'routine' | 'urgent' | 'emergency',
    symptoms: '',
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.patientId || !formData.patientName || !formData.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const chwUserId = 'chw-user-123'; // TODO: Get from auth context
      const now = new Date();

      const referral: Omit<Referral, 'id'> = {
        patientId: formData.patientId,
        patientName: formData.patientName,
        chwId: chwUserId,
        chwName: 'CHW User', // TODO: Get from auth context
        facilityName: formData.facilityName,
        reason: formData.reason,
        urgency: formData.urgency,
        status: 'pending',
        symptoms: formData.symptoms,
        vitals: {
          bloodPressure: formData.systolic && formData.diastolic 
            ? `${formData.systolic}/${formData.diastolic}`
            : undefined,
          heartRate: formData.heartRate ? parseInt(formData.heartRate) : undefined,
          temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
        },
        referredAt: now,
        createdAt: now,
        updatedAt: now,
        synced: 0,
      };

      const referralId = await db.referrals.add(referral as any);

      // Add to sync queue if offline
      if (!navigator.onLine) {
        await db.addToSyncQueue(chwUserId, 'CREATE', 'referral', Number(referralId), referral);
        toast.success('Referral created offline. Will sync when online.');
      } else {
        toast.success('Referral created successfully!');
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating referral:', error);
      toast.error('Failed to create referral. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Verify the patient's details</CardDescription>
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
          </div>
        </CardContent>
      </Card>

      {/* Referral Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-orange-600" />
            Referral Details
          </CardTitle>
          <CardDescription>Provide information about the referral</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="facilityName">Facility Name</Label>
            <Input
              id="facilityName"
              value={formData.facilityName}
              onChange={(e) => handleChange('facilityName', e.target.value)}
              placeholder="e.g., Korle Bu Teaching Hospital"
            />
          </div>
          <div>
            <Label htmlFor="urgency">Urgency Level *</Label>
            <select
              id="urgency"
              value={formData.urgency}
              onChange={(e) => handleChange('urgency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div>
            <Label htmlFor="reason">Reason for Referral *</Label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              placeholder="Describe why the patient needs to be referred..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[100px] dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="symptoms">Symptoms</Label>
            <textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => handleChange('symptoms', e.target.value)}
              placeholder="List any symptoms the patient is experiencing..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[80px] dark:bg-gray-800 dark:text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Current Vitals (Optional)
          </CardTitle>
          <CardDescription>Include recent vital signs if available</CardDescription>
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

      {/* Urgency Alert */}
      {formData.urgency === 'emergency' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900 dark:text-red-100">Emergency Referral</p>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              This patient requires immediate medical attention. Please ensure they reach the facility as soon as possible.
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1"
        >
          <Send className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Creating...' : 'Create Referral'}
        </Button>
      </div>
    </div>
  );
}
