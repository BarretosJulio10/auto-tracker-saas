
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import AdminMapView from '@/components/map/AdminMapView';

const AdminMapPage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar variant="admin" />
      
      <main className="flex-1 ml-[260px]">
        <PageTransition>
          <Header 
            title="Mapa de Rastreamento" 
            subtitle="Visualize e monitore todos os dispositivos em tempo real"
          />
          
          <div className="p-6 h-[calc(100vh-5rem)]">
            <AdminMapView />
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default AdminMapPage;
