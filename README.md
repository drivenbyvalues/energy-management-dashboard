# Central Plant Intelligence Platform

A comprehensive React-based platform for central plant equipment optimization, featuring advanced AI-powered analysis for chillers, cooling towers, and boilers. Transform your facility operations with data-driven insights and achieve up to 30% energy savings.

## 🚀 Primary Features

### Equipment Optimization
- **Chiller Analysis**: Real-time efficiency monitoring, load optimization, and predictive maintenance
- **Cooling Tower Performance**: Approach temperature optimization, water usage efficiency, and weather-based control
- **Boiler Optimization**: Combustion efficiency tracking, fuel consumption optimization, and emissions monitoring

### Professional Capabilities
- **Apple-Inspired Design**: Modern, intuitive interface with smooth animations and transitions
- **Comprehensive Analytics**: Performance metrics, trend analysis, and alert systems
- **Cost-Benefit Analysis**: ROI calculations, payback periods, and implementation recommendations
- **Real-Time Monitoring**: Live equipment status and performance indicators

### Energy Management (Sub-Feature)
- **Green Button Integration**: Upload XML or CSV files for energy usage analysis
- **Peak Demand Detection**: Identify high consumption periods and optimization opportunities
- **Cost Estimation**: Calculate energy costs and potential savings
- **Interactive Visualizations**: Real-time charts and usage patterns

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd energy-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000` (or another port if 3000 is occupied).

### Using the Dashboard

1. **Upload Data**: Click the upload area or drag and drop your Green Button data file (XML or CSV format)
2. **View Analysis**: The dashboard automatically processes your data and displays:
   - Total consumption metrics
   - Peak demand periods
   - High usage timeframes
   - Cost estimates
   - Energy efficiency recommendations
3. **Explore Visualizations**: Interactive charts show energy usage patterns over time
4. **Review Recommendations**: Check the insights panel for actionable energy-saving tips

## Supported Data Formats

### CSV Format
```csv
Date,Duration,Value
2024-01-01 00:00,60,1.2
2024-01-01 01:00,60,1.1
```

- **Date**: Timestamp in any standard date format
- **Duration**: Reading interval in minutes (default: 60)
- **Value**: Energy consumption in kWh

### XML Format
Standard Green Button XML format with IntervalBlock and IntervalReading elements.

## Sample Data

A sample CSV file (`sample-data.csv`) is included in the project root for testing purposes. This contains 48 hours of simulated energy usage data.

## Project Structure

```
energy-dashboard/
├── src/
│   ├── components/
│   │   ├── AnalysisPanel.tsx      # Energy analysis insights display
│   │   ├── EnergyChart.tsx        # Interactive usage chart
│   │   ├── FileUpload.tsx         # File upload component
│   │   └── StatsCard.tsx          # Metric display cards
│   ├── types/
│   │   └── greenButton.ts         # TypeScript interfaces
│   ├── utils/
│   │   └── greenButtonParser.ts   # Data parsing and analysis logic
│   ├── App.tsx                    # Main application component
│   └── index.css                  # Global styles
├── sample-data.csv                # Sample energy data
└── README.md
```

## Key Components

### Data Parser (`greenButtonParser.ts`)
- Parses XML and CSV Green Button data formats
- Calculates energy usage statistics
- Detects peak demand periods (>80% of maximum usage)
- Identifies high usage periods (top 10% percentile)
- Generates energy efficiency recommendations

### Analysis Features
- **Total Consumption**: Sum of all energy usage
- **Average Daily Consumption**: Mean energy usage per day
- **Peak Demand Detection**: Identifies sustained high-demand periods
- **Cost Estimation**: Calculates costs at $0.12/kWh (configurable)
- **Smart Recommendations**: Context-aware efficiency suggestions

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized for best performance.

## Technologies Used

- **React** with TypeScript
- **Recharts** for data visualization
- **Lucide React** for icons
- **date-fns** for date formatting
- **D3** for advanced data processing

## Customization

### Adjusting Peak Demand Threshold
Edit `src/utils/greenButtonParser.ts`:
```typescript
// Default is 0.8 (80% of max)
detectPeakDemandPeriods(readings, 0.9) // 90% threshold
```

### Changing Cost Rate
Edit `src/utils/greenButtonParser.ts`:
```typescript
// Default is $0.12 per kWh
const costEstimate = usageData.totalConsumption * 0.15; // $0.15/kWh
```

### Modifying High Usage Percentile
Edit `src/utils/greenButtonParser.ts`:
```typescript
// Default is 90th percentile
findHighUsagePeriods(readings, 95) // Top 5%
```

## Future Enhancements

- Export analysis reports to PDF
- Compare multiple time periods
- Set custom energy rate schedules
- Integration with smart meter APIs
- Historical trend analysis
- Carbon footprint calculations
- Budget tracking and alerts

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the project repository.
