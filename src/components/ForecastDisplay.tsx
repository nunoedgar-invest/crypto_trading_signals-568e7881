import React from 'react';
import { ForecastSignal } from '../types';
import { TrendingUp, TrendingDown, Pause, Calendar, Target } from 'lucide-react';

interface ForecastDisplayProps {
  forecast: ForecastSignal[];
  cryptoSymbol: string;
}

export function ForecastDisplay({ forecast, cryptoSymbol }: ForecastDisplayProps) {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">5-Day Forecast</h2>
        </div>
        <p className="text-gray-500">Loading forecast data...</p>
      </div>
    );
  }

  const getSignalIcon = (type: ForecastSignal['type']) => {
    switch (type) {
      case 'BUY':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'SELL':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Pause className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSignalColor = (type: ForecastSignal['type']) => {
    switch (type) {
      case 'BUY':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'SELL':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStrengthBadge = (strength: ForecastSignal['strength']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (strength) {
      case 'STRONG':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'MODERATE':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'WEAK':
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Calendar className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">5-Day {cryptoSymbol} Forecast</h2>
      </div>
      
      <div className="space-y-4">
        {forecast.map((signal, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getSignalColor(signal.type)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getSignalIcon(signal.type)}
                <div>
                  <h3 className="font-bold text-lg">{signal.type} Signal</h3>
                  <p className="text-sm opacity-75">
                    {signal.date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={getStrengthBadge(signal.strength)}>
                  {signal.strength}
                </span>
                <div className="flex items-center">
                  <Target className={`w-4 h-4 mr-1 ${getConfidenceColor(signal.confidence)}`} />
                  <span className={`text-sm font-medium ${getConfidenceColor(signal.confidence)}`}>
                    {(signal.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Predicted Price: ${signal.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </p>
              <p className="text-sm opacity-75">{signal.reason}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <Target className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Forecast Disclaimer</h4>
            <p className="text-sm text-blue-700">
              These predictions are based on technical analysis and historical patterns. 
              Cryptocurrency markets are highly volatile and unpredictable. Always conduct 
              your own research and consider your risk tolerance before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}