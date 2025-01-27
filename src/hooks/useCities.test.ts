import { renderHook, waitFor } from '@testing-library/react';
import useCities from './useCities';
import { City } from '../types/quiz-data';

const mockCityEN = {
  id: '1',
  name: 'Warsaw',
  country: 'Poland',
  coordinates: [52.2297, 21.0122]
} as City;

const mockCityPL = {
  id: '1',
  name: 'Warszawa',
  country: 'Polska',
  coordinates: [52.2297, 21.0122]
} as City;

jest.mock('../data/cities.en.json', () => [mockCityEN]);
jest.mock('../data/cities.pl.json', () => [mockCityPL]);

describe('useCities', () => {
  it('should load cities data', async () => {
    // given
    const { result } = renderHook(() => useCities());

    // when & then
    await waitFor(() => {
      expect(result.current.size).toBe(2);
    }, { timeout: 10000 });

    const enCities = result.current.get('en');
    const plCities = result.current.get('pl');

    expect(enCities).toBeDefined();
    expect(plCities).toBeDefined();
    expect(enCities?.[0]).toEqual(mockCityEN);
    expect(plCities?.[0]).toEqual(mockCityPL);
  }, 15000);

  it('should handle error when loading data fails', async () => {
    // given
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.resetModules();
    jest.mock('../data/cities.en.json', () => { throw new Error('Failed to load') });
    jest.mock('../data/cities.pl.json', () => { throw new Error('Failed to load') });

    // when
    const { result } = renderHook(() => useCities());

    // then
    await waitFor(() => {
      expect(result.current.size).toBe(0);
    }, { timeout: 10000 });
  }, 15000);
}); 