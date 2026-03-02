import React from 'react';
import { Zap, ArrowLeft, User, LogOut, Settings, BarChart3, Thermometer, Wind, Flame } from 'lucide-react';

interface NavigationProps {
  currentView: 'landing' | 'login' | 'equipment' | 'energy' | 'admin';
  userEmail: string;
  userRole: string;
  isAuthenticated: boolean;
  onNavigate: (view: 'landing' | 'login' | 'equipment' | 'energy' | 'admin') => void;
  onLogout: () => void;
  onBackToLanding: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  userEmail,
  userRole,
  isAuthenticated,
  onNavigate,
  onLogout,
  onBackToLanding
}) => {
  const getNavigationIcon = (view: string) => {
    switch (view) {
      case 'equipment': return <Thermometer className="w-4 h-4" />;
      case 'energy': return <BarChart3 className="w-4 h-4" />;
      case 'admin': return <Settings className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getNavigationLabel = (view: string) => {
    switch (view) {
      case 'equipment': return 'Equipment Analysis';
      case 'energy': return 'Energy Dashboard';
      case 'admin': return 'Algorithm Settings';
      default: return 'Dashboard';
    }
  };

  const navigationItems: Array<{id: 'equipment' | 'energy' | 'admin', label: string, icon: React.ReactNode}> = [
    { id: 'equipment', label: 'Equipment Analysis', icon: <Thermometer className="w-4 h-4" /> },
    { id: 'energy', label: 'Energy Dashboard', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  if (userRole === 'Administrator') {
    navigationItems.push({ id: 'admin', label: 'Algorithm Settings', icon: <Settings className="w-4 h-4" /> });
  }

  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="flex items-center">
          {currentView !== 'landing' && (
            <button
              onClick={onBackToLanding}
              className="flex items-center text-gray-700 hover:text-primary transition-colors mr-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          )}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Central Plant Intelligence
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-lg">
          {currentView !== 'landing' && currentView !== 'login' && (
            <div className="nav-links">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-link ${currentView === item.id ? 'text-primary' : ''}`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </button>
              ))}
            </div>
          )}
          
          {isAuthenticated && (
            <div className="flex items-center gap-md">
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">{userEmail}</span>
                <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                  {userRole}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center text-gray-600 hover:text-danger transition-colors text-sm px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
