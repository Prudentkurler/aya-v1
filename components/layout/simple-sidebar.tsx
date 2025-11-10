"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, LayoutDashboard, Activity, Pill, Users, BarChart3, Settings, Bell, FileText, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleSidebarProps {
  userRole?: "patient" | "chw" | "clinician" | "admin";
  userName?: string;
}

const PATIENT_NAV = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Measurements", href: "/measurements", icon: Activity },
  { title: "Medications", href: "/medications/list", icon: Pill },
  { title: "Profile", href: "/profile", icon: Users },
];

const CHW_NAV = [
  { title: "Dashboard", href: "/cwh", icon: LayoutDashboard },
  { title: "Patients", href: "/cwh/patients", icon: Users },
  { title: "Screening", href: "/cwh/screening", icon: Activity },
  { title: "Referrals", href: "/cwh/referrals", icon: FileText },
  { title: "Metrics", href: "/cwh/metrics", icon: BarChart3 },
];

const CLINICIAN_NAV = [
  { title: "Dashboard", href: "/clinician", icon: LayoutDashboard },
  { title: "Cases", href: "/clinician/cases", icon: FileText },
  { title: "Patients", href: "/clinician/patients", icon: Users },
  { title: "ePrescriptions", href: "/clinician/eprescriptions", icon: Pill },
  { title: "Reports", href: "/clinician/reports", icon: BarChart3 },
  { title: "Alerts", href: "/clinician/alerts", icon: Bell },
];

export function SimpleSidebar({ userRole = "patient", userName = "User" }: SimpleSidebarProps) {
  const pathname = usePathname();
  const navItems = 
    userRole === "chw" ? CHW_NAV :
    userRole === "clinician" ? CLINICIAN_NAV :
    PATIENT_NAV;

  return (
    <div className="flex h-full flex-col border-r bg-background">
      {/* Logo/Header */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
            <Heart className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">ME APOMUDEN</span>
            <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
