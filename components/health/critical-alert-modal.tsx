'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { db, type HealthAlert } from '@/lib/db/schema';

/**
 * Critical alert modal for displaying urgent health alerts
 * Shows when readings are critically high/low
 */

interface CriticalAlertModalProps {
  userId: string;
  onClose?: () => void;
}

export function CriticalAlertModal({ userId, onClose }: CriticalAlertModalProps) {
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      const recentAlerts = await db.getRecentAlerts(userId, 5);
      const criticalAlerts = recentAlerts.filter((a) => !a.dismissed && a.type === 'critical');
      if (criticalAlerts.length > 0) {
        setAlerts(criticalAlerts);
        setIsOpen(true);
      }
    };

    fetchAlerts();
  }, [userId]);

  const handleDismiss = async (alertId: number) => {
    await db.dismissAlert(alertId);
    setAlerts(alerts.filter((a) => a.id !== alertId));

    if (alerts.length === 1) {
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleDismissAll = async () => {
    await Promise.all(alerts.map((a) => db.dismissAlert(a.id!)));
    setAlerts([]);
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen || alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border-4 border-red-600">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-lg flex items-center gap-4">
          <AlertTriangle className="w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold">Critical Alert</h2>
            <p className="text-sm text-red-100">Immediate action may be needed</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-red-50 dark:bg-red-900 p-4 rounded-lg border-l-4 border-red-600">
              <h3 className="font-bold text-red-900 dark:text-red-100">{alert.title}</h3>
              <p className="text-sm text-red-800 dark:text-red-200 mt-2">{alert.message}</p>
              {alert.createdAt && (
                <p className="text-xs text-red-700 dark:text-red-300 mt-2">
                  {new Date(alert.createdAt).toLocaleString('en-GH')}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="px-6 py-4 bg-yellow-50 dark:bg-yellow-900 border-t border-yellow-200 dark:border-yellow-700">
          <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            What you should do:
          </p>
          <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1 list-disc list-inside">
            <li>Stop what you are doing and rest</li>
            <li>Measure again in 5-10 minutes</li>
            <li>If reading remains high, seek medical help</li>
            <li>Contact your doctor immediately</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={handleDismissAll}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            I Understand
          </button>
          {alerts.length > 1 && (
            <button
              onClick={() => handleDismiss(alerts[0].id!)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              title="Dismiss this alert"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Close button (always available) */}
        <button
          onClick={() => {
            setIsOpen(false);
            onClose?.();
          }}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
