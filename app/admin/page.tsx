'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Database, Trash2, Info } from 'lucide-react';
import { seedDemoData, clearDemoData } from '@/lib/utils/seed-demo-data';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const handleSeedData = async () => {
    setLoading(true);
    try {
      const success = await seedDemoData();
      if (success) {
        toast.success('Demo Data Seeded!', {
          description: 'All demo patients, measurements, visits, and alerts have been created. Refresh to see the data.',
        });
      } else {
        toast.error('Seeding Failed', {
          description: 'Failed to seed demo data. Check the console for errors.',
        });
      }
    } catch (error) {
      toast.error('Seeding Error', {
        description: `Error: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
      return;
    }
    setLoading(true);
    try {
      const success = await clearDemoData();
      if (success) {
        toast.success('Data Cleared!', {
          description: 'All data has been removed from the database.',
        });
      } else {
        toast.error('Clear Failed', {
          description: 'Failed to clear data. Check the console for errors.',
        });
      }
    } catch (error) {
      toast.error('Clear Error', {
        description: `Error: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userType="patient">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admin / Demo Tools
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
            Manage demo data for testing and video demonstration
          </p>
        </div>

        <div className="grid gap-6">
          {/* Seed Demo Data Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Seed Demo Data
              </CardTitle>
              <CardDescription>
                Populate the database with sample patients, measurements, visits, prescriptions, and referrals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-sm">
                <p className="font-medium mb-2">This will create:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>3 demo patients (Kwame, Ama, Kofi)</li>
                  <li>7 health measurements (BP and glucose readings)</li>
                  <li>3 medications with prescriptions</li>
                  <li>2 CHW home visit records</li>
                  <li>1 active ePrescription</li>
                  <li>2 patient referrals</li>
                </ul>
              </div>
              <Button
                onClick={handleSeedData}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Seeding Data...' : 'Seed Demo Data'}
              </Button>
            </CardContent>
          </Card>

          {/* Clear Data Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Trash2 className="w-5 h-5" />
                Clear All Data
              </CardTitle>
              <CardDescription>
                Remove all data from the database (patients, measurements, medications, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-800 dark:text-red-400">
                  ⚠️ <strong>Warning:</strong> This action cannot be undone. All data will be permanently deleted from the local database.
                </p>
              </div>
              <Button
                onClick={handleClearData}
                disabled={loading}
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                size="lg"
              >
                {loading ? 'Clearing Data...' : 'Clear All Data'}
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-400">
                  <p className="font-medium mb-1">For Video Demo:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click "Seed Demo Data" to populate the database</li>
                    <li>Refresh the page to see the data in all sections</li>
                    <li>Navigate through Patient Dashboard, Measurements, etc.</li>
                    <li>Demonstrate CHW features by viewing visits and referrals</li>
                    <li>Show Clinician features using the prescriptions and alerts</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
