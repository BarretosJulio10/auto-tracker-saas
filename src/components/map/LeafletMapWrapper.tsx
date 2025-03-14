
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// This component will set the view of the map after it's initialized
const MapController: React.FC<{
  center: LatLngExpression;
  zoom: number;
}> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

interface LeafletMapWrapperProps {
  center: LatLngExpression;
  zoom: number;
  children: React.ReactNode;
  className?: string;
}

const LeafletMapWrapper: React.FC<LeafletMapWrapperProps> = ({
  center,
  zoom,
  children,
  className = 'h-full w-full'
}) => {
  return (
    <div className={className} style={{ height: '100%', width: '100%' }}>
      <MapContainer 
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
        // Fix TypeScript error by passing props in a valid way for react-leaflet
        {...{center, zoom} as any}
      >
        <MapController center={center} zoom={zoom} />
        {children}
      </MapContainer>
    </div>
  );
};

export default LeafletMapWrapper;
