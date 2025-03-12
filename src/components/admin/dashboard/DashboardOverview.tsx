
import React from 'react';
import SystemOverview from './SystemOverview';
import ActivityFeed from '@/components/dashboard/ActivityFeed';

interface DashboardOverviewProps {
  activities: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    icon: React.ReactNode;
    iconBackground: string;
  }>;
  handleOpenMap: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ activities, handleOpenMap }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SystemOverview handleOpenMap={handleOpenMap} />
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
