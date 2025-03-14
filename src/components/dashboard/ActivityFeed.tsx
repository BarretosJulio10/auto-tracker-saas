
import React from 'react';
import { motion } from 'framer-motion';

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
  iconBackground?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Atividades Recentes</h3>
      
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex gap-4 p-4 bg-white rounded-lg border shadow-sm"
          >
            {activity.icon && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.iconBackground || 'bg-primary/10'}`}>
                {activity.icon}
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{activity.title}</h4>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
