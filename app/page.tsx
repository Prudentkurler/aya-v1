'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBackgroundSync } from '@/lib/hooks/use-background-sync';
import { 
  Wifi, 
  WifiOff, 
  Users, 
  Heart, 
  Stethoscope,
  Activity,
  Shield,
  Smartphone,
  MapPin,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize user ID and sync
  useEffect(() => {
    setIsMounted(true);
    const storedUserId = localStorage.getItem('user_id') || 'user_' + Date.now();
    localStorage.setItem('user_id', storedUserId);
    setUserId(storedUserId);
    setIsOnline(navigator.onLine);
  }, []);

  // Use background sync hook
  useBackgroundSync(userId || undefined);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                ME APOMUDEN
              </h1>
              <p className="text-xs text-slate-500">Health Platform for Ghana</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                <Wifi className="w-4 h-4" />
                <span className="hidden sm:inline">Connected</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                <WifiOff className="w-4 h-4" />
                <span className="hidden sm:inline">Offline Mode</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/20 px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-900 dark:text-red-200">
                  Serving Communities Across Ghana
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Better Health Through Better Data
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                ME APOMUDEN connects patients, community health workers, and clinicians 
                in a unified platform designed to improve hypertension and diabetes management 
                across Ghana—even without internet connection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Get Started as Patient
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Offline Capable</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">6</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Local Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Health Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">All</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Literacy Levels</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Built for Ghana's Healthcare Reality
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                We understand the challenges: unreliable internet, low literacy rates, and the need 
                for family-centered care. ME APOMUDEN was designed from the ground up to address these realities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <WifiOff className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Works Completely Offline
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  No internet? No problem. All data is stored locally on your device and 
                  automatically syncs when connection returns. Never miss a health reading.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Family-Centered Care
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Designate a Family Health Champion to help monitor and support multiple family 
                  members' health—perfect for compound living arrangements.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Voice & Visual Options
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Interface adapts to your needs with voice input support and simplified 
                  visual modes for users with varying literacy levels.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Critical Health Alerts
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Automatic detection of dangerous blood pressure or glucose levels with 
                  immediate notifications to you and your healthcare team.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Secure & Private
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your health data stays on your device until you're ready to share. 
                  NHIS-compliant with Ghana Card integration for verified care.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Track Your Progress
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  See trends in your blood pressure, glucose, and medication adherence over 
                  time with clear charts and insights tailored to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Choose Your Dashboard
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Select the appropriate dashboard for your role in the healthcare system
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Patient */}
              <Link
                href="/dashboard"
                className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 hover:border-red-400 dark:hover:border-red-600 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                    <Heart className="w-7 h-7 text-red-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Patient Portal
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                    Track your blood pressure, glucose, medications, and communicate 
                    with your healthcare providers.
                  </p>
                  
                  <span className="inline-flex items-center text-sm font-medium text-red-600 group-hover:gap-2 transition-all">
                    Access Dashboard
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </div>
              </Link>

              {/* Clinician */}
              <Link
                href="/clinician"
                className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 hover:border-green-400 dark:hover:border-green-600 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                    <Stethoscope className="w-7 h-7 text-green-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Clinician Dashboard
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                    Manage patient cases, view critical alerts, write ePrescriptions, 
                    and coordinate referrals.
                  </p>
                  
                  <span className="inline-flex items-center text-sm font-medium text-green-600 group-hover:gap-2 transition-all">
                    Access Dashboard
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </div>
              </Link>

              {/* CHW */}
              <Link
                href="/cwh"
                className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 hover:border-purple-400 dark:hover:border-purple-600 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                    <Users className="w-7 h-7 text-purple-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    CHW Dashboard
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                    Conduct community screenings, manage visits, track patient 
                    adherence, and coordinate care.
                  </p>
                  
                  <span className="inline-flex items-center text-sm font-medium text-purple-600 group-hover:gap-2 transition-all">
                    Access Dashboard
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-red-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Ghanaians managing their hypertension and diabetes 
              with ME APOMUDEN. Start tracking today.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors text-lg"
            >
              <Heart className="w-5 h-5" />
              Start Your Health Journey
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                © 2025 ME APOMUDEN. Improving healthcare outcomes across Ghana.
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-400">
                  Works 24/7, Online or Offline
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
