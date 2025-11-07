export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  ghanaCardId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  conditions: string[]; // e.g., ["hypertension", "diabetes"]
  emergencyContact?: string;
  language: string; // e.g., "en", "tw", "ga"
  literacyLevel: "high" | "medium" | "low";
  nhisNumber?: string;
  community?: string;
  householdId?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  photoUrl?: string;
  fingerprintData?: string; // Placeholder for biometric data
}
