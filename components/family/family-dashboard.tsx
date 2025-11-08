'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Heart,
  Pill,
  Activity,
  ChevronRight,
  Award,
  Target
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relationship: string;
  avatar?: string;
  bpStatus: 'good' | 'moderate' | 'critical';
  medicationAdherence: number; // percentage
  lastReading: string;
  bpReading?: string;
}

interface CompoundStats {
  totalMembers: number;
  membersControlled: number;
  avgAdherence: number;
  earningsThisMonth: number;
  earningsPotential: number;
  criticalAlerts: number;
}

// Demo data
const DEMO_COMPOUND_STATS: CompoundStats = {
  totalMembers: 25,
  membersControlled: 18,
  avgAdherence: 78,
  earningsThisMonth: 350,
  earningsPotential: 500,
  criticalAlerts: 2,
};

const DEMO_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: '1',
    name: 'Yaa Asantewaa',
    age: 68,
    relationship: 'Grandmother',
    bpStatus: 'good',
    medicationAdherence: 95,
    lastReading: '2 hours ago',
    bpReading: '128/82',
  },
  {
    id: '2',
    name: 'Kofi Mensah',
    age: 52,
    relationship: 'Father',
    bpStatus: 'moderate',
    medicationAdherence: 72,
    lastReading: '1 day ago',
    bpReading: '142/88',
  },
  {
    id: '3',
    name: 'Akua Afriyie',
    age: 45,
    relationship: 'Mother',
    bpStatus: 'good',
    medicationAdherence: 88,
    lastReading: '3 hours ago',
    bpReading: '122/78',
  },
  {
    id: '4',
    name: 'Kwame Nkrumah',
    age: 38,
    relationship: 'Uncle',
    bpStatus: 'critical',
    medicationAdherence: 45,
    lastReading: '5 days ago',
    bpReading: '165/102',
  },
  {
    id: '5',
    name: 'Ama Serwaa',
    age: 58,
    relationship: 'Aunt',
    bpStatus: 'good',
    medicationAdherence: 92,
    lastReading: '1 hour ago',
    bpReading: '118/75',
  },
];

function getBPStatusColor(status: 'good' | 'moderate' | 'critical') {
  switch (status) {
    case 'good':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'moderate':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }
}

function getBPStatusIcon(status: 'good' | 'moderate' | 'critical') {
  switch (status) {
    case 'good':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'moderate':
      return <Clock className="h-4 w-4" />;
    case 'critical':
      return <AlertCircle className="h-4 w-4" />;
  }
}

export function FamilyDashboard() {
  const [stats] = useState<CompoundStats>(DEMO_COMPOUND_STATS);
  const [members] = useState<FamilyMember[]>(DEMO_FAMILY_MEMBERS);

  const controlRate = Math.round((stats.membersControlled / stats.totalMembers) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Users className="h-8 w-8 text-purple-600" />
          Adeyemi Compound Health Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Family Health Champion view • Monitor and support your family's health
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Family Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.membersControlled} with BP controlled
            </p>
            <Progress value={controlRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Medication Adherence
            </CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgAdherence}%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
            <Progress value={stats.avgAdherence} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Earnings This Month
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS {stats.earningsThisMonth}</div>
            <p className="text-xs text-muted-foreground mt-1">
              / GHS {stats.earningsPotential} potential
            </p>
            <Progress 
              value={(stats.earningsThisMonth / stats.earningsPotential) * 100} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Alerts
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.criticalAlerts}</div>
            <p className="text-xs text-red-600 mt-1">
              Require immediate attention
            </p>
            <Button variant="destructive" size="sm" className="mt-2 w-full">
              View Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Family Achievement */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <CardTitle>Family Health Achievement</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100">
              Top Performer
            </Badge>
          </div>
          <CardDescription className="text-purple-900 dark:text-purple-200">
            Your compound ranks #3 in the district!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm font-medium">Adherence Goal</p>
                <p className="text-2xl font-bold">{stats.avgAdherence}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm font-medium">BP Control Rate</p>
                <p className="text-2xl font-bold">{controlRate}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm font-medium">Monthly Earnings</p>
                <p className="text-2xl font-bold">GHS {stats.earningsThisMonth}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Family Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Family Members Health Status</CardTitle>
          <CardDescription>
            Track each family member's blood pressure and medication compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold truncate">{member.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {member.age}y
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.relationship} • Last reading: {member.lastReading}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* BP Reading */}
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium">BP: {member.bpReading}</p>
                    <Badge
                      variant="outline"
                      className={cn('text-xs mt-1', getBPStatusColor(member.bpStatus))}
                    >
                      {getBPStatusIcon(member.bpStatus)}
                      <span className="ml-1 capitalize">{member.bpStatus}</span>
                    </Badge>
                  </div>

                  {/* Medication Adherence */}
                  <div className="hidden md:block text-right min-w-[100px]">
                    <p className="text-sm font-medium mb-1">
                      {member.medicationAdherence}% adherence
                    </p>
                    <Progress value={member.medicationAdherence} className="h-2" />
                  </div>

                  {/* Action */}
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            Add Family Member
          </Button>
        </CardFooter>
      </Card>

      {/* Earnings Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings Breakdown</CardTitle>
          <CardDescription>
            Your rewards for keeping the family healthy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-green-600" />
              <span className="text-sm">BP Control (18/25 members)</span>
            </div>
            <span className="font-semibold">GHS 144</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Medication Adherence (78%)</span>
            </div>
            <span className="font-semibold">GHS 156</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="text-sm">District Ranking Bonus (#3)</span>
            </div>
            <span className="font-semibold">GHS 50</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between font-bold text-lg">
            <span>Total This Month</span>
            <span className="text-green-600">GHS {stats.earningsThisMonth}</span>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 text-sm text-muted-foreground">
          💡 Tip: Reach 85% average adherence to unlock GHS 100 bonus next month!
        </CardFooter>
      </Card>
    </div>
  );
}
