import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { HealthAlertsMonitor } from "@/components/health-alerts-monitor";
import { OnboardingTour } from "@/components/onboarding/onboarding-tour";
import "./globals.css";

export const metadata: Metadata = {
  title: "ME APOMUDEN - Health Monitoring Platform",
  description: "Track your blood pressure, glucose, and medications offline. Your comprehensive health companion in Ghana.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ME APOMUDEN",
    startupImage: [
      {
        url: "/icon-512x512.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: "ME APOMUDEN",
  keywords: ["health", "blood pressure", "glucose", "medication", "Ghana", "offline", "PWA"],
  authors: [{ name: "Health Tech 4 Africa" }],
  creator: "Health Tech 4 Africa",
  publisher: "Health Tech 4 Africa",
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
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
