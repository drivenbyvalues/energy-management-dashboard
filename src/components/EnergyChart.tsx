import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { GreenButtonReading } from '../types/greenButton';
import { format } from 'date-fns';

interface EnergyChartProps {
  readings: GreenButtonReading[];
  height?: number;
  showArea?: boolean;
}

export const EnergyChart: React.FC<EnergyChartProps> = ({ readings, height = 400, showArea = false }) => {
  const chartData = readings.map(reading => ({
    time: format(reading.start, 'MMM dd, HH:mm'),
    timestamp: reading.start.getTime(),
    value: reading.value,
    date: reading.start
  }));

  const ChartComponent = showArea ? AreaChart : LineChart;
  const DataComponent = showArea ? Area : Line;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
            formatter={(value: number | undefined) => value ? [`${value.toFixed(3)} kWh`, 'Energy Usage'] : ['', 'Energy Usage']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend />
          <DataComponent
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={false}
            name="Energy Usage"
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};
