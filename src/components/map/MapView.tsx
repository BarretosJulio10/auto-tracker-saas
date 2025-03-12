
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers, X, MapPin, ChevronDown, Filter } from 'lucide-react';

const DUMMY_VEHICLES = [
  { id: 1, name: 'Truck #1', status: 'active', location: 'São Paulo, BR', lastUpdate: '2 min ago' },
  { id: 2, name: 'Van #35', status: 'idle', location: 'Rio de Janeiro, BR', lastUpdate: '15 min ago' },
  { id: 3, name: 'Car #52', status: 'offline', location: 'Belo Horizonte, BR', lastUpdate: '1 hr ago' },
  { id: 4, name: 'Truck #7', status: 'active', location: 'Curitiba, BR', lastUpdate: '5 min ago' },
];

interface MapViewProps {
  title?: string;
  onClose?: () => void;
}

const MapView: React.FC<MapViewProps> = ({ title = 'Map View', onClose }) => {
  const [vehicles, setVehicles] = useState(DUMMY_VEHICLES);
  const [showVehicleList, setShowVehicleList] = useState(true);
  
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Simulate map loading
  useEffect(() => {
    if (mapRef.current) {
      // In a real implementation, this would initialize a map library like Google Maps, Leaflet, etc.
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div class="w-full h-full flex items-center justify-center bg-slate-100">
          <div class="text-center">
            <p class="text-lg font-medium mb-2">Interactive Map</p>
            <p class="text-sm text-muted-foreground">Real map integration would go here</p>
          </div>
        </div>
      `;
    }
  }, []);
  
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
          <div ref={mapRef} className="absolute inset-0"></div>
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
              className="flex-1 p-4 overflow-y-auto"
            >
              <h3 className="font-medium mb-3">Vehicles</h3>
              
              <div className="space-y-2">
                {vehicles.map(vehicle => (
                  <div 
                    key={vehicle.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{vehicle.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        vehicle.status === 'active' ? 'bg-green-100 text-green-800' : 
                        vehicle.status === 'idle' ? 'bg-amber-100 text-amber-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {vehicle.status}
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
