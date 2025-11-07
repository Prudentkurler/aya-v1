'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { db } from '@/lib/db/schema';
import { validateBPReading } from '@/lib/utils/validators';
import { Volume2, ArrowLeft, Check } from 'lucide-react';

/**
 * Low-literacy BP entry form
 * For users with lower education level or accessibility needs
 * Features:
 * - Large number pad (80px buttons)
 * - Voice feedback
 * - Step-by-step guidance
 * - Simple, clear UI
 * - High contrast
 * - Accessibility-focused
 */

type Step = 'systolic' | 'diastolic' | 'confirm';

interface BPEntryFormLowLiteracyProps {
  userId: string;
  onSuccess?: () => void;
  enableVoice?: boolean;
}

export function BPEntryFormLowLiteracy({
  userId,
  onSuccess,
  enableVoice = true,
}: BPEntryFormLowLiteracyProps) {
  const [step, setStep] = useState<Step>('systolic');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(enableVoice && 'speechSynthesis' in window);

  // Speak text using Web Speech API
  const speak = (text: string) => {
    if (!voiceEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GH'; // Ghana English locale
    utterance.rate = 0.9; // Slightly slower speech
    utterance.pitch = 1;
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  // Auto-speak instruction on step change
  useEffect(() => {
    if (step === 'systolic') {
      speak('Please enter your top number, the systolic pressure.');
    } else if (step === 'diastolic') {
      speak('Now, please enter your bottom number, the diastolic pressure.');
    } else if (step === 'confirm') {
      speak(`Top number ${systolic}, bottom number ${diastolic}. Is this correct?`);
    }
  }, [step, systolic, diastolic, voiceEnabled]);

  // Number pad handler
  const handleNumberPad = (num: string) => {
    if (step === 'systolic' && systolic.length < 3) {
      setSystolic(systolic + num);
    } else if (step === 'diastolic' && diastolic.length < 3) {
      setDiastolic(diastolic + num);
    }
  };

  // Backspace handler
  const handleBackspace = () => {
    if (step === 'systolic') {
      setSystolic(systolic.slice(0, -1));
    } else if (step === 'diastolic') {
      setDiastolic(diastolic.slice(0, -1));
    }
  };

  // Clear all handler
  const handleClear = () => {
    setSystolic('');
    setDiastolic('');
    setStep('systolic');
    speak('Cleared. Please start again.');
  };

  // Next button handler
  const handleNext = () => {
    const currentValue = step === 'systolic' ? systolic : diastolic;

    if (!currentValue) {
      speak(`Please enter a number for ${step === 'systolic' ? 'top' : 'bottom'} number.`);
      return;
    }

    if (step === 'systolic') {
      speak(`Top number recorded as ${systolic}. Proceeding.`);
      setStep('diastolic');
    } else if (step === 'diastolic') {
      speak(`Bottom number recorded as ${diastolic}. Please confirm.`);
      setStep('confirm');
    }
  };

  // Confirm and save
  const handleConfirm = async () => {
    setIsSaving(true);
    try {
      const sys = parseInt(systolic, 10);
      const dia = parseInt(diastolic, 10);

      // Validate
      if (sys < 40 || sys > 300) {
        speak('Top number is not valid. Please try again.');
        toast.error('Invalid systolic reading');
        setIsSaving(false);
        return;
      }

      if (dia < 20 || dia > 200) {
        speak('Bottom number is not valid. Please try again.');
        toast.error('Invalid diastolic reading');
        setIsSaving(false);
        return;
      }

      // Save to database
  

      // Check for critical reading
      const bpStatus = validateBPReading(sys, dia);
      if (bpStatus.isCritical) {
        await db.createAlert(
          userId,
          'critical',
          'Critical Blood Pressure Reading',
          `Your blood pressure (${sys}/${dia}) is critically high. Please seek immediate medical attention.`,
          
        );
        speak('Warning! Your blood pressure is very high. Please seek medical help immediately.');
        toast.error('⚠️ CRITICAL: Please seek medical attention immediately!');
      } else {
        speak('Blood pressure saved successfully.');
        toast.success('Blood pressure recorded!');
      }

      // Reset
      setSystolic('');
      setDiastolic('');
      setStep('systolic');
      onSuccess?.();
    } catch (error: any) {
      console.error('Error saving measurement:', error);
      speak('Error saving. Please try again.');
      toast.error('Failed to save reading');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel
  const handleCancel = () => {
    if (systolic || diastolic) {
      setStep('systolic');
      setSystolic('');
      setDiastolic('');
      speak('Cancelled. Starting over.');
    }
  };

  // Number pad buttons (0-9)
  const numberPadButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0'],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 flex flex-col justify-between">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
          {step === 'systolic' && 'Enter Top Number'}
          {step === 'diastolic' && 'Enter Bottom Number'}
          {step === 'confirm' && 'Please Confirm'}
        </div>

        {/* Voice Button */}
        <button
          onClick={() => {
            if (step === 'systolic') speak('Please enter your top number, the systolic pressure.');
            else if (step === 'diastolic')
              speak('Now, please enter your bottom number, the diastolic pressure.');
            else if (step === 'confirm')
              speak(`Top number ${systolic}, bottom number ${diastolic}. Is this correct?`);
          }}
          className="mx-auto mb-6 p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-transform"
          aria-label="Repeat instruction"
        >
          <Volume2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        {step === 'systolic' || step === 'diastolic' ? (
          <div className="text-center">
            <div className="text-9xl font-bold text-blue-600 dark:text-blue-300 mb-4 font-mono">
              {step === 'systolic' ? systolic || '─' : diastolic || '─'}
            </div>
            <div className="text-xl text-gray-600 dark:text-gray-300">
              {step === 'systolic' ? 'Top Number' : 'Bottom Number'}
            </div>
          </div>
        ) : (
          <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4 font-mono">
              {systolic} / {diastolic}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-300">Is this correct?</div>
          </div>
        )}
      </div>

      {/* Number Pad or Confirm Buttons */}
      {step !== 'confirm' ? (
        <div className="space-y-4 mb-6">
          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {numberPadButtons.map((row, i) => (
              <div key={i} className="contents">
                {row.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberPad(num)}
                    className="h-20 text-4xl font-bold bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    disabled={isSaving}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleBackspace}
              disabled={!systolic && !diastolic}
              className="py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-md text-xl"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={!systolic && step === 'systolic' ? true : !diastolic && step === 'diastolic' ? true : false}
              className="py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-md"
            >
              Next →
            </button>
            <button
              onClick={handleClear}
              disabled={!systolic && !diastolic}
              className="py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-md"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        /* Confirm Buttons */
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleCancel}
            className="py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md text-lg"
            disabled={isSaving}
          >
            <ArrowLeft className="w-6 h-6 mx-auto" />
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSaving}
            className="py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-md text-lg flex items-center justify-center gap-2"
          >
            <Check className="w-6 h-6" />
            Confirm
          </button>
        </div>
      )}

      {/* Status Messages */}
      {isSaving && (
        <div className="text-center text-gray-700 dark:text-gray-300">
          <p className="font-semibold">Saving...</p>
        </div>
      )}
    </div>
  );
}
