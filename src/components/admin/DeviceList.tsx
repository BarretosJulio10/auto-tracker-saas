
import React from 'react';
import { MoreHorizontal, Activity, Battery, Signal, MapPin, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Device {
  id: number;
  name: string;
  protocol: string;
  lastUpdate: string;
  status: 'online' | 'offline' | 'idle';
  battery: number;
  signal: number;
  location: string;
}

interface DeviceListProps {
  devices: Device[];
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  const { toast } = useToast();
  
  const handleViewDevice = (deviceId: number) => {
    toast({
      title: "Device details",
      description: "Opening device details page",
    });
  };
  
  const handleConfigureDevice = (deviceId: number) => {
    toast({
      title: "Configure device",
      description: "Opening device configuration",
    });
  };
  
  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      case 'idle':
        return 'bg-amber-500';
    }
  };
  
  return (
    <div className="overflow-hidden">
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Device</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Protocol</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Battery</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Signal</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Location</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <motion.tr 
                key={device.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-t hover:bg-muted/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-xs text-muted-foreground">ID: #{device.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    {device.protocol}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                    <span className="text-sm capitalize">{device.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-muted-foreground" />
                    <span>{device.battery}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4 text-muted-foreground" />
                    <span>{device.signal}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{device.location}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDevice(device.id)}>
                        <Activity size={14} className="mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleConfigureDevice(device.id)}>
                        <Settings2 size={14} className="mr-2" />
                        Configure
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {devices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No devices found</p>
        </div>
      )}
    </div>
  );
};

export default DeviceList;

