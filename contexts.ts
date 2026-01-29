import { createContext } from 'react';
import { Theme, Language } from './types';

export const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void } | undefined>(undefined);
export const LanguageContext = createContext<{ language: Language; setLanguage: (l: Language) => void; t: (k: string) => string } | undefined>(undefined);
