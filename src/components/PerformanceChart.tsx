import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { EquipmentReading } from '../types/equipment';

interface PerformanceChartProps {
  readings: EquipmentReading[];
  title: string;
  type: 'efficiency' | 'power' | 'temperature' | 'approach';
  height?: number;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  readings,
  title,
  type,
  height = 300
}) => {
  const chartData = readings.map(reading => {
    const baseData = {
      timestamp: reading.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: reading.timestamp.toLocaleDateString()
    };

    switch (type) {
      case 'efficiency':
        if ('efficiency' in reading) {
          return {
            ...baseData,
            efficiency: (reading as any).efficiency * 100,
            target: 85
          };
        }
        break;
      case 'power':
        return {
          ...baseData,
          power: reading.value,
          average: readings.reduce((sum, r) => sum + r.value, 0) / readings.length
        };
      case 'temperature':
        if ('chilledWaterSupplyTemp' in reading) {
          const chiller = reading as any;
          return {
            ...baseData,
            supply: chiller.chilledWaterSupplyTemp,
            return: chiller.chilledWaterReturnTemp,
            condenserSupply: chiller.condenserWaterSupplyTemp,
            condenserReturn: chiller.condenserWaterReturnTemp
          };
        } else if ('inletWaterTemp' in reading) {
          const tower = reading as any;
          return {
            ...baseData,
            inlet: tower.inletWaterTemp,
            outlet: tower.outletWaterTemp,
            wetBulb: tower.ambientWetBulbTemp
          };
        } else if ('inletWaterTemp' in reading) {
          const boiler = reading as any;
          return {
            ...baseData,
            inlet: boiler.inletWaterTemp,
            outlet: boiler.outletWaterTemp,
            stack: boiler.stackTemp
          };
        }
        break;
      case 'approach':
        if ('approach' in reading) {
          return {
            ...baseData,
            approach: (reading as any).approach,
            target: 5
          };
        }
        break;
    }
    return baseData;
  }).filter(Boolean);

  const renderChart = () => {
    switch (type) {
      case 'efficiency':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#666"
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#007AFF"
              strokeWidth={2}
              dot={{ fill: '#007AFF', r: 3 }}
              name="Efficiency (%)"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#34C759"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target (85%)"
            />
          </LineChart>
        );

      case 'power':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="power"
              stroke="#007AFF"
              fill="#007AFF"
              fillOpacity={0.3}
              strokeWidth={2}
              name="Power (kW)"
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#FF9500"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Average"
            />
          </AreaChart>
        );

      case 'temperature':
        const hasChillerData = chartData.some(d => 'supply' in d);
        const hasTowerData = chartData.some(d => 'inlet' in d && 'wetBulb' in d);
        const hasBoilerData = chartData.some(d => 'inlet' in d && 'stack' in d);

        if (hasChillerData) {
          return (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="supply"
                stroke="#007AFF"
                strokeWidth={2}
                dot={{ fill: '#007AFF', r: 2 }}
                name="Chilled Water Supply (°F)"
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#FF9500"
                strokeWidth={2}
                dot={{ fill: '#FF9500', r: 2 }}
                name="Chilled Water Return (°F)"
              />
              <Line
                type="monotone"
                dataKey="condenserSupply"
                stroke="#34C759"
                strokeWidth={2}
                dot={{ fill: '#34C759', r: 2 }}
                name="Condenser Supply (°F)"
              />
              <Line
                type="monotone"
                dataKey="condenserReturn"
                stroke="#FF3B30"
                strokeWidth={2}
                dot={{ fill: '#FF3B30', r: 2 }}
                name="Condenser Return (°F)"
              />
            </LineChart>
          );
        } else if (hasTowerData) {
          return (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="inlet"
                stroke="#007AFF"
                strokeWidth={2}
                dot={{ fill: '#007AFF', r: 2 }}
                name="Inlet Water (°F)"
              />
              <Line
                type="monotone"
                dataKey="outlet"
                stroke="#34C759"
                strokeWidth={2}
                dot={{ fill: '#34C759', r: 2 }}
                name="Outlet Water (°F)"
              />
              <Line
                type="monotone"
                dataKey="wetBulb"
                stroke="#FF9500"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ fill: '#FF9500', r: 2 }}
                name="Wet Bulb (°F)"
              />
            </LineChart>
          );
        } else if (hasBoilerData) {
          return (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="inlet"
                stroke="#007AFF"
                strokeWidth={2}
                dot={{ fill: '#007AFF', r: 2 }}
                name="Inlet Water (°F)"
              />
              <Line
                type="monotone"
                dataKey="outlet"
                stroke="#FF9500"
                strokeWidth={2}
                dot={{ fill: '#FF9500', r: 2 }}
                name="Outlet Water (°F)"
              />
              <Line
                type="monotone"
                dataKey="stack"
                stroke="#FF3B30"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ fill: '#FF3B30', r: 2 }}
                name="Stack Temp (°F)"
              />
            </LineChart>
          );
        }
        break;

      case 'approach':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="approach"
              stroke="#007AFF"
              strokeWidth={2}
              dot={{ fill: '#007AFF', r: 3 }}
              name="Approach (°F)"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#34C759"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target (5°F)"
            />
          </LineChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card p-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};
