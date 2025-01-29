require('@testing-library/jest-dom');
require('whatwg-fetch');

// Mock fetch for react-simple-maps
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      type: "FeatureCollection",
      features: []
    })
  })
); 