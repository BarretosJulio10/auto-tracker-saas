
import React from 'react';
import { MapIcon, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SystemOverviewProps {
  handleOpenMap: () => void;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({ handleOpenMap }) => {
  return (
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
  );
};

export default SystemOverview;
