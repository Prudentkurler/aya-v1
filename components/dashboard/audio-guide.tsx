"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AudioGuideProps {
  text: string;
  autoPlay?: boolean;
}

export function AudioGuide({ text, autoPlay = false }: AudioGuideProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.lang = 'en-GB'; // British English (commonly used in Ghana)
      newUtterance.rate = 0.9; // Slightly slower for clarity
      newUtterance.pitch = 1.0;
      
      newUtterance.onend = () => {
        setIsPlaying(false);
      };

      newUtterance.onerror = () => {
        setIsPlaying(false);
      };

      setUtterance(newUtterance);

      // Auto-play if enabled
      if (autoPlay && isEnabled) {
        window.speechSynthesis.speak(newUtterance);
        setIsPlaying(true);
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, autoPlay, isEnabled]);

  const togglePlayback = () => {
    if (!utterance) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (isEnabled) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
    setIsEnabled(!isEnabled);
  };

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleAudio}
        className="gap-2"
      >
        {isEnabled ? (
          <>
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">Audio On</span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4" />
            <span className="hidden sm:inline">Audio Off</span>
          </>
        )}
      </Button>
      
      {isEnabled && (
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayback}
          className="gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Play Guide</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
