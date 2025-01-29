import React from 'react';
import { render, act } from '@testing-library/react';
import { LanguageQuizProvider } from './LanguageQuizProvider';
import { useLanguageQuiz } from './useLanguageQuiz';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { QUESTIONS_PER_QUIZ } from '../../types/quiz-provider';
import { CountryData } from '../../types/country';

// Initialize i18n for testing
i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources: {
      en: {
        translation: {}
      },
      pl: {
        translation: {}
      }
    },
    fallbackLng: 'en'
  });

// Create mock countries
const mockCountries: CountryData[] = [];
for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
  mockCountries.push({
    id: `test-country-${i}`,
    name: `Test Country ${i}`,
    capital: `Test Capital ${i}`,
    flagUrl: `test-flag-${i}.svg`,
    languages: ['English', 'French'],
    coordinates: [0, 0]
  });
}

// Mock useCountries hook
jest.mock('../../hooks/useCountries', () => ({
  __esModule: true,
  default: () => new Map([
    ['en', mockCountries],
    ['pl', mockCountries.map(country => ({
      ...country,
      name: `Kraj Testowy ${country.id.split('-')[2]}`
    }))]
  ])
}));

const TestComponent = () => {
  const { state, question, submitAnswer } = useLanguageQuiz();
  return (
    <div>
      <div data-testid="question">{JSON.stringify(question)}</div>
      <div data-testid="state">{JSON.stringify(state)}</div>
      <button 
        data-testid="submit" 
        onClick={() => submitAnswer(['English'])}
      >
        Submit
      </button>
    </div>
  );
};

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <LanguageQuizProvider>
        {component}
      </LanguageQuizProvider>
    </I18nextProvider>
  );
};

describe('LanguageQuizProvider', () => {
  it('should initialize with default state', () => {
    // when
    const { getByTestId } = renderWithProviders(<TestComponent />);
    
    // then
    const state = JSON.parse(getByTestId('state').textContent || '{}');
    expect(state).toMatchObject({
      currentQuestionNumber: 1,
      score: 0,
      answers: [],
      isFinished: false
    });
  });

  it('should generate initial question', () => {
    // when
    const { getByTestId } = renderWithProviders(<TestComponent />);
    
    // then
    const question = JSON.parse(getByTestId('question').textContent || 'null');
    expect(question).toMatchObject({
      id: expect.any(String),
      nameEN: expect.any(String),
      namePL: expect.any(String),
      optionsEN: expect.arrayContaining([expect.any(String)]),
      optionsPL: expect.arrayContaining([expect.any(String)]),
      correctAnswersEN: expect.arrayContaining([expect.any(String)]),
      correctAnswersPL: expect.arrayContaining([expect.any(String)]),
    });
  });

  it('should handle answer submission', async () => {
    // when
    const { getByTestId } = renderWithProviders(<TestComponent />);
    
    // then - initial state
    let state = JSON.parse(getByTestId('state').textContent || '{}');
    expect(state.answers).toHaveLength(0);
    
    // when
    await act(async () => {
      getByTestId('submit').click();
    });
    
    // then - after submission
    state = JSON.parse(getByTestId('state').textContent || '{}');
    expect(state.answers).toHaveLength(1);
    expect(state.currentQuestionNumber).toBe(2);
  });

  it('should mark quiz as finished after all questions', async () => {
    // when
    const { getByTestId } = renderWithProviders(<TestComponent />);
    
    // then - submit all questions
    for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
      await act(async () => {
        getByTestId('submit').click();
      });
      // Log state after each submission
      const currentState = JSON.parse(getByTestId('state').textContent || '{}');
      console.log(`After submission ${i + 1}:`, {
        questionNumber: currentState.currentQuestionNumber,
        isFinished: currentState.isFinished
      });
    }
    
    // then
    const state = JSON.parse(getByTestId('state').textContent || '{}');
    console.log('Final state:', state);
    expect(state.isFinished).toBe(true);
  });
}); 
