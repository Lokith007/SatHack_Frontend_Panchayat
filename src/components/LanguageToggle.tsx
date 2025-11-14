import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
    </Button>
  );
}
