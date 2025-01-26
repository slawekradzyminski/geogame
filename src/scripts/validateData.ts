import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { CountryData } from '../types/country';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function validateCountry(country: CountryData, locale: string): string[] {
  const errors: string[] = [];

  if (!country.id) errors.push(`Missing id for country: ${country.name}`);
  if (!country.name) errors.push(`Missing name for country: ${country.id}`);
  if (!country.capital) errors.push(`Missing capital for country: ${country.name}`);
  if (!country.flagUrl) errors.push(`Missing flag URL for country: ${country.name}`);
  if (!Array.isArray(country.languages) || country.languages.length === 0) {
    errors.push(`Missing languages for country: ${country.name}`);
  }

  // Validate coordinates if present
  if (country.coordinates) {
    if (!Array.isArray(country.coordinates) || country.coordinates.length !== 2) {
      errors.push(`Invalid coordinates format for country: ${country.name}`);
    } else {
      const [lat, lng] = country.coordinates;
      if (typeof lat !== 'number' || typeof lng !== 'number') {
        errors.push(`Invalid coordinates values for country: ${country.name}`);
      }
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        errors.push(`Coordinates out of range for country: ${country.name}`);
      }
    }
  }

  // Validate flag file exists
  if (country.flagUrl && !country.flagUrl.startsWith('http')) {
    const flagPath = join(__dirname, '..', country.flagUrl);
    if (!existsSync(flagPath)) {
      errors.push(`Flag file not found for country: ${country.name}`);
    }
  } else if (country.flagUrl) {
    try {
      new URL(country.flagUrl);
    } catch {
      errors.push(`Invalid flag URL for country: ${country.name}`);
    }
  }

  return errors;
}

async function validateLocale(locale: string): Promise<number> {
  console.log(`\nValidating ${locale} data...`);
  const filePath = join(__dirname, '..', 'data', `countries.${locale}.json`);
  const rawData = readFileSync(filePath, 'utf-8');
  const countries: CountryData[] = JSON.parse(rawData);

  console.log(`Found ${countries.length} countries`);
  let totalErrors = 0;
  
  countries.forEach(country => {
    const errors = validateCountry(country, locale);
    if (errors.length > 0) {
      console.error(`\nErrors for ${country.name}:`);
      errors.forEach(error => console.error(`- ${error}`));
      totalErrors += errors.length;
    }
  });

  return totalErrors;
}

async function main() {
  try {
    console.log('Starting validation...');
    
    const enErrors = await validateLocale('en');
    const plErrors = await validateLocale('pl');
    const totalErrors = enErrors + plErrors;

    if (totalErrors === 0) {
      console.log('\n✅ All data is valid!');
    } else {
      console.error(`\n❌ Found ${totalErrors} total errors in the data`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 