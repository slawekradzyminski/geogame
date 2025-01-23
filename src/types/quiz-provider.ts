import { ReactNode } from 'react';

export const QUESTIONS_PER_QUIZ = 10;
export const MINIMUM_OPTIONS = 4;

export interface QuizProviderProps {
  children: ReactNode;
} 