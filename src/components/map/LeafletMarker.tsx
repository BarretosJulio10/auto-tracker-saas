
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default marker icons
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Create a default icon
const defaultIcon = new Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MarkerProps {
  position: LatLngExpression;
  children?: React.ReactNode;
}

// This component creates a marker with the default icon
const CustomMarker: React.FC<MarkerProps> = ({ position, children }) => {
  // Use the useMemo hook to create a mutable object that will hold our icon
  const iconInstance = React.useMemo(() => defaultIcon, []);

  return (
    <Marker 
      position={position} 
      // Use spread operator with type assertion to fix TypeScript error
      {...{ icon: iconInstance } as any}
    >
      {children}
    </Marker>
  );
};

export default CustomMarker;
