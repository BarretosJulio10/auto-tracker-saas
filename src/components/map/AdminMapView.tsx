
import React, { useState, useEffect } from 'react';
import { TileLayer, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LeafletMapWrapper from './LeafletMapWrapper';
import CustomMarker from './LeafletMarker';

// Correção para o problema de ícones do Leaflet no React
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para os ícones do Leaflet
useEffect(() => {
  // Para corrigir o problema de ícones do Leaflet no React
  delete L.Icon.Default.prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}, []);

interface Device {
  id: number;
  name: string;
  position: [number, number]; // [latitude, longitude]
  status: 'active' | 'idle' | 'offline';
  lastUpdate: string;
}

const AdminMapView: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Truck #1', position: [-23.5505, -46.6333], status: 'active', lastUpdate: '2 min atrás' },
    { id: 2, name: 'Van #35', position: [-22.9068, -43.1729], status: 'idle', lastUpdate: '15 min atrás' },
    { id: 3, name: 'Car #52', position: [-19.9167, -43.9345], status: 'offline', lastUpdate: '1 hr atrás' },
    { id: 4, name: 'Truck #7', position: [-25.4284, -49.2733], status: 'active', lastUpdate: '5 min atrás' },
    { id: 5, name: 'Van #12', position: [-12.9716, -38.5016], status: 'active', lastUpdate: '7 min atrás' },
    { id: 6, name: 'Car #23', position: [-27.5945, -48.5477], status: 'idle', lastUpdate: '20 min atrás' },
  ]);
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Define center as LatLngExpression to fix type issues
  const centerPosition: LatLngExpression = [-15.7801, -47.9292];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-semibold">Mapa de Rastreamento</h1>
        <p className="text-sm text-muted-foreground">Visualize a localização de todos os dispositivos</p>
      </div>
      
      <div className="flex-1">
        <LeafletMapWrapper center={centerPosition} zoom={4} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {devices.map(device => (
            <CustomMarker 
              key={device.id} 
              position={device.position}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium">{device.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(device.status)}`}>
                      {device.status === 'active' ? 'ativo' : 
                       device.status === 'idle' ? 'parado' : 'offline'}
                    </span>
                    <span className="text-xs text-gray-500">{device.lastUpdate}</span>
                  </div>
                </div>
              </Popup>
            </CustomMarker>
          ))}
        </LeafletMapWrapper>
      </div>
    </div>
  );
};

export default AdminMapView;
