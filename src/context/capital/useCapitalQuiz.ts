import { useContext } from 'react';
import { CapitalQuizContext } from './CapitalQuizContext';

export const useCapitalQuiz = () => {
  const context = useContext(CapitalQuizContext);
  if (!context) {
    throw new Error('useCapitalQuiz must be used within a QuizProvider');
  }
  return context;
}; 