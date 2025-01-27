import { render, act } from '@testing-library/react';
import { CapitalQuizProvider } from './CapitalQuizProvider';
import { useCapitalQuiz } from './useCapitalQuiz';
import { QUESTIONS_PER_QUIZ } from '../../types/quiz-provider';
import '@testing-library/jest-dom';

// Mock the hooks to use real data
jest.mock('../../hooks/useCountries', () => ({
  __esModule: true,
  default: jest.fn(() => new Map())
}));

jest.mock('../../hooks/useCities', () => ({
  __esModule: true,
  default: jest.fn(() => new Map())
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' }
  })
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
  beforeAll(async () => {
    const [countriesEN, countriesPL, citiesEN, citiesPL] = await Promise.all([
      import('../../data/countries.en.json'),
      import('../../data/countries.pl.json'),
      import('../../data/cities.en.json'),
      import('../../data/cities.pl.json')
    ]);

    const useCountries = jest.requireMock('../../hooks/useCountries').default;
    const useCities = jest.requireMock('../../hooks/useCities').default;

    useCountries.mockReturnValue(new Map([
      ['en', countriesEN.default],
      ['pl', countriesPL.default]
    ]));

    useCities.mockReturnValue(new Map([
      ['en', citiesEN.default],
      ['pl', citiesPL.default]
    ]));
  });

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