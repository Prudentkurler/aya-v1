'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { db } from '@/lib/db/schema';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

export function HealthAlertsMonitor() {
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkForAlerts = async () => {
      try {
        // Get current user (in real app, this would come from auth context)
        const userId = 'patient-demo-001'; // TODO: Get from auth context

        // Get recent undismissed alerts
        const alerts = await db.getRecentAlerts(userId, 5);

        alerts.forEach((alert) => {
          // Check if we've already shown this alert
          const shownKey = `alert-shown-${alert.id}`;
          if (localStorage.getItem(shownKey)) {
            return;
          }

          // Show toast based on alert type
          const toastOptions = {
            duration: alert.type === 'critical' ? 10000 : 5000,
            action: {
              label: 'Dismiss',
              onClick: async () => {
                await db.dismissAlert(alert.id!);
                localStorage.setItem(shownKey, 'true');
              },
            },
          };

          switch (alert.type) {
            case 'critical':
              toast.error(alert.title, {
                description: alert.message,
                icon: <AlertTriangle className="h-5 w-5" />,
                ...toastOptions,
              });
              break;
            case 'warning':
              toast.warning(alert.title, {
                description: alert.message,
                icon: <AlertCircle className="h-5 w-5" />,
                ...toastOptions,
              });
              break;
            case 'info':
              toast.info(alert.title, {
                description: alert.message,
                icon: <Info className="h-5 w-5" />,
                ...toastOptions,
              });
              break;
          }

          // Mark as shown
          localStorage.setItem(shownKey, 'true');
        });
      } catch (error) {
        console.error('Error checking for health alerts:', error);
      }
    };

    // Check immediately
    checkForAlerts();

    // Then check every 30 seconds
    intervalId = setInterval(checkForAlerts, 30000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return null; // This is a monitor component, no UI
}
