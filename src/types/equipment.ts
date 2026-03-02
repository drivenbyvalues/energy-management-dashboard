export interface EquipmentReading {
  timestamp: Date;
  value: number;
  unit: string;
}

export interface ChillerReading extends EquipmentReading {
  chilledWaterSupplyTemp: number;
  chilledWaterReturnTemp: number;
  condenserWaterSupplyTemp: number;
  condenserWaterReturnTemp: number;
  powerConsumption: number;
  tonnage: number;
  efficiency: number; // kW/ton
}

export interface CoolingTowerReading extends EquipmentReading {
  inletWaterTemp: number;
  outletWaterTemp: number;
  ambientWetBulbTemp: number;
  ambientDryBulbTemp: number;
  fanSpeed: number;
  pumpSpeed: number;
  waterFlowRate: number;
  approach: number; // Difference between outlet water and wet bulb temp
}

export interface BoilerReading extends EquipmentReading {
  inletWaterTemp: number;
  outletWaterTemp: number;
  stackTemp: number;
  combustionEfficiency: number;
  fuelConsumption: number;
  steamPressure: number;
  co2Emissions: number;
}

export interface EquipmentPerformanceMetrics {
  efficiency: number;
  utilizationRate: number;
  operatingHours: number;
  maintenanceScore: number;
  energyCost: number;
  carbonFootprint: number;
  optimizationPotential: number;
}

export interface EquipmentAnalysis {
  equipmentType: 'chiller' | 'coolingTower' | 'boiler';
  readings: EquipmentReading[];
  metrics: EquipmentPerformanceMetrics;
  recommendations: string[];
  alerts: Alert[];
  trends: Trend[];
  costSavings: CostSavings;
}

export interface Alert {
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'efficiency' | 'maintenance' | 'performance' | 'energy';
  message: string;
  timestamp: Date;
  suggestedAction: string;
}

export interface Trend {
  metric: string;
  direction: 'increasing' | 'decreasing' | 'stable';
  changeRate: number;
  timeframe: string;
  significance: 'minor' | 'moderate' | 'major';
}

export interface CostSavings {
  potentialSavings: number;
  implementationCost: number;
  paybackPeriod: number; // in months
  annualSavings: number;
  roi: number; // percentage
}

export interface PlantOverview {
  totalEquipment: number;
  activeEquipment: number;
  overallEfficiency: number;
  totalEnergyConsumption: number;
  totalCostSavings: number;
  carbonReduction: number;
  equipmentStatus: EquipmentStatus[];
}

export interface EquipmentStatus {
  id: string;
  name: string;
  type: 'chiller' | 'coolingTower' | 'boiler';
  status: 'optimal' | 'good' | 'warning' | 'critical';
  efficiency: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
}

export interface UseCase {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    energySavings: string;
    costReduction: string;
    efficiencyImprovement: string;
    paybackPeriod: string;
  };
  testimonial?: string;
  logo?: string;
}

export interface Win {
  company: string;
  industry: string;
  achievement: string;
  metrics: {
    savings: string;
    efficiency: string;
    environmental: string;
  };
  date: string;
  caseStudyUrl?: string;
}
