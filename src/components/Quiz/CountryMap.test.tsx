import { render, screen } from '../../test-utils/test-utils';
import { CountryMap } from './CountryMap';
import 'whatwg-fetch';

const mockGeographyData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
      },
      properties: {
        name: 'Test Country'
      }
    }
  ]
};

describe('CountryMap', () => {
  const originalFetch = global.fetch;
  const originalError = console.error;
  const originalLog = console.log;

  beforeAll(() => {
    // given
    console.error = jest.fn();
    console.log = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockGeographyData),
      } as Response)
    );
  });

  afterAll(() => {
    global.fetch = originalFetch;
    console.error = originalError;
    console.log = originalLog;
  });

  it('should render map with default view', async () => {
    // given
    const expectedProjection = 'standard';

    // when
    render(<CountryMap />);

    // then
    const mapContainer = await screen.findByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveAttribute('data-projection', expectedProjection);
  });

  it('should render map with marker when coordinates provided', async () => {
    // given
    const coordinates: [number, number] = [52.2297, 21.0122];

    // when
    render(<CountryMap coordinates={coordinates} />);

    // then
    const mapContainer = await screen.findByTestId('map-container');
    const marker = await screen.findByTestId('capital-marker');
    expect(mapContainer).toBeInTheDocument();
    expect(marker).toBeInTheDocument();
  });

  it('should switch to Pacific view for coordinates beyond 150/-150 longitude', async () => {
    // given
    const coordinates: [number, number] = [35.6762, 170.1234];
    const expectedProjection = 'pacific';

    // when
    render(<CountryMap coordinates={coordinates} />);

    // then
    const mapContainer = await screen.findByTestId('map-container');
    expect(mapContainer).toHaveAttribute('data-projection', expectedProjection);
  });
}); 
