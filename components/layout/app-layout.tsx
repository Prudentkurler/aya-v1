'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Activity,
  Heart,
  Pill,
  User,
  Users,
  UserPlus,
  FileText,
  Settings,
  LayoutDashboard,
  Bell,
  ChevronRight,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Home,
  TrendingUp,
  UserCog,
  Stethoscope,
  ClipboardList,
  Building2,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Types for navigation items
interface NavSubItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  items?: NavSubItem[];
}

// Navigation items for different user roles
const PATIENT_NAV: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Measurements',
    icon: Activity,
    href: '/measurements',
    badge: '2',
    items: [
      { title: 'Add Reading', href: '/measurements/add', icon: UserPlus },
      { title: 'View Trends', href: '/measurements/trends', icon: TrendingUp },
    ],
  },
  {
    title: 'Medications',
    icon: Pill,
    href: '/medications',
    items: [
      { title: 'My Medications', href: '/medications/list', icon: ClipboardList },
      { title: 'Add Medication', href: '/medications/add', icon: UserPlus },
    ],
  },
  {
    title: 'Health Insights',
    icon: HeartPulse,
    href: '/insights',
  },
  {
    title: 'Profile',
    icon: User,
    href: '/profile',
  },
];

const CHW_NAV: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/cwh',
  },
  {
    title: 'Patients',
    icon: Users,
    href: '/cwh/patients',
    badge: '24',
  },
  {
    title: 'Visits',
    icon: UserCheck,
    href: '/cwh/visits',
    items: [
      { title: 'Schedule Visit', href: '/cwh/visits/schedule', icon: UserPlus },
      { title: 'Visit History', href: '/cwh/visits/history', icon: ClipboardList },
    ],
  },
  {
    title: 'Community',
    icon: Building2,
    href: '/cwh/community',
  },
  {
    title: 'Follow-ups',
    icon: Bell,
    href: '/cwh/followups',
    badge: '5',
  },
  {
    title: 'Referrals',
    icon: FileText,
    href: '/cwh/referrals',
  },
  {
    title: 'Screening',
    icon: Stethoscope,
    href: '/cwh/screening',
  },
  {
    title: 'Metrics',
    icon: TrendingUp,
    href: '/cwh/metrics',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/cwh/settings',
  },
];

const CLINICIAN_NAV: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/clinician',
  },
  {
    title: 'Patients',
    icon: Users,
    href: '/clinician/patients',
    badge: '156',
  },
  {
    title: 'Cases',
    icon: FileText,
    href: '/clinician/cases',
  },
  {
    title: 'ePrescriptions',
    icon: Pill,
    href: '/clinician/eprescriptions',
  },
  {
    title: 'Referrals',
    icon: UserCheck,
    href: '/clinician/referrals',
    badge: '8',
  },
  {
    title: 'Alerts',
    icon: Bell,
    href: '/clinician/alerts',
    badge: '12',
  },
  {
    title: 'Reports',
    icon: TrendingUp,
    href: '/clinician/reports',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/clinician/settings',
  },
];

const ADMIN_NAV: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    title: 'System Overview',
    icon: TrendingUp,
    href: '/admin/overview',
  },
  {
    title: 'User Management',
    icon: Users,
    href: '/admin/users',
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/admin/reports',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
  userRole?: 'patient' | 'chw' | 'clinician' | 'admin';
  userName?: string;
  userAvatar?: string;
}

export function AppSidebarComponent({ userRole = 'patient', userName = 'User', userAvatar }: Omit<AppLayoutProps, 'children'>) {
  const pathname = usePathname();
  const navItems = 
    userRole === 'chw' ? CHW_NAV :
    userRole === 'clinician' ? CLINICIAN_NAV :
    userRole === 'admin' ? ADMIN_NAV :
    PATIENT_NAV;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <Heart className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ME APOMUDEN</span>
                  <span className="truncate text-xs capitalize">{userRole}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={pathname.startsWith(item.href)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {item.items ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={pathname.startsWith(item.href)}
                          >
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant="destructive" className="ml-auto">
                                {item.badge}
                              </Badge>
                            )}
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                                  <Link href={subItem.href}>
                                    {subItem.icon && <subItem.icon className="size-4" />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={pathname === item.href}
                      >
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="destructive" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="rounded-lg">
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userName}</span>
                    <span className="truncate text-xs capitalize">{userRole} Account</span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="rounded-lg">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userName}</span>
                      <span className="truncate text-xs capitalize">{userRole}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppLayout({ children, userRole = 'patient', userName = 'User', userAvatar }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebarComponent userRole={userRole} userName={userName} userAvatar={userAvatar} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">ME APOMUDEN</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex">Offline</Badge>
              <Bell className="h-5 w-5" />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
