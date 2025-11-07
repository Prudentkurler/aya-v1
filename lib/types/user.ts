export interface UserProfile {
  id?: number;
  userId: string;
  firstName: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  bloodType?: string;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  medicalHistory?: string;
  allergies?: string;
  language: 'en' | 'tw' | 'ga' | 'dag' | 'ee' | 'fat';
  literacyLevel: 'high' | 'medium' | 'low';
  nhisNumber?: string;
  ghanaCardId?: string;
  community?: string;
  householdId?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  photoUrl?: string;
  fingerprintData?: string;
  createdAt: Date;
  updatedAt: Date;
}
