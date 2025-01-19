export type QuizMode = 'capital' | 'flag' | 'language';

export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
  questionItem?: string;
  countryId: string;
}

export interface Answer {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizState {
  mode: QuizMode;
  currentQuestion?: Question;
  answers: Answer[];
  score: number;
  totalQuestions: number;
  isGameOver: boolean;
}

export interface QuizContextType extends QuizState {
  startQuiz: (mode: QuizMode) => void;
  submitAnswer: (answer: string) => void;
  resetQuiz: () => void;
} 