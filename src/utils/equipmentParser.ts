import { 
  ChillerReading, 
  CoolingTowerReading, 
  BoilerReading, 
  EquipmentAnalysis, 
  EquipmentPerformanceMetrics, 
  Alert, 
  Trend, 
  CostSavings 
} from '../types/equipment';

export function parseChillerData(csvString: string): ChillerReading[] {
  const lines = csvString.trim().split('\n');
  const readings: ChillerReading[] = [];
  
  const startIndex = lines[0].toLowerCase().includes('timestamp') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(',');
    if (columns.length >= 8) {
      readings.push({
        timestamp: new Date(columns[0].trim()),
        value: parseFloat(columns[1].trim()),
        unit: 'kW',
        chilledWaterSupplyTemp: parseFloat(columns[2].trim()),
        chilledWaterReturnTemp: parseFloat(columns[3].trim()),
        condenserWaterSupplyTemp: parseFloat(columns[4].trim()),
        condenserWaterReturnTemp: parseFloat(columns[5].trim()),
        powerConsumption: parseFloat(columns[6].trim()),
        tonnage: parseFloat(columns[7].trim()),
        efficiency: parseFloat(columns[8].trim())
      });
    }
  }
  
  return readings.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function parseCoolingTowerData(csvString: string): CoolingTowerReading[] {
  const lines = csvString.trim().split('\n');
  const readings: CoolingTowerReading[] = [];
  
  const startIndex = lines[0].toLowerCase().includes('timestamp') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(',');
    if (columns.length >= 8) {
      readings.push({
        timestamp: new Date(columns[0].trim()),
        value: parseFloat(columns[1].trim()),
        unit: 'kW',
        inletWaterTemp: parseFloat(columns[2].trim()),
        outletWaterTemp: parseFloat(columns[3].trim()),
        ambientWetBulbTemp: parseFloat(columns[4].trim()),
        ambientDryBulbTemp: parseFloat(columns[5].trim()),
        fanSpeed: parseFloat(columns[6].trim()),
        pumpSpeed: parseFloat(columns[7].trim()),
        waterFlowRate: parseFloat(columns[8].trim()),
        approach: parseFloat(columns[9].trim())
      });
    }
  }
  
  return readings.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function parseBoilerData(csvString: string): BoilerReading[] {
  const lines = csvString.trim().split('\n');
  const readings: BoilerReading[] = [];
  
  const startIndex = lines[0].toLowerCase().includes('timestamp') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(',');
    if (columns.length >= 8) {
      readings.push({
        timestamp: new Date(columns[0].trim()),
        value: parseFloat(columns[1].trim()),
        unit: 'kW',
        inletWaterTemp: parseFloat(columns[2].trim()),
        outletWaterTemp: parseFloat(columns[3].trim()),
        stackTemp: parseFloat(columns[4].trim()),
        combustionEfficiency: parseFloat(columns[5].trim()),
        fuelConsumption: parseFloat(columns[6].trim()),
        steamPressure: parseFloat(columns[7].trim()),
        co2Emissions: parseFloat(columns[8].trim())
      });
    }
  }
  
  return readings.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function analyzeChillerPerformance(readings: ChillerReading[]): EquipmentAnalysis {
  const metrics = calculateChillerMetrics(readings);
  const alerts = generateChillerAlerts(readings, metrics);
  const trends = analyzeChillerTrends(readings);
  const recommendations = generateChillerRecommendations(metrics, alerts);
  const costSavings = calculateChillerCostSavings(metrics, recommendations);
  
  return {
    equipmentType: 'chiller',
    readings,
    metrics,
    recommendations,
    alerts,
    trends,
    costSavings
  };
}

export function analyzeCoolingTowerPerformance(readings: CoolingTowerReading[]): EquipmentAnalysis {
  const metrics = calculateCoolingTowerMetrics(readings);
  const alerts = generateCoolingTowerAlerts(readings, metrics);
  const trends = analyzeCoolingTowerTrends(readings);
  const recommendations = generateCoolingTowerRecommendations(metrics, alerts);
  const costSavings = calculateCoolingTowerCostSavings(metrics, recommendations);
  
  return {
    equipmentType: 'coolingTower',
    readings,
    metrics,
    recommendations,
    alerts,
    trends,
    costSavings
  };
}

export function analyzeBoilerPerformance(readings: BoilerReading[]): EquipmentAnalysis {
  const metrics = calculateBoilerMetrics(readings);
  const alerts = generateBoilerAlerts(readings, metrics);
  const trends = analyzeBoilerTrends(readings);
  const recommendations = generateBoilerRecommendations(metrics, alerts);
  const costSavings = calculateBoilerCostSavings(metrics, recommendations);
  
  return {
    equipmentType: 'boiler',
    readings,
    metrics,
    recommendations,
    alerts,
    trends,
    costSavings
  };
}

function calculateChillerMetrics(readings: ChillerReading[]): EquipmentPerformanceMetrics {
  if (readings.length === 0) {
    return getDefaultMetrics();
  }
  
  const avgEfficiency = readings.reduce((sum, r) => sum + r.efficiency, 0) / readings.length;
  const totalPower = readings.reduce((sum, r) => sum + r.powerConsumption, 0);
  const avgTonnage = readings.reduce((sum, r) => sum + r.tonnage, 0) / readings.length;
  
  const operatingHours = readings.length * (readings[1]?.timestamp.getTime() - readings[0]?.timestamp.getTime()) / (1000 * 60 * 60) || 0;
  
  return {
    efficiency: avgEfficiency,
    utilizationRate: (avgTonnage / 500) * 100, // Assuming 500 ton capacity
    operatingHours,
    maintenanceScore: calculateMaintenanceScore(avgEfficiency),
    energyCost: totalPower * 0.12, // $0.12 per kWh
    carbonFootprint: totalPower * 0.0005, // kg CO2 per kWh
    optimizationPotential: Math.max(0, 100 - avgEfficiency)
  };
}

function calculateCoolingTowerMetrics(readings: CoolingTowerReading[]): EquipmentPerformanceMetrics {
  if (readings.length === 0) {
    return getDefaultMetrics();
  }
  
  const avgApproach = readings.reduce((sum, r) => sum + r.approach, 0) / readings.length;
  const avgFanSpeed = readings.reduce((sum, r) => sum + r.fanSpeed, 0) / readings.length;
  const totalPower = readings.reduce((sum, r) => sum + r.value, 0);
  
  const efficiency = Math.max(0, 100 - (avgApproach * 10)); // Approach affects efficiency
  
  return {
    efficiency,
    utilizationRate: (avgFanSpeed / 100) * 100,
    operatingHours: readings.length,
    maintenanceScore: calculateMaintenanceScore(efficiency),
    energyCost: totalPower * 0.12,
    carbonFootprint: totalPower * 0.0005,
    optimizationPotential: Math.max(0, 100 - efficiency)
  };
}

function calculateBoilerMetrics(readings: BoilerReading[]): EquipmentPerformanceMetrics {
  if (readings.length === 0) {
    return getDefaultMetrics();
  }
  
  const avgEfficiency = readings.reduce((sum, r) => sum + r.combustionEfficiency, 0) / readings.length;
  const totalFuel = readings.reduce((sum, r) => sum + r.fuelConsumption, 0);
  const totalCO2 = readings.reduce((sum, r) => sum + r.co2Emissions, 0);
  
  return {
    efficiency: avgEfficiency,
    utilizationRate: 85, // Typical boiler utilization
    operatingHours: readings.length,
    maintenanceScore: calculateMaintenanceScore(avgEfficiency),
    energyCost: totalFuel * 3.5, // $3.50 per MMBtu
    carbonFootprint: totalCO2 / 1000, // Convert to tons
    optimizationPotential: Math.max(0, 100 - avgEfficiency)
  };
}

function getDefaultMetrics(): EquipmentPerformanceMetrics {
  return {
    efficiency: 0,
    utilizationRate: 0,
    operatingHours: 0,
    maintenanceScore: 100,
    energyCost: 0,
    carbonFootprint: 0,
    optimizationPotential: 0
  };
}

function calculateMaintenanceScore(efficiency: number): number {
  return Math.min(100, Math.max(0, efficiency + 10));
}

function generateChillerAlerts(readings: ChillerReading[], metrics: EquipmentPerformanceMetrics): Alert[] {
  const alerts: Alert[] = [];
  
  if (metrics.efficiency < 70) {
    alerts.push({
      severity: 'critical',
      type: 'efficiency',
      message: 'Chiller efficiency is critically low',
      timestamp: new Date(),
      suggestedAction: 'Schedule immediate maintenance and check for refrigerant leaks'
    });
  } else if (metrics.efficiency < 85) {
    alerts.push({
      severity: 'high',
      type: 'efficiency',
      message: 'Chiller efficiency below optimal range',
      timestamp: new Date(),
      suggestedAction: 'Clean condenser tubes and check water flow rates'
    });
  }
  
  const highEfficiencyReadings = readings.filter(r => r.efficiency > 95);
  if (highEfficiencyReadings.length > readings.length * 0.3) {
    alerts.push({
      severity: 'medium',
      type: 'performance',
      message: 'Chiller operating at high efficiency - consider load optimization',
      timestamp: new Date(),
      suggestedAction: 'Review chiller sequencing and load distribution'
    });
  }
  
  return alerts;
}

function generateCoolingTowerAlerts(readings: CoolingTowerReading[], metrics: EquipmentPerformanceMetrics): Alert[] {
  const alerts: Alert[] = [];
  
  const highApproachReadings = readings.filter(r => r.approach > 7);
  if (highApproachReadings.length > readings.length * 0.2) {
    alerts.push({
      severity: 'high',
      type: 'performance',
      message: 'Cooling tower approach temperature too high',
      timestamp: new Date(),
      suggestedAction: 'Check for scale buildup and clean tower fill'
    });
  }
  
  if (metrics.efficiency < 75) {
    alerts.push({
      severity: 'medium',
      type: 'efficiency',
      message: 'Cooling tower efficiency below optimal',
      timestamp: new Date(),
      suggestedAction: 'Optimize fan speed and check water distribution'
    });
  }
  
  return alerts;
}

function generateBoilerAlerts(readings: BoilerReading[], metrics: EquipmentPerformanceMetrics): Alert[] {
  const alerts: Alert[] = [];
  
  if (metrics.efficiency < 75) {
    alerts.push({
      severity: 'critical',
      type: 'efficiency',
      message: 'Boiler combustion efficiency critically low',
      timestamp: new Date(),
      suggestedAction: 'Immediate tune-up required, check air-fuel ratio'
    });
  }
  
  const highStackTempReadings = readings.filter(r => r.stackTemp > 400);
  if (highStackTempReadings.length > readings.length * 0.3) {
    alerts.push({
      severity: 'high',
      type: 'energy',
      message: 'High stack temperatures indicating heat loss',
      timestamp: new Date(),
      suggestedAction: 'Check heat exchanger and consider economizer installation'
    });
  }
  
  return alerts;
}

function analyzeChillerTrends(readings: ChillerReading[]): Trend[] {
  const trends: Trend[] = [];
  
  if (readings.length < 2) return trends;
  
  const firstHalf = readings.slice(0, Math.floor(readings.length / 2));
  const secondHalf = readings.slice(Math.floor(readings.length / 2));
  
  const firstHalfEff = firstHalf.reduce((sum, r) => sum + r.efficiency, 0) / firstHalf.length;
  const secondHalfEff = secondHalf.reduce((sum, r) => sum + r.efficiency, 0) / secondHalf.length;
  
  const efficiencyChange = ((secondHalfEff - firstHalfEff) / firstHalfEff) * 100;
  
  trends.push({
    metric: 'Efficiency',
    direction: efficiencyChange > 0 ? 'increasing' : efficiencyChange < 0 ? 'decreasing' : 'stable',
    changeRate: Math.abs(efficiencyChange),
    timeframe: 'Recent Period',
    significance: Math.abs(efficiencyChange) > 5 ? 'major' : Math.abs(efficiencyChange) > 2 ? 'moderate' : 'minor'
  });
  
  return trends;
}

function analyzeCoolingTowerTrends(readings: CoolingTowerReading[]): Trend[] {
  const trends: Trend[] = [];
  
  if (readings.length < 2) return trends;
  
  const firstHalf = readings.slice(0, Math.floor(readings.length / 2));
  const secondHalf = readings.slice(Math.floor(readings.length / 2));
  
  const firstHalfApproach = firstHalf.reduce((sum, r) => sum + r.approach, 0) / firstHalf.length;
  const secondHalfApproach = secondHalf.reduce((sum, r) => sum + r.approach, 0) / secondHalf.length;
  
  const approachChange = ((secondHalfApproach - firstHalfApproach) / firstHalfApproach) * 100;
  
  trends.push({
    metric: 'Approach Temperature',
    direction: approachChange > 0 ? 'increasing' : approachChange < 0 ? 'decreasing' : 'stable',
    changeRate: Math.abs(approachChange),
    timeframe: 'Recent Period',
    significance: Math.abs(approachChange) > 10 ? 'major' : Math.abs(approachChange) > 5 ? 'moderate' : 'minor'
  });
  
  return trends;
}

function analyzeBoilerTrends(readings: BoilerReading[]): Trend[] {
  const trends: Trend[] = [];
  
  if (readings.length < 2) return trends;
  
  const firstHalf = readings.slice(0, Math.floor(readings.length / 2));
  const secondHalf = readings.slice(Math.floor(readings.length / 2));
  
  const firstHalfEff = firstHalf.reduce((sum, r) => sum + r.combustionEfficiency, 0) / firstHalf.length;
  const secondHalfEff = secondHalf.reduce((sum, r) => sum + r.combustionEfficiency, 0) / secondHalf.length;
  
  const efficiencyChange = ((secondHalfEff - firstHalfEff) / firstHalfEff) * 100;
  
  trends.push({
    metric: 'Combustion Efficiency',
    direction: efficiencyChange > 0 ? 'increasing' : efficiencyChange < 0 ? 'decreasing' : 'stable',
    changeRate: Math.abs(efficiencyChange),
    timeframe: 'Recent Period',
    significance: Math.abs(efficiencyChange) > 3 ? 'major' : Math.abs(efficiencyChange) > 1 ? 'moderate' : 'minor'
  });
  
  return trends;
}

function generateChillerRecommendations(metrics: EquipmentPerformanceMetrics, alerts: Alert[]): string[] {
  const recommendations: string[] = [];
  
  if (metrics.efficiency < 85) {
    recommendations.push('Clean condenser tubes and check for scale buildup');
    recommendations.push('Verify refrigerant charge and check for leaks');
    recommendations.push('Optimize chilled water temperature setpoints');
  }
  
  if (metrics.utilizationRate > 90) {
    recommendations.push('Consider adding chiller capacity or implementing load sharing');
  }
  
  recommendations.push('Implement predictive maintenance schedule based on runtime hours');
  recommendations.push('Install variable frequency drives on pumps and fans');
  
  return recommendations;
}

function generateCoolingTowerRecommendations(metrics: EquipmentPerformanceMetrics, alerts: Alert[]): string[] {
  const recommendations: string[] = [];
  
  if (metrics.efficiency < 80) {
    recommendations.push('Clean tower fill and check for scale buildup');
    recommendations.push('Optimize fan speed control based on wet bulb temperature');
    recommendations.push('Check water distribution nozzles for clogging');
  }
  
  recommendations.push('Implement water treatment program to prevent scaling');
  recommendations.push('Consider installing variable frequency drives on fans');
  recommendations.push('Monitor approach temperature and optimize setpoints');
  
  return recommendations;
}

function generateBoilerRecommendations(metrics: EquipmentPerformanceMetrics, alerts: Alert[]): string[] {
  const recommendations: string[] = [];
  
  if (metrics.efficiency < 85) {
    recommendations.push('Schedule combustion tuning and check air-fuel ratio');
    recommendations.push('Clean heat transfer surfaces and check for scaling');
    recommendations.push('Inspect and replace worn gaskets and seals');
  }
  
  recommendations.push('Install stack economizer for heat recovery');
  recommendations.push('Implement oxygen trim control for optimal combustion');
  recommendations.push('Consider modular boiler system for better load matching');
  
  return recommendations;
}

function calculateChillerCostSavings(metrics: EquipmentPerformanceMetrics, recommendations: string[]): CostSavings {
  const potentialSavings = metrics.energyCost * (metrics.optimizationPotential / 100);
  const implementationCost = recommendations.length * 5000; // $5K per recommendation
  
  return {
    potentialSavings,
    implementationCost,
    paybackPeriod: implementationCost / (potentialSavings / 12),
    annualSavings: potentialSavings,
    roi: (potentialSavings / implementationCost) * 100
  };
}

function calculateCoolingTowerCostSavings(metrics: EquipmentPerformanceMetrics, recommendations: string[]): CostSavings {
  const potentialSavings = metrics.energyCost * (metrics.optimizationPotential / 100);
  const implementationCost = recommendations.length * 3000; // $3K per recommendation
  
  return {
    potentialSavings,
    implementationCost,
    paybackPeriod: implementationCost / (potentialSavings / 12),
    annualSavings: potentialSavings,
    roi: (potentialSavings / implementationCost) * 100
  };
}

function calculateBoilerCostSavings(metrics: EquipmentPerformanceMetrics, recommendations: string[]): CostSavings {
  const potentialSavings = metrics.energyCost * (metrics.optimizationPotential / 100);
  const implementationCost = recommendations.length * 8000; // $8K per recommendation
  
  return {
    potentialSavings,
    implementationCost,
    paybackPeriod: implementationCost / (potentialSavings / 12),
    annualSavings: potentialSavings,
    roi: (potentialSavings / implementationCost) * 100
  };
}
