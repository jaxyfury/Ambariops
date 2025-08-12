
'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@amberops/ui/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')}>Español</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('fr')}>Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('de')}>Deutsch</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ja')}>日本語</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('zh')}>中文</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ru')}>Русский</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('hi')}>हिन्दी</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ar')}>العربية</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
