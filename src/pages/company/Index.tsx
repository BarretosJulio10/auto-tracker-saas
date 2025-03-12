
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, MapPin, Activity, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import MapView from '@/components/map/MapView';

const CompanyDashboard: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  const activities = [
    {
      id: '1',
      title: 'Vehicle #123 Status Alert',
      description: 'Speed exceeded 100 km/h in restricted zone',
      time: '30 minutes ago',
      icon: <Car size={20} className="text-red-500" />,
      iconBackground: 'bg-red-100',
    },
    {
      id: '2',
      title: 'New client added',
      description: 'Client ABC Logistics was added to your account',
      time: '2 hours ago',
      icon: <Users size={20} className="text-blue-500" />,
      iconBackground: 'bg-blue-100',
    },
    {
      id: '3',
      title: 'Device maintenance',
      description: 'EV-02 device #45 is due for maintenance',
      time: '1 day ago',
      icon: <Activity size={20} className="text-amber-500" />,
      iconBackground: 'bg-amber-100',
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar variant="company" />
      
      <main className="flex-1 ml-[260px]">
        <PageTransition>
          <Header 
            title="Company Dashboard" 
            subtitle="TransportCo Inc."
          />
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Vehicles" 
                value="48" 
                icon={<Car size={24} />}
                trend={{ value: 5, isPositive: true }}
              />
              <StatCard 
                title="Active Clients" 
                value="12" 
                icon={<Users size={24} />}
                trend={{ value: 2, isPositive: true }}
              />
              <StatCard 
                title="Routes Today" 
                value="28" 
                icon={<MapPin size={24} />}
                trend={{ value: 10, isPositive: true }}
              />
              <StatCard 
                title="Avg. Trip Time" 
                value="2.5h" 
                icon={<Clock size={24} />}
                trend={{ value: 15, isPositive: false }}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Fleet Status</h3>
                  <button 
                    onClick={() => setShowMap(true)}
                    className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <MapPin size={18} />
                    <span>View Map</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Vehicle Status</h4>
                    <div className="h-8 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-green-500 w-[65%] relative">
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          Moving (65%)
                        </span>
                      </div>
                      <div className="h-full bg-amber-500 w-[25%] relative">
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          Idle (25%)
                        </span>
                      </div>
                      <div className="h-full bg-gray-500 w-[10%] relative">
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          Stopped (10%)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Routes</h4>
                    <div className="space-y-2">
                      {[
                        { route: 'São Paulo → Rio de Janeiro', count: 14, color: 'bg-blue-500' },
                        { route: 'São Paulo → Belo Horizonte', count: 8, color: 'bg-green-500' },
                        { route: 'Rio de Janeiro → Vitória', count: 6, color: 'bg-amber-500' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-1/2">
                            <span className="text-sm">{item.route}</span>
                          </div>
                          <div className="w-1/2 pl-2">
                            <div className="flex items-center">
                              <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${(item.count / 14) * 100}%` }}></div>
                              <span className="ml-2 text-sm">{item.count}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <ActivityFeed activities={activities} />
              </div>
            </div>
          </div>
        </PageTransition>
      </main>
      
      {showMap && (
        <MapView 
          title="Fleet Location"
          onClose={() => setShowMap(false)} 
        />
      )}
    </div>
  );
};

export default CompanyDashboard;
