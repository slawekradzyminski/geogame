import { CountryData } from '../../types/country';
import { LanguageQuizQuestion } from '../../types/quiz';
import { shuffleArray } from '../../utils/array';
import { languageTranslations } from '../../data/languageTranslations';

const TOTAL_OPTIONS = 4;

// Helper function to translate languages
const translateLanguages = (languages: string[]): string[] => {
  return languages.map(lang => languageTranslations[lang] || lang);
};

export const generateNewQuestion = (
  countries: CountryData[],
  usedQuestions: Set<string>
): LanguageQuizQuestion | null => {
  // Filter out countries that have been used
  const availableCountries = countries.filter(country => !usedQuestions.has(country.id));
  
  if (availableCountries.length === 0) return null;

  // Select a random country
  const selectedCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];

  // Get all unique languages from all countries (both EN and PL)
  const allLanguagesEN = new Set<string>();
  const allLanguagesPL = new Set<string>();
  
  countries.forEach(country => {
    // Get English language names
    country.languages.forEach((lang: string) => allLanguagesEN.add(lang));
    
    // Get Polish translations
    const translatedLangs = translateLanguages(country.languages);
    translatedLangs.forEach((lang: string) => allLanguagesPL.add(lang));
  });

  // Create options array with correct answers and random wrong answers
  const correctAnswersEN = selectedCountry.languages;
  const correctAnswersPL = translateLanguages(selectedCountry.languages);

  // Get wrong options for both languages
  const wrongOptionsEN = Array.from(allLanguagesEN)
    .filter(lang => !correctAnswersEN.includes(lang));
  const wrongOptionsPL = Array.from(allLanguagesPL)
    .filter(lang => !correctAnswersPL.includes(lang));
  
  // Shuffle wrong options and take enough to fill remaining slots
  const shuffledWrongOptionsEN = shuffleArray(wrongOptionsEN);
  const shuffledWrongOptionsPL = shuffleArray(wrongOptionsPL);
  const neededWrongOptions = Math.max(0, TOTAL_OPTIONS - correctAnswersEN.length);
  
  const selectedWrongOptionsEN = shuffledWrongOptionsEN.slice(0, neededWrongOptions);
  const selectedWrongOptionsPL = shuffledWrongOptionsPL.slice(0, neededWrongOptions);

  // Combine and shuffle all options for both languages
  const allOptionsEN = shuffleArray([...correctAnswersEN, ...selectedWrongOptionsEN]);
  const allOptionsPL = shuffleArray([...correctAnswersPL, ...selectedWrongOptionsPL]);

  return {
    id: selectedCountry.id,
    nameEN: selectedCountry.name,
    namePL: selectedCountry.name,
    optionsEN: allOptionsEN,
    optionsPL: allOptionsPL,
    correctAnswersEN: correctAnswersEN,
    correctAnswersPL: correctAnswersPL,
    flag: selectedCountry.flagUrl,
    coordinates: selectedCountry.coordinates,
  };
}; 
