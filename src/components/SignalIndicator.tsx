import React from 'react';
import { Signal, ForecastSignal } from '../types';
import { TrendingUp, TrendingDown, Pause, Calendar, Target, Clock } from 'lucide-react';

interface SignalIndicatorProps {
  signal: Signal | null;
  forecast?: ForecastSignal[];
}

export function SignalIndicator({ signal, forecast }: SignalIndicatorProps) {
  if (!signal) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">Analyzing market data...</p>
          <p className="text-sm">Please wait while we generate trading signals</p>
        </div>
      </div>
    );
  }

  const getSignalColor = (type: Signal['type']) => {
    switch (type) {
      case 'BUY':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          accent: 'bg-green-500'
        };
      case 'SELL':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          accent: 'bg-red-500'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          accent: 'bg-blue-500'
        };
    }
  };

  const getSignalIcon = (type: Signal['type'], size = 'w-8 h-8') => {
    switch (type) {
      case 'BUY':
        return <TrendingUp className={size} />;
      case 'SELL':
        return <TrendingDown className={size} />;
      default:
        return <Pause className={size} />;
    }
  };

  const getStrengthColor = (strength: Signal['strength']) => {
    switch (strength) {
      case 'STRONG':
        return 'bg-purple-500 text-white';
      case 'MODERATE':
        return 'bg-yellow-500 text-white';
      case 'WEAK':
        return 'bg-gray-400 text-white';
    }
  };

  const colors = getSignalColor(signal.type);

  return (
    <div className="space-y-8">
      {/* Main Trading Signal */}
      <div className={`${colors.bg} ${colors.border} border-2 rounded-xl shadow-xl p-8`}>
        <div className="text-center mb-6">
          <div className={`${colors.accent} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <div className="text-white">
              {getSignalIcon(signal.type, 'w-10 h-10')}
            </div>
          </div>
          <h2 className={`text-4xl font-bold ${colors.text} mb-2`}>
            {signal.type}
          </h2>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${getStrengthColor(signal.strength)}`}>
            <Target className="w-4 h-4 mr-2" />
            {signal.strength} SIGNAL
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`${colors.text}`}>
              <h3 className="font-semibold text-lg mb-2">Signal Details</h3>
              <p className="text-sm leading-relaxed">{signal.reason}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`${colors.text}`}>
              <h3 className="font-semibold text-lg mb-2">Market Data</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Signal Price:</span>
                  <span className="font-mono font-bold">${signal.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Generated:</span>
                  <span className="font-mono">{new Date(signal.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <Calendar className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">5-Day Trading Forecast</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-5">
            {forecast.map((day, index) => {
              const dayColors = getSignalColor(day.type);
              return (
                <div key={day.timestamp} className={`${dayColors.bg} ${dayColors.border} border-2 rounded-lg p-6 text-center transition-all hover:shadow-lg hover:scale-105`}>
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-2">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className={`${dayColors.accent} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <div className="text-white">
                        {getSignalIcon(day.type, 'w-6 h-6')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`font-bold text-lg ${dayColors.text}`}>
                      {day.type}
                    </div>
                    
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${getStrengthColor(day.strength)}`}>
                      {day.strength}
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <div className={`font-mono font-bold ${dayColors.text}`}>
                        ${day.price.toLocaleString()}
                      </div>
                      <div className="text-gray-600">
                        {(day.confidence * 100).toFixed(0)}% confidence
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Disclaimer:</strong> These forecasts are based on technical analysis and should not be considered as financial advice. 
              Always conduct your own research before making trading decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}