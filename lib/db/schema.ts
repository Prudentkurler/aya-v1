import Dexie, { type Table } from 'dexie';
import type {
  Measurement,
  Medication,
  MedicationAdherence,
  UserProfile,
  SyncQueueItem,
  FamilyGroup,
  HealthAlert,
  EPrescription,
  CHWVisit,
  Referral,
  HealthEducationMessage,
} from '@/lib/types';

/**
 * Main database class using Dexie
 */
export class HealthDB extends Dexie {
  // Declare tables
  measurements!: Table<Measurement>;
  medications!: Table<Medication>;
  medicationAdherence!: Table<MedicationAdherence>;
  userProfile!: Table<UserProfile>;
  syncQueue!: Table<SyncQueueItem>;
  familyGroups!: Table<FamilyGroup>;
  healthAlerts!: Table<HealthAlert>;
  eprescriptions!: Table<EPrescription>;
  chwVisits!: Table<CHWVisit>;
  referrals!: Table<Referral>;
  healthEducation!: Table<HealthEducationMessage>;

  constructor() {
    super('HealthDB');
    this.version(3).stores({
      measurements:
        '++id, userId, serverId, type, measuredAt, synced, [userId+type+measuredAt]',
      medications: '++id, userId, serverId, createdAt',
      medicationAdherence: '++id, userId, medicationId, date, [userId+date]',
      userProfile: 'userId',
      syncQueue:
        '++id, userId, operation, entity, entityId, attempts, createdAt, [userId+operation]',
      familyGroups: '++id, serverId, createdBy, createdAt',
      healthAlerts: '++id, userId, type, dismissed, createdAt',
      eprescriptions: '++id, serverId, userId, clinicianId, createdAt, synced',
      chwVisits: '++id, serverId, userId, chwId, visitDate, synced',
      referrals: '++id, serverId, userId, chwId, facilityId, status, createdAt, synced',
      healthEducation: '++id, serverId, category, language',
      compounds: '++id, serverId, name, location, leaderUserId, createdAt',
      compoundMembers: '++id, compoundId, userId, relationship, [compoundId+userId]',
      familyHealthChampions: '++id, userId, compoundId, appointedAt, [compoundId+userId]',
      literacyProfiles: 'userId, level, detectedAt',
    });
  }

  /**
   * Get all unsynced measurements for a user
   */
  async getUnsyncedMeasurements(userId: string): Promise<Measurement[]> {
    return this.measurements
      .where('userId')
      .equals(userId)
      .filter((m) => m.synced === 0)
      .toArray();
  }

  /**
   * Get all sync queue items for a user
   */
  async getSyncQueueForUser(userId: string): Promise<SyncQueueItem[]> {
    return this.syncQueue
      .where('userId')
      .equals(userId)
      .filter((item) => item.attempts < item.maxRetries)
      .toArray();
  }

  /**
   * Add item to sync queue
   */
  async addToSyncQueue(
    userId: string,
    operation: 'CREATE' | 'UPDATE' | 'DELETE',
    entity: 'measurement' | 'medication' | 'adherence' | 'profile' | 'eprescription' | 'chwVisit' | 'referral',
    entityId: number,
    data: Record<string, any>,
    serverId?: string
  ): Promise<number> {
    return this.syncQueue.add({
      userId,
      operation,
      entity,
      entityId,
      serverId,
      data,
      attempts: 0,
      maxRetries: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Mark sync queue item as successful
   */
  async markSyncQueueItemSuccess(id: number, serverId?: string): Promise<void> {
    const item = await this.syncQueue.get(id);
    if (item) {
      // Update the synced status in the original entity
      if (item.entity === 'measurement') {
        await this.measurements.update(item.entityId, {
          synced: 1,
          serverId: serverId || item.serverId,
          updatedAt: new Date(),
        });
      } else if (item.entity === 'medication') {
        await this.medications.update(item.entityId, {
          serverId: serverId || item.serverId,
          updatedAt: new Date(),
        });
      }
      // Remove from sync queue
      await this.syncQueue.delete(id);
    }
  }

  /**
   * Increment retry count for sync queue item
   */
  async incrementSyncRetry(id: number, error?: string): Promise<void> {
    const item = await this.syncQueue.get(id);
    if (item) {
      await this.syncQueue.update(id, {
        attempts: item.attempts + 1,
        lastAttemptAt: new Date(),
        lastError: error,
        updatedAt: new Date(),
      });
    }
  }

  /**
   * Get measurements for user within date range
   */
  async getMeasurementsByType(
    userId: string,
    type: 'blood_pressure' | 'glucose',
    startDate: Date,
    endDate: Date
  ): Promise<Measurement[]> {
    return this.measurements
      .where('userId')
      .equals(userId)
      .filter((m) => m.type === type && m.measuredAt >= startDate && m.measuredAt <= endDate)
      .toArray();
  }

  /**
   * Get latest measurement of type
   */
  async getLatestMeasurement(
    userId: string,
    type: 'blood_pressure' | 'glucose'
  ): Promise<Measurement | undefined> {
    const measurements = await this.measurements
      .where('userId')
      .equals(userId)
      .filter((m) => m.type === type)
      .reverse()
      .limit(1)
      .toArray();
    return measurements[0];
  }

  /**
   * Create health alert
   */
  async createAlert(
    userId: string,
    type: 'critical' | 'warning' | 'info',
    title: string,
    message: string,
    relatedMeasurementId?: number
  ): Promise<number> {
    return this.healthAlerts.add({
      userId,
      type,
      title,
      message,
      relatedMeasurementId,
      dismissed: false,
      createdAt: new Date(),
    });
  }

  /**
   * Dismiss alert
   */
  async dismissAlert(id: number): Promise<void> {
    await this.healthAlerts.update(id, { dismissed: true });
  }

  /**
   * Get recent undismissed alerts for user
   */
  async getRecentAlerts(userId: string, limit = 10): Promise<HealthAlert[]> {
    return this.healthAlerts
      .where('userId')
      .equals(userId)
      .filter((a) => !a.dismissed)
      .reverse()
      .limit(limit)
      .toArray();
  }

  /**
   * Clear old sync queue items (successful syncs older than 7 days)
   */
  async cleanupOldSyncQueue(daysToKeep = 7): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const itemsToDelete = await this.syncQueue
      .where('createdAt')
      .below(cutoffDate)
      .toArray();

    if (itemsToDelete.length > 0) {
      await this.syncQueue.bulkDelete(itemsToDelete.map((item) => item.id!));
    }

    return itemsToDelete.length;
  }

  /**
   * Export user data for backup
   */
  async exportUserData(userId: string): Promise<{
    measurements: Measurement[];
    medications: Medication[];
    profile: UserProfile | undefined;
    eprescriptions: EPrescription[];
    chwVisits: CHWVisit[];
    referrals: Referral[];
  }> {
    const [measurements, medications, profile, eprescriptions, chwVisits, referrals] = await Promise.all([
      this.measurements.where('userId').equals(userId).toArray(),
      this.medications.where('userId').equals(userId).toArray(),
      this.userProfile.get(userId),
      this.eprescriptions.where('userId').equals(userId).toArray(),
      this.chwVisits.where('userId').equals(userId).toArray(),
      this.referrals.where('userId').equals(userId).toArray(),
    ]);

    return { measurements, medications, profile, eprescriptions, chwVisits, referrals };
  }

  /**
   * Clear all data for user (account deletion)
   */
  async clearUserData(userId: string): Promise<void> {
    await Promise.all([
      this.measurements.where('userId').equals(userId).delete(),
      this.medications.where('userId').equals(userId).delete(),
      this.medicationAdherence.where('userId').equals(userId).delete(),
      this.userProfile.delete(userId),
      this.syncQueue.where('userId').equals(userId).delete(),
      this.healthAlerts.where('userId').equals(userId).delete(),
      this.eprescriptions.where('userId').equals(userId).delete(),
      this.chwVisits.where('userId').equals(userId).delete(),
      this.referrals.where('userId').equals(userId).delete(),
    ]);
  }
}

// Export singleton instance
export const db = new HealthDB();
