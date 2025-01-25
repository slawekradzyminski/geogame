import { useState, useEffect } from 'react';
import { Country } from '../types/quiz-data';
import { Language } from '../types/quiz';

const useCountries = (language: Language) => {
  const [countriesData, setCountriesData] = useState<Country[] | null>(null);

  useEffect(() => {
    async function loadCountries() {
      try {
        const countries = await import(`../data/countries.${language}.json`);
        setCountriesData(countries.default);
      } catch (error) {
        console.error('Error loading countries data:', error);
      }
    }
    loadCountries();
  }, [language]);

  return countriesData;
};

export default useCountries; 