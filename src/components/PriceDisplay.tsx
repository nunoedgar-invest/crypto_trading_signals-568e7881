import React from 'react';
import { PriceData } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface PriceDisplayProps {
  priceData: PriceData | null;
  cryptoName: string;
  cryptoSymbol: string;
  isLoading: boolean;
  error: string | null;
}

export function PriceDisplay({ priceData, cryptoName, cryptoSymbol, isLoading, error }: PriceDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <Activity className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-800">Error Loading Price</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!priceData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-500">No price data available</p>
      </div>
    );
  }

  const isPositive = priceData.change24h >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeBgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{cryptoName}</h2>
            <p className="text-gray-500 font-medium">{cryptoSymbol}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            ${priceData.price.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </p>
          <p className="text-sm text-gray-500">Current Price</p>
        </div>

        <div className={`flex items-center p-3 rounded-lg ${changeBgColor}`}>
          <TrendIcon className={`w-5 h-5 mr-2 ${changeColor}`} />
          <div className="flex-1">
            <p className={`font-semibold ${changeColor}`}>
              {isPositive ? '+' : ''}{priceData.change24h.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-600">24h Change</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">
              ${priceData.volume24h.toLocaleString(undefined, { 
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              })}
            </p>
            <p className="text-sm text-gray-600">24h Volume</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Last updated: {new Date(priceData.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}