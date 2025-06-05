import React from 'react';
import { Signal, ForecastSignal } from '../types';
import { TrendingUp, TrendingDown, Pause, Calendar } from 'lucide-react';

interface SignalIndicatorProps {
  signal: Signal | null;
  forecast?: ForecastSignal[];
}

export function SignalIndicator({ signal, forecast }: SignalIndicatorProps) {
  if (!signal) return null;

  const getSignalColor = (type: Signal['type']) => {
    switch (type) {
      case 'BUY':
        return 'text-green-600';
      case 'SELL':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSignalIcon = (type: Signal['type']) => {
    switch (type) {
      case 'BUY':
        return <TrendingUp className="w-6 h-6" />;
      case 'SELL':
        return <TrendingDown className="w-6 h-6" />;
      default:
        return <Pause className="w-6 h-6" />;
    }
  };

  const getStrengthBadge = (strength: Signal['strength']) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-semibold";
    switch (strength) {
      case 'STRONG':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'MODERATE':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'WEAK':
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center ${getSignalColor(signal.type)}`}>
            {getSignalIcon(signal.type)}
            <span className="ml-2 text-xl font-bold">{signal.type} Signal</span>
          </div>
          <span className={getStrengthBadge(signal.strength)}>{signal.strength}</span>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-600">{signal.reason}</p>
          <div className="text-sm text-gray-500">
            <p>Price at signal: ${signal.price.toLocaleString()}</p>
            <p>Generated: {new Date(signal.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {forecast && forecast.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-indigo-600" />
            <h2 className="ml-2 text-xl font-bold text-gray-900">5-Day Forecast</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {forecast.map((day, index) => (
              <div key={day.timestamp} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Day {index + 1}
                  </span>
                  <div className={`${getSignalColor(day.type)}`}>
                    {getSignalIcon(day.type)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{day.type}</span>
                    <span className={getStrengthBadge(day.strength)}>{day.strength}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>${day.price.toLocaleString()}</p>
                    <p>Confidence: {(day.confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}