import { render, screen } from '../../../test-utils/test-utils';
import { act } from '@testing-library/react';
import { CapitalQuiz } from './CapitalQuiz';
import { useCapitalQuiz } from '../../../context/capital/useCapitalQuiz';
import i18n from '../../../i18n';

// Mock the useCapitalQuiz hook
jest.mock('../../../context/capital/useCapitalQuiz', () => ({
  useCapitalQuiz: jest.fn()
}));

describe('CapitalQuiz', () => {
  const mockQuestion = {
    id: '1',
    nameEN: 'Poland',
    namePL: 'Polska',
    optionsEN: ['Warsaw', 'Berlin', 'Prague', 'Budapest'],
    optionsPL: ['Warszawa', 'Berlin', 'Praga', 'Budapeszt'],
    correctAnswerEN: 'Warsaw',
    correctAnswerPL: 'Warszawa',
    flag: 'flag1.png',
    coordinates: [52.2297, 21.0122]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });

  it('should render quiz question when not finished', async () => {
    // given
    (useCapitalQuiz as jest.Mock).mockReturnValue({
      state: {
        isFinished: false,
        currentQuestionNumber: 1
      },
      question: mockQuestion
    });

    // when
    await act(async () => {
      render(<CapitalQuiz />);
    });

    // then
    expect(screen.getByTestId('quiz-question')).toBeInTheDocument();
    expect(screen.queryByTestId('quiz-summary')).not.toBeInTheDocument();
  });

  it('should render quiz summary when finished', async () => {
    // given
    (useCapitalQuiz as jest.Mock).mockReturnValue({
      state: {
        isFinished: true,
        score: 8,
        answers: []
      }
    });

    // when
    await act(async () => {
      render(<CapitalQuiz />);
    });

    // then
    expect(screen.getByTestId('quiz-summary')).toBeInTheDocument();
    expect(screen.queryByTestId('quiz-question')).not.toBeInTheDocument();
  });

  it('should show loading state when question is not available', async () => {
    // given
    (useCapitalQuiz as jest.Mock).mockReturnValue({
      state: {
        isFinished: false,
        currentQuestionNumber: 1
      },
      question: null
    });

    // when
    await act(async () => {
      render(<CapitalQuiz />);
    });

    // then
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('should render with Polish translations', async () => {
    // given
    await act(async () => {
      await i18n.changeLanguage('pl');
    });
    
    (useCapitalQuiz as jest.Mock).mockReturnValue({
      state: {
        isFinished: false,
        currentQuestionNumber: 1
      },
      question: mockQuestion
    });

    // when
    await act(async () => {
      render(<CapitalQuiz />);
    });

    // then
    expect(screen.getByTestId('country-name')).toHaveTextContent('Polska');
  });
}); 
