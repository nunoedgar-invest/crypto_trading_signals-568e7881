import React from 'react';
import { CryptoCurrency, CryptoInfo } from '../types';
import { Bitcoin, Zap } from 'lucide-react';

interface CryptoSelectorProps {
  selectedCrypto: CryptoCurrency;
  onCryptoChange: (crypto: CryptoCurrency) => void;
}

const cryptoOptions: CryptoInfo[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'bitcoin',
    color: 'from-orange-500 to-yellow-600'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'ethereum',
    color: 'from-blue-500 to-purple-600'
  }
];

export function CryptoSelector({ selectedCrypto, onCryptoChange }: CryptoSelectorProps) {
  const getCryptoIcon = (iconType: string, className: string) => {
    switch (iconType) {
      case 'bitcoin':
        return <Bitcoin className={className} />;
      case 'ethereum':
        return <Zap className={className} />;
      default:
        return <Bitcoin className={className} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Select Cryptocurrency
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cryptoOptions.map((crypto) => {
          const isSelected = selectedCrypto === crypto.id;
          
          return (
            <button
              key={crypto.id}
              onClick={() => onCryptoChange(crypto.id)}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                ${isSelected 
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg
                  bg-gradient-to-r ${crypto.color}
                `}>
                  {getCryptoIcon(crypto.icon, 'w-8 h-8')}
                </div>
                
                <div className="text-left">
                  <h3 className={`text-xl font-bold ${isSelected ? 'text-blue-800' : 'text-gray-900'}`}>
                    {crypto.name}
                  </h3>
                  <p className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                    {crypto.symbol}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}