import React, { useState } from 'react';
import { Settings, Thermometer, Wind, Flame, Save, RefreshCw, AlertCircle, TrendingUp } from 'lucide-react';
import { PerformanceChart } from './PerformanceChart';

interface AlgorithmConfig {
  id: string;
  name: string;
  description: string;
  parameters: {
    [key: string]: {
      value: number;
      unit: string;
      description: string;
      min: number;
      max: number;
    };
  };
  rules: string[];
}

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chiller' | 'coolingTower' | 'boiler'>('chiller');
  const [savedStatus, setSavedStatus] = useState<string>('');

  const chillerConfig: AlgorithmConfig = {
    id: 'chilled-water-reset',
    name: 'Chilled Water Supply Temperature Reset Strategy',
    description: 'Optimizes chilled water supply temperature based on outdoor conditions and load requirements',
    parameters: {
      outdoorTempLow: {
        value: 55,
        unit: '°F',
        description: 'Minimum outdoor temperature for reset',
        min: 40,
        max: 70
      },
      outdoorTempHigh: {
        value: 85,
        unit: '°F',
        description: 'Maximum outdoor temperature for reset',
        min: 70,
        max: 100
      },
      chilledWaterTempLow: {
        value: 42,
        unit: '°F',
        description: 'Minimum chilled water supply temperature',
        min: 38,
        max: 48
      },
      chilledWaterTempHigh: {
        value: 44,
        unit: '°F',
        description: 'Maximum chilled water supply temperature',
        min: 42,
        max: 50
      },
      loadThreshold: {
        value: 75,
        unit: '%',
        description: 'Load threshold for temperature adjustment',
        min: 50,
        max: 100
      },
      resetRate: {
        value: 0.5,
        unit: '°F/min',
        description: 'Maximum temperature change rate',
        min: 0.1,
        max: 2.0
      }
    },
    rules: [
      'When outdoor temperature < 55°F, raise chilled water temp to 44°F',
      'When outdoor temperature > 85°F, lower chilled water temp to 42°F',
      'Linear interpolation between 55°F and 85°F outdoor temperature',
      'Adjust based on actual building load (>75% load = lower temp)',
      'Limit temperature changes to 0.5°F per minute to avoid compressor short cycling',
      'Maintain minimum 38°F to prevent freezing',
      'Consider humidity levels in reset calculation'
    ]
  };

  const coolingTowerConfig: AlgorithmConfig = {
    id: 'cooling-tower-optimization',
    name: 'Cooling Tower Fan Speed Optimization',
    description: 'Optimizes fan speed based on wet bulb temperature and approach requirements',
    parameters: {
      wetBulbLow: {
        value: 60,
        unit: '°F',
        description: 'Low wet bulb temperature threshold',
        min: 50,
        max: 70
      },
      wetBulbHigh: {
        value: 80,
        unit: '°F',
        description: 'High wet bulb temperature threshold',
        min: 70,
        max: 90
      },
      approachTarget: {
        value: 7,
        unit: '°F',
        description: 'Target approach temperature',
        min: 5,
        max: 10
      },
      minFanSpeed: {
        value: 30,
        unit: '%',
        description: 'Minimum fan speed percentage',
        min: 20,
        max: 50
      },
      maxFanSpeed: {
        value: 100,
        unit: '%',
        description: 'Maximum fan speed percentage',
        min: 80,
        max: 100
      }
    },
    rules: [
      'When wet bulb < 60°F, reduce fan speed to minimum (30%)',
      'When wet bulb > 80°F, increase fan speed to maximum (100%)',
      'Maintain 7°F approach to wet bulb temperature',
      'Use variable frequency drives for smooth speed transitions',
      'Consider water quality and treatment requirements',
      'Implement freeze protection in winter months'
    ]
  };

  const boilerConfig: AlgorithmConfig = {
    id: 'boiler-efficiency-optimization',
    name: 'Boiler Combustion and Reset Strategy',
    description: 'Optimizes boiler water temperature and combustion efficiency',
    parameters: {
      outdoorTempLow: {
        value: 20,
        unit: '°F',
        description: 'Low outdoor temperature for reset',
        min: 0,
        max: 40
      },
      outdoorTempHigh: {
        value: 60,
        unit: '°F',
        description: 'High outdoor temperature for reset',
        min: 40,
        max: 80
      },
      supplyTempLow: {
        value: 140,
        unit: '°F',
        description: 'Minimum supply water temperature',
        min: 120,
        max: 160
      },
      supplyTempHigh: {
        value: 180,
        unit: '°F',
        description: 'Maximum supply water temperature',
        min: 160,
        max: 200
      },
      o2Target: {
        value: 3.5,
        unit: '%',
        description: 'Target oxygen in flue gas',
        min: 2.0,
        max: 5.0
      },
      stackTempTarget: {
        value: 300,
        unit: '°F',
        description: 'Target stack temperature',
        min: 250,
        max: 400
      }
    },
    rules: [
      'When outdoor temperature < 20°F, supply water at 180°F',
      'When outdoor temperature > 60°F, supply water at 140°F',
      'Maintain 3.5% O2 in flue gas for optimal combustion',
      'Keep stack temperature between 250-400°F',
      'Use outdoor reset to reduce cycling',
      'Implement lead-lag sequencing for multiple boilers',
      'Monitor condensate return temperature'
    ]
  };

  const getConfig = () => {
    switch (activeTab) {
      case 'chiller': return chillerConfig;
      case 'coolingTower': return coolingTowerConfig;
      case 'boiler': return boilerConfig;
      default: return chillerConfig;
    }
  };

  const handleParameterChange = (paramKey: string, value: number) => {
    // In a real app, this would update state and save to backend
    console.log(`Updating ${paramKey} to ${value}`);
  };

  const handleSave = () => {
    // Simulate saving configuration
    setSavedStatus('Configuration saved successfully!');
    setTimeout(() => setSavedStatus(''), 3000);
  };

  const handleReset = () => {
    // Reset to default values
    setSavedStatus('Configuration reset to defaults');
    setTimeout(() => setSavedStatus(''), 3000);
  };

  const config = getConfig();

  // Sample data for charts
  const sampleChartData = [
    { timestamp: new Date('2024-01-01 00:00'), value: 42, target: 44 },
    { timestamp: new Date('2024-01-01 04:00'), value: 43, target: 44 },
    { timestamp: new Date('2024-01-01 08:00'), value: 42.5, target: 43 },
    { timestamp: new Date('2024-01-01 12:00'), value: 42, target: 42 },
    { timestamp: new Date('2024-01-01 16:00'), value: 42.5, target: 42 },
    { timestamp: new Date('2024-01-01 20:00'), value: 43, target: 43 },
    { timestamp: new Date('2024-01-01 23:00'), value: 43.5, target: 44 },
  ].map(reading => ({
    timestamp: reading.timestamp,
    value: reading.value,
    unit: '°F',
    efficiency: 85 + Math.random() * 10,
    power: 350 + Math.random() * 100,
    chilledWaterSupplyTemp: reading.value,
    chilledWaterReturnTemp: reading.value + 10,
    condenserWaterSupplyTemp: 75,
    condenserWaterReturnTemp: 85
  }));

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-lg py-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-primary mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Algorithm Configuration</h1>
          </div>
          <div className="flex gap-sm">
            <button
              onClick={handleSave}
              className="button button-primary flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </button>
            <button
              onClick={handleReset}
              className="button button-secondary flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {savedStatus && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-lg py-md mx-lg mt-lg rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {savedStatus}
          </div>
        </div>
      )}

      {/* Equipment Tabs */}
      <div className="px-lg mt-xl">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('chiller')}
            className={`flex items-center px-lg py-md font-medium transition-colors ${
              activeTab === 'chiller'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <Thermometer className="w-5 h-5 mr-2" />
            Chiller Algorithm
          </button>
          <button
            onClick={() => setActiveTab('coolingTower')}
            className={`flex items-center px-lg py-md font-medium transition-colors ${
              activeTab === 'coolingTower'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <Wind className="w-5 h-5 mr-2" />
            Cooling Tower Algorithm
          </button>
          <button
            onClick={() => setActiveTab('boiler')}
            className={`flex items-center px-lg py-md font-medium transition-colors ${
              activeTab === 'boiler'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <Flame className="w-5 h-5 mr-2" />
            Boiler Algorithm
          </button>
        </div>
      </div>

      {/* Configuration Content */}
      <div className="px-lg py-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {/* Algorithm Configuration */}
          <div className="space-y-xl">
            {/* Description */}
            <div className="card p-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-md">{config.name}</h2>
              <p className="text-gray-600 mb-lg">{config.description}</p>
              
              {/* Parameters */}
              <div className="space-y-lg">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configuration Parameters
                </h3>
                {Object.entries(config.parameters).map(([key, param]) => (
                  <div key={key} className="space-y-sm">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <span className="text-sm text-gray-500">{param.unit}</span>
                    </div>
                    <div className="flex items-center gap-sm">
                      <input
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.unit === '°F' ? 1 : param.unit === '%' ? 5 : 0.1}
                        value={param.value}
                        onChange={(e) => handleParameterChange(key, parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min={param.min}
                        max={param.max}
                        step={param.unit === '°F' ? 1 : param.unit === '%' ? 5 : 0.1}
                        value={param.value}
                        onChange={(e) => handleParameterChange(key, parseFloat(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <p className="text-xs text-gray-500">{param.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="card p-xl">
              <h3 className="text-lg font-medium text-gray-900 mb-md flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Algorithm Rules
              </h3>
              <ul className="space-y-sm">
                {config.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="space-y-xl">
            <div className="card p-xl">
              <h3 className="text-lg font-medium text-gray-900 mb-md flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Algorithm Performance
              </h3>
              
              <div className="space-y-xl">
                <PerformanceChart
                  readings={sampleChartData}
                  title="Temperature Reset Performance"
                  type="temperature"
                  height={250}
                />
                
                <PerformanceChart
                  readings={sampleChartData}
                  title="Efficiency Trends"
                  type="efficiency"
                  height={250}
                />
                
                <PerformanceChart
                  readings={sampleChartData}
                  title="Power Consumption"
                  type="power"
                  height={250}
                />
              </div>
            </div>

            {/* Current Assumptions */}
            <div className="card p-xl bg-blue-50 border-blue-200">
              <h3 className="text-lg font-medium text-blue-900 mb-md">Current Assumptions</h3>
              <div className="space-y-md text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Building Type:</span>
                  <span className="text-blue-900 font-medium">Commercial Office</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Climate Zone:</span>
                  <span className="text-blue-900 font-medium">Mixed-Humid (4A)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Design Conditions:</span>
                  <span className="text-blue-900 font-medium">95°F DB / 78°F WB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Load Profile:</span>
                  <span className="text-blue-900 font-medium">Variable Air Volume</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Control Strategy:</span>
                  <span className="text-blue-900 font-medium">Outdoor Air Reset</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
