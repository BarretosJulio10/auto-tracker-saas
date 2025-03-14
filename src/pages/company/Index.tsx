
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
      title: 'Alerta de Status do Veículo #123',
      description: 'Velocidade excedeu 100 km/h em zona restrita',
      time: '30 minutos atrás',
      icon: <Car size={20} className="text-red-500" />,
      iconBackground: 'bg-red-100',
    },
    {
      id: '2',
      title: 'Novo cliente adicionado',
      description: 'Cliente ABC Logística foi adicionado à sua conta',
      time: '2 horas atrás',
      icon: <Users size={20} className="text-blue-500" />,
      iconBackground: 'bg-blue-100',
    },
    {
      id: '3',
      title: 'Manutenção de dispositivo',
      description: 'Dispositivo EV-02 #45 está com manutenção agendada',
      time: '1 dia atrás',
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
            title="Painel da Empresa" 
            subtitle="TransportCo Inc."
          />
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total de Veículos" 
                value="48" 
                icon={<Car size={24} />}
                trend={{ value: 5, isPositive: true }}
              />
              <StatCard 
                title="Clientes Ativos" 
                value="12" 
                icon={<Users size={24} />}
                trend={{ value: 2, isPositive: true }}
              />
              <StatCard 
                title="Rotas Hoje" 
                value="28" 
                icon={<MapPin size={24} />}
                trend={{ value: 10, isPositive: true }}
              />
              <StatCard 
                title="Tempo Médio de Viagem" 
                value="2.5h" 
                icon={<Clock size={24} />}
                trend={{ value: 15, isPositive: false }}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Status da Frota</h3>
                  <button 
                    onClick={() => setShowMap(true)}
                    className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <MapPin size={18} />
                    <span>Ver Mapa</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Status dos Veículos</h4>
                    <div className="h-8 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-green-500 w-[65%] relative">
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          Em movimento (65%)
                        </span>
                      </div>
                      <div className="h-full bg-amber-500 w-[25%] relative">
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          Parado (25%)
                        </span>
                      </div>
                      <div className="h-full bg-gray-500 w-[10%] relative">
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          Desligado (10%)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Principais Rotas</h4>
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
          title="Localização da Frota"
          onClose={() => setShowMap(false)} 
        />
      )}
    </div>
  );
};

export default CompanyDashboard;
