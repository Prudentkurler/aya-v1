'use client';

import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useEffect } from 'react';

interface FamilyChampionToggleProps {
  isFamilyChampion: boolean;
  onToggle: (value: boolean) => void;
}

export function FamilyChampionToggle({ isFamilyChampion, onToggle }: FamilyChampionToggleProps) {
  useEffect(() => {
    const status = localStorage.getItem('isFamilyHealthChampion') === 'true';
    onToggle(status);
  }, [onToggle]);

  const toggle = () => {
    const newStatus = !isFamilyChampion;
    localStorage.setItem('isFamilyHealthChampion', String(newStatus));
    onToggle(newStatus);
  };

  return (
    <div className="mb-6">
      <Button
        onClick={toggle}
        variant={isFamilyChampion ? 'default' : 'outline'}
        size="sm"
        className="shadow-sm"
      >
        <Users className="h-4 w-4 mr-2" />
        {isFamilyChampion ? 'Switch to Patient View' : 'Switch to Family Champion View'}
      </Button>
    </div>
  );
}
