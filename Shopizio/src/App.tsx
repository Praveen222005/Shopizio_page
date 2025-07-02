import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Star, ShoppingBag } from 'lucide-react';
import HomePage from './components/HomePage';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomePhase, setWelcomePhase] = useState(0); // 0: logo, 1: text, 2: fade out
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [currentPage, setCurrentPage] = useState<'signup' | 'login' | 'home'>('signup');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Welcome animation sequence
    const timer1 = setTimeout(() => setWelcomePhase(1), 1000); // Show text after logo
    const timer2 = setTimeout(() => setWelcomePhase(2), 3500); // Start fade out
    const timer3 = setTimeout(() => {
      setShowWelcome(false);
      setIsLoaded(true);
    }, 4500); // Show login page

    // Generate floating particles for login page
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', password: '' });
      
      // Redirect to home page
      setCurrentPage('home');
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Google sign-in initiated');
      
      // Redirect to home page
      setCurrentPage('home');
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    setCurrentPage('login');
    setFormData({ name: '', email: '', password: '' }); // Reset form
  };

  const switchToSignup = () => {
    setCurrentPage('signup');
    setFormData({ name: '', email: '', password: '' }); // Reset form
  };

  // Show HomePage if user is authenticated
  if (currentPage === 'home') {
    return <HomePage />;
  }

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Welcome Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          {/* Logo Animation */}
          <div className={`transition-all duration-1000 ${welcomePhase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="relative mb-8">
              <div className="w-40 h-40 rounded-3xl flex items-center justify-center shadow-2xl animate-welcome-logo-glow overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="relative">
                  <img 
                    src="/shopizio-logo.png" 
                    alt="Shopizio Logo"
                    className="h-32 w-auto object-contain"
                    onError={(e) => {
                      // Fallback to icon logo if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Logo */}
                  <div className="hidden w-24 h-24 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              {/* Orbiting Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-welcome-orbit">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-welcome-orbit-reverse">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
            </div>
          </div>

          {/* Welcome Text Animation */}
          <div className={`text-center transition-all duration-1000 delay-500 ${welcomePhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-welcome-text-glow">
              Welcome to
            </h1>
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-welcome-text-shimmer">
              Shopizio
            </h2>
            <p className="text-2xl md:text-3xl text-white/80 font-light animate-welcome-text-fade">
              Shopping Website
            </p>
            
            {/* Loading Animation */}
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-welcome-bounce-1"></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-welcome-bounce-2"></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-welcome-bounce-3"></div>
              </div>
            </div>
          </div>

          {/* Fade Out Overlay */}
          <div className={`fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 transition-opacity duration-1000 ${welcomePhase >= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
        </div>
      </div>
    );
  }

  // Login/Signup Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-particle-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Login/Signup Card */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            
            {/* Card Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-spin-slow"></div>
            
            {/* Header Section */}
            <div className="relative text-center mb-8">
              {/* Animated Logo Container - Updated for better visibility */}
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl animate-icon-glow overflow-hidden bg-white/15 backdrop-blur-xl border-2 border-white/30">
                  <div className="relative">
                    <img 
                      src="/shopizio-logo.png" 
                      alt="Shopizio Logo"
                      className="h-24 w-auto object-contain"
                      onError={(e) => {
                        // Fallback to icon logo if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback Logo */}
                    <div className="hidden w-20 h-20 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                {/* Floating Icons Around Main Logo */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-orbit">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-orbit-reverse">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2 animate-text-shimmer">
                {currentPage === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-white/70 text-lg animate-fade-in-up">
                {currentPage === 'login' ? 'Sign in to your account' : 'Join Shopizio today'}
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              
              {/* Name Input - Only show for signup */}
              {currentPage === 'signup' && (
                <div className="relative group animate-slide-in-left">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-all duration-300" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-white/50 text-white backdrop-blur-sm hover:bg-white/15 group-focus-within:bg-white/15"
                    placeholder="Full Name"
                    required
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-pink-500/10 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              )}

              {/* Email Input */}
              <div className="relative group animate-slide-in-right">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-all duration-300" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-white/50 text-white backdrop-blur-sm hover:bg-white/15 group-focus-within:bg-white/15"
                  placeholder="Email Address"
                  required
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-pink-500/10 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>

              {/* Password Input */}
              <div className="relative group animate-slide-in-left">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-white/50 group-focus-within:text-purple-400 transition-all duration-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-14 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-white/50 text-white backdrop-blur-sm hover:bg-white/15 group-focus-within:bg-white/15"
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/50 hover:text-purple-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/50 hover:text-purple-400 transition-colors" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-pink-500/10 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25 animate-slide-in-up relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    currentPage === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-6 animate-fade-in">
                <div className="flex-1 border-t border-white/20"></div>
                <div className="px-4">
                  <span className="text-white/50 text-sm">or continue with</span>
                </div>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white/10 border border-white/20 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/10 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm animate-slide-in-up group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center animate-fade-in-up">
              <p className="text-white/60">
                {currentPage === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={currentPage === 'login' ? switchToSignup : switchToLogin}
                  disabled={isLoading}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentPage === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;