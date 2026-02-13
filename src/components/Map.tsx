// import type { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

interface Point {
  lat: number;
  lng: number;
  label?: string;
  orientation: number;
  colour: string;
}

interface Props {
    points: Point[]
    width?: number;
    height?: number;
    selectedIndex?: number;
}

function Map({ points = [], width = 600, height = 400, selectedIndex = -1}: Props) {
  if (!points || points.length === 0) {
    return <div>No points to display</div>;
  }

  // Find bounds
  const lats = points.map(p => p.lat);
  const lngs = points.map(p => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Add padding
  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;
  const padding = 0.1;

  // Convert lat/lng to screen coordinates
  const toScreen = (lat: number, lng: number) => {
    const x = ((lng - minLng) / lngRange) * width * (1 - 2 * padding) + width * padding;
    const y = height - (((lat - minLat) / latRange) * height * (1 - 2 * padding) + height * padding);
    return { x, y };
  };

return (
    <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
      {/* Grid lines */}
      {[...Array(10)].map((_, i) => (
        <Fragment key={i}>
          <line
            x1={0}
            y1={(i * height) / 10}
            x2={width}
            y2={(i * height) / 10}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <line
            x1={(i * width) / 10}
            y1={0}
            x2={(i * width) / 10}
            y2={height}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        </Fragment>
      ))}

      {/* Points */}
      {points.map((point, i) => {
        const { x, y } = toScreen(point.lat, point.lng);
        const arrowLength = 20;
        const isSelected = i == selectedIndex;
        return (
          <g key={i}>
            <circle 
            cx={x} 
            cy={y} 
            r={isSelected? 10: 7} 
            fill={point.colour}
            stroke={isSelected? "#000" : "none"} 
            strokeWidth={isSelected ? 2 : 0}
            />
            
            {/* Orientation arrow */}
            {point.orientation !== undefined && (
              <line
                x1={x}
                y1={y}
                x2={x + arrowLength * Math.sin((point.orientation * Math.PI) / 180)}
                y2={y - arrowLength * Math.cos((point.orientation * Math.PI) / 180)}
                stroke= {point.colour}
                strokeWidth="1"
                markerEnd={`url(#arrowhead-${i})`}
              />
            )}
            
            {point.label && (
              <text x={x + 8} y={y + 4} fontSize="12" fill="#000">
                {point.label}
              </text>
            )}
          </g>
        );
      })}
      
      {/* Arrow marker definition */}
      <defs> {points.map((point, i)=> (
        <marker
        //   id="arrowhead"
          id = {`arrowhead-${i}`}
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          orient="auto"
        >
          <polygon points="0 0, 10 5, 0 10" fill={point.colour} />
        </marker>
      ))}
      </defs>
    </svg>
  );
}

export default Map

// Usage:
// <MapPoints points={[
//   { lat: 42.28, lng: -83.74, label: "Point 1" },
//   { lat: 42.33, lng: -83.05, label: "Point 2" }
// ]} />