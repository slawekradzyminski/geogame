import { generateNewQuestion } from '../capitalQuestionGenerator';
import { Language } from '../../types/quiz';
import { Country, City } from '../../types/quiz-data';

describe('Question Generator', () => {
  let countriesData: Map<Language, Country[]>;
  let citiesData: Map<Language, City[]>;

  beforeAll(async () => {
    // given
    const [countriesEN, countriesPL, citiesEN, citiesPL] = await Promise.all([
      import('../../data/countries.en.json'),
      import('../../data/countries.pl.json'),
      import('../../data/cities.en.json'),
      import('../../data/cities.pl.json')
    ]);

    countriesData = new Map<Language, Country[]>([
      ['en', countriesEN.default],
      ['pl', countriesPL.default]
    ]);

    citiesData = new Map<Language, City[]>([
      ['en', citiesEN.default],
      ['pl', citiesPL.default]
    ]);
  });

  it('should generate a valid question', async () => {
    // given
    const usedQuestions = new Set<string>();

    // when
    const question = generateNewQuestion(countriesData, citiesData, usedQuestions);

    // then
    expect(question).not.toBeNull();
    expect(question?.nameEN).toBeDefined();
    expect(question?.namePL).toBeDefined();
    expect(question?.correctAnswerEN).toBeDefined();
    expect(question?.correctAnswerPL).toBeDefined();
    expect(question?.optionsEN.length).toBe(4);
    expect(question?.optionsPL.length).toBe(4);
    expect(question?.flag).toMatch(/^\/flags\/.+\.svg$/);
  });

  it('should include correct answer in options', async () => {
    // given
    const usedQuestions = new Set<string>();

    // when
    const question = generateNewQuestion(countriesData, citiesData, usedQuestions);

    // then
    expect(question?.optionsEN).toContain(question?.correctAnswerEN);
    expect(question?.optionsPL).toContain(question?.correctAnswerPL);
  });

  it('should not generate duplicate questions', async () => {
    // given
    const usedQuestions = new Set<string>();
    const firstQuestion = generateNewQuestion(countriesData, citiesData, usedQuestions);
    usedQuestions.add(firstQuestion?.id || '');

    // when
    const secondQuestion = generateNewQuestion(countriesData, citiesData, usedQuestions);

    // then
    expect(secondQuestion?.id).not.toBe(firstQuestion?.id);
  });

  it('should return null when all questions are used', async () => {
    // given
    const usedQuestions = new Set<string>();
    
    // when
    while (generateNewQuestion(countriesData, citiesData, usedQuestions)) {
      const question = generateNewQuestion(countriesData, citiesData, usedQuestions);
      if (question) {
        usedQuestions.add(question.id);
      }
    }
    const question = generateNewQuestion(countriesData, citiesData, usedQuestions);

    // then
    expect(question).toBeNull();
  });

  it('should generate matching translations', async () => {
    // given
    const usedQuestions = new Set<string>();
    const [countriesEN, countriesPL] = await Promise.all([
      import('../../data/countries.en.json'),
      import('../../data/countries.pl.json')
    ]);

    // when
    const question = generateNewQuestion(countriesData, citiesData, usedQuestions);
    const enCountry = countriesEN.default.find((c: Country) => c.name === question?.nameEN);
    const plCountry = countriesPL.default.find((c: Country) => c.id === enCountry?.id);

    // then
    expect(question?.nameEN).toBe(enCountry?.name);
    expect(question?.namePL).toBe(plCountry?.name);
    expect(question?.correctAnswerEN).toBe(enCountry?.capital);
    expect(question?.correctAnswerPL).toBe(plCountry?.capital);
  });
}); 