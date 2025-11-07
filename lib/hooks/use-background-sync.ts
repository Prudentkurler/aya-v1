'use client';

import { useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { db } from '@/lib/db/schema';
import { healthApi } from '@/lib/api/client';

/**
 * Hook for managing background sync of offline-first data
 * Syncs measurements and other data when connection is restored
 */
export function useBackgroundSync(userId: string | undefined) {
  const syncInProgressRef = useRef(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Perform sync operation
   */
  const performSync = useCallback(async () => {
    if (!userId || syncInProgressRef.current) {
      return;
    }

    syncInProgressRef.current = true;

    try {
      // Get all items in sync queue for this user
      const syncQueueItems = await db.getSyncQueueForUser(userId);

      if (syncQueueItems.length === 0) {
        syncInProgressRef.current = false;
        return;
      }

      let successCount = 0;
      let failureCount = 0;
      const errors: string[] = [];

      // Process each sync queue item
      for (const queueItem of syncQueueItems) {
        try {
          if (queueItem.operation === 'CREATE' || queueItem.operation === 'UPDATE') {
            if (queueItem.entity === 'measurement') {
              // Sync measurement to server
              const result = await healthApi.createMeasurement(
                queueItem.data as Parameters<typeof healthApi.createMeasurement>[0]
              );
              await db.markSyncQueueItemSuccess(queueItem.id!, result.serverId);
              successCount++;
            } else if (queueItem.entity === 'medication') {
              // Sync medication to server
              const result = await healthApi.createMedication(
                queueItem.data as Parameters<typeof healthApi.createMedication>[0]
              );
              await db.markSyncQueueItemSuccess(queueItem.id!, result.serverId);
              successCount++;
            } else if (queueItem.entity === 'profile') {
              // Sync profile to server
              await healthApi.updateUserProfile(queueItem.data);
              await db.markSyncQueueItemSuccess(queueItem.id!);
              successCount++;
            }
          } else if (queueItem.operation === 'DELETE') {
            if (queueItem.entity === 'measurement') {
              await healthApi.deleteMeasurement(queueItem.serverId || queueItem.data.id);
              await db.markSyncQueueItemSuccess(queueItem.id!);
              successCount++;
            } else if (queueItem.entity === 'medication') {
              await healthApi.deleteMedication(queueItem.serverId || queueItem.data.id);
              await db.markSyncQueueItemSuccess(queueItem.id!);
              successCount++;
            }
          }
        } catch (error: any) {
          failureCount++;
          const errorMessage =
            error?.response?.data?.error || error?.message || 'Unknown error occurred';
          errors.push(errorMessage);

          // Increment retry count
          await db.incrementSyncRetry(queueItem.id!, errorMessage);

          // Log retry
          console.warn(
            `Sync attempt ${queueItem.attempts + 1}/${queueItem.maxRetries} failed for ${queueItem.entity}:`,
            errorMessage
          );
        }
      }

      // Show sync result notification
      if (successCount > 0) {
        toast.success(`Synced ${successCount} item${successCount !== 1 ? 's' : ''}`);
      }

      if (failureCount > 0) {
        const errorMsg = errors[0] || 'Some items failed to sync';
        toast.error(`Failed to sync ${failureCount} item${failureCount !== 1 ? 's' : ''}: ${errorMsg}`);
      }
    } catch (error: any) {
      console.error('Background sync error:', error);
      toast.error('Sync failed. Will retry when connection is restored.');
    } finally {
      syncInProgressRef.current = false;

      // Schedule periodic retry even if online (in case of transient errors)
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      retryTimeoutRef.current = setTimeout(() => {
        performSync();
      }, 5 * 60 * 1000); // Retry every 5 minutes
    }
  }, [userId]);

  /**
   * Handle online event
   */
  const handleOnline = useCallback(() => {
    console.log('Connection restored. Starting sync...');
    toast.info('Connection restored. Syncing data...');
    performSync();
  }, [performSync]);

  /**
   * Handle offline event
   */
  const handleOffline = useCallback(() => {
    console.log('Connection lost. Will sync when restored.');
    toast.error('Connection lost. Data will sync when restored.');

    // Clear retry timeout when offline
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  /**
   * Register sync event listener and background sync API if available
   */
  useEffect(() => {
    if (!userId) return;

    // Add online/offline event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Perform initial sync if online
    if (navigator.onLine) {
      const timeoutId = setTimeout(() => {
        performSync();
      }, 1000); // Give app time to initialize

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userId, handleOnline, handleOffline, performSync]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    performSync,
    isSyncing: syncInProgressRef.current,
  };
}
