import { renderHook, waitFor } from '@testing-library/react';
import useCountries from './useCountries';
import { Country } from '../types/quiz-data';

const mockCountryEN = {
  id: '1',
  name: 'Poland',
  capital: 'Warsaw',
  flagUrl: 'assets/flags/pl.svg',
  languages: ['Polish'],
  coordinates: [52.2297, 21.0122]
} as Country;

const mockCountryPL = {
  id: '1',
  name: 'Polska',
  capital: 'Warszawa',
  flagUrl: 'assets/flags/pl.svg',
  languages: ['Polski'],
  coordinates: [52.2297, 21.0122]
} as Country;

jest.mock('../data/countries.en.json', () => [mockCountryEN]);
jest.mock('../data/countries.pl.json', () => [mockCountryPL]);

describe('useCountries', () => {
  it('should load countries data', async () => {
    // given
    const { result } = renderHook(() => useCountries());

    // when & then
    await waitFor(() => {
      expect(result.current.size).toBe(2);
    }, { timeout: 10000 });

    const enCountries = result.current.get('en');
    const plCountries = result.current.get('pl');

    expect(enCountries).toBeDefined();
    expect(plCountries).toBeDefined();
    expect(enCountries?.[0]).toEqual(mockCountryEN);
    expect(plCountries?.[0]).toEqual(mockCountryPL);
  }, 15000);

  it('should handle error when loading data fails', async () => {
    // given
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.resetModules();
    jest.mock('../data/countries.en.json', () => { throw new Error('Failed to load') });
    jest.mock('../data/countries.pl.json', () => { throw new Error('Failed to load') });

    // when
    const { result } = renderHook(() => useCountries());

    // then
    await waitFor(() => {
      expect(result.current.size).toBe(0);
    }, { timeout: 10000 });
  }, 15000);
}); 