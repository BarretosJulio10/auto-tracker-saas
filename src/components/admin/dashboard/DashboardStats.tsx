
import React from 'react';
import { Users, Car, Activity, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total de Empresas" 
        value="24" 
        icon={<Users size={24} />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard 
        title="Dispositivos Ativos" 
        value="182" 
        icon={<Car size={24} />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard 
        title="Protocolos de Rastreamento" 
        value="3" 
        icon={<Activity size={24} />}
      />
      <StatCard 
        title="Alertas do Sistema" 
        value="5" 
        icon={<AlertTriangle size={24} />}
        trend={{ value: 2, isPositive: false }}
      />
    </div>
  );
};

export default DashboardStats;
