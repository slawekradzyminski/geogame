import React, { useState, useCallback, useEffect } from 'react';
import { Language, LanguageQuizContextType, LanguageQuizQuestion, LanguageQuizState, LanguageQuizAnswer } from '../../types/quiz';
import { LanguageQuizContext } from './LanguageQuizContext';
import useCountries from '../../hooks/useCountries';
import { generateNewQuestion } from './languageQuestionGenerator';
import { QUESTIONS_PER_QUIZ } from '../../types/quiz-provider';
import { useTranslation } from 'react-i18next';
import { CountryData } from '../../types/country';

const initialState: LanguageQuizState = {
  currentQuestionNumber: 1,
  score: 0,
  answers: [],
  language: 'en',
  isFinished: false,
};

export const LanguageQuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<LanguageQuizState>(initialState);
  const [question, setQuestion] = useState<LanguageQuizQuestion | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const countriesData = useCountries();
  const { i18n } = useTranslation();

  const createNewQuestion = useCallback(() => {
    if (!countriesData) return;
    // Convert Map to array of CountryData
    const countries = Array.from(countriesData.values()).flat() as CountryData[];
    const newQuestion = generateNewQuestion(countries, usedQuestions);
    if (newQuestion) {
      setQuestion(newQuestion);
    }
  }, [countriesData, usedQuestions]);

  useEffect(() => {
    if (countriesData && !question && !state.isFinished) {
      createNewQuestion();
    }
  }, [countriesData, question, state.isFinished, createNewQuestion]);

  const calculateScore = (selectedAnswers: string[], correctAnswers: string[]): number => {
    if (selectedAnswers.length === 0) return 0;
    
    const correctCount = selectedAnswers.filter(answer => correctAnswers.includes(answer)).length;
    const incorrectCount = selectedAnswers.filter(answer => !correctAnswers.includes(answer)).length;
    
    // Perfect match: full point
    if (correctCount === correctAnswers.length && incorrectCount === 0) {
      return 1;
    }
    
    // Partial credit: based on correct answers minus penalties for wrong answers
    const partialScore = (correctCount / correctAnswers.length) - (incorrectCount * 0.25);
    return Math.max(0, Math.min(0.5, partialScore)); // Cap partial score at 0.5
  };

  const submitAnswer = (selectedAnswers: string[]) => {
    if (!question) return;

    const currentLanguage = i18n.language as Language;
    const correctAnswers = currentLanguage === 'pl' ? question.correctAnswersPL : question.correctAnswersEN;
    const countryName = currentLanguage === 'pl' ? question.namePL : question.nameEN;
    
    const score = calculateScore(selectedAnswers, correctAnswers);
    const isCorrect = score === 1;
    const partiallyCorrect = score > 0 && score < 1;

    const answer: LanguageQuizAnswer = {
      questionId: question.id,
      selectedAnswers,
      correctAnswers,
      isCorrect,
      partiallyCorrect,
      countryName,
    };

    setUsedQuestions((prev) => new Set([...prev, question.id]));

    const nextQuestionNumber = state.currentQuestionNumber + 1;
    const willBeFinished = nextQuestionNumber > QUESTIONS_PER_QUIZ;

    setState((prev) => ({
      ...prev,
      score: prev.score + score,
      answers: [...prev.answers, answer],
      currentQuestionNumber: nextQuestionNumber,
      isFinished: willBeFinished,
    }));

    setQuestion(null);

    if (!willBeFinished) {
      createNewQuestion();
    }
  };

  const nextQuestion = () => {
    if (state.currentQuestionNumber < QUESTIONS_PER_QUIZ) {
      createNewQuestion();
    }
  };

  const setLanguage = (language: Language) => {
    setState((prev) => ({ ...prev, language }));
  };

  const resetQuiz = () => {
    setState(initialState);
    setQuestion(null);
    setUsedQuestions(new Set());
  };

  const value: LanguageQuizContextType = {
    state,
    question,
    setLanguage,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  };

  return <LanguageQuizContext.Provider value={value}>{children}</LanguageQuizContext.Provider>;
}; 
