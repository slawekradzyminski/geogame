import { Country, City } from '../types/quiz-data';
import { QuizQuestion } from '../types/quiz';
import { getRandomItems } from './randomUtil';  
import { MINIMUM_OPTIONS } from '../types/quiz-provider';

export const generateNewQuestion = (
  countriesData: Country[],
  citiesData: City[],
  usedQuestions: Set<string>
): QuizQuestion | null => {
  const availableCountries = countriesData.filter(
    (country) => !usedQuestions.has(`country-${country.id}`)
  );
  if (availableCountries.length === 0) return null;

  const targetCountry = getRandomItems(availableCountries, 1)[0];

  const otherCities = citiesData
    .filter((city) => city.name !== targetCountry.capital)
    .map((city) => city.name);

  const distractors = getRandomItems(otherCities, MINIMUM_OPTIONS - 1);

  const options = [...distractors, targetCountry.capital].sort(() => Math.random() - 0.5);

  const flagUrl = `/flags/${targetCountry.flagUrl.replace('assets/flags/', '')}`;

  return {
    id: `country-${targetCountry.id}`,
    name: targetCountry.name,
    correctAnswer: targetCountry.capital,
    options,
    flag: flagUrl,
  };
}; 