'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FamilyChampionToggle() {
  const [isChampion, setIsChampion] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('isFamilyHealthChampion') === 'true';
    setIsChampion(status);
  }, []);

  const toggle = () => {
    const newStatus = !isChampion;
    localStorage.setItem('isFamilyHealthChampion', String(newStatus));
    setIsChampion(newStatus);
    window.location.reload(); // Refresh to show/hide family dashboard
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggle}
        variant={isChampion ? 'default' : 'outline'}
        size="sm"
        className="shadow-lg"
      >
        <Users className="h-4 w-4 mr-2" />
        {isChampion ? 'Family Champion Mode' : 'Regular Patient Mode'}
      </Button>
    </div>
  );
}
