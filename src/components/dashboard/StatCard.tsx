
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white rounded-lg p-6 shadow-sm border card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-xs font-medium flex items-center",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
