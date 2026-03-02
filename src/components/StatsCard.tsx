import React from 'react';
import { Battery, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: 'battery' | 'trending' | 'clock' | 'dollar';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  trend, 
  className = '' 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'battery':
        return <Battery className="w-5 h-5 text-blue-600" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-purple-600" />;
      case 'dollar':
        return <DollarSign className="w-5 h-5 text-yellow-600" />;
      default:
        return <Battery className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    return trend.isPositive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {getIcon()}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span className="text-sm text-gray-500">{unit}</span>
        )}
      </div>
      
      {trend && (
        <div className={`mt-2 flex items-center text-sm ${getTrendColor()}`}>
          <span className="font-medium">
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="ml-1 text-gray-500">vs average</span>
        </div>
      )}
    </div>
  );
};
