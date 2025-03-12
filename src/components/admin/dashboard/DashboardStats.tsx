
import React from 'react';
import { Users, Car, Activity, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const DashboardStats: React.FC = () => {
  return (
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
  );
};

export default DashboardStats;
