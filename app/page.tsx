'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBackgroundSync } from '@/lib/hooks/use-background-sync';
import { Wifi, WifiOff, Users, Heart, Stethoscope } from 'lucide-react';

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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-lg font-bold text-white">♥</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Me Apomuden
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <Wifi className="w-4 h-4" />
                Online
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                <WifiOff className="w-4 h-4" />
                Offline
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to Me Apomuden
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
              Your comprehensive healthcare management platform
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Select your role to access your personalized dashboard
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Patient */}
            <Link
              href="/dashboard"
              className="group rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Patient
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Track your health measurements, manage medications, and monitor your wellness journey.
              </p>
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium group-hover:bg-blue-700 transition-colors">
                Access Dashboard →
              </div>
            </Link>

            {/* Clinician */}
            <Link
              href="/clinician"
              className="group rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl hover:border-green-400 transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Clinician
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Manage patient cases, monitor critical alerts, and coordinate clinical care.
              </p>
              <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg font-medium group-hover:bg-green-700 transition-colors">
                Access Dashboard →
              </div>
            </Link>

            {/* CWH */}
            <Link
              href="/cwh"
              className="group rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl hover:border-purple-400 transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30 mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Community Health Worker
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Conduct screenings, manage community health programs, and coordinate referrals.
              </p>
              <div className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg font-medium group-hover:bg-purple-700 transition-colors">
                Access Dashboard →
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Offline-First</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Works without internet, syncs when online</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Accessible Design</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Voice input and simple interfaces for all</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Health Tracking</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monitor BP, glucose, and medications</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Critical Alerts</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Automatic detection of health emergencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
