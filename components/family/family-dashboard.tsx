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
  CheckCircle2,
  AlertCircle,
  Clock,
  Heart,
  Pill,
  ChevronRight,
  Award,
  Target,
  Info
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
  medicationAdherence: number;
  lastReading: string;
  bpReading?: string;
}

interface CompoundStats {
  totalMembers: number;
  membersControlled: number;
  avgAdherence: number;
  criticalAlerts: number;
  weeklyCheckIns: number;
}

const DEMO_COMPOUND_STATS: CompoundStats = {
  totalMembers: 25,
  membersControlled: 18,
  avgAdherence: 78,
  criticalAlerts: 2,
  weeklyCheckIns: 21,
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
          Family Health Champion • Supporting your family's health journey together
        </p>
      </div>

      {/* Role Info Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Your Role as Family Health Champion</h3>
              <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                As the designated health champion for Adeyemi Compound, you help monitor and support your family members' 
                health progress. Your care and attention keeps everyone healthy and motivated!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">
              {controlRate}% control rate
            </p>
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
            <p className="text-xs text-muted-foreground mt-1">
              Average across all members
            </p>
            <Progress value={stats.avgAdherence} className="mt-2 h-2" />
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Check-ins
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyCheckIns}/{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Members checked this week
            </p>
            <Progress value={(stats.weeklyCheckIns / stats.totalMembers) * 100} className="mt-2 h-2" />
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
              Great engagement!
            </p>
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
            <p className="text-xs text-muted-foreground mt-1">
              Need immediate attention
            </p>
            {stats.criticalAlerts > 0 ? (
              <Button variant="destructive" size="sm" className="mt-2 w-full">
                View Alerts
              </Button>
            ) : (
              <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                All members doing well
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Family Achievement */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
              <CardTitle>Family Health Progress</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100">
              Excellent!
            </Badge>
          </div>
          <CardDescription className="text-green-900 dark:text-green-200">
            Your family is making great progress on health goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium">Adherence Goal</p>
                <p className="text-2xl font-bold">{stats.avgAdherence}%</p>
                <p className="text-xs text-muted-foreground">Target: 80%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium">BP Control Rate</p>
                <p className="text-2xl font-bold">{controlRate}%</p>
                <p className="text-xs text-muted-foreground">Target: 70%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium">Check-in Rate</p>
                <p className="text-2xl font-bold">{Math.round((stats.weeklyCheckIns / stats.totalMembers) * 100)}%</p>
                <p className="text-xs text-muted-foreground">This week</p>
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
          <div className="divide-y max-h-[500px] overflow-y-auto">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold truncate">{member.name}</p>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {member.age}y
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {member.relationship} • Last reading: {member.lastReading}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
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
                      {member.medicationAdherence}%
                    </p>
                    <Progress value={member.medicationAdherence} className="h-2" />
                  </div>

                  {/* Action */}
                  <Button variant="ghost" size="icon" className="shrink-0">
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
    </div>
  );
}
