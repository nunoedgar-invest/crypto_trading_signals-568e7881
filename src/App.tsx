import React from 'react';
import { useSignals } from './hooks/useSignals';
import { SignalIndicator } from './components/SignalIndicator';
import { useBitcoinPrice } from './hooks/useBitcoinPrice';

function App() {
  const { priceHistory, error, loading } = useBitcoinPrice();
  const { currentSignal, forecast } = useSignals(priceHistory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading price data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Bitcoin Trading Signals</h1>
        {priceHistory.length > 0 && (
          <div className="text-lg text-gray-700">
            Current Price: ${priceHistory[priceHistory.length - 1].price.toLocaleString()}
          </div>
        )}
        <SignalIndicator signal={currentSignal} forecast={forecast} />
      </div>
    </div>
  );
}

export default App;