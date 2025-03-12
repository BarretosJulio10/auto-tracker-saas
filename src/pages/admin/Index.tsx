
import React, { useState } from 'react';
import { Users, AlertTriangle, Activity } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import MapView from '@/components/map/MapView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import DashboardOverview from '@/components/admin/dashboard/DashboardOverview';
import CompaniesOverview from '@/components/admin/dashboard/CompaniesOverview';

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
            <DashboardStats />
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">System Overview</TabsTrigger>
                <TabsTrigger value="companies">Companies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <DashboardOverview 
                  activities={activities} 
                  handleOpenMap={handleOpenMap} 
                />
              </TabsContent>
              
              <TabsContent value="companies">
                <CompaniesOverview companies={companies} />
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
