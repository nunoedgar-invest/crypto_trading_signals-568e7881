import React from 'react';
import { Signal, ForecastSignal } from '../types';
import { TrendingUp, TrendingDown, Pause, Calendar, Target, Clock, Activity } from 'lucide-react';

interface SignalIndicatorProps {
  signal: Signal | null;
  forecast?: ForecastSignal[];
}

export function SignalIndicator({ signal, forecast }: SignalIndicatorProps) {
  if (!signal) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="text-gray-500">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-gray-400 animate-pulse" />
          </div>
          <p className="text-xl font-semibold mb-2">Analyzing Market Data...</p>
          <p className="text-sm text-gray-400">Generating trading signals based on current market conditions</p>
        </div>
      </div>
    );
  }

  const getSignalColor = (type: Signal['type']) => {
    switch (type) {
      case 'BUY':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
          border: 'border-green-300',
          text: 'text-green-800',
          accent: 'bg-gradient-to-r from-green-500 to-emerald-600',
          textAccent: 'text-green-600'
        };
      case 'SELL':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-rose-100',
          border: 'border-red-300',
          text: 'text-red-800',
          accent: 'bg-gradient-to-r from-red-500 to-rose-600',
          textAccent: 'text-red-600'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
          border: 'border-blue-300',
          text: 'text-blue-800',
          accent: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          textAccent: 'text-blue-600'
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
        return 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg';
      case 'MODERATE':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md';
      case 'WEAK':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-sm';
    }
  };

  const colors = getSignalColor(signal.type);

  return (
    <div className="space-y-8">
      {/* Main Trading Signal */}
      <div className={`${colors.bg} ${colors.border} border-2 rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300`}>
        <div className="text-center mb-8">
          <div className={`${colors.accent} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:rotate-12 transition-transform duration-300`}>
            <div className="text-white">
              {getSignalIcon(signal.type, 'w-12 h-12')}
            </div>
          </div>
          
          <h2 className={`text-5xl font-black ${colors.text} mb-4 tracking-tight`}>
            {signal.type}
          </h2>
          
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${getStrengthColor(signal.strength)} transform hover:scale-105 transition-transform`}>
            <Target className="w-5 h-5 mr-2" />
            {signal.strength} SIGNAL
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className={`${colors.text}`}>
              <h3 className="font-bold text-xl mb-3 flex items-center">
                <div className={`w-2 h-2 rounded-full ${colors.accent} mr-3`}></div>
                Signal Analysis
              </h3>
              <p className="text-base leading-relaxed bg-white/50 p-4 rounded-lg">{signal.reason}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`${colors.text}`}>
              <h3 className="font-bold text-xl mb-3 flex items-center">
                <div className={`w-2 h-2 rounded-full ${colors.accent} mr-3`}></div>
                Market Data
              </h3>
              <div className="bg-white/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Signal Price:</span>
                  <span className="font-mono font-bold text-lg">${signal.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Generated:</span>
                  <span className="font-mono text-sm">{new Date(signal.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-full mr-4">
              <Calendar className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">5-Day Trading Forecast</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-5">
            {forecast.map((day, index) => {
              const dayColors = getSignalColor(day.type);
              return (
                <div key={day.timestamp} className={`${dayColors.bg} ${dayColors.border} border-2 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}>
                  <div className="mb-4">
                    <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className={`${dayColors.accent} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <div className="text-white">
                        {getSignalIcon(day.type, 'w-7 h-7')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`font-black text-xl ${dayColors.text}`}>
                      {day.type}
                    </div>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStrengthColor(day.strength)}`}>
                      {day.strength}
                    </div>
                    
                    <div className="text-sm space-y-2">
                      <div className={`font-mono font-bold text-lg ${dayColors.textAccent}`}>
                        ${day.price.toLocaleString()}
                      </div>
                      <div className="text-gray-600 font-medium">
                        {(day.confidence * 100).toFixed(0)}% confidence
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              <strong className="text-gray-900">⚠️ Trading Disclaimer:</strong> These forecasts are generated using technical analysis algorithms and should not be considered as financial advice. 
              Cryptocurrency trading involves substantial risk of loss. Always conduct thorough research and consider your risk tolerance before making any trading decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}