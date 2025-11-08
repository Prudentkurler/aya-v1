'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Wifi, 
  WifiOff, 
  Download, 
  Users, 
  Activity, 
  Bell,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlightClass?: string;
  features: string[];
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Welcome to ME APOMUDEN',
    description: 'Your complete health companion designed for Ghana. Track your blood pressure, glucose, medications, and more—all in your pocket.',
    icon: <Heart className="h-16 w-16 text-red-500" />,
    features: [
      '📊 Track BP & Glucose readings',
      '💊 Medication reminders',
      '👨‍⚕️ CHW communication',
      '📱 Works on any device'
    ]
  },
  {
    title: 'Works 100% Offline',
    description: 'No internet? No problem! ME APOMUDEN works perfectly without any connection. All your health data is stored securely on your device.',
    icon: <WifiOff className="h-16 w-16 text-blue-500" />,
    features: [
      '💾 Data saved locally on your device',
      '🔄 Auto-sync when internet returns',
      '📊 View trends anytime, anywhere',
      '⚡ Lightning fast, even offline'
    ]
  },
  {
    title: 'Install for Offline Use',
    description: 'Install ME APOMUDEN on your home screen for instant access, just like a regular app. No app store needed!',
    icon: <Download className="h-16 w-16 text-green-500" />,
    features: [
      '📲 Add to home screen (Android/iOS)',
      '🚀 Open instantly like any app',
      '🔔 Receive medication reminders',
      '💪 Works without internet connection'
    ]
  },
  {
    title: 'Family Health Dashboard',
    description: 'Are you a Family Health Champion? Monitor and support your family members\' health all in one place.',
    icon: <Users className="h-16 w-16 text-purple-500" />,
    features: [
      '👨‍👩‍👧‍👦 See all family members\' health',
      '✅ Track medication compliance',
      '📈 View compound health progress',
      '💰 Earn mobile money rewards (GHS 50-100/month)'
    ]
  },
  {
    title: 'Smart Health Alerts',
    description: 'Get notified when your blood pressure or glucose readings need attention. We help you stay on top of your health.',
    icon: <Bell className="h-16 w-16 text-amber-500" />,
    features: [
      '🔴 Critical BP/glucose alerts',
      '💊 Medication time reminders',
      '📅 CHW visit notifications',
      '🎯 Health goals tracking'
    ]
  },
  {
    title: 'You\'re All Set!',
    description: 'Start tracking your health today. Remember: consistent tracking leads to better health outcomes.',
    icon: <CheckCircle2 className="h-16 w-16 text-green-500" />,
    features: [
      '🎉 Account created successfully',
      '📊 Ready to log your first reading',
      '👨‍⚕️ CHW can see your progress',
      '💪 Better health starts now!'
    ]
  }
];

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem('hasSeenOnboarding');
    if (!seen) {
      setOpen(true);
    } else {
      setHasSeenOnboarding(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setOpen(false);
    setHasSeenOnboarding(true);
    
    // Show PWA install prompt after onboarding
    setTimeout(() => {
      const event = new CustomEvent('show-pwa-install');
      window.dispatchEvent(event);
    }, 2000);
  };

  const step = ONBOARDING_STEPS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  if (hasSeenOnboarding && !open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-xs">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Progress value={progress} className="h-2 mb-6" />
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-muted">
              {step.icon}
            </div>
            
            <DialogTitle className="text-2xl font-bold">
              {step.title}
            </DialogTitle>
            
            <DialogDescription className="text-base">
              {step.description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-3">
          {step.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{feature}</p>
            </div>
          ))}
        </div>

        {/* Special callout for install step */}
        {currentStep === 2 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              📱 How to Install:
            </p>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
              <li>• <strong>Chrome (Android):</strong> Tap menu (⋮) → "Add to Home screen"</li>
              <li>• <strong>Safari (iOS):</strong> Tap share (↑) → "Add to Home Screen"</li>
              <li>• <strong>Desktop:</strong> Look for install icon in address bar</li>
            </ul>
          </div>
        )}

        {/* Special callout for family dashboard */}
        {currentStep === 3 && (
          <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
              💡 Family Health Champion Role:
            </p>
            <p className="text-xs text-purple-800 dark:text-purple-200">
              If you're designated as your compound's Family Health Champion, you'll see a special dashboard 
              to monitor all family members' health progress and earn mobile money rewards for keeping everyone healthy!
            </p>
          </div>
        )}

        <DialogFooter className="flex-row justify-between gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-1 sm:flex-none"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2 flex-1 sm:flex-none">
            {currentStep < ONBOARDING_STEPS.length - 1 && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="flex-1 sm:flex-none"
              >
                Skip Tour
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              className="flex-1 sm:flex-none"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
