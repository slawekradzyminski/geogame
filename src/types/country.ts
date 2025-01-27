export interface CountryData {
  id: string;
  name: string;
  capital: string;
  flagUrl: string;
  languages: string[];
  coordinates?: [number, number];
}

export type QuizType = 
  | 'LANGUAGE_TO_COUNTRY'
  | 'CAPITAL_TO_COUNTRY' 
  | 'FLAG_TO_COUNTRY'
  | 'COUNTRY_TO_LANGUAGE'
  | 'COUNTRY_TO_CAPITAL'
  | 'COUNTRY_TO_FLAG';

export interface QuizQuestion {
  type: QuizType;
  question: string;
  correctAnswer: string;
  options: string[];
} 