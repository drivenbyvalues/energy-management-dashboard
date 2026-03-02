export interface GreenButtonReading {
  start: Date;
  duration: number; // in minutes
  value: number; // in kWh
}

export interface EnergyUsageData {
  readings: GreenButtonReading[];
  totalConsumption: number;
  averageConsumption: number;
  peakDemand: number;
  peakDemandTime: Date;
}

export interface PeakDemandPeriod {
  start: Date;
  end: Date;
  demand: number;
  duration: number;
}

export interface EnergyAnalysis {
  totalConsumption: number;
  averageDailyConsumption: number;
  peakDemandPeriods: PeakDemandPeriod[];
  highUsagePeriods: GreenButtonReading[];
  costEstimate: number;
  recommendations: string[];
}

export interface GreenButtonData {
  usage: EnergyUsageData;
  analysis: EnergyAnalysis;
  metadata: {
    startDate: Date;
    endDate: Date;
    meterId: string;
    utility: string;
    unit: string;
  };
}
