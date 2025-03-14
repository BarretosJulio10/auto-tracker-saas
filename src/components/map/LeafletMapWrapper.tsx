
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
    <div className={className}>
      <MapContainer 
        className="h-full w-full"
        // Need to provide initial center and zoom as any type to bypass TypeScript error
        // The actual view will be controlled by MapController
        center={center as any}
        zoom={zoom as any}
      >
        <MapController center={center} zoom={zoom} />
        {children}
      </MapContainer>
    </div>
  );
};

export default LeafletMapWrapper;
