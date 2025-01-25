import { useState, useEffect } from 'react';
import { City } from '../types/quiz-data';
import { Language } from '../types/quiz';

const useCities = (language: Language) => {
  const [citiesData, setCitiesData] = useState<City[] | null>(null);

  useEffect(() => {
    async function loadCities() {
      try {
        const cities = await import(`../data/cities.${language}.json`);
        setCitiesData(cities.default);
      } catch (error) {
        console.error('Error loading cities data:', error);
      }
    }
    loadCities();
  }, [language]);

  return citiesData;
};

export default useCities; 