import { render, screen, fireEvent } from '../../../test-utils/test-utils';
import { act } from '@testing-library/react';
import { CapitalQuizQuestion } from './CapitalQuizQuestion';
import { useCapitalQuiz } from '../../../context/capital/useCapitalQuiz';

// Mock the useCapitalQuiz hook
jest.mock('../../../context/capital/useCapitalQuiz', () => ({
  useCapitalQuiz: jest.fn()
}));

describe('CapitalQuizQuestion', () => {
  const mockSubmitAnswer = jest.fn();
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
    // given
    jest.useFakeTimers();
    (useCapitalQuiz as jest.Mock).mockReturnValue({
      state: {
        currentQuestionNumber: 1,
        isFinished: false
      },
      question: mockQuestion,
      submitAnswer: mockSubmitAnswer
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render loading state when question is not available', async () => {
    // given
    (useCapitalQuiz as jest.Mock).mockReturnValue({
      state: { currentQuestionNumber: 1 },
      question: null,
      submitAnswer: mockSubmitAnswer
    });

    // when
    render(<CapitalQuizQuestion />);

    // then
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('should render question with all options', async () => {
    // when
    render(<CapitalQuizQuestion />);

    // then
    expect(screen.getByTestId('quiz-question')).toBeInTheDocument();
    expect(screen.getByTestId('question-number')).toHaveTextContent('question 1/10');
    expect(screen.getByTestId('country-name')).toHaveTextContent('Poland');
    expect(screen.getByTestId('country-flag')).toHaveAttribute('src', 'flag1.png');
    
    mockQuestion.optionsEN.forEach((_, index) => {
      expect(screen.getByTestId(`answer-option-${index}`)).toBeInTheDocument();
    });
  });

  it('should handle answer selection', async () => {
    // when
    render(<CapitalQuizQuestion />);
    const firstOption = screen.getByTestId('answer-option-0');
    fireEvent.click(firstOption);

    // then
    expect(firstOption).toHaveClass('answer-button correct');
    
    // when - after delay
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    // then
    expect(mockSubmitAnswer).toHaveBeenCalledWith('Warsaw');
  });

  it('should disable all options after selection', async () => {
    // when
    render(<CapitalQuizQuestion />);
    fireEvent.click(screen.getByTestId('answer-option-0'));

    // then
    mockQuestion.optionsEN.forEach((_, index) => {
      if (index === 0) {
        expect(screen.getByTestId(`answer-option-${index}`)).toHaveClass('answer-button correct');
      } else {
        expect(screen.getByTestId(`answer-option-${index}`)).toHaveClass('answer-button disabled');
      }
    });
  });

  it('should show incorrect answer feedback', async () => {
    // when
    render(<CapitalQuizQuestion />);
    fireEvent.click(screen.getByTestId('answer-option-1'));

    // then
    expect(screen.getByTestId('answer-option-1')).toHaveClass('answer-button wrong');
    expect(screen.getByTestId('answer-option-0')).toHaveClass('answer-button correct');
  });
}); 

