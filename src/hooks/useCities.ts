import { useState, useEffect } from 'react';
import { City } from '../types/quiz-data';
import { Language } from '../types/quiz';

const useCities = () => {
  const [citiesMap, setCitiesMap] = useState<Map<Language, City[]>>(new Map());

  useEffect(() => {
    async function loadCities() {
      try {
        const [enCities, plCities] = await Promise.all([
          import(`../data/cities.en.json`),
          import(`../data/cities.pl.json`),
        ]);
        setCitiesMap(new Map<Language, City[]>([
          ['en', enCities.default],
          ['pl', plCities.default],
        ]));
      } catch (error) {
        console.error('Error loading cities data:', error);
      }
    }
    loadCities();
  }, []);

  return citiesMap;
};

export default useCities; 