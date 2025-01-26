const mockCountriesData = new Map([
  ['en', [
    { id: '1', name: 'Poland', capital: 'Warsaw', flagUrl: 'poland.svg' },
    { id: '2', name: 'Germany', capital: 'Berlin', flagUrl: 'germany.svg' }
  ]],
  ['pl', [
    { id: '1', name: 'Polska', capital: 'Warszawa', flagUrl: 'poland.svg' },
    { id: '2', name: 'Niemcy', capital: 'Berlin', flagUrl: 'germany.svg' }
  ]]
]);

export default () => mockCountriesData; 