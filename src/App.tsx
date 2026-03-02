import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { EnergyChart } from './components/EnergyChart';
import { AnalysisPanel } from './components/AnalysisPanel';
import { StatsCard } from './components/StatsCard';
import { Zap, BarChart3 } from 'lucide-react';
import { processGreenButtonData } from './utils/greenButtonParser';
import { GreenButtonData } from './types/greenButton';
import { format } from 'date-fns';

function App() {
  const [data, setData] = useState<GreenButtonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (content: string, fileType: 'xml' | 'csv') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const processedData = processGreenButtonData(content, fileType, {
        meterId: 'unknown',
        utility: 'unknown',
        unit: 'kWh'
      });
      
      setData(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Energy Manager</h1>
            </div>
            {data && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Upload New Data
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!data ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Energy Management Dashboard
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Upload your Green Button data to analyze energy usage patterns and identify optimization opportunities
              </p>
            </div>
            
            <FileUpload 
              onFileUpload={handleFileUpload}
              isLoading={isLoading}
              error={error || undefined}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Data Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Data Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Period:</span>
                  <span className="ml-2 font-medium">
                    {format(data.metadata.startDate, 'MMM dd, yyyy')} - {format(data.metadata.endDate, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Meter ID:</span>
                  <span className="ml-2 font-medium">{data.metadata.meterId}</span>
                </div>
                <div>
                  <span className="text-gray-600">Data Points:</span>
                  <span className="ml-2 font-medium">{data.usage.readings.length}</span>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Consumption"
                value={data.usage.totalConsumption.toFixed(2)}
                unit="kWh"
                icon="battery"
              />
              <StatsCard
                title="Peak Demand"
                value={data.usage.peakDemand.toFixed(3)}
                unit="kWh"
                icon="trending"
                trend={{
                  value: ((data.usage.peakDemand / data.usage.averageConsumption - 1) * 100),
                  isPositive: data.usage.peakDemand > data.usage.averageConsumption * 2
                }}
              />
              <StatsCard
                title="Average Usage"
                value={data.usage.averageConsumption.toFixed(3)}
                unit="kWh"
                icon="clock"
              />
              <StatsCard
                title="Est. Monthly Cost"
                value={(data.analysis.totalConsumption * 0.12).toFixed(2)}
                unit="$"
                icon="dollar"
              />
            </div>

            {/* Energy Usage Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                Energy Usage Over Time
              </h3>
              <EnergyChart readings={data.usage.readings} height={400} />
            </div>

            {/* Analysis Panel */}
            <AnalysisPanel analysis={data.analysis} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
