import { createContext } from 'react';
import { QuizContextType } from '../types/quiz';

export const CapitalQuizContext = createContext<QuizContextType | null>(null);
