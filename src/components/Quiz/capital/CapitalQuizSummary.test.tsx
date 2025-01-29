import { render, screen, fireEvent } from '../../../test-utils/test-utils';
import { CapitalQuizSummary } from './CapitalQuizSummary';
import { useCapitalQuiz } from '../../../context/capital/useCapitalQuiz';

// Mock the useCapitalQuiz hook
jest.mock('../../../context/capital/useCapitalQuiz', () => ({
  useCapitalQuiz: jest.fn()
}));

describe('CapitalQuizSummary', () => {
  const mockResetQuiz = jest.fn();
  const mockAnswers = [
    {
      questionId: '1',
      countryName: 'Poland',
      selectedAnswer: 'Warsaw',
      correctAnswer: 'Warsaw',
      isCorrect: true
    },
    {
      questionId: '2',
      countryName: 'Germany',
      selectedAnswer: 'Paris',
      correctAnswer: 'Berlin',
      isCorrect: false
    }
  ];

  beforeEach(() => {
    // given
    (useCapitalQuiz as jest.Mock).mockReturnValue({
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

  it('should render summary with score and answers', () => {
    // when
    render(<CapitalQuizSummary />);

    // then
    expect(screen.getByTestId('quiz-summary')).toBeInTheDocument();
    expect(screen.getByTestId('quiz-score')).toHaveTextContent('1/2');
    expect(screen.getByTestId('play-again-button')).toBeInTheDocument();
  });

  it('should display correct and incorrect answers', () => {
    // when
    render(<CapitalQuizSummary />);

    // then
    mockAnswers.forEach((answer) => {
      const answerElement = screen.getByText(answer.countryName);
      expect(answerElement).toBeInTheDocument();
      expect(answerElement.closest('.answer-card')).toHaveClass(answer.isCorrect ? 'correct' : 'incorrect');
    });
  });

  it('should call resetQuiz when clicking play again', () => {
    // when
    render(<CapitalQuizSummary />);
    fireEvent.click(screen.getByTestId('play-again-button'));

    // then
    expect(mockResetQuiz).toHaveBeenCalled();
  });

  it('should show translated content when language is Polish', () => {
    // given
    const mockAnswersPL = [
      {
        questionId: '1',
        countryName: 'Polska',
        selectedAnswer: 'Warszawa',
        correctAnswer: 'Warszawa',
        isCorrect: true
      }
    ];

    (useCapitalQuiz as jest.Mock).mockReturnValue({
      state: {
        score: 1,
        answers: mockAnswersPL,
        language: 'pl'
      },
      resetQuiz: mockResetQuiz
    });

    // when
    render(<CapitalQuizSummary />);

    // then
    expect(screen.getByText('Polska')).toBeInTheDocument();
    expect(screen.getByText(/correctAnswer: Warszawa/)).toBeInTheDocument();
  });
}); 
