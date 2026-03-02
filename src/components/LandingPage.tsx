import React from 'react';
import { ArrowRight, Zap, Thermometer, Wind, Flame, TrendingUp, Award, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onNavigate?: (view: 'landing' | 'login' | 'equipment' | 'energy' | 'admin') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigation = (view: 'landing' | 'login' | 'equipment' | 'energy' | 'admin') => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      window.location.href = `/${view}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold mb-6">
              Central Plant Intelligence
            </h1>
            <p className="text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Advanced AI-powered optimization for chillers, cooling towers, and boilers. 
              Reduce energy costs by up to 30% while improving operational efficiency.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('features')}
                className="button button-primary text-lg px-8 py-4"
              >
                Explore Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="button button-secondary text-lg px-8 py-4"
              >
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-2xl bg-primary">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card bg-transparent border-white/20 text-white">
              <div className="stat-number text-white">30%</div>
              <div className="stat-label text-white/90">Average Energy Savings</div>
            </div>
            <div className="stat-card bg-transparent border-white/20 text-white">
              <div className="stat-number text-white">500+</div>
              <div className="stat-label text-white/90">Facilities Optimized</div>
            </div>
            <div className="stat-card bg-transparent border-white/20 text-white">
              <div className="stat-number text-white">$2.5M</div>
              <div className="stat-label text-white/90">Annual Client Savings</div>
            </div>
            <div className="stat-card bg-transparent border-white/20 text-white">
              <div className="stat-number text-white">24/7</div>
              <div className="stat-label text-white/90">AI Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-2xl bg-secondary">
        <div className="container">
          <div className="text-center mb-2xl">
            <h2 className="text-4xl font-bold mb-4">Equipment Optimization Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive analysis and optimization for your central plant equipment
            </p>
          </div>

          <div className="grid grid-cols-3 gap-xl mb-2xl">
            <div className="feature-card animate-fade-in">
              <div className="feature-icon">
                <Thermometer className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Chiller Optimization</h3>
              <p className="text-gray-600 mb-4">
                Advanced algorithms analyze chiller efficiency, identify optimal setpoints, 
                and predict maintenance needs to maximize performance.
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Real-time efficiency monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Load optimization strategies
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Predictive maintenance alerts
                </li>
              </ul>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon">
                <Wind className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Cooling Tower Analysis</h3>
              <p className="text-gray-600 mb-4">
                Optimize cooling tower performance through water flow analysis, 
                fan speed control, and environmental condition monitoring.
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Approach temperature optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Water usage efficiency
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Weather-based control strategies
                </li>
              </ul>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Boiler Performance</h3>
              <p className="text-gray-600 mb-4">
                Monitor combustion efficiency, track fuel consumption, and optimize 
                boiler sequencing for maximum energy efficiency.
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Combustion efficiency tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Fuel consumption optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  Emissions monitoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-2xl bg-primary">
        <div className="container">
          <div className="text-center mb-2xl">
            <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Real-world results from facilities using our optimization platform
            </p>
          </div>

          <div className="grid grid-cols-3 gap-xl">
            <div className="card bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <div className="text-sm font-medium text-white/70 mb-2">Healthcare</div>
              <h3 className="text-xl font-semibold mb-3">Major Hospital Network</h3>
              <p className="text-white/80 mb-4">
                Optimized 12 chillers across 3 hospital campuses, achieving consistent 
                temperature control while reducing energy consumption.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Energy Savings:</span>
                  <span className="font-semibold">28%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Annual Savings:</span>
                  <span className="font-semibold">$450K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">ROI:</span>
                  <span className="font-semibold">8 months</span>
                </div>
              </div>
            </div>

            <div className="card bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <div className="text-sm font-medium text-white/70 mb-2">Data Centers</div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Data Center</h3>
              <p className="text-white/80 mb-4">
                Implemented advanced cooling tower optimization for critical infrastructure, 
                maintaining optimal temperatures while minimizing water usage.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Energy Savings:</span>
                  <span className="font-semibold">34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Water Reduction:</span>
                  <span className="font-semibold">22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">PUE Improvement:</span>
                  <span className="font-semibold">15%</span>
                </div>
              </div>
            </div>

            <div className="card bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <div className="text-sm font-medium text-white/70 mb-2">Manufacturing</div>
              <h3 className="text-xl font-semibold mb-3">Automotive Plant</h3>
              <p className="text-white/80 mb-4">
                Comprehensive boiler and chiller optimization for 24/7 manufacturing operations, 
                ensuring process stability while maximizing efficiency.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Energy Savings:</span>
                  <span className="font-semibold">31%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Annual Savings:</span>
                  <span className="font-semibold">$680K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Efficiency Gain:</span>
                  <span className="font-semibold">18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-2xl bg-secondary">
        <div className="container">
          <div className="text-center mb-2xl">
            <h2 className="text-4xl font-bold mb-4">Explore Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our comprehensive equipment optimization and energy management tools
            </p>
          </div>

          <div className="grid grid-cols-2 gap-xl max-w-4xl mx-auto">
            <div className="feature-card">
              <div className="feature-icon">
                <Thermometer className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Equipment Analysis</h3>
              <p className="text-gray-600 mb-6">
                Advanced optimization for chillers, cooling towers, and boilers with real-time performance monitoring
              </p>
              <button 
                onClick={() => handleNavigation('equipment')}
                className="button button-primary w-full"
              >
                Try Equipment Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Energy Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive energy usage analysis with Green Button data integration and cost optimization
              </p>
              <button 
                onClick={() => handleNavigation('energy')}
                className="button button-primary w-full"
              >
                View Energy Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-2xl bg-primary">
        <div className="container text-center">
          <div className="card bg-white/10 backdrop-blur-lg border-white/20 text-white p-2xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Optimize Your Central Plant?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of facilities already saving millions in energy costs
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => handleNavigation('login')}
                className="button bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="button button-secondary text-lg px-8 py-4 border-white text-white hover:bg-white/20">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
