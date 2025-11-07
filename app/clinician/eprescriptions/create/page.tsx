'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClipboardPlus, Save, Plus, X, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db/schema';
import type { EPrescription } from '@/lib/types/eprescription';

interface MedicationItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export default function CreatePrescriptionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    diagnosis: '',
    notes: '',
  });
  const [medications, setMedications] = useState<MedicationItem[]>([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMedicationChange = (index: number, field: keyof MedicationItem, value: string) => {
    const updatedMeds = [...medications];
    updatedMeds[index][field] = value;
    setMedications(updatedMeds);
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
    ]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.patientId || !formData.patientName || !formData.diagnosis) {
      toast.error('Please fill in all required fields');
      return;
    }

    const validMeds = medications.filter(med => med.name && med.dosage && med.frequency);
    if (validMeds.length === 0) {
      toast.error('Please add at least one medication with name, dosage, and frequency');
      return;
    }

    setIsSubmitting(true);
    try {
      const clinicianId = 'clinician-user-123'; // TODO: Get from auth context
      const now = new Date();

      // Create ePrescription record
      const prescription: Omit<EPrescription, 'id'> = {
        clinicianId,
        patientId: formData.patientId,
        patientName: formData.patientName,
        diagnosis: formData.diagnosis,
        medications: validMeds,
        status: 'active',
        notes: formData.notes,
        createdAt: now,
        updatedAt: now,
      };

      const prescriptionId = await db.eprescriptions.add(prescription as any);

      // Add individual medications to the medications table
      for (const med of validMeds) {
        const medication = {
          userId: formData.patientId,
          serverId: undefined,
          name: med.name,
          dosage: med.dosage,
          frequency: med.frequency,
          startDate: now,
          endDate: med.duration ? new Date(Date.now() + parseInt(med.duration) * 24 * 60 * 60 * 1000) : undefined,
          instructions: med.instructions,
          createdAt: now,
          updatedAt: now,
        };

        await db.medications.add(medication as any);
      }

      // Add to sync queue if offline
      if (!navigator.onLine) {
        await db.addToSyncQueue(clinicianId, 'CREATE', 'eprescription', Number(prescriptionId), prescription);
        toast.success('Prescription created offline. Will sync when online.');
      } else {
        toast.success('Prescription created successfully!');
      }

      router.push('/clinician/eprescriptions');
    } catch (error) {
      console.error('Error creating prescription:', error);
      toast.error('Failed to create prescription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout userType="clinician">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ClipboardPlus className="h-8 w-8 text-blue-600" />
            Create ePrescription
          </h1>
          <p className="text-muted-foreground mt-1">Fill in the prescription details below</p>
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
                <Label htmlFor="diagnosis">Diagnosis *</Label>
                <Input
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => handleChange('diagnosis', e.target.value)}
                  placeholder="Enter diagnosis"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medications */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Medications</CardTitle>
                <CardDescription>Add medications to this prescription</CardDescription>
              </div>
              <Button onClick={addMedication} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {medications.map((med, index) => (
              <div key={index} className="relative p-4 border rounded-lg space-y-4">
                {medications.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMedication(index)}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <div className="font-medium text-sm text-muted-foreground">Medication #{index + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor={`med-name-${index}`}>Medication Name *</Label>
                    <Input
                      id={`med-name-${index}`}
                      value={med.name}
                      onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      placeholder="e.g., Amlodipine"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-dosage-${index}`}>Dosage *</Label>
                    <Input
                      id={`med-dosage-${index}`}
                      value={med.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      placeholder="e.g., 5mg"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-frequency-${index}`}>Frequency *</Label>
                    <Input
                      id={`med-frequency-${index}`}
                      value={med.frequency}
                      onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      placeholder="e.g., Once daily"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-duration-${index}`}>Duration (days)</Label>
                    <Input
                      id={`med-duration-${index}`}
                      type="number"
                      value={med.duration}
                      onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                      placeholder="e.g., 30"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-instructions-${index}`}>Instructions</Label>
                    <Input
                      id={`med-instructions-${index}`}
                      value={med.instructions}
                      onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                      placeholder="e.g., Take with food"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Any additional information for the patient or pharmacist</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add any additional instructions or notes..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[100px] dark:bg-gray-800 dark:text-white"
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/clinician/eprescriptions')}
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
            {isSubmitting ? 'Creating...' : 'Create Prescription'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
