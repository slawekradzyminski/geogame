import React, { useEffect, useState, useCallback } from 'react';
import { Answer, Language, QuizContextType, QuizQuestion, QuizState } from '../types/quiz';
import { CapitalQuizContext } from './CapitalQuizContext';
import { Country } from '../types/quiz-data';
import { QUESTIONS_PER_QUIZ, MINIMUM_OPTIONS } from '../types/quiz-provider';

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
  const [countriesData, setCountriesData] = useState<Country[] | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const countries = await import(`../data/countries.${state.language}.json`);
        setCountriesData(countries.default);
      } catch (error) {
        console.error('Error loading quiz data:', error);
      }
    }
    loadData();
  }, [state.language]);

  const generateNewQuestion = useCallback(() => {
    if (!countriesData) return;

    const availableCountries = countriesData.filter((country: Country) => 
      !usedQuestions.has(`country-${country.id}`)
    );
    if (availableCountries.length === 0) return;

    const targetCountry = getRandomItems(availableCountries, 1)[0];
    const otherCountries = getRandomItems(
      countriesData.filter((c: Country) => c.id !== targetCountry.id),
      MINIMUM_OPTIONS - 1
    );

    const options = [...otherCountries.map((c: Country) => c.capital), targetCountry.capital]
      .sort(() => Math.random() - 0.5);

    const flagUrl = `/flags/${targetCountry.flagUrl.replace('assets/flags/', '')}`;

    setQuestion({
      id: `country-${targetCountry.id}`,
      name: targetCountry.name,
      correctAnswer: targetCountry.capital,
      options,
      flag: flagUrl,
    });
  }, [countriesData, usedQuestions]);

  useEffect(() => {
    if (countriesData && !question && !state.isFinished) {
      generateNewQuestion();
    }
  }, [countriesData, question, state.isFinished, generateNewQuestion]);

  const getRandomItems = <T,>(items: T[], count: number): T[] => {
    const available = [...items];
    const result: T[] = [];
    while (result.length < count && available.length > 0) {
      const index = Math.floor(Math.random() * available.length);
      result.push(available[index]);
      available.splice(index, 1);
    }
    return result;
  };

  const submitAnswer = (selectedAnswer: string) => {
    if (!question) return;

    const isCorrect = selectedAnswer === question.correctAnswer;

    const answer: Answer = {
      questionId: question.id,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      countryName: question.name
    };

    setUsedQuestions(prev => new Set([...prev, question.id]));

    setState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, answer],
      currentQuestionNumber: prev.currentQuestionNumber + 1,
      isFinished: prev.currentQuestionNumber === QUESTIONS_PER_QUIZ,
    }));

    setQuestion(null);
  }

  const nextQuestion = () => {
    if (state.currentQuestionNumber <= QUESTIONS_PER_QUIZ) {
      generateNewQuestion();
    }
  }

  const setLanguage = (language: Language) => {
    setState(prev => ({ ...prev, language }));
  }

  const resetQuiz = () => {
    setState(initialState);
    setQuestion(null);
    setUsedQuestions(new Set());
  }

  const value: QuizContextType = {
    state,
    question,
    setLanguage,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  };

  return (
    <CapitalQuizContext.Provider value={value}>
      {children}
    </CapitalQuizContext.Provider>
  );
} 