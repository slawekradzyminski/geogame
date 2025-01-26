import { generateNewQuestion } from './flagQuestionGenerator';
import { Language } from '../types/quiz';
import { Country } from '../types/quiz-data';

describe('Flag Question Generator', () => {
  let countriesData: Map<Language, Country[]>;

  beforeAll(async () => {
    // given
    const [countriesEN, countriesPL] = await Promise.all([
      import('../data/countries.en.json'),
      import('../data/countries.pl.json')
    ]);

    countriesData = new Map<Language, Country[]>([
      ['en', countriesEN.default],
      ['pl', countriesPL.default]
    ]);
  });

  test('should generate a valid question', async () => {
    // given
    const usedQuestions = new Set<string>();

    // when
    const question = generateNewQuestion(countriesData, usedQuestions);

    // then
    expect(question).not.toBeNull();
    expect(question?.nameEN).toBeDefined();
    expect(question?.namePL).toBeDefined();
    expect(question?.correctAnswerEN).toMatch(/^\/flags\/.+\.svg$/);
    expect(question?.correctAnswerPL).toMatch(/^\/flags\/.+\.svg$/);
    expect(question?.optionsEN.length).toBe(4);
    expect(question?.optionsPL.length).toBe(4);
    expect(question?.flag).toMatch(/^\/flags\/.+\.svg$/);
  });

  test('should include correct flag in options', async () => {
    // given
    const usedQuestions = new Set<string>();

    // when
    const question = generateNewQuestion(countriesData, usedQuestions);

    // then
    expect(question?.optionsEN).toContain(question?.correctAnswerEN);
    expect(question?.optionsPL).toContain(question?.correctAnswerPL);
  });

  test('should not generate duplicate questions', async () => {
    // given
    const usedQuestions = new Set<string>();
    const firstQuestion = generateNewQuestion(countriesData, usedQuestions);
    if (firstQuestion) {
      usedQuestions.add(firstQuestion.id);
    }

    // when
    const secondQuestion = generateNewQuestion(countriesData, usedQuestions);

    // then
    expect(secondQuestion?.id).not.toBe(firstQuestion?.id);
  });

  test('should return null when all questions are used', async () => {
    // given
    const usedQuestions = new Set<string>();
    
    // when
    while (generateNewQuestion(countriesData, usedQuestions)) {
      const question = generateNewQuestion(countriesData, usedQuestions);
      if (question) {
        usedQuestions.add(question.id);
      }
    }
    const question = generateNewQuestion(countriesData, usedQuestions);

    // then
    expect(question).toBeNull();
  });

  test('should generate matching translations', async () => {
    // given
    const usedQuestions = new Set<string>();
    const [countriesEN, countriesPL] = await Promise.all([
      import('../data/countries.en.json'),
      import('../data/countries.pl.json')
    ]);

    // when
    const question = generateNewQuestion(countriesData, usedQuestions);
    const enCountry = countriesEN.default.find((c: Country) => c.name === question?.nameEN);
    const plCountry = countriesPL.default.find((c: Country) => c.id === enCountry?.id);

    // then
    expect(question?.nameEN).toBe(enCountry?.name);
    expect(question?.namePL).toBe(plCountry?.name);
    expect(question?.flag).toBe(`/flags/${enCountry?.flagUrl.replace('assets/flags/', '')}`);
  });
}); 