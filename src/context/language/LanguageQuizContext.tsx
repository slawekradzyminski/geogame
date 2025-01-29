import { createContext } from 'react';
import { LanguageQuizContextType } from '../../types/quiz';

export const LanguageQuizContext = createContext<LanguageQuizContextType | null>(null); 
