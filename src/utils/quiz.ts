import { QuizMode, Question } from '../types/quiz';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuestion(mode: QuizMode, countries: any[], language: string): Question {
  const countryIndex = Math.floor(Math.random() * countries.length);
  const country = countries[countryIndex];
  
  // Debug logging
  console.log('Selected country:', country);
  console.log('Country ID:', country.id);
  
  // Get 3 random countries for wrong answers
  const otherCountries = countries.filter((_, index) => index !== countryIndex);
  const wrongAnswers = shuffleArray(otherCountries).slice(0, 3);
  
  let text: string;
  let correctAnswer: string;
  let options: string[];
  let imageUrl: string | undefined;
  let questionItem: string | undefined;

  switch (mode) {
    case 'capital':
      text = `What is the capital of ${country.name}?`;
      correctAnswer = country.capital;
      options = shuffleArray([country.capital, ...wrongAnswers.map(c => c.capital)]);
      questionItem = country.name;
      imageUrl = `/flags/${country.id}.svg`; // Show flag in capital quiz
      break;
    case 'flag':
      text = 'Which country does this flag belong to?';
      correctAnswer = country.name;
      options = shuffleArray([country.name, ...wrongAnswers.map(c => c.name)]);
      imageUrl = `/flags/${country.id}.svg`;
      break;
    case 'language':
      text = `Which country speaks ${country.languages[0]}?`;
      correctAnswer = country.name;
      options = shuffleArray([country.name, ...wrongAnswers.map(c => c.name)]);
      questionItem = country.languages[0];
      break;
    default:
      throw new Error(`Invalid quiz mode: ${mode}`);
  }

  const question = {
    text,
    correctAnswer,
    options,
    imageUrl,
    questionItem,
    countryId: country.id,
  };

  // Debug final question object
  console.log('Generated question:', question);

  return question;
} 