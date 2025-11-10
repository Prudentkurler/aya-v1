"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface TutorialStep {
  title: string;
  description: string;
  targetElement?: string;
  audioText: string;
}

interface TutorialOverlayProps {
  steps: TutorialStep[];
  storageKey: string;
  userRole: "patient" | "chw" | "clinician" | "family";
}

export function TutorialOverlay({ steps, storageKey, userRole }: TutorialOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if tutorial has been completed
    const tutorialCompleted = localStorage.getItem(storageKey);
    if (!tutorialCompleted) {
      // Show tutorial after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Auto-play audio for first step
        speakText(steps[0].audioText);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [storageKey, steps]);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      speakText(steps[nextStep].audioText);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      speakText(steps[prevStep].audioText);
    }
  };

  const handleComplete = () => {
    localStorage.setItem(storageKey, "completed");
    setIsVisible(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, "skipped");
    setIsVisible(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
      
      {/* Tutorial Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  Step {currentStep + 1} of {steps.length}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {userRole} Tutorial
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Skip
              </Button>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <CardTitle className="text-2xl mb-2">{currentStepData.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {currentStepData.description}
              </CardDescription>
            </div>

            {/* Visual indicator */}
            <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {userRole === "patient" && currentStep === 0 && "❤️"}
                  {userRole === "patient" && currentStep === 1 && "📊"}
                  {userRole === "patient" && currentStep === 2 && "💊"}
                  {userRole === "patient" && currentStep === 3 && "📅"}
                  {userRole === "chw" && currentStep === 0 && "👥"}
                  {userRole === "chw" && currentStep === 1 && "🔍"}
                  {userRole === "chw" && currentStep === 2 && "⚠️"}
                  {userRole === "chw" && currentStep === 3 && "📋"}
                  {userRole === "clinician" && currentStep === 0 && "🏥"}
                  {userRole === "clinician" && currentStep === 1 && "📈"}
                  {userRole === "clinician" && currentStep === 2 && "🔔"}
                  {userRole === "clinician" && currentStep === 3 && "📝"}
                  {userRole === "family" && currentStep === 0 && "👨‍👩‍👧‍👦"}
                  {userRole === "family" && currentStep === 1 && "🎯"}
                  {userRole === "family" && currentStep === 2 && "🏆"}
                  {userRole === "family" && currentStep === 3 && "💚"}
                </div>
                <p className="text-sm text-muted-foreground">
                  Audio guide is playing...
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </div>

            <Button
              onClick={handleNext}
              className="gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="h-4 w-4" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
