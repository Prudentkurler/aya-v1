export interface SyncQueueItem {
  id?: number;
  userId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'measurement' | 'medication' | 'adherence' | 'profile' | 'eprescription' | 'chwVisit' | 'referral';
  entityId: number;
  serverId?: string;
  data: Record<string, any>;
  attempts: number;
  maxRetries: number;
  lastAttemptAt?: Date;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyGroup {
  id?: number;
  serverId?: string;
  groupName: string;
  createdBy: string;
  members: Array<{
    userId: string;
    relationship: string;
    joinedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthAlert {
  id?: number;
  serverId?: string;
  userId: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  relatedMeasurementId?: number;
  dismissed: boolean;
  createdAt: Date;
}
