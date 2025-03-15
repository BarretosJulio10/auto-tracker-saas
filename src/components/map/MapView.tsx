
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, X, MapPin, ChevronDown, Filter } from 'lucide-react';
import { TileLayer, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LeafletMapWrapper from './LeafletMapWrapper';
import CustomMarker from './LeafletMarker';

interface Vehicle {
  id: number;
  name: string;
  status: 'active' | 'idle' | 'offline';
  location: string;
  position: [number, number]; // [latitude, longitude]
  lastUpdate: string;
}

interface MapViewProps {
  title?: string;
  onClose?: () => void;
}

const MapView: React.FC<MapViewProps> = ({ title = 'Map View', onClose }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: 'Truck #1', status: 'active', location: 'São Paulo, BR', position: [-23.5505, -46.6333], lastUpdate: '2 min ago' },
    { id: 2, name: 'Van #35', status: 'idle', location: 'Rio de Janeiro, BR', position: [-22.9068, -43.1729], lastUpdate: '15 min ago' },
    { id: 3, name: 'Car #52', status: 'offline', location: 'Belo Horizonte, BR', position: [-19.9167, -43.9345], lastUpdate: '1 hr ago' },
    { id: 4, name: 'Truck #7', status: 'active', location: 'Curitiba, BR', position: [-25.4284, -49.2733], lastUpdate: '5 min ago' },
    { id: 5, name: 'Van #12', status: 'active', location: 'Salvador, BR', position: [-12.9716, -38.5016], lastUpdate: '7 min ago' },
    { id: 6, name: 'Car #23', status: 'idle', location: 'Florianópolis, BR', position: [-27.5945, -48.5477], lastUpdate: '20 min ago' },
  ]);
  
  const [showVehicleList, setShowVehicleList] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  
  // Define center position as the center of Brazil
  const centerPosition: LatLngExpression = [-15.7801, -47.9292];
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'ativo';
      case 'idle': return 'parado';
      default: return 'offline';
    }
  };
  
  const handleVehicleClick = (id: number) => {
    setSelectedVehicle(id);
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle) {
      // This would pan the map to the vehicle in a full implementation
      console.log(`Panning to vehicle ${id} at position ${vehicle.position}`);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="mr-2" size={20} />
          {title}
        </h2>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-muted">
            <Layers size={20} />
          </button>
          
          <button className="p-2 rounded-md hover:bg-muted">
            <Filter size={20} />
          </button>
          
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 rounded-md hover:bg-muted"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex relative">
        {/* Map container */}
        <div className="flex-1 relative">
          <LeafletMapWrapper center={centerPosition} zoom={4} className="h-full w-full">
            <TileLayer
              {...{
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              } as any}
            />
            
            {vehicles.map(vehicle => (
              <CustomMarker 
                key={vehicle.id} 
                position={vehicle.position}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-medium">{vehicle.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(vehicle.status)}`}>
                        {getStatusText(vehicle.status)}
                      </span>
                      <span className="text-xs text-gray-500">{vehicle.lastUpdate}</span>
                    </div>
                    <p className="text-xs mt-1">{vehicle.location}</p>
                  </div>
                </Popup>
              </CustomMarker>
            ))}
          </LeafletMapWrapper>
        </div>
        
        {/* Sidebar with vehicle list */}
        <motion.div 
          initial={{ width: 320 }}
          animate={{ width: showVehicleList ? 320 : 40 }}
          className="h-full bg-white border-l relative flex flex-col"
        >
          <button
            onClick={() => setShowVehicleList(!showVehicleList)}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow-md z-10"
          >
            <ChevronDown
              size={18}
              className={`transform transition-transform ${!showVehicleList ? '-rotate-90' : 'rotate-90'}`}
            />
          </button>
          
          {showVehicleList && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-hidden"
            >
              <div className="p-4 border-b">
                <h3 className="font-medium">Vehicles</h3>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-56px)]">
                {vehicles.map(vehicle => (
                  <div 
                    key={vehicle.id}
                    onClick={() => handleVehicleClick(vehicle.id)}
                    className={`p-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                      selectedVehicle === vehicle.id ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{vehicle.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(vehicle.status)}`}>
                        {getStatusText(vehicle.status)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {vehicle.location}
                    </p>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      Last update: {vehicle.lastUpdate}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MapView;
