'use client';

import { ReactNode } from 'react';
import { SimpleSidebar } from '@/components/layout/simple-sidebar';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: ReactNode;
  userType?: 'patient' | 'clinician' | 'cwh' | 'family';
}

export function DashboardLayout({ children, userType = 'patient' }: DashboardLayoutProps) {
  // Map cwh to chw for SimpleSidebar
  const sidebarRole = userType === 'cwh' ? 'chw' : userType;
  
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - Static positioning */}
      <div className="hidden md:block w-64">
        <SimpleSidebar 
          userRole={sidebarRole as "patient" | "chw" | "clinician" | "family"} 
          userName={userType === 'patient' ? 'Patient User' : userType === 'clinician' ? 'Dr. Clinician' : userType === 'cwh' ? 'Community Health Worker' : 'Family Champion'} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold capitalize">{userType === 'cwh' ? 'Community Health Worker' : userType} Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex">
                Offline Ready
              </Badge>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-muted/40">
          <div className="p-4 md:p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
