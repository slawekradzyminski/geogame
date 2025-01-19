import { createContext, useContext, useCallback, useState, ReactNode, useEffect } from 'react';
import { QuizContextType, QuizMode, Question, Answer } from '../types/quiz';
import { useTranslation } from 'react-i18next';
import { generateQuestion } from '../utils/quiz';
import { CountryData } from '../types/country';

const QUESTIONS_PER_GAME = 10;

const initialState: QuizContextType = {
  mode: 'capital',
  answers: [],
  score: 0,
  totalQuestions: QUESTIONS_PER_GAME,
  isGameOver: false,
  startQuiz: () => {},
  submitAnswer: () => {},
  resetQuiz: () => {},
};

const QuizContext = createContext<QuizContextType>(initialState);

interface QuizProviderProps {
  children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const { i18n } = useTranslation();
  const [state, setState] = useState(initialState);
  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      console.log('Attempting to load countries...');
      try {
        console.log(`Fetching from: /data/countries.${i18n.language}.json`);
        const response = await fetch(`/data/countries.${i18n.language}.json`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to load countries data: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Loaded ${data.length} countries`);
        setCountries(data);
      } catch (error) {
        console.error('Failed to load countries:', error);
      }
    };

    loadCountries();
  }, [i18n.language]);

  const generateQuestionForMode = useCallback((mode: QuizMode): Question => {
    console.log('Generating question for mode:', mode);
    console.log('Available countries:', countries.length);
    if (countries.length === 0) {
      throw new Error('Countries data not loaded');
    }
    return generateQuestion(mode, countries, i18n.language);
  }, [countries, i18n.language]);

  const startQuiz = useCallback((mode: QuizMode) => {
    console.log('Starting quiz with mode:', mode);
    setState(prev => ({
      ...prev,
      mode,
      answers: [],
      score: 0,
      isGameOver: false,
      currentQuestion: generateQuestionForMode(mode),
    }));
  }, [generateQuestionForMode]);

  const submitAnswer = useCallback((selectedAnswer: string) => {
    if (!state.currentQuestion) return;

    const isCorrect = selectedAnswer === state.currentQuestion.correctAnswer;
    const newAnswer: Answer = {
      question: state.currentQuestion,
      selectedAnswer,
      isCorrect,
      timestamp: Date.now(),
    };

    const newAnswers = [...state.answers, newAnswer];
    const isGameOver = newAnswers.length >= state.totalQuestions;

    setState(prev => ({
      ...prev,
      answers: newAnswers,
      score: prev.score + (isCorrect ? 1 : 0),
      isGameOver,
      currentQuestion: isGameOver ? undefined : generateQuestionForMode(prev.mode),
    }));
  }, [state.currentQuestion, state.answers, state.totalQuestions, generateQuestionForMode]);

  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        startQuiz,
        submitAnswer,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}; 