'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Heart,
  Pill,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
  ClipboardList,
  TrendingUp,
  Bell,
  Home,
  ChevronDown,
  FilePlus2,
  ClipboardPlus,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  children?: SidebarItem[];
}

interface AppSidebarProps {
  userType?: 'patient' | 'clinician' | 'cwh';
}

export function AppSidebar({ userType = 'patient' }: AppSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Auto-open menu on desktop
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, []);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  // Define menu items based on user type
  const getMenuItems = (): SidebarItem[] => {
    switch (userType) {
      case 'clinician':
        return [
          {
            label: 'Dashboard',
            href: '/clinician/dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />,
          },
          {
            label: 'Patients',
            href: '/clinician/patients',
            icon: <Users className="w-5 h-5" />,
          },
          {
            label: 'ePrescriptions',
            href: '/clinician/eprescriptions',
            icon: <ClipboardPlus className="w-5 h-5" />,
          },
          {
            label: 'Referrals',
            href: '/clinician/referrals',
            icon: <Send className="w-5 h-5" />,
          },
          {
            label: 'DHIMS2 Reports',
            href: '/clinician/reports',
            icon: <BarChart3 className="w-5 h-5" />,
          },
          {
            label: 'Alerts',
            href: '/clinician/alerts',
            icon: <Bell className="w-5 h-5" />,
            badge: 5,
          },
          {
            label: 'Settings',
            href: '/clinician/settings',
            icon: <Settings className="w-5 h-5" />,
          },
        ];
      case 'cwh':
        return [
          {
            label: 'Dashboard',
            href: '/cwh/dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />,
          },
          {
            label: 'Patient Registry',
            href: '/cwh/patients',
            icon: <Users className="w-5 h-5" />,
            children: [
              { label: 'View Patients', href: '/cwh/patients', icon: <Users className="w-4 h-4" /> },
              { label: 'Register New', href: '/cwh/patients/register', icon: <FilePlus2 className="w-4 h-4" /> },
            ],
          },
          {
            label: 'Home Visits',
            href: '/cwh/visits',
            icon: <Home className="w-5 h-5" />,
          },
          {
            label: 'Referrals',
            href: '/cwh/referrals',
            icon: <Send className="w-5 h-5" />,
          },
          {
            label: 'Alerts',
            href: '/cwh/alerts',
            icon: <Bell className="w-5 h-5" />,
            badge: 8,
          },
          {
            label: 'Settings',
            href: '/cwh/settings',
            icon: <Settings className="w-5 h-5" />,
          },
        ];
      default: // patient
        return [
          {
            label: 'Dashboard',
            href: '/dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />,
          },
          {
            label: 'Measurements',
            href: '#',
            icon: <Heart className="w-5 h-5" />,
            children: [
              { label: 'View All', href: '/measurements', icon: <BarChart3 className="w-4 h-4" /> },
              { label: 'Add Reading', href: '/measurements/add', icon: <Heart className="w-4 h-4" /> },
              { label: 'Trends', href: '/measurements/trends', icon: <TrendingUp className="w-4 h-4" /> },
            ],
          },
          {
            label: 'Medications',
            href: '/medications/list',
            icon: <Pill className="w-5 h-5" />,
          },
          {
            label: 'Insights',
            href: '/insights',
            icon: <TrendingUp className="w-5 h-5" />,
          },
          {
            label: 'Profile',
            href: '/profile',
            icon: <Settings className="w-5 h-5" />,
          },
        ];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (href: string) => pathname === href;
  const isChildActive = (children?: SidebarItem[]) =>
    children?.some((child) => pathname === child.href);

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white border border-slate-200 rounded-lg p-2 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-lg font-bold text-white">♥</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">
              Me Apomuden
            </h1>
            <p className="text-xs text-slate-500 capitalize dark:text-slate-400">
              {userType} Mode
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isChildActive(item.children)
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      expandedItems.includes(item.label) && 'rotate-180'
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}

              {/* Submenu */}
              {item.children && expandedItems.includes(item.label) && (
                <div className="ml-2 space-y-1 border-l-2 border-slate-200 dark:border-slate-800">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors',
                        isActive(child.href)
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                      )}
                    >
                      {child.icon}
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 px-3 py-4 dark:border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Spacer for main content */}
      <div className="md:ml-64" />
    </>
  );
}
