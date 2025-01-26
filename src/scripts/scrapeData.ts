import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { capitalTranslations, languageTranslations } from '../data/translations';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface RawCountryData {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  flags: {
    png: string;
    svg: string;
  };
  languages: {
    [key: string]: string;
  };
  translations: {
    pol: {
      common: string;
      official: string;
    };
  };
  capitalInfo?: {
    latlng?: [number, number];
  };
}

interface LocalizedCountryData {
  id: string;
  name: string;
  capital: string;
  flagUrl: string;
  languages: string[];
  coordinates?: [number, number];
}

function translateLanguage(language: string): string {
  // First try exact match
  if (languageTranslations[language]) {
    return languageTranslations[language];
  }
  
  // If not found, try case-insensitive match
  const lowerCaseLanguage = language.toLowerCase();
  const key = Object.keys(languageTranslations).find(
    k => k.toLowerCase() === lowerCaseLanguage
  );
  
  if (key) {
    return languageTranslations[key];
  }

  // If still not found, keep original but log it
  console.warn(`No translation found for language: ${language}`);
  return language;
}

function translateCapital(capital: string): string {
  return capitalTranslations[capital] || capital;
}

async function fetchCountries(): Promise<RawCountryData[]> {
  const response = await fetch('https://restcountries.com/v3.1/all');
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
}

async function downloadFlag(url: string, id: string): Promise<string> {
  const flagsDir = join(__dirname, '..', 'assets', 'flags');
  const flagPath = join(flagsDir, `${id}.svg`);
  const relativeFlagPath = `assets/flags/${id}.svg`;

  // Create flags directory if it doesn't exist
  if (!existsSync(flagsDir)) {
    mkdirSync(flagsDir, { recursive: true });
  }

  // Download and save the flag if it doesn't exist
  if (!existsSync(flagPath)) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch flag for ${id}`);
      const svgContent = await response.text();
      writeFileSync(flagPath, svgContent);
    } catch (error) {
      console.warn(`Failed to download flag for ${id}:`, error);
      return url; // Fallback to original URL if download fails
    }
  }

  return relativeFlagPath;
}

async function transformCountry(country: RawCountryData): Promise<{ en: LocalizedCountryData; pl: LocalizedCountryData; } | null> {
  // Skip countries without required data
  if (!country.capital?.length || !country.languages || !country.translations?.pol) {
    return null;
  }

  const id = country.name.common.toLowerCase().replace(/\s+/g, '-');
  const englishLanguages = Object.values(country.languages);
  const polishLanguages = englishLanguages.map(translateLanguage);
  const capital = country.capital[0];
  
  // Download flag and get local path
  const flagUrl = await downloadFlag(country.flags.svg, id);

  // Get coordinates from capitalInfo or undefined if not available
  const coordinates = country.capitalInfo?.latlng;

  return {
    en: {
      id,
      name: country.name.common,
      capital,
      flagUrl,
      languages: englishLanguages,
      coordinates
    },
    pl: {
      id,
      name: country.translations.pol.common,
      capital: translateCapital(capital),
      flagUrl,
      languages: polishLanguages,
      coordinates
    }
  };
}

async function main() {
  try {
    console.log('Fetching countries data...');
    const rawCountries = await fetchCountries();
    
    console.log('Transforming data and downloading flags...');
    const transformPromises = rawCountries.map(country => transformCountry(country));
    const transformedCountries = (await Promise.all(transformPromises))
      .filter((result): result is { en: LocalizedCountryData; pl: LocalizedCountryData } => result !== null);

    const enCountries = transformedCountries.map(c => c.en);
    const plCountries = transformedCountries.map(c => c.pl);

    console.log(`Successfully processed ${enCountries.length} countries`);
    
    const dataDir = join(__dirname, '..', 'data');
    writeFileSync(join(dataDir, 'countries.en.json'), JSON.stringify(enCountries, null, 2));
    writeFileSync(join(dataDir, 'countries.pl.json'), JSON.stringify(plCountries, null, 2));
    console.log(`Data saved to ${dataDir}/countries.{en,pl}.json`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 