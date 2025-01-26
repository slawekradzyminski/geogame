export type Language = 'en' | 'pl';

export interface QuizQuestion {
  id: string;
  nameEN: string;
  namePL: string;
  correctAnswerEN: string;
  correctAnswerPL: string;
  optionsEN: string[];
  optionsPL: string[];
  flag: string;
  coordinates?: [number, number];
}

export interface Answer {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  countryName: string;  // Add country name for displaying in summary
}

export interface QuizState {
  currentQuestionNumber: number;
  score: number;
  answers: Answer[];
  language: Language;
  isFinished: boolean;
}

export interface QuizContextType {
  state: QuizState;
  question: QuizQuestion | null;
  setLanguage: (language: Language) => void;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
} 