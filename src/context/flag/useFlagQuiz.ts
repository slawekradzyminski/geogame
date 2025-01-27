import { useContext } from 'react';
import { FlagQuizContext } from './FlagQuizContext';
import { QuizContextType } from '../../types/quiz';

export const useFlagQuiz = (): QuizContextType => {
  const context = useContext(FlagQuizContext);
  if (!context) {
    throw new Error('useFlagQuiz must be used within a FlagQuizProvider');
  }
  return context;
}; 