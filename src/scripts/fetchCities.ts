import axios from 'axios';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { POLISH_CITY_NAMES } from '../data/cityTranslations.js';
import { GEONAMES_USERNAME } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface GeoNamesCity {
  geonameId: number;
  name: string;
  countryCode: string;
  population: number;
}

interface City {
  id: string;
  name: string;
  country: string;
  population: number;
  isCapital: boolean;
}

const CITIES_TO_FETCH = 1000;

async function fetchCities(): Promise<GeoNamesCity[]> {
  try {
    const response = await axios.get('https://secure.geonames.org/searchJSON', {
      params: {
        featureClass: 'P',
        featureCode: ['PPLA', 'PPLC'], // Include capitals and admin centers
        maxRows: CITIES_TO_FETCH,
        orderby: 'population',
        username: GEONAMES_USERNAME,
        style: 'FULL',
        lang: 'en'
      }
    });

    return response.data.geonames;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}

function getPolishName(city: GeoNamesCity): string {
  // Normalize the city name: lowercase, replace spaces with hyphens
  const normalizedName = city.name.toLowerCase().replace(/\s+/g, '-');
  // Only translate cities that have traditional Polish names
  return POLISH_CITY_NAMES[normalizedName] || city.name;
}

async function main() {
  try {
    console.log('Fetching cities...');
    const cities = await fetchCities();
    
    console.log('Processing cities...');
    const citiesEn: City[] = cities.map((city) => ({
      id: city.name.toLowerCase().replace(/\s+/g, '-'),
      name: city.name,
      country: city.countryCode.toLowerCase(),
      population: city.population,
      isCapital: false
    }));

    const citiesPl: City[] = cities.map((city) => ({
      id: city.name.toLowerCase().replace(/\s+/g, '-'),
      name: getPolishName(city),
      country: city.countryCode.toLowerCase(),
      population: city.population,
      isCapital: false
    }));

    // Save to files
    const dataDir = join(__dirname, '..', 'data');
    await writeFile(
      join(dataDir, 'cities.en.json'),
      JSON.stringify(citiesEn, null, 2)
    );
    await writeFile(
      join(dataDir, 'cities.pl.json'),
      JSON.stringify(citiesPl, null, 2)
    );

    console.log('Cities data has been saved!');
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main(); 