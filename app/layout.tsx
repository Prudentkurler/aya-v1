import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { HealthAlertsMonitor } from "@/components/health-alerts-monitor";
import { OnboardingTour } from "@/components/onboarding/onboarding-tour";
import "./globals.css";

export const metadata: Metadata = {
  title: "Me Apomuden - Patient Health PWA",
  description: "Your health companion - Track BP, glucose, and medications offline-first",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Me Apomuden",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0070C0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors closeButton />
        <PWAInstallPrompt />
        <HealthAlertsMonitor />
        <OnboardingTour />
      </body>
    </html>
  );
}
