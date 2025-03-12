
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, Map as MapIcon, Activity, AlertTriangle, Plus, BarChart3 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import MapView from '@/components/map/MapView';
import CompanyList from '@/components/admin/CompanyList';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const { toast } = useToast();

  const activities = [
    {
      id: '1',
      title: 'New company registered',
      description: 'TransportCo Inc. completed registration',
      time: '2 hours ago',
      icon: <Users size={20} className="text-blue-500" />,
      iconBackground: 'bg-blue-100',
    },
    {
      id: '2',
      title: 'Device offline',
      description: 'Suntech device SN-5523 disconnected',
      time: '4 hours ago',
      icon: <AlertTriangle size={20} className="text-amber-500" />,
      iconBackground: 'bg-amber-100',
    },
    {
      id: '3',
      title: 'Protocol update',
      description: 'J16 protocol version updated to v2.3',
      time: '1 day ago',
      icon: <Activity size={20} className="text-green-500" />,
      iconBackground: 'bg-green-100',
    },
  ];

  const companies = [
    { id: 1, name: 'TransportCo Inc.', devices: 45, activeDevices: 40, logo: '🚚' },
    { id: 2, name: 'Fleet Masters', devices: 32, activeDevices: 29, logo: '🚗' },
    { id: 3, name: 'LogiTech Solutions', devices: 76, activeDevices: 63, logo: '🚛' },
    { id: 4, name: 'Swift Transit', devices: 29, activeDevices: 27, logo: '🚐' },
  ];

  const handleAddCompany = () => {
    toast({
      title: "Feature coming soon",
      description: "Company registration will be available in the next update.",
    });
  };

  const handleOpenMap = () => {
    setShowMap(true);
    toast({
      title: "Map opened",
      description: "Showing all active tracking devices",
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar variant="admin" />
      
      <main className="flex-1 ml-[260px]">
        <PageTransition>
          <Header 
            title="Admin Dashboard" 
            subtitle="Overview of your tracking system"
          />
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Companies" 
                value="24" 
                icon={<Users size={24} />}
                trend={{ value: 12, isPositive: true }}
              />
              <StatCard 
                title="Active Devices" 
                value="182" 
                icon={<Car size={24} />}
                trend={{ value: 8, isPositive: true }}
              />
              <StatCard 
                title="Tracking Protocols" 
                value="3" 
                icon={<Activity size={24} />}
              />
              <StatCard 
                title="System Alerts" 
                value="5" 
                icon={<AlertTriangle size={24} />}
                trend={{ value: 2, isPositive: false }}
              />
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">System Overview</TabsTrigger>
                <TabsTrigger value="companies">Companies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">System Overview</h3>
                      <Button 
                        onClick={handleOpenMap}
                        className="flex items-center gap-2"
                      >
                        <MapIcon size={18} />
                        <span>Open Map</span>
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Tracking Protocol Distribution</h4>
                        <div className="h-8 bg-gray-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500 w-[45%] relative">
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                              J16 (45%)
                            </span>
                          </div>
                          <div className="h-full bg-green-500 w-[35%] relative">
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                              EV-02 (35%)
                            </span>
                          </div>
                          <div className="h-full bg-amber-500 w-[20%] relative">
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                              Suntech (20%)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Device Status</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                            <h5 className="text-green-700 font-medium">Online</h5>
                            <p className="text-2xl font-bold text-green-600">142</p>
                          </div>
                          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                            <h5 className="text-amber-700 font-medium">Idle</h5>
                            <p className="text-2xl font-bold text-amber-600">28</p>
                          </div>
                          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                            <h5 className="text-gray-700 font-medium">Offline</h5>
                            <p className="text-2xl font-bold text-gray-600">12</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">System Health</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-green-700 font-medium">All systems operational</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <ActivityFeed activities={activities} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="companies" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Companies Management</h3>
                    <Button 
                      onClick={handleAddCompany} 
                      className="flex items-center gap-2"
                    >
                      <Plus size={16} />
                      <span>Add Company</span>
                    </Button>
                  </div>
                  
                  <CompanyList companies={companies} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageTransition>
      </main>
      
      {showMap && (
        <MapView onClose={() => setShowMap(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
