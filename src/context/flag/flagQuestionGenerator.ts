import { Country } from '../../types/quiz-data';
import { QuizQuestion } from '../../types/quiz';
import { getRandomItems } from '../../utils/randomUtil';
import { Language } from '../../types/quiz';

export const generateNewQuestion = (
  countriesData: Map<Language, Country[]>,
  usedQuestions: Set<string>
): QuizQuestion | null => {
  const availableCountries = countriesData.get('en')?.filter(
    (country) => !usedQuestions.has(`flag-${country.id}`) && country.flagUrl
  );

  if (!availableCountries || availableCountries.length === 0) return null;

  const targetCountry = getRandomItems(availableCountries, 1)[0];
  const distractorCountries = availableCountries.filter(
    (country) => country.id !== targetCountry.id
  );

  if (distractorCountries.length < 3) {
    console.error('Not enough distractor countries available');
    return null;
  }

  const targetCountryPL = countriesData.get('pl')?.find(
    (country) => country.id === targetCountry.id
  );

  const selectedDistractors = getRandomItems(distractorCountries, 3);
  const allOptions = [...selectedDistractors, targetCountry];
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

  const optionFlags = shuffledOptions.map(country => 
    `/flags/${country.flagUrl.replace('assets/flags/', '')}`
  );

  const correctFlagIndex = shuffledOptions.findIndex(
    country => country.id === targetCountry.id
  );

  const flagUrl = `/flags/${targetCountry.flagUrl.replace('assets/flags/', '')}`;

  return {
    id: `flag-${targetCountry.id}`,
    nameEN: targetCountry.name,
    namePL: targetCountryPL?.name || targetCountry.name,
    correctAnswerEN: optionFlags[correctFlagIndex],
    correctAnswerPL: optionFlags[correctFlagIndex],
    optionsEN: optionFlags,
    optionsPL: optionFlags,
    flag: flagUrl,
  };
}; 