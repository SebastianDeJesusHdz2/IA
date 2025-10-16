import React from 'react';
import { Button } from './ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      data-testid="language-toggle"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'es' ? 'ES' : 'EN'}</span>
    </Button>
  );
};