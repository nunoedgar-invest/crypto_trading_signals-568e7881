import React, { useState } from 'react';
import { CryptoSelector } from './components/CryptoSelector';
import { PriceDisplay } from './components/PriceDisplay';
import { SignalIndicator } from './components/SignalIndicator';
import { ForecastDisplay } from './components/ForecastDisplay';
import { ValueProposition } from './components/ValueProposition';
import { PricingSection } from './components/PricingSection';
import { useCryptoPrices } from './hooks/useCryptoPrices';
import { useCryptoSignals } from './hooks/useCryptoSignals';
import { CryptoCurrency } from './types';
import { BarChart3, TrendingUp } from 'lucide-react';

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('bitcoin');
  const { priceHistory, error, loading } = useCryptoPrices(selectedCrypto);
  const { currentSignal, forecast } = useCryptoSignals(priceHistory, selectedCrypto);

  const currentPrice = priceHistory.length > 0 ? priceHistory[priceHistory.length - 1] : null;
  const cryptoInfo = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC' },
    ethereum: { name: 'Ethereum', symbol: 'ETH' },
    solana: { name: 'Solana', symbol: 'SOL' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Crypto Trading Signals</h1>
              <p className="text-gray-600 mt-2">Advanced technical analysis and 5-day forecasts</p>
            </div>
          </div>
        </div>

        {/* Crypto Selector */}
        <CryptoSelector 
          selectedCrypto={selectedCrypto} 
          onCryptoChange={setSelectedCrypto} 
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Price Display */}
          <PriceDisplay
            priceData={currentPrice}
            cryptoName={cryptoInfo[selectedCrypto].name}
            cryptoSymbol={cryptoInfo[selectedCrypto].symbol}
            isLoading={loading}
            error={error}
          />

          {/* Current Signal */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Current Signal</h2>
            </div>
            <SignalIndicator signal={currentSignal} />
          </div>
        </div>

        {/* 5-Day Forecast */}
        <ForecastDisplay 
          forecast={forecast} 
          cryptoSymbol={cryptoInfo[selectedCrypto].symbol}
        />

        {/* Value Proposition Section */}
        <ValueProposition />

        {/* Pricing Section */}
        <PricingSection />

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Risk Disclaimer
            </h3>
            <p className="text-sm text-gray-600">
              This application provides educational content and technical analysis for informational purposes only. 
              Cryptocurrency trading involves substantial risk and may not be suitable for all investors. 
              Past performance does not guarantee future results. Always conduct your own research and 
              consider consulting with a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;