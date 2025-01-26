import React, { useState, useCallback, useEffect } from 'react';
import { Answer, Language, QuizContextType, QuizQuestion, QuizState } from '../types/quiz';
import { FlagQuizContext } from './FlagQuizContext';
import useCountries from '../hooks/useCountries';
import { generateNewQuestion } from '../utils/flagQuestionGenerator';
import { QUESTIONS_PER_QUIZ } from '../types/quiz-provider';
import { useTranslation } from 'react-i18next';
import { useCountriesData } from '../hooks/useCountriesData';
import { QuizProvider } from './QuizProvider';
import { FlagQuestionGenerator } from '../utils/flagQuestionGenerator';

const initialState: QuizState = {
  currentQuestionNumber: 1,
  score: 0,
  answers: [],
  language: 'en',
  isFinished: false,
};

export const FlagQuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialState);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const countriesData = useCountriesData();
  const { i18n } = useTranslation();

  const generateQuestion = (usedQuestions: Set<string>) => {
    if (!countriesData) return null;
    const generator = new FlagQuestionGenerator(countriesData, usedQuestions);
    return generator.generateQuestion();
  };

  const createNewQuestion = useCallback(() => {
    if (!countriesData) return;
    const newQuestion = generateQuestion(usedQuestions);
    if (newQuestion) {
      setQuestion(newQuestion);
    }
  }, [countriesData, usedQuestions]);

  useEffect(() => {
    if (countriesData && !question && !state.isFinished) {
      createNewQuestion();
    }
  }, [countriesData, question, state.isFinished, createNewQuestion]);

  const submitAnswer = (selectedAnswer: string) => {
    if (!question) return;

    const currentLanguage = i18n.language as Language;
    const isCorrect = selectedAnswer === (currentLanguage === 'pl' ? question.correctAnswerPL : question.correctAnswerEN);
    const countryName = currentLanguage === 'pl' ? question.namePL : question.nameEN;
    const correctAnswer = currentLanguage === 'pl' ? question.correctAnswerPL : question.correctAnswerEN;

    const answer: Answer = {
      questionId: question.id,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      countryName,
    };

    setUsedQuestions((prev) => new Set([...prev, question.id]));

    setState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, answer],
      currentQuestionNumber: prev.currentQuestionNumber + 1,
      isFinished: prev.currentQuestionNumber >= QUESTIONS_PER_QUIZ,
    }));

    setQuestion(null);
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

  const value: QuizContextType = {
    state,
    question,
    setLanguage,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  };

  return (
    <QuizProvider generateQuestion={generateQuestion}>
      <FlagQuizContext.Provider value={value}>
        {children}
      </FlagQuizContext.Provider>
    </QuizProvider>
  );
}; 