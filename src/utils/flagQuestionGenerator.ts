import { Country } from '../types/quiz-data';
import { QuizQuestion } from '../types/quiz';
import { getRandomItems } from './randomUtil';
import { Language } from '../types/quiz';
import { BaseQuestionGenerator } from './baseQuestionGenerator';

export class FlagQuestionGenerator extends BaseQuestionGenerator {
  constructor(
    countriesData: Map<Language, Country[]>,
    usedQuestions: Set<string>
  ) {
    super(countriesData, usedQuestions, {
      prefix: 'flag',
      minOptions: 4,
      validateCountry: (country) => !!country.flagUrl
    });
  }

  generateQuestion(): QuizQuestion | null {
    const availableCountries = this.getAvailableCountries();
    if (availableCountries.length === 0) return null;

    const targetCountry = getRandomItems(availableCountries, 1)[0];
    const distractorCountries = availableCountries.filter(
      (country) => country.id !== targetCountry.id
    );

    if (distractorCountries.length < this.config.minOptions - 1) {
      console.error('Not enough distractor countries available');
      return null;
    }

    const targetCountryPL = this.getTargetCountryPL(targetCountry);
    const selectedDistractors = getRandomItems(distractorCountries, this.config.minOptions - 1);
    const allOptions = [...selectedDistractors, targetCountry];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    const optionFlags = shuffledOptions.map(country => 
      this.getFlagUrl(country.flagUrl)
    );

    const correctFlagIndex = shuffledOptions.findIndex(
      country => country.id === targetCountry.id
    );

    return this.createBaseQuestion(
      targetCountry,
      targetCountryPL,
      optionFlags[correctFlagIndex],
      optionFlags[correctFlagIndex],
      optionFlags,
      optionFlags
    );
  }
} 