import React, { useState, useCallback, useEffect } from 'react';
import { Answer, Language, QuizContextType, QuizQuestion, QuizState } from '../types/quiz';
import { CapitalQuizContext } from './CapitalQuizContext';
import useCountries from '../hooks/useCountries';
import useCities from '../hooks/useCities';
import { generateNewQuestion } from '../utils/questionGenerator';
import { QUESTIONS_PER_QUIZ } from '../types/quiz-provider';

const initialState: QuizState = {
  currentQuestionNumber: 1,
  score: 0,
  answers: [],
  language: 'en',
  isFinished: false,
};

export const CapitalQuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<QuizState>(initialState);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const countriesData = useCountries(state.language);
  const citiesData = useCities(state.language);

  const createNewQuestion = useCallback(() => {
    if (!countriesData || !citiesData) return;
    const newQuestion = generateNewQuestion(countriesData, citiesData, usedQuestions);
    if (newQuestion) {
      setQuestion(newQuestion);
    }
  }, [countriesData, citiesData, usedQuestions]);

  useEffect(() => {
    if (countriesData && citiesData && !question && !state.isFinished) {
      createNewQuestion();
    }
  }, [countriesData, citiesData, question, state.isFinished, createNewQuestion]);

  const submitAnswer = (selectedAnswer: string) => {
    if (!question) return;

    const isCorrect = selectedAnswer === question.correctAnswer;

    const answer: Answer = {
      questionId: question.id,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      countryName: question.name,
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

  return <CapitalQuizContext.Provider value={value}>{children}</CapitalQuizContext.Provider>;
}; 