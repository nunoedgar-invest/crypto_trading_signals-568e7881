import React from 'react';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Pro Trading!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your subscription has been activated successfully. You now have access to advanced trading signals and forecasting.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-left">
              <Star className="w-5 h-5 text-yellow-500 mr-3" />
              <span className="text-gray-700">Advanced technical indicators</span>
            </div>
            <div className="flex items-center text-left">
              <Star className="w-5 h-5 text-yellow-500 mr-3" />
              <span className="text-gray-700">5-day predictive forecasting</span>
            </div>
            <div className="flex items-center text-left">
              <Star className="w-5 h-5 text-yellow-500 mr-3" />
              <span className="text-gray-700">All cryptocurrencies (BTC, ETH, SOL)</span>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
          >
            Start Trading
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}