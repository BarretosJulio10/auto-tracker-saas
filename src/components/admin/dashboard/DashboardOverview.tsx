
import React from 'react';
import SystemOverview from './SystemOverview';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { Activity } from '@/components/dashboard/ActivityFeed';

interface DashboardOverviewProps {
  activities: Activity[];
  handleOpenMap: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ activities, handleOpenMap }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SystemOverview handleOpenMap={handleOpenMap} />
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden p-6">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
