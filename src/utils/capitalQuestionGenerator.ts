import { Country, City } from '../types/quiz-data';
import { QuizQuestion } from '../types/quiz';
import { getRandomItems } from './randomUtil';
import { MINIMUM_OPTIONS } from '../types/quiz-provider';
import { Language } from '../types/quiz';
import { BaseQuestionGenerator } from './baseQuestionGenerator';

export class CapitalQuestionGenerator extends BaseQuestionGenerator {
  constructor(
    countriesData: Map<Language, Country[]>,
    private citiesData: Map<Language, City[]>,
    usedQuestions: Set<string>
  ) {
    super(countriesData, usedQuestions, {
      prefix: 'country',
      minOptions: MINIMUM_OPTIONS
    });
  }

  generateQuestion(): QuizQuestion | null {
    const availableCountries = this.getAvailableCountries();
    if (availableCountries.length === 0) return null;

    const englishCities = this.citiesData.get('en') || [];
    const polishCities = this.citiesData.get('pl') || [];

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

      if (validDistractors.length >= this.config.minOptions - 1) {
        targetCountry = candidateCountry;
        availableDistractorIds = validDistractors;
      }
      attempts++;
    }

    if (!targetCountry || availableDistractorIds.length < this.config.minOptions - 1) {
      console.error('Could not find a country with enough valid distractors');
      return null;
    }

    const targetCountryPL = this.getTargetCountryPL(targetCountry);
    const selectedDistractorIds = getRandomItems(availableDistractorIds, this.config.minOptions - 1);
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

    return this.createBaseQuestion(
      targetCountry,
      targetCountryPL,
      targetCountry.capital,
      targetCountryPL?.capital || targetCountry.capital,
      optionsEN,
      optionsPL
    );
  }
} 