'use client';

import React, { useState, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Voice assistant button for voice input and feedback
 * Uses Web Speech API for speech recognition and synthesis
 */

interface VoiceAssistantButtonProps {
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  placeholder?: string;
  label?: string;
  enableRecognition?: boolean;
  enableSynthesis?: boolean;
}

export function VoiceAssistantButton({
  onResult,
  onError,
  placeholder = 'Say something...',
  label = 'Voice Input',
  enableRecognition = true,
  enableSynthesis = true,
}: VoiceAssistantButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthesisSupportRef = useRef('speechSynthesis' in window);
  const recognitionSupportRef = useRef(
    'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  );

  // Initialize speech recognition
  const initRecognition = () => {
    if (!enableRecognition || !recognitionSupportRef.current) {
      toast.error('Speech recognition not supported on this device');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.language = 'en-GH'; // Ghana English
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          setTranscript(transcript);
          onResult?.(transcript);
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) {
        setTranscript(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      const error = event.error;
      console.error('Speech recognition error:', error);
      onError?.(error);
      toast.error(`Speech recognition error: ${error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  };

  // Start listening
  const handleStartListening = () => {
    if (!recognitionRef.current) {
      initRecognition();
    }

    if (recognitionRef.current && recognitionSupportRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  // Stop listening
  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
    }
  };

  // Speak text
  const handleSpeak = (text: string) => {
    if (!enableSynthesis || !synthesisSupportRef.current || !text.trim()) {
      toast.error('Speech synthesis not available');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GH';
    utterance.rate = 0.9; // Slightly slower
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Clear transcript
  const handleClear = () => {
    setTranscript('');
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      {label && <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</p>}

      {/* Transcript Display */}
      {transcript && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-gray-800 dark:text-gray-200">{transcript}</p>
          {isListening && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 animate-pulse">
              Listening...
            </p>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-2">
        {/* Listen Button */}
        {enableRecognition && recognitionSupportRef.current && (
          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              isListening
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            title={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                Listen
              </>
            )}
          </button>
        )}

        {/* Speak Button */}
        {enableSynthesis && synthesisSupportRef.current && transcript && (
          <button
            onClick={() => handleSpeak(transcript)}
            disabled={isSpeaking}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              isSpeaking
                ? 'bg-purple-600 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-400'
            }`}
            title="Play audio"
          >
            <Volume2 className="w-4 h-4" />
            Speak
          </button>
        )}

        {/* Clear Button */}
        {transcript && (
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
            title="Clear"
          >
            Clear
          </button>
        )}
      </div>

      {/* Status Messages */}
      {!recognitionSupportRef.current && enableRecognition && (
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          ⚠️ Speech recognition not supported on this device
        </p>
      )}

      {!synthesisSupportRef.current && enableSynthesis && (
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          ⚠️ Speech synthesis not supported on this device
        </p>
      )}
    </div>
  );
}
