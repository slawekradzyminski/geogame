import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { useTranslation } from 'react-i18next';
import './CountryMap.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CONTINENTS = [
  { name: "northAmerica", coordinates: [40, -100] },
  { name: "southAmerica", coordinates: [-20, -60] },
  { name: "europe", coordinates: [50, 10] },
  { name: "africa", coordinates: [0, 20] },
  { name: "asia", coordinates: [45, 90] },
  { name: "oceania", coordinates: [-20, 130] },
] as const;

interface CountryMapProps {
  coordinates?: [number, number];
}

interface ProjectionConfig {
  rotate: [number, number, number];
  scale: number;
  center: [number, number];
}

export const CountryMap = ({ coordinates }: CountryMapProps) => {
  const { t } = useTranslation(['quiz']);

  // Determine if we need Pacific view based on coordinates
  const needsPacificView = coordinates && (coordinates[1] > 150 || coordinates[1] < -150);
  
  const projectionConfig: ProjectionConfig = {
    rotate: needsPacificView ? [-150, 0, 0] : [0, 0, 0],
    scale: 170,
    center: [0, 0]
  };

  return (
    <div className="map-container">
      <ComposableMap
        projectionConfig={projectionConfig}
        width={800}
        height={300}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth={0.5}
                className="map-geography"
              />
            ))
          }
        </Geographies>
        {CONTINENTS.map(({ name, coordinates: [lat, lng] }) => (
          <Annotation
            key={name}
            subject={[lng, lat]}
            dx={0}
            dy={0}
            connectorProps={{}}
          >
            <text
              textAnchor="middle"
              alignmentBaseline="middle"
              className="continent-label"
            >
              {t(`continents.${name}`)}
            </text>
          </Annotation>
        ))}
        {coordinates && (
          <Marker coordinates={[coordinates[1], coordinates[0]]}>
            <g>
              <circle
                r={6}
                className="capital-marker-outer"
              />
              <circle
                r={3}
                className="capital-marker-inner"
              />
            </g>
          </Marker>
        )}
      </ComposableMap>
    </div>
  );
}; 