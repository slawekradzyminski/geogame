const mockCitiesData = new Map([
  ['en', [
    { id: '1', name: 'Warsaw' },
    { id: '2', name: 'Berlin' },
    { id: '3', name: 'Paris' },
    { id: '4', name: 'Madrid' }
  ]],
  ['pl', [
    { id: '1', name: 'Warszawa' },
    { id: '2', name: 'Berlin' },
    { id: '3', name: 'Paryż' },
    { id: '4', name: 'Madryt' }
  ]]
]);

export default () => mockCitiesData; 