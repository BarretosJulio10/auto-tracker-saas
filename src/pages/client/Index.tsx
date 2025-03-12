
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin, Clock, Calendar, Battery, Fuel } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import StatCard from '@/components/dashboard/StatCard';
import MapView from '@/components/map/MapView';

const ClientDashboard: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  
  const vehicles = [
    {
      id: 1,
      name: 'Ford F-150',
      status: 'Active',
      location: 'São Paulo, BR',
      lastUpdate: '5 min ago',
      battery: 85,
      fuel: 65,
      image: 'https://placehold.co/90x60',
    },
    {
      id: 2,
      name: 'Toyota Hilux',
      status: 'Idle',
      location: 'Campinas, BR',
      lastUpdate: '25 min ago',
      battery: 92,
      fuel: 40,
      image: 'https://placehold.co/90x60',
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar variant="client" />
      
      <main className="flex-1 ml-[260px]">
        <PageTransition>
          <Header 
            title="Vehicle Dashboard" 
            subtitle="Track and monitor your vehicles"
          />
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Vehicles" 
                value="2" 
                icon={<Car size={24} />}
              />
              <StatCard 
                title="Active Vehicles" 
                value="1" 
                icon={<MapPin size={24} />}
              />
              <StatCard 
                title="Today's Drive Time" 
                value="3.5h" 
                icon={<Clock size={24} />}
              />
              <StatCard 
                title="Next Maintenance" 
                value="15d" 
                icon={<Calendar size={24} />}
              />
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Vehicles</h3>
                <button 
                  onClick={() => setShowMap(true)}
                  className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <MapPin size={18} />
                  <span>View on Map</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {vehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg p-6 shadow-sm border flex items-center space-x-4 card-hover"
                  >
                    <div className="w-[90px] h-[60px] bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{vehicle.name}</h4>
                          <p className="text-sm text-muted-foreground">{vehicle.location}</p>
                          <p className="text-xs text-muted-foreground">Last update: {vehicle.lastUpdate}</p>
                        </div>
                        
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          vehicle.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          vehicle.status === 'Idle' ? 'bg-amber-100 text-amber-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {vehicle.status}
                        </span>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <Battery size={14} className="mr-1" />
                            <span>Battery</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${vehicle.battery}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <Fuel size={14} className="mr-1" />
                            <span>Fuel</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                vehicle.fuel > 60 ? 'bg-green-500' : 
                                vehicle.fuel > 30 ? 'bg-amber-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${vehicle.fuel}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Latest Reports</h3>
              
              <div className="space-y-4">
                {[
                  { 
                    title: 'Weekly Activity Report',
                    description: 'Summary of vehicle activities for the past week',
                    date: 'Generated on Jul 15, 2023',
                    icon: <Calendar size={18} className="text-primary" />
                  },
                  { 
                    title: 'Fuel Consumption Analysis',
                    description: 'Detailed breakdown of fuel usage and efficiency',
                    date: 'Generated on Jul 10, 2023',
                    icon: <Fuel size={18} className="text-primary" />
                  },
                ].map((report, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="p-2 rounded-full bg-primary/10 mr-4">
                      {report.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {report.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </PageTransition>
      </main>
      
      {showMap && (
        <MapView 
          title="Your Vehicles"
          onClose={() => setShowMap(false)} 
        />
      )}
    </div>
  );
};

export default ClientDashboard;
