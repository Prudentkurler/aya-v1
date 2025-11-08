'use client';

import { ReactNode } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { TopNav } from '@/components/layout/top-nav';

interface DashboardLayoutProps {
  children: ReactNode;
  userType?: 'patient' | 'clinician' | 'cwh';
}

export function DashboardLayout({ children, userType = 'patient' }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AppSidebar userType={userType} />

      <div className="flex-1 flex flex-col md:ml-64">
        <TopNav />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
