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
    <div className="flex justify-between mb-6 md:mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center flex-1">
          <div
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base ${
              index + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
          <p className="text-xs md:text-sm mt-2 text-center">{step}</p>
        </div>
      ))}
    </div>
  );
};

const Step1GhanaCard = ({ onNext }: { onNext: (data: any) => void }) => {
  const fillDemoData = () => {
    const demoNames = ['Kwame Mensah', 'Ama Serwaa', 'Kofi Osei', 'Akua Asante', 'Kwesi Boateng'];
    const randomName = demoNames[Math.floor(Math.random() * demoNames.length)];
    const randomId = `GHA-${Math.floor(100000000 + Math.random() * 900000000)}-${Math.floor(Math.random() * 10)}`;
    onNext({ name: randomName, ghanaCardId: randomId });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Scan Ghana Card</CardTitle>
        <CardDescription>Scan the QR code on the patient's Ghana Card to pre-fill their information.</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="w-full h-48 md:h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
          <Camera className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={fillDemoData} className="flex-1">
            Scan QR Code (Demo)
          </Button>
          <Button onClick={() => onNext({})} variant="outline" className="flex-1">
            Skip & Enter Manually
          </Button>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">Click "Scan QR Code" to pre-fill with demo data, or skip to enter details manually.</p>
      </CardContent>
    </Card>
  );
};

const Step2Biometrics = ({ onNext }: { onNext: (data: any) => void }) => (
  <Card>
    <CardHeader>
      <CardTitle>Step 2: Capture Biometrics</CardTitle>
      <CardDescription>Capture the patient's photo and fingerprint for identification.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <Camera className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">Take Photo (Demo)</Button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <Fingerprint className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">Scan Fingerprint (Demo)</Button>
      </div>
      <Button onClick={() => onNext({})} className="w-full">Continue to Details</Button>
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

  const fillDemoData = () => {
    const demoData = {
      name: formValues.name || 'Kwame Mensah',
      ghanaCardId: formValues.ghanaCardId || `GHA-${Date.now()}-0`,
      nhisNumber: `NHIS-${Math.floor(100000 + Math.random() * 900000)}`,
      phone: `024${Math.floor(1000000 + Math.random() * 9000000)}`,
      email: `patient${Math.floor(Math.random() * 1000)}@example.com`,
      community: ['Adenta', 'Madina', 'Legon', 'Dome', 'Ashongman'][Math.floor(Math.random() * 5)],
      householdId: `HH-${Math.floor(1000 + Math.random() * 9000)}`,
      dateOfBirth: '1985-06-15',
    };
    setFormValues(demoData);
  };

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
        <Button onClick={fillDemoData} variant="outline" className="w-full mb-4" type="button">
          Fill with Demo Data
        </Button>
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
      <div className="max-w-2xl mx-auto px-2 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Register New Patient
        </h1>
        <Stepper currentStep={step} />
        {step === 1 && <Step1GhanaCard onNext={handleNextStep1} />}
        {step === 2 && <Step2Biometrics onNext={handleNextStep2} />}
        {step === 3 && <Step3Details initialData={formData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      </div>
    </DashboardLayout>
  );
}
