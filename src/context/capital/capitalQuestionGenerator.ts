import { Country, City } from '../../types/quiz-data';
import { QuizQuestion } from '../../types/quiz';
import { getRandomItems } from '../../utils/randomUtil';  
import { MINIMUM_OPTIONS } from '../../types/quiz-provider';
import { Language } from '../../types/quiz';

export const generateNewQuestion = (
  countriesData: Map<Language, Country[]>,
  citiesData: Map<Language, City[]>,
  usedQuestions: Set<string>
): QuizQuestion | null => {
  const availableCountries = countriesData.get('en')?.filter(
    (country) => !usedQuestions.has(`country-${country.id}`)
  );
  if (!availableCountries || availableCountries.length === 0) return null;

  const englishCities = citiesData.get('en') || [];
  const polishCities = citiesData.get('pl') || [];

  let targetCountry: Country | null = null;
  let availableDistractorIds: string[] = [];
  let attempts = 0;
  const maxAttempts = 10;

  while (!targetCountry && attempts < maxAttempts) {
    const candidateCountry = getRandomItems(availableCountries, 1)[0];
    const candidateDistractors = englishCities
      .filter((city) => city.name !== candidateCountry.capital)
      .map((city) => city.id);

    const validDistractors = candidateDistractors.filter(
      (id) => polishCities.some((city) => city.id === id && city.name)
    );

    if (validDistractors.length >= MINIMUM_OPTIONS - 1) {
      targetCountry = candidateCountry;
      availableDistractorIds = validDistractors;
    }
    attempts++;
  }

  if (!targetCountry || availableDistractorIds.length < MINIMUM_OPTIONS - 1) {
    console.error('Could not find a country with enough valid distractors');
    return null;
  }

  const targetCountryPL = countriesData.get('pl')?.find(
    (country) => country.id === targetCountry.id
  );

  const selectedDistractorIds = getRandomItems(availableDistractorIds, MINIMUM_OPTIONS - 1);
  const allOptionIds = [...selectedDistractorIds, 'correct'];
  const shuffledOptionIds = allOptionIds.sort(() => Math.random() - 0.5);

  const optionsEN = shuffledOptionIds.map(id => 
    id === 'correct' ? targetCountry.capital : 
    englishCities.find(city => city.id === id)?.name || ''
  );
  
  const optionsPL = shuffledOptionIds.map(id => 
    id === 'correct' ? targetCountryPL?.capital || '' : 
    polishCities.find(city => city.id === id)?.name || ''
  );

  const flagUrl = `/flags/${targetCountry.flagUrl.replace('assets/flags/', '')}`;

  return {
    id: `country-${targetCountry.id}`,
    nameEN: targetCountry.name,
    namePL: targetCountryPL?.name || targetCountry.name,
    correctAnswerEN: targetCountry.capital,
    correctAnswerPL: targetCountryPL?.capital || targetCountry.capital,
    optionsEN,
    optionsPL,
    flag: flagUrl,
    coordinates: targetCountry.coordinates
  };
}; 