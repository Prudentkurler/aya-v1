'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send, Search, Calendar, User, AlertCircle, CheckCircle, XCircle, Activity } from 'lucide-react';
import { db } from '@/lib/db/schema';
import type { Referral } from '@/lib/types/referral';

export default function ClinicianReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [clinicianNotes, setClinicianNotes] = useState('');
  const [outcome, setOutcome] = useState('');

  useEffect(() => {
    loadReferrals();
  }, []);

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

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || referral.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAcceptReferral = async (referralId: number) => {
    try {
      const clinicianId = 'clinician-user-123'; // TODO: Get from auth
      await db.referrals.update(referralId, {
        status: 'accepted',
        clinicianId,
        acceptedAt: new Date(),
        updatedAt: new Date(),
      });
      toast.success('Referral accepted');
      loadReferrals();
    } catch (error) {
      console.error('Error accepting referral:', error);
      toast.error('Failed to accept referral');
    }
  };

  const handleCompleteReferral = async () => {
    if (!selectedReferral?.id) return;

    try {
      await db.referrals.update(selectedReferral.id, {
        status: 'completed',
        clinicianNotes,
        outcome,
        completedAt: new Date(),
        updatedAt: new Date(),
      });
      toast.success('Referral marked as completed');
      setShowDetailModal(false);
      setSelectedReferral(null);
      setClinicianNotes('');
      setOutcome('');
      loadReferrals();
    } catch (error) {
      console.error('Error completing referral:', error);
      toast.error('Failed to complete referral');
    }
  };

  const handleRejectReferral = async (referralId: number) => {
    try {
      await db.referrals.update(referralId, {
        status: 'rejected',
        updatedAt: new Date(),
      });
      toast.success('Referral rejected');
      loadReferrals();
    } catch (error) {
      console.error('Error rejecting referral:', error);
      toast.error('Failed to reject referral');
    }
  };

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

  return (
    <DashboardLayout userType="clinician">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Send className="h-8 w-8 text-orange-600" />
            Patient Referrals
          </h1>
          <p className="text-muted-foreground mt-1">Review and manage incoming patient referrals</p>
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Card>
            <CardContent className="pt-6">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                {referrals.filter(r => r.urgency === 'emergency').length}
              </div>
              <p className="text-sm text-muted-foreground">Emergency</p>
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
            <CardTitle>Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading referrals...</div>
            ) : filteredReferrals.length === 0 ? (
              <div className="text-center py-8">
                <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No referrals found</p>
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

                    <div className="ml-7 space-y-2 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Referred By</p>
                        <p className="text-sm text-gray-900 dark:text-white">{referral.chwName || 'CHW'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Reason</p>
                        <p className="text-sm text-gray-900 dark:text-white">{referral.reason}</p>
                      </div>
                      {referral.symptoms && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Symptoms</p>
                          <p className="text-sm text-gray-900 dark:text-white">{referral.symptoms}</p>
                        </div>
                      )}
                      {referral.vitals && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Vitals</p>
                          <div className="flex gap-4 text-sm">
                            {referral.vitals.bloodPressure && (
                              <span className="text-gray-900 dark:text-white">
                                BP: {referral.vitals.bloodPressure}
                              </span>
                            )}
                            {referral.vitals.heartRate && (
                              <span className="text-gray-900 dark:text-white">
                                HR: {referral.vitals.heartRate} bpm
                              </span>
                            )}
                            {referral.vitals.temperature && (
                              <span className="text-gray-900 dark:text-white">
                                Temp: {referral.vitals.temperature}°C
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="ml-7 flex gap-2">
                      {referral.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptReferral(referral.id!)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectReferral(referral.id!)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {referral.status === 'accepted' && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedReferral(referral);
                            setShowDetailModal(true);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Complete Referral Modal */}
        {showDetailModal && selectedReferral && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Complete Referral - {selectedReferral.patientName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clinicianNotes">Clinician Notes</Label>
                  <textarea
                    id="clinicianNotes"
                    value={clinicianNotes}
                    onChange={(e) => setClinicianNotes(e.target.value)}
                    placeholder="Enter your clinical assessment and any relevant notes..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[100px] dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="outcome">Treatment/Outcome</Label>
                  <textarea
                    id="outcome"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    placeholder="Describe the treatment provided and outcome..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[100px] dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDetailModal(false);
                      setSelectedReferral(null);
                      setClinicianNotes('');
                      setOutcome('');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCompleteReferral}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
