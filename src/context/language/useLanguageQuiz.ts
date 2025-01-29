import { useContext } from 'react';
import { LanguageQuizContext } from './LanguageQuizContext';
import { LanguageQuizContextType } from '../../types/quiz';

export const useLanguageQuiz = (): LanguageQuizContextType => {
  const context = useContext(LanguageQuizContext);
  
  if (!context) {
    throw new Error('useLanguageQuiz must be used within a LanguageQuizProvider');
  }
  
  return context;
}; 