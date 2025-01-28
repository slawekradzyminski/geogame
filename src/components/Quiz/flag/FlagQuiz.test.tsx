import { render, screen } from '../../../test-utils/test-utils';
import { waitFor, act } from '@testing-library/react';
import { FlagQuiz } from './FlagQuiz';
import { useFlagQuiz } from '../../../context/flag/useFlagQuiz';

jest.mock('../../../context/flag/useFlagQuiz');
const mockUseFlagQuiz = useFlagQuiz as jest.Mock;

describe('FlagQuiz', () => {
  beforeEach(() => {
    // given
    mockUseFlagQuiz.mockReturnValue({
      state: {
        isFinished: false,
        currentQuestionNumber: 1,
        score: 0,
        answers: [],
        language: 'en'
      },
      question: {
        id: '1',
        nameEN: 'Poland',
        namePL: 'Polska',
        correctAnswerEN: 'Poland',
        correctAnswerPL: 'Polska',
        optionsEN: ['Poland', 'Germany', 'France', 'Spain'],
        optionsPL: ['Polska', 'Niemcy', 'Francja', 'Hiszpania'],
        flag: 'https://example.com/flag.png'
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render quiz question when not finished', async () => {
    // given
    mockUseFlagQuiz.mockReturnValue({
      state: {
        isFinished: false,
        currentQuestionNumber: 1,
        score: 0,
        answers: [],
        language: 'en'
      },
      question: {
        id: '1',
        nameEN: 'Poland',
        namePL: 'Polska',
        correctAnswerEN: 'Poland',
        correctAnswerPL: 'Polska',
        optionsEN: ['Poland', 'Germany', 'France', 'Spain'],
        optionsPL: ['Polska', 'Niemcy', 'Francja', 'Hiszpania'],
        flag: 'https://example.com/flag.png'
      }
    });

    // when
    await act(async () => {
      render(<FlagQuiz />);
    });

    // then
    await waitFor(() => {
      expect(screen.getByTestId('quiz-question')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('quiz-summary')).not.toBeInTheDocument();
  });

  it('should render quiz summary when finished', async () => {
    // given
    mockUseFlagQuiz.mockReturnValue({
      state: {
        isFinished: true,
        currentQuestionNumber: 10,
        score: 8,
        answers: [
          {
            questionId: '1',
            selectedAnswer: 'Poland',
            correctAnswer: 'Poland',
            isCorrect: true,
            countryName: 'Poland'
          }
        ],
        language: 'en'
      },
      question: {
        id: '1',
        nameEN: 'Poland',
        namePL: 'Polska',
        correctAnswerEN: 'Poland',
        correctAnswerPL: 'Polska',
        optionsEN: ['Poland', 'Germany', 'France', 'Spain'],
        optionsPL: ['Polska', 'Niemcy', 'Francja', 'Hiszpania'],
        flag: 'https://example.com/flag.png'
      }
    });

    // when
    await act(async () => {
      render(<FlagQuiz />);
    });

    // then
    await waitFor(() => {
      expect(screen.getByTestId('quiz-summary')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('quiz-question')).not.toBeInTheDocument();
  });

  it('should render language switcher', async () => {
    // given
    mockUseFlagQuiz.mockReturnValue({
      state: {
        isFinished: false,
        currentQuestionNumber: 1,
        score: 0,
        answers: [],
        language: 'en'
      },
      question: {
        id: '1',
        nameEN: 'Poland',
        namePL: 'Polska',
        correctAnswerEN: 'Poland',
        correctAnswerPL: 'Polska',
        optionsEN: ['Poland', 'Germany', 'France', 'Spain'],
        optionsPL: ['Polska', 'Niemcy', 'Francja', 'Hiszpania'],
        flag: 'https://example.com/flag.png'
      }
    });

    // when
    await act(async () => {
      render(<FlagQuiz />);
    });

    // then
    await waitFor(() => {
      expect(screen.getByLabelText('Language')).toBeInTheDocument();
    });
  });

  it('should render within container and paper', async () => {
    // given
    mockUseFlagQuiz.mockReturnValue({
      state: {
        isFinished: false,
        currentQuestionNumber: 1,
        score: 0,
        answers: [],
        language: 'en'
      },
      question: {
        id: '1',
        nameEN: 'Poland',
        namePL: 'Polska',
        correctAnswerEN: 'Poland',
        correctAnswerPL: 'Polska',
        optionsEN: ['Poland', 'Germany', 'France', 'Spain'],
        optionsPL: ['Polska', 'Niemcy', 'Francja', 'Hiszpania'],
        flag: 'https://example.com/flag.png'
      }
    });

    // when
    await act(async () => {
      render(<FlagQuiz />);
    });

    // then
    expect(screen.getByTestId('flag-quiz-container')).toBeInTheDocument();
    expect(screen.getByTestId('flag-quiz-paper')).toBeInTheDocument();
  });
}); 
