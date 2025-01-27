import { createContext } from 'react';
import { QuizContextType } from '../../types/quiz';

export const FlagQuizContext = createContext<QuizContextType | null>(null); 