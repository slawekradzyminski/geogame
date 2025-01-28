import { render, screen, fireEvent } from '../../../test-utils/test-utils';
import { act } from '@testing-library/react';
import { FlagQuizQuestion } from './FlagQuizQuestion';
import { useFlagQuiz } from '../../../context/flag/useFlagQuiz';

// Mock the useFlagQuiz hook
jest.mock('../../../context/flag/useFlagQuiz', () => ({
  useFlagQuiz: jest.fn()
}));

describe('FlagQuizQuestion', () => {
  const mockSubmitAnswer = jest.fn();
  const mockQuestion = {
    id: '1',
    nameEN: 'Poland',
    namePL: 'Polska',
    optionsEN: ['flag1.png', 'flag2.png', 'flag3.png', 'flag4.png'],
    optionsPL: ['flag1.png', 'flag2.png', 'flag3.png', 'flag4.png'],
    correctAnswerEN: 'flag1.png',
    correctAnswerPL: 'flag1.png'
  };

  beforeEach(() => {
    // given
    jest.useFakeTimers();
    (useFlagQuiz as jest.Mock).mockReturnValue({
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

  it('should render loading state when question is not available', () => {
    // given
    (useFlagQuiz as jest.Mock).mockReturnValue({
      state: { currentQuestionNumber: 1 },
      question: null,
      submitAnswer: mockSubmitAnswer
    });

    // when
    render(<FlagQuizQuestion />);

    // then
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('should render question with all options', () => {
    // when
    render(<FlagQuizQuestion />);

    // then
    expect(screen.getByTestId('quiz-question')).toBeInTheDocument();
    expect(screen.getByTestId('question-number')).toHaveTextContent('question 1/10');
    expect(screen.getByTestId('country-name')).toHaveTextContent('Poland');
    
    mockQuestion.optionsEN.forEach((_, index) => {
      expect(screen.getByTestId(`answer-option-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`flag-image-${index}`)).toBeInTheDocument();
    });
  });

  it('should handle answer selection', async () => {
    // when
    render(<FlagQuizQuestion />);
    const firstOption = screen.getByTestId('answer-option-0');
    fireEvent.click(firstOption);

    // then
    expect(firstOption).toHaveClass('flag-option correct');
    
    // when - after delay
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // then
    expect(mockSubmitAnswer).toHaveBeenCalledWith('flag1.png');
  });

  it('should disable all options after selection', () => {
    // when
    render(<FlagQuizQuestion />);
    fireEvent.click(screen.getByTestId('answer-option-0'));

    // then
    mockQuestion.optionsEN.forEach((_, index) => {
      if (index === 0) {
        expect(screen.getByTestId(`answer-option-${index}`)).toHaveClass('flag-option correct');
      } else {
        expect(screen.getByTestId(`answer-option-${index}`)).toHaveClass('flag-option disabled');
      }
    });
  });

  it('should show incorrect answer feedback', () => {
    // when
    render(<FlagQuizQuestion />);
    fireEvent.click(screen.getByTestId('answer-option-1'));

    // then
    expect(screen.getByTestId('answer-option-1')).toHaveClass('flag-option incorrect');
    expect(screen.getByTestId('answer-option-0')).toHaveClass('flag-option correct');
  });
}); 
