import React, { useState, useEffect } from 'react';
import { Thermometer, Wind, Flame, AlertTriangle, TrendingUp, DollarSign, Leaf, Activity } from 'lucide-react';
import { EquipmentAnalysis as EquipmentAnalysisType } from '../types/equipment';
import { PerformanceChart } from './PerformanceChart';
import { 
  analyzeChillerPerformance, 
  analyzeCoolingTowerPerformance, 
  analyzeBoilerPerformance,
  parseChillerData,
  parseCoolingTowerData,
  parseBoilerData
} from '../utils/equipmentParser';

interface EquipmentAnalysisProps {
  equipmentType: 'chiller' | 'coolingTower' | 'boiler';
}

export const EquipmentAnalysis: React.FC<EquipmentAnalysisProps> = ({ equipmentType }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'recommendations'>('overview');
  const [analysis, setAnalysis] = useState<EquipmentAnalysisType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let csvData = '';
      let analysis;
      
      if (equipmentType === 'chiller') {
        csvData = `timestamp,chilledWaterSupplyTemp,chilledWaterReturnTemp,condenserWaterSupplyTemp,condenserWaterReturnTemp,efficiency,power
2024-01-01 00:00,42.5,52.3,75.0,85.2,87.5,350.2
2024-01-01 04:00,42.8,52.5,74.8,85.0,88.1,345.8
2024-01-01 08:00,42.3,52.1,75.2,85.3,86.9,355.1
2024-01-01 12:00,42.0,51.8,75.5,85.5,85.7,365.3
2024-01-01 16:00,42.2,52.0,75.3,85.4,86.3,360.7
2024-01-01 20:00,42.6,52.4,74.9,85.1,87.8,348.9
2024-01-01 23:00,42.7,52.6,74.7,84.9,88.2,343.5`;
        
        const data = parseChillerData(csvData);
        analysis = analyzeChillerPerformance(data);
      } else if (equipmentType === 'coolingTower') {
        csvData = `timestamp,fanSpeed,wetBulbTemp,approachTemp,efficiency,power
2024-01-01 00:00,75,65,7.2,85.4,45.2
2024-01-01 04:00,70,63,6.8,87.1,42.1
2024-01-01 08:00,80,68,7.5,83.9,48.5
2024-01-01 12:00,85,70,7.8,82.3,52.3
2024-01-01 16:00,82,69,7.6,83.5,50.1
2024-01-01 20:00,78,66,7.3,84.8,46.7
2024-01-01 23:00,72,64,6.9,86.5,43.8`;
        
        const data = parseCoolingTowerData(csvData);
        analysis = analyzeCoolingTowerPerformance(data);
      } else if (equipmentType === 'boiler') {
        csvData = `timestamp,supplyTemp,returnTemp,o2Level,stackTemp,efficiency,power
2024-01-01 00:00,180,160,3.5,320,88.2,125.3
2024-01-01 04:00,175,155,3.4,315,89.1,122.8
2024-01-01 08:00,185,165,3.6,325,87.5,127.9
2024-01-01 12:00,190,170,3.7,330,86.8,131.2
2024-01-01 16:00,188,168,3.6,328,87.2,129.5
2024-01-01 20:00,182,162,3.5,322,88.0,124.7
2024-01-01 23:00,178,158,3.4,318,88.7,121.9`;
        
        const data = parseBoilerData(csvData);
        analysis = analyzeBoilerPerformance(data);
      }
      
      if (analysis) {
        setAnalysis(analysis);
      }
    };
    fetchData();
  }, [equipmentType]);

  if (!analysis) return <div>Loading...</div>;

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case 'chiller': return <Thermometer className="w-6 h-6" />;
      case 'coolingTower': return <Wind className="w-6 h-6" />;
      case 'boiler': return <Flame className="w-6 h-6" />;
      default: return <Thermometer className="w-6 h-6" />;
    }
  };

  const getStatusColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-success';
    if (efficiency >= 75) return 'text-warning';
    return 'text-danger';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-danger';
      case 'high': return 'text-warning';
      case 'medium': return 'text-info';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="card p-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-xl">
        <div className="flex items-center">
          <div className="feature-icon mr-md">
            {getEquipmentIcon(analysis.equipmentType)}
          </div>
          <div>
            <h3 className="text-2xl font-semibold capitalize">
              {analysis.equipmentType.replace(/([A-Z])/g, ' $1').trim()} Analysis
            </h3>
            <p className="text-gray-600">
              {analysis.readings.length} data points analyzed
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getStatusColor(analysis.metrics.efficiency)}`}>
            {analysis.metrics.efficiency.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Current Efficiency</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-xl">
        <button
          className={`px-md py-sm font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-600 hover:text-primary'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-md py-sm font-medium transition-colors ${
            activeTab === 'performance' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-600 hover:text-primary'
          }`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`px-md py-sm font-medium transition-colors ${
            activeTab === 'recommendations' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-600 hover:text-primary'
          }`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-4 gap-lg">
          <div className="card bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between mb-sm">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className={`text-sm font-medium ${getStatusColor(analysis.metrics.efficiency)}`}>
                {analysis.metrics.efficiency >= 90 ? 'Optimal' : 
                 analysis.metrics.efficiency >= 75 ? 'Good' : 'Needs Attention'}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {analysis.metrics.efficiency.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Efficiency</div>
          </div>

          <div className="card bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between mb-sm">
              <DollarSign className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-success">
                {analysis.metrics.optimizationPotential > 20 ? 'High' : 
                 analysis.metrics.optimizationPotential > 10 ? 'Medium' : 'Low'}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {analysis.metrics.optimizationPotential.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Optimization Potential</div>
          </div>

          <div className="card bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between mb-sm">
              <Leaf className="w-5 h-5 text-info" />
              <span className="text-sm font-medium text-info">
                {analysis.metrics.carbonFootprint < 100 ? 'Low' : 
                 analysis.metrics.carbonFootprint < 500 ? 'Medium' : 'High'}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {analysis.metrics.carbonFootprint.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">CO₂ (tons/year)</div>
          </div>

          <div className="card bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between mb-sm">
              <DollarSign className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium text-warning">
                ${analysis.metrics.energyCost.toLocaleString()}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${analysis.costSavings.potentialSavings.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Potential Savings</div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-xl">
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            <PerformanceChart
              readings={analysis.readings}
              title="Efficiency Over Time"
              type="efficiency"
              height={300}
            />
            <PerformanceChart
              readings={analysis.readings}
              title="Power Consumption"
              type="power"
              height={300}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            <PerformanceChart
              readings={analysis.readings}
              title="Temperature Analysis"
              type="temperature"
              height={300}
            />
            {analysis.equipmentType === 'coolingTower' && (
              <PerformanceChart
                readings={analysis.readings}
                title="Approach Temperature"
                type="approach"
                height={300}
              />
            )}
          </div>

          {/* Alerts */}
          {analysis.alerts.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-md flex items-center">
                <AlertTriangle className="w-5 h-5 text-danger mr-2" />
                Active Alerts
              </h4>
              <div className="space-y-sm">
                {analysis.alerts.map((alert, index) => (
                  <div key={index} className="card border-l-4 border-l-danger bg-red-50">
                    <div className="flex items-start">
                      <AlertTriangle className={`w-5 h-5 ${getSeverityColor(alert.severity)} mr-sm flex-shrink-0 mt-1`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-xs">
                          <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {alert.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-800 mb-xs">{alert.message}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Suggested Action:</strong> {alert.suggestedAction}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trends */}
          <div>
            <h4 className="text-lg font-semibold mb-md flex items-center">
              <Activity className="w-5 h-5 text-primary mr-2" />
              Performance Trends
            </h4>
            <div className="grid grid-cols-2 gap-md">
              {analysis.trends.map((trend, index) => (
                <div key={index} className="card bg-gray-50 border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{trend.metric}</div>
                      <div className="text-sm text-gray-600">{trend.timeframe}</div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center ${
                        trend.direction === 'increasing' ? 'text-danger' : 
                        trend.direction === 'decreasing' ? 'text-success' : 'text-gray-600'
                      }`}>
                        <TrendingUp className={`w-4 h-4 mr-1 ${
                          trend.direction === 'decreasing' ? 'rotate-180' : ''
                        }`} />
                        {trend.changeRate.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500 capitalize">{trend.significance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-lg">
          <div>
            <h4 className="text-lg font-semibold mb-md">Optimization Recommendations</h4>
            <div className="space-y-md">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="card bg-blue-50 border-blue-200">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-800">{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Savings Breakdown */}
          <div className="card bg-gradient-success text-white">
            <h4 className="text-xl font-semibold mb-md">Investment Summary</h4>
            <div className="grid grid-cols-4 gap-md">
              <div>
                <div className="text-2xl font-bold">
                  ${analysis.costSavings.potentialSavings.toFixed(0)}
                </div>
                <div className="text-sm opacity-90">Annual Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ${analysis.costSavings.implementationCost.toFixed(0)}
                </div>
                <div className="text-sm opacity-90">Implementation Cost</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {analysis.costSavings.paybackPeriod.toFixed(1)} mo
                </div>
                <div className="text-sm opacity-90">Payback Period</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {analysis.costSavings.roi.toFixed(0)}%
                </div>
                <div className="text-sm opacity-90">Return on Investment</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
