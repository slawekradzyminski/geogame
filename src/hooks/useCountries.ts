import { useState, useEffect } from 'react';
import { Country } from '../types/quiz-data';
import { Language } from '../types/quiz';

const useCountries = () => {
  const [countriesMap, setCountriesMap] = useState<Map<Language, Country[]>>(new Map());

  useEffect(() => {
    async function loadCountries() {
      try {
        const [enCountries, plCountries] = await Promise.all([
          import(`../data/countries.en.json`),
          import(`../data/countries.pl.json`),
        ]);
        setCountriesMap(new Map<Language, Country[]>([
          ['en', enCountries.default],
          ['pl', plCountries.default],
        ]));
      } catch (error) {
        console.error('Error loading countries data:', error);
      }
    }
    loadCountries();
  }, []);

  return countriesMap;
};

export default useCountries; 