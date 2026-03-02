import React, { useState } from 'react';
import { Zap, Eye, EyeOff, Mail, Lock, User, CheckCircle, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCredential, setSelectedCredential] = useState<number | null>(null);

  // Sample credentials for demo
  const sampleCredentials = [
    { email: 'admin@facility.com', password: 'admin123', role: 'Administrator', description: 'Full system access and management' },
    { email: 'engineer@plant.com', password: 'engineer123', role: 'Plant Engineer', description: 'Equipment monitoring and optimization' },
    { email: 'manager@energy.com', password: 'manager123', role: 'Energy Manager', description: 'Energy analysis and reporting' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication check
    setTimeout(() => {
      const validCredential = sampleCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (validCredential) {
        // Store login state and redirect to equipment analysis
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', validCredential.role);
        localStorage.setItem('userEmail', validCredential.email);
        window.location.href = '/equipment';
      } else {
        setError('Invalid credentials. Please try sample credentials below.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSampleLogin = (index: number) => {
    const credential = sampleCredentials[index];
    setEmail(credential.email);
    setPassword(credential.password);
    setSelectedCredential(index);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mr-4">
                <Zap className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold">Central Plant Intelligence</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Optimize Your Energy Operations
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Advanced AI-powered equipment optimization for chillers, cooling towers, and boilers. Achieve up to 30% energy savings with data-driven insights.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Real-time Monitoring</h3>
                <p className="text-white/70">Track equipment performance 24/7 with intelligent alerts</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Predictive Analytics</h3>
                <p className="text-white/70">AI-powered recommendations for optimal efficiency</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Cost Optimization</h3>
                <p className="text-white/70">Reduce energy costs with data-driven insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Central Plant Intelligence</h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">
                Sign in to access your equipment optimization dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>

            {/* Sample Credentials */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-gray-700 text-sm font-medium mb-4 text-center">
                Quick Access - Sample Accounts
              </h3>
              <div className="space-y-3">
                {sampleCredentials.map((cred, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCredential === index 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSampleLogin(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedCredential === index 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{cred.role}</div>
                          <div className="text-sm text-gray-600">{cred.description}</div>
                          <div className="text-xs text-gray-500 mt-1">{cred.email}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {cred.password}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs text-center mt-4">
                Click any account to auto-fill login credentials
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-white">
            <p className="text-sm">
              © 2024 Central Plant Intelligence. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
