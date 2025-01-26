import { render, act } from '@testing-library/react';
import { CapitalQuizProvider } from '../CapitalQuizProvider';
import { useCapitalQuiz } from '../../hooks/useCapitalQuiz';
import { QUESTIONS_PER_QUIZ } from '../../types/quiz-provider';

// Mock the hooks and i18n
jest.mock('../../hooks/useCountries');
jest.mock('../../hooks/useCities');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' }
  })
}));

// Mock data
const mockCountriesData = new Map([
  ['en', [
    { id: '1', name: 'Poland', capital: 'Warsaw', flagUrl: 'assets/flags/poland.svg' },
    { id: '2', name: 'Germany', capital: 'Berlin', flagUrl: 'assets/flags/germany.svg' }
  ]],
  ['pl', [
    { id: '1', name: 'Polska', capital: 'Warszawa', flagUrl: 'assets/flags/poland.svg' },
    { id: '2', name: 'Niemcy', capital: 'Berlin', flagUrl: 'assets/flags/germany.svg' }
  ]]
]);

const mockCitiesData = new Map([
  ['en', [
    { id: '1', name: 'Warsaw' },
    { id: '2', name: 'Berlin' },
    { id: '3', name: 'Paris' },
    { id: '4', name: 'Madrid' }
  ]],
  ['pl', [
    { id: '1', name: 'Warszawa' },
    { id: '2', name: 'Berlin' },
    { id: '3', name: 'Paryż' },
    { id: '4', name: 'Madryt' }
  ]]
]);

// Mock the hooks to return our test data
jest.mock('../../hooks/useCountries', () => ({
  __esModule: true,
  default: () => mockCountriesData
}));

jest.mock('../../hooks/useCities', () => ({
  __esModule: true,
  default: () => mockCitiesData
}));

// Test component to access context
const TestComponent = () => {
  const quiz = useCapitalQuiz();
  return (
    <div>
      <div data-testid="score">{quiz.state.score}</div>
      <div data-testid="question-number">{quiz.state.currentQuestionNumber}</div>
      <div data-testid="is-finished">{quiz.state.isFinished.toString()}</div>
      <button onClick={() => quiz.submitAnswer(quiz.question?.correctAnswerEN || '')}>
        Submit Correct Answer
      </button>
      <button onClick={() => quiz.submitAnswer('Wrong Answer')}>
        Submit Wrong Answer
      </button>
      <button onClick={quiz.resetQuiz}>Reset Quiz</button>
    </div>
  );
};

describe('CapitalQuizProvider', () => {
  it('should initialize with default state', () => {
    // given
    const { getByTestId } = render(
      <CapitalQuizProvider>
        <TestComponent />
      </CapitalQuizProvider>
    );

    // then
    expect(getByTestId('score')).toHaveTextContent('0');
    expect(getByTestId('question-number')).toHaveTextContent('1');
    expect(getByTestId('is-finished')).toHaveTextContent('false');
  });

  it('should update score and question number on correct answer', async () => {
    // given
    const { getByText, getByTestId } = render(
      <CapitalQuizProvider>
        <TestComponent />
      </CapitalQuizProvider>
    );

    // when
    await act(async () => {
      getByText('Submit Correct Answer').click();
    });

    // then
    expect(getByTestId('score')).toHaveTextContent('1');
    expect(getByTestId('question-number')).toHaveTextContent('2');
  });

  it('should only update question number on wrong answer', async () => {
    // given
    const { getByText, getByTestId } = render(
      <CapitalQuizProvider>
        <TestComponent />
      </CapitalQuizProvider>
    );

    // when
    await act(async () => {
      getByText('Submit Wrong Answer').click();
    });

    // then
    expect(getByTestId('score')).toHaveTextContent('0');
    expect(getByTestId('question-number')).toHaveTextContent('2');
  });

  it('should finish quiz after maximum questions', async () => {
    // given
    const { getByText, getByTestId } = render(
      <CapitalQuizProvider>
        <TestComponent />
      </CapitalQuizProvider>
    );

    // when
    await act(async () => {
      for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
        getByText('Submit Correct Answer').click();
      }
    });

    // then
    expect(getByTestId('is-finished')).toHaveTextContent('true');
    expect(getByTestId('score')).toHaveTextContent(QUESTIONS_PER_QUIZ.toString());
  });

  it('should reset quiz state', async () => {
    // given
    const { getByText, getByTestId } = render(
      <CapitalQuizProvider>
        <TestComponent />
      </CapitalQuizProvider>
    );

    // when
    await act(async () => {
      getByText('Submit Correct Answer').click();
      getByText('Reset Quiz').click();
    });

    // then
    expect(getByTestId('score')).toHaveTextContent('0');
    expect(getByTestId('question-number')).toHaveTextContent('1');
    expect(getByTestId('is-finished')).toHaveTextContent('false');
  });
}); 