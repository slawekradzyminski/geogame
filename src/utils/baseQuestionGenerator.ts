import { Country, City } from '../types/quiz-data';
import { QuizQuestion } from '../types/quiz';
import { Language } from '../types/quiz';
import { getRandomItems } from './randomUtil';

export interface QuestionGeneratorConfig {
  prefix: string;
  minOptions: number;
  validateCountry?: (country: Country) => boolean;
}

export abstract class BaseQuestionGenerator {
  protected constructor(
    protected countriesData: Map<Language, Country[]>,
    protected usedQuestions: Set<string>,
    protected config: QuestionGeneratorConfig
  ) {}

  protected getAvailableCountries(): Country[] {
    const countries = this.countriesData.get('en')?.filter(
      (country) => !this.usedQuestions.has(`${this.config.prefix}-${country.id}`)
    ) || [];

    if (this.config.validateCountry) {
      return countries.filter(this.config.validateCountry);
    }

    return countries;
  }

  protected getTargetCountryPL(targetCountry: Country): Country | undefined {
    return this.countriesData.get('pl')?.find(
      (country) => country.id === targetCountry.id
    );
  }

  protected getFlagUrl(flagPath: string): string {
    return `/flags/${flagPath.replace('assets/flags/', '')}`;
  }

  protected createBaseQuestion(
    targetCountry: Country,
    targetCountryPL: Country | undefined,
    correctAnswerEN: string,
    correctAnswerPL: string,
    optionsEN: string[],
    optionsPL: string[]
  ): QuizQuestion {
    return {
      id: `${this.config.prefix}-${targetCountry.id}`,
      nameEN: targetCountry.name,
      namePL: targetCountryPL?.name || targetCountry.name,
      correctAnswerEN,
      correctAnswerPL,
      optionsEN,
      optionsPL,
      flag: this.getFlagUrl(targetCountry.flagUrl),
    };
  }

  abstract generateQuestion(): QuizQuestion | null;
} 