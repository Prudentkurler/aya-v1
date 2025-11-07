export interface Referral {
  id?: number;
  serverId?: string;
  userId: string;
  chwId: string;
  facilityId: string;
  reason: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: number;
  synced: boolean;
}
