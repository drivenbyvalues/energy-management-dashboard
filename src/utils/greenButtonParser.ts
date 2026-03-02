import { GreenButtonReading, EnergyUsageData, EnergyAnalysis, PeakDemandPeriod, GreenButtonData } from '../types/greenButton';

export function parseGreenButtonXML(xmlString: string): GreenButtonReading[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  const readings: GreenButtonReading[] = [];
  const intervalBlocks = xmlDoc.getElementsByTagName('IntervalBlock');
  
  for (let i = 0; i < intervalBlocks.length; i++) {
    const intervalReadings = intervalBlocks[i].getElementsByTagName('IntervalReading');
    
    for (let j = 0; j < intervalReadings.length; j++) {
      const reading = intervalReadings[j];
      const start = reading.getElementsByTagName('start')[0]?.textContent;
      const duration = reading.getElementsByTagName('duration')[0]?.textContent;
      const value = reading.getElementsByTagName('value')[0]?.textContent;
      
      if (start && duration && value) {
        readings.push({
          start: new Date(start),
          duration: parseInt(duration),
          value: parseFloat(value)
        });
      }
    }
  }
  
  return readings.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function parseGreenButtonCSV(csvString: string): GreenButtonReading[] {
  const lines = csvString.trim().split('\n');
  const readings: GreenButtonReading[] = [];
  
  // Skip header if present
  const startIndex = lines[0].toLowerCase().includes('date') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(',');
    if (columns.length >= 3) {
      const dateStr = columns[0].trim();
      const duration = parseInt(columns[1].trim()) || 60; // default to 60 minutes
      const value = parseFloat(columns[2].trim());
      
      if (dateStr && !isNaN(value)) {
        readings.push({
          start: new Date(dateStr),
          duration,
          value
        });
      }
    }
  }
  
  return readings.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function calculateEnergyUsageData(readings: GreenButtonReading[]): EnergyUsageData {
  if (readings.length === 0) {
    return {
      readings: [],
      totalConsumption: 0,
      averageConsumption: 0,
      peakDemand: 0,
      peakDemandTime: new Date()
    };
  }

  const totalConsumption = readings.reduce((sum, reading) => sum + reading.value, 0);
  const averageConsumption = totalConsumption / readings.length;
  
  const peakReading = readings.reduce((max, reading) => 
    reading.value > max.value ? reading : max
  );

  return {
    readings,
    totalConsumption,
    averageConsumption,
    peakDemand: peakReading.value,
    peakDemandTime: peakReading.start
  };
}

export function detectPeakDemandPeriods(readings: GreenButtonReading[], threshold: number = 0.8): PeakDemandPeriod[] {
  if (readings.length === 0) return [];
  
  const maxValue = Math.max(...readings.map(r => r.value));
  const thresholdValue = maxValue * threshold;
  
  const peakPeriods: PeakDemandPeriod[] = [];
  let currentPeak: PeakDemandPeriod | null = null;
  
  for (const reading of readings) {
    if (reading.value >= thresholdValue) {
      if (!currentPeak) {
        currentPeak = {
          start: reading.start,
          end: new Date(reading.start.getTime() + reading.duration * 60000),
          demand: reading.value,
          duration: reading.duration
        };
      } else {
        currentPeak.end = new Date(reading.start.getTime() + reading.duration * 60000);
        currentPeak.duration += reading.duration;
        currentPeak.demand = Math.max(currentPeak.demand, reading.value);
      }
    } else {
      if (currentPeak) {
        peakPeriods.push(currentPeak);
        currentPeak = null;
      }
    }
  }
  
  if (currentPeak) {
    peakPeriods.push(currentPeak);
  }
  
  return peakPeriods;
}

export function findHighUsagePeriods(readings: GreenButtonReading[], percentile: number = 90): GreenButtonReading[] {
  if (readings.length === 0) return [];
  
  const values = readings.map(r => r.value).sort((a, b) => a - b);
  const thresholdIndex = Math.floor(values.length * (percentile / 100));
  const thresholdValue = values[thresholdIndex];
  
  return readings.filter(reading => reading.value >= thresholdValue);
}

export function generateEnergyAnalysis(readings: GreenButtonReading[]): EnergyAnalysis {
  const usageData = calculateEnergyUsageData(readings);
  const peakPeriods = detectPeakDemandPeriods(readings);
  const highUsagePeriods = findHighUsagePeriods(readings);
  
  // Estimate cost (assuming $0.12 per kWh)
  const costEstimate = usageData.totalConsumption * 0.12;
  
  const recommendations = generateRecommendations(usageData, peakPeriods, highUsagePeriods);
  
  return {
    totalConsumption: usageData.totalConsumption,
    averageDailyConsumption: usageData.averageConsumption * 24, // Convert to daily
    peakDemandPeriods: peakPeriods,
    highUsagePeriods,
    costEstimate,
    recommendations
  };
}

function generateRecommendations(usageData: EnergyUsageData, peakPeriods: PeakDemandPeriod[], highUsagePeriods: GreenButtonReading[]): string[] {
  const recommendations: string[] = [];
  
  if (peakPeriods.length > 0) {
    recommendations.push(`Consider shifting energy-intensive activities away from peak demand periods to reduce costs.`);
  }
  
  if (usageData.peakDemand > usageData.averageConsumption * 3) {
    recommendations.push(`Your peak demand is significantly higher than average usage. Consider load balancing strategies.`);
  }
  
  if (highUsagePeriods.length > usageData.readings.length * 0.2) {
    recommendations.push(`You have frequent high-usage periods. Review your energy consumption patterns for optimization opportunities.`);
  }
  
  recommendations.push(`Consider implementing energy-efficient appliances and LED lighting to reduce overall consumption.`);
  recommendations.push(`Regular maintenance of HVAC systems can improve energy efficiency.`);
  
  return recommendations;
}

export function processGreenButtonData(
  fileContent: string, 
  fileType: 'xml' | 'csv',
  metadata: {
    meterId: string;
    utility: string;
    unit: string;
  }
): GreenButtonData {
  const readings = fileType === 'xml' ? parseGreenButtonXML(fileContent) : parseGreenButtonCSV(fileContent);
  const usage = calculateEnergyUsageData(readings);
  const analysis = generateEnergyAnalysis(readings);
  
  const startDate = readings.length > 0 ? readings[0].start : new Date();
  const endDate = readings.length > 0 ? readings[readings.length - 1].start : new Date();
  
  return {
    usage,
    analysis,
    metadata: {
      startDate,
      endDate,
      ...metadata
    }
  };
}
