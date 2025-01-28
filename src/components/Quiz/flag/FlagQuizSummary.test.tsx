import { render, screen, fireEvent } from '../../../test-utils/test-utils';
import { FlagQuizSummary } from './FlagQuizSummary';
import { useFlagQuiz } from '../../../context/flag/useFlagQuiz';

// Mock the useFlagQuiz hook
jest.mock('../../../context/flag/useFlagQuiz', () => ({
  useFlagQuiz: jest.fn()
}));

describe('FlagQuizSummary', () => {
  const mockResetQuiz = jest.fn();
  const mockAnswers = [
    {
      questionId: '1',
      countryName: 'Poland',
      selectedAnswer: 'flag1.png',
      correctAnswer: 'flag1.png',
      isCorrect: true
    },
    {
      questionId: '2',
      countryName: 'Germany',
      selectedAnswer: 'flag3.png',
      correctAnswer: 'flag2.png',
      isCorrect: false
    }
  ];

  beforeEach(() => {
    // given
    (useFlagQuiz as jest.Mock).mockReturnValue({
      state: {
        score: 1,
        answers: mockAnswers
      },
      resetQuiz: mockResetQuiz
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render summary with correct score and accuracy', () => {
    // when
    render(<FlagQuizSummary />);

    // then
    expect(screen.getByTestId('quiz-summary')).toBeInTheDocument();
    expect(screen.getByTestId('summary-title')).toHaveTextContent('summary');
    expect(screen.getByTestId('final-score')).toHaveTextContent('finalScore: 1/2');
    expect(screen.getByTestId('accuracy')).toHaveTextContent('accuracy: 50.0%');
  });

  it('should render all answer cards', () => {
    // when
    render(<FlagQuizSummary />);

    // then
    mockAnswers.forEach((_, index) => {
      expect(screen.getByTestId(`answer-card-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`selected-flag-${index}`)).toBeInTheDocument();
    });
  });

  it('should show correct answer only for incorrect answers', () => {
    // when
    render(<FlagQuizSummary />);

    // then
    expect(screen.queryByTestId('correct-flag-0')).not.toBeInTheDocument();
    expect(screen.getByTestId('correct-flag-1')).toBeInTheDocument();
  });

  it('should call resetQuiz when play again button is clicked', () => {
    // when
    render(<FlagQuizSummary />);
    fireEvent.click(screen.getByTestId('play-again-button'));

    // then
    expect(mockResetQuiz).toHaveBeenCalledTimes(1);
  });
}); 
