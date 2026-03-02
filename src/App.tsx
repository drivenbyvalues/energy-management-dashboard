import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { EquipmentAnalysis } from './components/EquipmentAnalysis';
import { AdminPage } from './components/AdminPage';
import { Navigation } from './components/Navigation';
import { FileUpload } from './components/FileUpload';
import { AnalysisPanel } from './components/AnalysisPanel';
import { Thermometer, Wind, Flame, BarChart3 } from 'lucide-react';
import { 
  analyzeChillerPerformance, 
  analyzeCoolingTowerPerformance, 
  analyzeBoilerPerformance,
  parseChillerData,
  parseCoolingTowerData,
  parseBoilerData
} from './utils/equipmentParser';
import { processGreenButtonData } from './utils/greenButtonParser';
import { EquipmentAnalysis as EquipmentAnalysisType } from './types/equipment';
import { GreenButtonData } from './types/greenButton';

type ViewType = 'landing' | 'login' | 'equipment' | 'energy' | 'admin';
type EquipmentType = 'chiller' | 'coolingTower' | 'boiler';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType>('chiller');
  const [equipmentData, setEquipmentData] = useState<EquipmentAnalysisType | null>(null);
  const [energyData, setEnergyData] = useState<GreenButtonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  // Check authentication status on mount and handle routing
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      const email = localStorage.getItem('userEmail');
      const role = localStorage.getItem('userRole');
      
      if (auth === 'true' && email && role) {
        setIsAuthenticated(true);
        setUserEmail(email);
        setUserRole(role);
        
        // Handle direct URL navigation
        const path = window.location.pathname;
        if (path === '/equipment') {
          setCurrentView('equipment');
        } else if (path === '/energy') {
          setCurrentView('energy');
        } else if (path === '/admin') {
          setCurrentView('admin');
        } else if (path === '/login') {
          setCurrentView('login');
        } else {
          setCurrentView('landing');
        }
      } else {
        // Redirect to landing if trying to access protected routes
        if (window.location.pathname !== '/' && window.location.pathname !== '/landing') {
          window.location.href = '/';
        }
      }
    };

    checkAuth();
    
    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      if (!isAuthenticated) {
        if (path !== '/' && path !== '/landing') {
          window.location.href = '/';
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  const handleLogin = (email: string, role: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRole(role);
    setCurrentView('landing');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserEmail('');
    setUserRole('');
    setCurrentView('landing');
    window.location.href = '/';
  };

  const handleEquipmentFileUpload = async (content: string, fileType: 'csv' | 'xml') => {
    setIsLoading(true);
    setError(null);
    
    try {
      let analysis: EquipmentAnalysisType;
      
      switch (selectedEquipment) {
        case 'chiller':
          const chillerReadings = parseChillerData(content);
          analysis = analyzeChillerPerformance(chillerReadings);
          break;
        case 'coolingTower':
          const coolingTowerReadings = parseCoolingTowerData(content);
          analysis = analyzeCoolingTowerPerformance(coolingTowerReadings);
          break;
        case 'boiler':
          const boilerReadings = parseBoilerData(content);
          analysis = analyzeBoilerPerformance(boilerReadings);
          break;
        default:
          throw new Error('Unknown equipment type');
      }
      
      setEquipmentData(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnergyFileUpload = async (content: string, fileType: 'xml' | 'csv') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const processedData = processGreenButtonData(content, fileType, {
        meterId: 'unknown',
        utility: 'unknown',
        unit: 'kWh'
      });
      
      setEnergyData(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setEquipmentData(null);
    setEnergyData(null);
    setError(null);
  };

  const navigateToView = (view: 'landing' | 'login' | 'equipment' | 'energy' | 'admin') => {
    if (view === 'login' || isAuthenticated) {
      setCurrentView(view);
      window.history.pushState({}, '', view === 'landing' ? '/' : `/${view}`);
    } else {
      setCurrentView('login');
      window.history.pushState({}, '', '/login');
    }
  };

  const getEquipmentIcon = (type: EquipmentType) => {
    switch (type) {
      case 'chiller': return <Thermometer className="w-6 h-6" />;
      case 'coolingTower': return <Wind className="w-6 h-6" />;
      case 'boiler': return <Flame className="w-6 h-6" />;
    }
  };

  const getEquipmentName = (type: EquipmentType) => {
    switch (type) {
      case 'chiller': return 'Chiller';
      case 'coolingTower': return 'Cooling Tower';
      case 'boiler': return 'Boiler';
    }
  };

  if (currentView === 'login') {
    return <LoginPage />;
  }

  if (currentView === 'landing') {
    return <LandingPage onNavigate={navigateToView} />;
  }

  if (currentView === 'admin') {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Navigation */}
      <Navigation
        currentView={currentView}
        userEmail={userEmail}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        onNavigate={navigateToView}
        onLogout={handleLogout}
        onBackToLanding={handleBackToLanding}
      />

      <main className="container pt-24 pb-xl">
        {currentView === 'equipment' && (
          <div className="space-y-xl">
            {/* Equipment Selection */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6">Equipment Analysis</h2>
              <p className="text-xl text-gray-600 mb-xl max-w-2xl mx-auto">
                Select equipment type to view performance analysis and charts
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-4xl mx-auto mb-xl">
                {(['chiller', 'coolingTower', 'boiler'] as EquipmentType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedEquipment(type)}
                    className={`equipment-card ${selectedEquipment === type ? 'selected' : ''}`}
                  >
                    <div className="equipment-icon">
                      {getEquipmentIcon(type)}
                    </div>
                    <h3 className="text-lg font-semibold mb-sm">
                      {type === 'chiller' ? 'Chiller' : 
                       type === 'coolingTower' ? 'Cooling Tower' : 'Boiler'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {type === 'chiller' ? 'View chiller efficiency and performance' :
                       type === 'coolingTower' ? 'Monitor cooling tower effectiveness' :
                       'Analyze boiler combustion and efficiency'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Analysis Results - Always show with mock data */}
            <div>
              <div className="flex items-center justify-between mb-xl">
                <div>
                  <h2 className="text-3xl font-bold mb-sm">
                    {selectedEquipment === 'chiller' ? 'Chiller' :
                     selectedEquipment === 'coolingTower' ? 'Cooling Tower' : 'Boiler'} Analysis
                  </h2>
                  <p className="text-gray-600">
                    Performance analysis and optimization recommendations
                  </p>
                </div>
              </div>
              
              <EquipmentAnalysis equipmentType={selectedEquipment} />
            </div>
          </div>
        )}

        {currentView === 'energy' && (
          <div className="space-y-xl">
            {!energyData ? (
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-6">Energy Dashboard</h2>
                <p className="text-xl text-gray-600 mb-xl max-w-2xl mx-auto">
                  Upload Green Button data to analyze energy usage patterns and identify optimization opportunities
                </p>
                
                <div className="max-w-2xl mx-auto">
                  <FileUpload
                    onFileUpload={handleEnergyFileUpload}
                    isLoading={isLoading}
                    error={error || undefined}
                  />
                  <div className="mt-lg text-center">
                    <p className="text-sm text-gray-600 mb-md">
                      Sample data available for testing:
                    </p>
                    <div className="flex gap-sm justify-center">
                      <code className="text-xs bg-gray-100 px-sm py-xs rounded">
                        sample-data.csv
                      </code>
                      <code className="text-xs bg-gray-100 px-sm py-xs rounded">
                        sample-green-button.xml
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-xl">
                  <div className="flex items-center">
                    <BarChart3 className="w-8 h-8 text-primary mr-3" />
                    <div>
                      <h2 className="text-3xl font-bold">Energy Analysis</h2>
                      <p className="text-gray-600">
                        {energyData.usage.readings.length} data points analyzed
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEnergyData(null)}
                    className="button button-secondary"
                  >
                    Upload New Data
                  </button>
                </div>
                
                <AnalysisPanel analysis={energyData.analysis} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
