import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

interface OrderSuccessProps {
  onBackToHome: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ onBackToHome }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setShowConfetti(true);
    
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      onBackToHome();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onBackToHome]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className={`bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-1000 ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
      }`}>
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce-slow">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
        </div>

        {/* Thank You Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up">
            Thank You!
          </h1>
          <p className="text-lg text-green-600 font-semibold mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your order has been placed successfully
          </p>
          <p className="text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            We've received your order and will process it shortly. You'll receive a confirmation email with tracking details.
          </p>
        </div>

        {/* Order Timeline */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-3 animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">Order Confirmed</span>
          </div>
          <div className="flex items-center space-x-3 animate-slide-in-left" style={{ animationDelay: '0.8s' }}>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-700">Processing (1-2 days)</span>
          </div>
          <div className="flex items-center space-x-3 animate-slide-in-left" style={{ animationDelay: '1s' }}>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm text-gray-700">Delivery (2-3 working days)</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-6 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center justify-center space-x-2 text-blue-700 mb-2">
            <Truck className="w-5 h-5" />
            <span className="font-semibold">Expected Delivery</span>
          </div>
          <p className="text-blue-600 font-medium">2-3 Working Days</p>
          <p className="text-blue-500 text-sm mt-1">Free shipping on orders over ₹999</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onBackToHome}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 animate-slide-in-up"
            style={{ animationDelay: '1.4s' }}
          >
            <Home className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
          <p className="text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '1.6s' }}>
            Redirecting to home page in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;