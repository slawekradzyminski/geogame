import { generateNewQuestion } from './languageQuestionGenerator';
import { CountryData } from '../../types/country';
import { languageTranslations } from '../../data/languageTranslations';

describe('languageQuestionGenerator', () => {
  const mockCountries: CountryData[] = [
    {
      id: 'switzerland',
      name: 'Switzerland',
      capital: 'Bern',
      flagUrl: 'assets/flags/switzerland.svg',
      languages: ['French', 'German', 'Italian', 'Romansh'],
      coordinates: [46.92, 7.47]
    },
    {
      id: 'singapore',
      name: 'Singapore',
      capital: 'Singapore',
      flagUrl: 'assets/flags/singapore.svg',
      languages: ['English', 'Chinese', 'Malay', 'Tamil'],
      coordinates: [1.28, 103.85]
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      capital: 'London',
      flagUrl: 'assets/flags/uk.svg',
      languages: ['English'],
      coordinates: [51.5, -0.08]
    }
  ];

  it('should generate a question with correct structure', () => {
    // when
    const question = generateNewQuestion(mockCountries, new Set());

    // then
    expect(question).toMatchObject({
      id: expect.any(String),
      nameEN: expect.any(String),
      namePL: expect.any(String),
      optionsEN: expect.arrayContaining([expect.any(String)]),
      optionsPL: expect.arrayContaining([expect.any(String)]),
      correctAnswersEN: expect.arrayContaining([expect.any(String)]),
      correctAnswersPL: expect.arrayContaining([expect.any(String)]),
      flag: expect.stringContaining('assets/flags/'),
      coordinates: expect.arrayContaining([expect.any(Number)])
    });
  });

  it('should include all correct answers in options', () => {
    // when
    const question = generateNewQuestion(mockCountries, new Set());

    // then
    question?.correctAnswersEN.forEach(answer => {
      expect(question.optionsEN).toContain(answer);
    });
    question?.correctAnswersPL.forEach(answer => {
      expect(question.optionsPL).toContain(answer);
    });
  });

  it('should translate language names to Polish', () => {
    // given
    const usedQuestions = new Set<string>();
    usedQuestions.add('singapore');
    usedQuestions.add('uk');

    // when - this will force Switzerland to be selected
    const question = generateNewQuestion(mockCountries, usedQuestions);

    // then
    expect(question?.correctAnswersEN).toEqual(['French', 'German', 'Italian', 'Romansh']);
    expect(question?.correctAnswersPL).toEqual(['francuski', 'niemiecki', 'włoski', 'retoromański']);
  });

  it('should return null when all countries have been used', () => {
    // given
    const usedQuestions = new Set(['switzerland', 'singapore', 'uk']);

    // when
    const question = generateNewQuestion(mockCountries, usedQuestions);

    // then
    expect(question).toBeNull();
  });

  it('should not exceed TOTAL_OPTIONS in options array', () => {
    // when
    const question = generateNewQuestion(mockCountries, new Set());

    // then
    expect(question?.optionsEN.length).toBeLessThanOrEqual(4);
    expect(question?.optionsPL.length).toBeLessThanOrEqual(4);
  });

  it('should maintain same order of correct answers in EN and PL', () => {
    // given
    const usedQuestions = new Set<string>();
    usedQuestions.add('singapore');
    usedQuestions.add('uk');

    // when - this will force Switzerland to be selected
    const question = generateNewQuestion(mockCountries, usedQuestions);

    // then
    const correctAnswersEN = question?.correctAnswersEN || [];
    const correctAnswersPL = question?.correctAnswersPL || [];
    expect(correctAnswersEN.length).toBe(correctAnswersPL.length);
    correctAnswersEN.forEach((lang, index) => {
      expect(correctAnswersPL[index]).toBe(languageTranslations[lang]);
    });
  });
}); 
