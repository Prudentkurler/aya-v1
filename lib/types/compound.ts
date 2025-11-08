/**
 * Compound (Extended Family) Types
 */

export interface Compound {
  id?: number;
  serverId?: string;
  name: string;
  location: string;
  district?: string;
  region?: string;
  leaderUserId: string; // Compound leader (usually eldest)
  createdAt: Date;
  updatedAt?: Date;
  totalMembers?: number;
  synced?: boolean;
}

export interface CompoundMember {
  id?: number;
  compoundId: number;
  userId: string;
  relationship: string; // 'grandmother', 'father', 'mother', 'uncle', 'aunt', 'child', etc.
  age?: number;
  joinedAt: Date;
  synced?: boolean;
}

export interface FamilyHealthChampion {
  id?: number;
  userId: string;
  compoundId: number;
  appointedAt: Date;
  earningsThisMonth?: number;
  earningsPotential?: number;
  status: 'active' | 'inactive';
  synced?: boolean;
}

export interface CompoundHealthStats {
  compoundId: number;
  totalMembers: number;
  membersWithBPControlled: number;
  membersWithMedicationAdherence80Plus: number;
  averageAdherence: number;
  criticalAlerts: number;
  lastUpdated: Date;
}

/**
 * Literacy Level Types
 */

export type LiteracyLevel = 'high' | 'medium' | 'low';

export interface LiteracyProfile {
  userId: string;
  level: LiteracyLevel;
  detectedAt: Date;
  detectionMethod: 'manual' | 'auto-test' | 'preference';
  readingSpeed?: number; // words per minute
  comprehensionScore?: number; // 0-100
  preferredLanguage?: string;
  voicePreferred?: boolean;
}

export interface LiteracyTestResult {
  task: string;
  accuracy: number; // 0-100
  timeSeconds: number;
  passed: boolean;
}

/**
 * Onboarding Types
 */

export interface OnboardingState {
  userId: string;
  hasSeenOnboarding: boolean;
  currentStep: number;
  completedAt?: Date;
  skipped: boolean;
}

export interface UserPreferences {
  userId: string;
  literacyLevel?: LiteracyLevel;
  language: string;
  voiceEnabled: boolean;
  voiceSpeed: number; // 0.5 - 2.0
  textSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  notificationsEnabled: boolean;
  reminderTime?: string; // HH:mm format
}
