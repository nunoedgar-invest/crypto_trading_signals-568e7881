import React from 'react';
import { useSignals } from './hooks/useSignals';
import { SignalIndicator } from './components/SignalIndicator';
import { useBitcoinPrice } from './hooks/useBitcoinPrice';

function App() {
  const { priceHistory } = useBitcoinPrice();
  const currentSignal = useSignals(priceHistory);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Bitcoin Trading Signals</h1>
        <SignalIndicator signal={currentSignal} />
      </div>
    </div>
  );
}

export default App;