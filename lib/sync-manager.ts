import { db } from './db/schema';
import type { SyncQueueItem } from './types/sync';

/**
 * Sync Manager for offline-first data synchronization
 * Handles background sync when connection is restored
 */
class SyncManager {
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private isSyncing: boolean = false;
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL_MS = 30000; // 30 seconds
  private readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  constructor() {
    if (typeof window !== 'undefined') {
      // Listen for online/offline events
      window.addEventListener('online', this.handleOnline.bind(this));
      window.addEventListener('offline', this.handleOffline.bind(this));
      
      // Start periodic sync check
      this.startPeriodicSync();
    }
  }

  private handleOnline() {
    console.log('[SyncManager] Connection restored - starting sync');
    this.isOnline = true;
    this.syncAll();
  }

  private handleOffline() {
    console.log('[SyncManager] Connection lost - entering offline mode');
    this.isOnline = false;
  }

  private startPeriodicSync() {
    this.syncInterval = setInterval(() => {
      if (this.isOnline && !this.isSyncing) {
        this.syncAll();
      }
    }, this.SYNC_INTERVAL_MS);
  }

  public stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Sync all pending items in the sync queue
   */
  public async syncAll(): Promise<void> {
    if (!this.isOnline || this.isSyncing) {
      return;
    }

    this.isSyncing = true;
    console.log('[SyncManager] Starting sync...');

    try {
      // Get all pending sync items
      const pendingItems = await db.syncQueue
        .where('attempts')
        .below(5) // Only items that haven't exceeded max retries
        .toArray();

      if (pendingItems.length === 0) {
        console.log('[SyncManager] No pending items to sync');
        return;
      }

      console.log(`[SyncManager] Found ${pendingItems.length} items to sync`);

      // Sort by createdAt to maintain order
      pendingItems.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      // Process each item
      for (const item of pendingItems) {
        await this.syncItem(item);
      }

      console.log('[SyncManager] Sync completed successfully');
    } catch (error) {
      console.error('[SyncManager] Sync failed:', error);
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Sync a single item
   */
  private async syncItem(item: SyncQueueItem): Promise<void> {
    try {
      console.log(`[SyncManager] Syncing ${item.entity} (${item.operation}) - ID: ${item.entityId}`);

      // Update attempt count
      await db.syncQueue.update(item.id!, {
        attempts: item.attempts + 1,
        lastAttemptAt: new Date(),
      });

      // Build API endpoint
      const endpoint = this.getEndpoint(item.entity, item.operation, item.entityId);

      // Make API call
      const response = await fetch(endpoint, {
        method: item.operation === 'DELETE' ? 'DELETE' : item.operation === 'CREATE' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Add authentication headers
        },
        body: item.operation !== 'DELETE' ? JSON.stringify(item.data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      // Update local record with server ID if CREATE operation
      if (item.operation === 'CREATE' && result.id) {
        await this.updateLocalRecordWithServerId(item.entity, item.entityId, result.id);
      }

      // Mark as synced and remove from queue
      await db.markSyncQueueItemSuccess(item.id!, result.id);
      console.log(`[SyncManager] Successfully synced ${item.entity} - ID: ${item.entityId}`);

      // Update the synced flag on the entity itself
      await this.markEntityAsSynced(item.entity, item.entityId);
    } catch (error) {
      console.error(`[SyncManager] Failed to sync ${item.entity} - ID: ${item.entityId}:`, error);
      
      // Record error
      await db.syncQueue.update(item.id!, {
        lastError: error instanceof Error ? error.message : 'Unknown error',
        updatedAt: new Date(),
      });

      // If max retries exceeded, log it
      if (item.attempts + 1 >= item.maxRetries) {
        console.error(`[SyncManager] Max retries exceeded for ${item.entity} - ID: ${item.entityId}`);
      }
    }
  }

  /**
   * Get API endpoint for an entity
   */
  private getEndpoint(entity: string, operation: string, entityId: number): string {
    const baseUrl = this.API_BASE_URL;
    
    switch (entity) {
      case 'measurement':
        return operation === 'CREATE' 
          ? `${baseUrl}/measurements`
          : `${baseUrl}/measurements/${entityId}`;
      case 'medication':
        return operation === 'CREATE'
          ? `${baseUrl}/medications`
          : `${baseUrl}/medications/${entityId}`;
      case 'adherence':
        return operation === 'CREATE'
          ? `${baseUrl}/adherence`
          : `${baseUrl}/adherence/${entityId}`;
      case 'profile':
        return operation === 'CREATE'
          ? `${baseUrl}/profiles`
          : `${baseUrl}/profiles/${entityId}`;
      case 'eprescription':
        return operation === 'CREATE'
          ? `${baseUrl}/eprescriptions`
          : `${baseUrl}/eprescriptions/${entityId}`;
      case 'chwVisit':
        return operation === 'CREATE'
          ? `${baseUrl}/chw-visits`
          : `${baseUrl}/chw-visits/${entityId}`;
      case 'referral':
        return operation === 'CREATE'
          ? `${baseUrl}/referrals`
          : `${baseUrl}/referrals/${entityId}`;
      default:
        throw new Error(`Unknown entity type: ${entity}`);
    }
  }

  /**
   * Update local record with server-generated ID
   */
  private async updateLocalRecordWithServerId(entity: string, localId: number, serverId: string): Promise<void> {
    try {
      switch (entity) {
        case 'measurement':
          await db.measurements.update(localId, { serverId });
          break;
        case 'medication':
          await db.medications.update(localId, { serverId });
          break;
        case 'adherence':
          // MedicationAdherence doesn't have serverId field
          break;
        case 'profile':
          // UserProfile doesn't have serverId field in the type definition
          break;
        case 'eprescription':
          await db.eprescriptions.update(localId, { serverId });
          break;
        case 'chwVisit':
          await db.chwVisits.update(localId, { serverId });
          break;
        case 'referral':
          await db.referrals.update(localId, { serverId });
          break;
      }
    } catch (error) {
      console.error(`[SyncManager] Failed to update serverId for ${entity} - ID: ${localId}:`, error);
    }
  }

  /**
   * Mark an entity as synced
   */
  private async markEntityAsSynced(entity: string, localId: number): Promise<void> {
    try {
      const syncedValue = 1;
      
      switch (entity) {
        case 'measurement':
          await db.measurements.update(localId, { synced: syncedValue });
          break;
        case 'medication':
          // Medication doesn't have synced field in current schema
          break;
        case 'adherence':
          // MedicationAdherence doesn't have synced field
          break;
        case 'profile':
          // UserProfile doesn't have synced field
          break;
        case 'eprescription':
          await db.eprescriptions.update(localId, { synced: syncedValue });
          break;
        case 'chwVisit':
          await db.chwVisits.update(localId, { synced: syncedValue });
          break;
        case 'referral':
          await db.referrals.update(localId, { synced: syncedValue });
          break;
      }
    } catch (error) {
      console.error(`[SyncManager] Failed to mark ${entity} as synced - ID: ${localId}:`, error);
    }
  }

  /**
   * Get sync status
   */
  public async getSyncStatus(): Promise<{
    pendingCount: number;
    failedCount: number;
    isOnline: boolean;
    isSyncing: boolean;
  }> {
    const pendingItems = await db.syncQueue.where('attempts').below(5).toArray();
    const failedItems = await db.syncQueue.where('attempts').aboveOrEqual(5).toArray();

    return {
      pendingCount: pendingItems.length,
      failedCount: failedItems.length,
      isOnline: this.isOnline,
      isSyncing: this.isSyncing,
    };
  }

  /**
   * Manually trigger sync
   */
  public async triggerSync(): Promise<void> {
    if (!this.isOnline) {
      throw new Error('Cannot sync while offline');
    }
    
    await this.syncAll();
  }

  /**
   * Clear failed sync items (for manual retry)
   */
  public async clearFailedItems(): Promise<void> {
    const failedItems = await db.syncQueue.where('attempts').aboveOrEqual(5).toArray();
    
    for (const item of failedItems) {
      await db.syncQueue.update(item.id!, {
        attempts: 0,
        lastError: undefined,
        lastAttemptAt: undefined,
      });
    }
    
    console.log(`[SyncManager] Reset ${failedItems.length} failed items for retry`);
  }
}

// Create singleton instance
export const syncManager = new SyncManager();

// Export class for testing
export { SyncManager };
