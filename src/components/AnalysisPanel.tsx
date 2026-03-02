import React from 'react';
import { AlertTriangle, TrendingUp, Clock, DollarSign, Lightbulb } from 'lucide-react';
import { EnergyAnalysis } from '../types/greenButton';
import { format } from 'date-fns';

interface AnalysisPanelProps {
  analysis: EnergyAnalysis;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  const { 
    totalConsumption, 
    averageDailyConsumption, 
    peakDemandPeriods, 
    highUsagePeriods, 
    costEstimate, 
    recommendations 
  } = analysis;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Consumption</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalConsumption.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">kWh</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Daily Average</h3>
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {averageDailyConsumption.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">kWh/day</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Peak Periods</h3>
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {peakDemandPeriods.length}
          </div>
          <div className="text-sm text-gray-500">periods detected</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Estimated Cost</h3>
            <DollarSign className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${costEstimate.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">(@ $0.12/kWh)</div>
        </div>
      </div>

      {/* Peak Demand Periods */}
      {peakDemandPeriods.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            Peak Demand Periods
          </h3>
          <div className="space-y-3">
            {peakDemandPeriods.map((period, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    {format(period.start, 'MMM dd, yyyy HH:mm')} - {format(period.end, 'HH:mm')}
                  </div>
                  <div className="text-sm text-gray-600">
                    Duration: {Math.round(period.duration / 60)} hours
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-orange-600">
                    {period.demand.toFixed(3)} kWh
                  </div>
                  <div className="text-sm text-gray-500">peak demand</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High Usage Periods */}
      {highUsagePeriods.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
            High Usage Periods (Top 10%)
          </h3>
          <div className="text-sm text-gray-600 mb-3">
            Found {highUsagePeriods.length} high usage periods
          </div>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {highUsagePeriods.slice(0, 10).map((period, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm text-gray-700">
                  {format(period.start, 'MMM dd, HH:mm')}
                </span>
                <span className="text-sm font-medium text-red-600">
                  {period.value.toFixed(3)} kWh
                </span>
              </div>
            ))}
            {highUsagePeriods.length > 10 && (
              <div className="text-sm text-gray-500 text-center pt-2">
                ... and {highUsagePeriods.length - 10} more
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
            Energy Efficiency Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
