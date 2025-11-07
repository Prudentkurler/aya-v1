'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Fingerprint, UserPlus } from 'lucide-react';
import { db } from '@/lib/db/schema';
import type { UserProfile } from '@/lib/types/user';

// Mock Stepper component
const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Scan Card', 'Biometrics', 'Details'];
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
          <p className="text-sm mt-2">{step}</p>
        </div>
      ))}
    </div>
  );
};

const Step1GhanaCard = ({ onNext }: { onNext: (data: any) => void }) => (
  <Card>
    <CardHeader>
      <CardTitle>Step 1: Scan Ghana Card</CardTitle>
      <CardDescription>Scan the QR code on the patient's Ghana Card to pre-fill their information.</CardDescription>
    </CardHeader>
    <CardContent className="text-center">
      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
        <Camera className="w-16 h-16 text-gray-400" />
      </div>
      <Button onClick={() => onNext({ name: 'Ama Serwaa', ghanaCardId: 'GHA-123456789-0' })}>
        Scan QR Code
      </Button>
      <p className="text-sm text-muted-foreground mt-4">Alternatively, you can enter the details manually in the next step.</p>
    </CardContent>
  </Card>
);

const Step2Biometrics = ({ onNext }: { onNext: (data: any) => void }) => (
  <Card>
    <CardHeader>
      <CardTitle>Step 2: Capture Biometrics</CardTitle>
      <CardDescription>Capture the patient's photo and fingerprint for identification.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <Camera className="w-12 h-12 text-gray-400" />
        </div>
        <Button variant="outline">Take Photo</Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <Fingerprint className="w-12 h-12 text-gray-400" />
        </div>
        <Button variant="outline">Scan Fingerprint</Button>
      </div>
      <Button onClick={() => onNext({})}>Next Step</Button>
    </CardContent>
  </Card>
);

const Step3Details = ({ initialData, onSubmit, isSubmitting }: { initialData: any; onSubmit: (data: any) => void; isSubmitting: boolean }) => {
  const [formValues, setFormValues] = useState({
    name: initialData.name || '',
    ghanaCardId: initialData.ghanaCardId || '',
    nhisNumber: '',
    phone: '',
    email: '',
    community: '',
    householdId: '',
    dateOfBirth: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleFormSubmit = () => {
    if (!formValues.name || !formValues.phone) {
      toast.error('Please fill in all required fields (Name and Phone)');
      return;
    }
    onSubmit(formValues);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 3: Confirm Details</CardTitle>
        <CardDescription>Verify the patient's information and add any missing details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name" 
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input 
              id="phone" 
              value={formValues.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="0XX XXX XXXX"
              required
            />
          </div>
          <div>
            <Label htmlFor="ghanaCard">Ghana Card ID</Label>
            <Input 
              id="ghanaCard" 
              value={formValues.ghanaCardId}
              onChange={(e) => handleChange('ghanaCardId', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="nhis">NHIS Number</Label>
            <Input 
              id="nhis" 
              value={formValues.nhisNumber}
              onChange={(e) => handleChange('nhisNumber', e.target.value)}
              placeholder="Enter NHIS number" 
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={formValues.email}
              onChange={(e) => handleChange('email', e.target.value)}
              type="email"
              placeholder="patient@example.com"
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input 
              id="dateOfBirth" 
              value={formValues.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              type="date"
            />
          </div>
          <div>
            <Label htmlFor="community">Community</Label>
            <Input 
              id="community" 
              value={formValues.community}
              onChange={(e) => handleChange('community', e.target.value)}
              placeholder="Enter community name" 
            />
          </div>
          <div>
            <Label htmlFor="household">Household ID</Label>
            <Input 
              id="household" 
              value={formValues.householdId}
              onChange={(e) => handleChange('householdId', e.target.value)}
              placeholder="Enter household ID" 
            />
          </div>
        </div>
        <Button onClick={handleFormSubmit} className="w-full" disabled={isSubmitting}>
          <UserPlus className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Registering...' : 'Register Patient'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default function RegisterPatientPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep1 = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handleNextStep2 = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const handleSubmit = async (finalData: any) => {
    setIsSubmitting(true);
    try {
      const chwUserId = 'chw-user-123'; // TODO: Get from auth context
      
      // Split name into firstName and lastName
      const nameParts = finalData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      
      // Create user profile
      const userProfile: Omit<UserProfile, 'id'> = {
        userId: `patient-${Date.now()}`,
        firstName,
        lastName,
        phone: finalData.phone,
        dateOfBirth: finalData.dateOfBirth ? new Date(finalData.dateOfBirth) : undefined,
        ghanaCardId: finalData.ghanaCardId || '',
        nhisNumber: finalData.nhisNumber || '',
        community: finalData.community || '',
        householdId: finalData.householdId || '',
        language: 'en',
        literacyLevel: 'medium',
        photoUrl: formData.photoUrl || '',
        fingerprintData: formData.fingerprintData || '',
        location: {
          latitude: 0,
          longitude: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to database
      const userId = await db.userProfile.add(userProfile as any);

      // Add to sync queue if offline
      if (!navigator.onLine) {
        await db.addToSyncQueue(chwUserId, 'CREATE', 'profile', Number(userId), userProfile as any);
        toast.success('Patient registered offline. Will sync when online.');
      } else {
        toast.success('Patient registered successfully!');
      }

      // Reset form and navigate back
      setStep(1);
      setFormData({});
      router.push('/cwh/patients');
    } catch (error) {
      console.error('Error registering patient:', error);
      toast.error('Failed to register patient. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout userType="cwh">
      <div className="max-w-2xl mx-auto">
        <Stepper currentStep={step} />
        {step === 1 && <Step1GhanaCard onNext={handleNextStep1} />}
        {step === 2 && <Step2Biometrics onNext={handleNextStep2} />}
        {step === 3 && <Step3Details initialData={formData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      </div>
    </DashboardLayout>
  );
}
