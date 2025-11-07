'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Plus, Search, Calendar, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { db } from '@/lib/db/schema';
import { ReferralForm } from '@/components/forms/referral-form';
import type { Referral } from '@/lib/types/referral';

function CHWReferralsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Check if we should auto-open create form from URL params
  const patientIdFromUrl = searchParams?.get('patientId');
  const visitIdFromUrl = searchParams?.get('visitId');

  useEffect(() => {
    loadReferrals();
    if (patientIdFromUrl) {
      setShowCreateForm(true);
    }
  }, [patientIdFromUrl]);

  const loadReferrals = async () => {
    try {
      const allReferrals = await db.referrals.toArray();
      setReferrals(allReferrals);
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReferrals = referrals.filter(referral =>
    referral.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  if (showCreateForm) {
    return (
      <DashboardLayout userType="cwh">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Send className="h-8 w-8 text-orange-600" />
              Create Referral
            </h1>
            <p className="text-muted-foreground mt-1">Refer a patient to a health facility</p>
          </div>
          <ReferralForm
            patientId={patientIdFromUrl || undefined}
            visitId={visitIdFromUrl || undefined}
            onSuccess={() => {
              setShowCreateForm(false);
              loadReferrals();
              router.push('/cwh/referrals');
            }}
            onCancel={() => {
              setShowCreateForm(false);
              router.push('/cwh/referrals');
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="cwh">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Send className="h-8 w-8 text-orange-600" />
              Patient Referrals
            </h1>
            <p className="text-muted-foreground mt-1">Manage patient referrals to health facilities</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Referral
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {referrals.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {referrals.filter(r => r.status === 'accepted').length}
              </div>
              <p className="text-sm text-muted-foreground">Accepted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {referrals.filter(r => r.status === 'completed').length}
              </div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {referrals.length}
              </div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Referrals List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading referrals...</div>
            ) : filteredReferrals.length === 0 ? (
              <div className="text-center py-8">
                <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No referrals found</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowCreateForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Referral
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReferrals.map((referral) => (
                  <div
                    key={referral.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {referral.patientName}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                          {getStatusIcon(referral.status)}
                          <span className="ml-1">{referral.status}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(referral.urgency)}`}>
                          {referral.urgency}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(referral.referredAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="ml-7 space-y-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Reason</p>
                        <p className="text-sm text-gray-900 dark:text-white">{referral.reason}</p>
                      </div>
                      {referral.facilityName && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Facility</p>
                          <p className="text-sm text-gray-900 dark:text-white">{referral.facilityName}</p>
                        </div>
                      )}
                      {referral.clinicianNotes && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Clinician Notes</p>
                          <p className="text-sm text-gray-900 dark:text-white">{referral.clinicianNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function CHWReferralsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CHWReferralsContent />
    </Suspense>
  );
}
