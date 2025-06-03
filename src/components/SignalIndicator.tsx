import React from 'react';
import { Signal } from '../types';
import { TrendingUp, TrendingDown, Pause } from 'lucide-react';

interface SignalIndicatorProps {
  signal: Signal | null;
}

export function SignalIndicator({ signal }: SignalIndicatorProps) {
  if (!signal) return null;

  const getSignalColor = () => {
    switch (signal.type) {
      case 'BUY':
        return 'text-green-600';
      case 'SELL':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSignalIcon = () => {
    switch (signal.type) {
      case 'BUY':
        return <TrendingUp className="w-6 h-6" />;
      case 'SELL':
        return <TrendingDown className="w-6 h-6" />;
      default:
        return <Pause className="w-6 h-6" />;
    }
  };

  const getStrengthBadge = () => {
    const baseClasses = "px-2 py-1 rounded text-xs font-semibold";
    switch (signal.strength) {
      case 'STRONG':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'MODERATE':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'WEAK':
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center ${getSignalColor()}`}>
          {getSignalIcon()}
          <span className="ml-2 text-xl font-bold">{signal.type} Signal</span>
        </div>
        <span className={getStrengthBadge()}>{signal.strength}</span>
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-600">{signal.reason}</p>
        <div className="text-sm text-gray-500">
          <p>Price at signal: ${signal.price.toLocaleString()}</p>
          <p>Generated: {new Date(signal.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}