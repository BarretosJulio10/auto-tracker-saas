
import React from 'react';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import DeviceList from '@/components/admin/DeviceList';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminDevices: React.FC = () => {
  const { toast } = useToast();

  // Sample data - replace with actual data from your backend
  const devices = [
    { 
      id: 1, 
      name: 'J16-Device-001',
      protocol: 'J16',
      lastUpdate: '2 min atrás',
      status: 'online' as const,
      battery: 85,
      signal: 92,
      location: 'São Paulo, BR'
    },
    { 
      id: 2, 
      name: 'EV02-Device-102',
      protocol: 'EV-02',
      lastUpdate: '5 min atrás',
      status: 'idle' as const,
      battery: 45,
      signal: 78,
      location: 'Rio de Janeiro, BR'
    },
    { 
      id: 3, 
      name: 'ST-Device-203',
      protocol: 'Suntech',
      lastUpdate: '1 hora atrás',
      status: 'offline' as const,
      battery: 12,
      signal: 0,
      location: 'Belo Horizonte, BR'
    },
  ];

  const handleAddDevice = () => {
    toast({
      title: "Adicionar Dispositivo",
      description: "Abrindo formulário de registro de dispositivo",
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar variant="admin" />
      
      <main className="flex-1 ml-[260px]">
        <PageTransition>
          <Header 
            title="Gerenciamento de Dispositivos" 
            subtitle="Monitore e gerencie seus dispositivos de rastreamento"
          />
          
          <div className="p-6">
            <div className="mb-6">
              <Button onClick={handleAddDevice} className="flex items-center gap-2">
                <Plus size={16} />
                <span>Adicionar Dispositivo</span>
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <DeviceList devices={devices} />
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default AdminDevices;
