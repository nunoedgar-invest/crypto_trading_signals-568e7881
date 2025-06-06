import React from 'react';
import { useSignals } from './hooks/useSignals';
import { SignalIndicator } from './components/SignalIndicator';
import { useBitcoinPrice } from './hooks/useBitcoinPrice';
import { Bitcoin, Activity, TrendingUp } from 'lucide-react';

function App() {
  const { priceHistory, error, loading } = useBitcoinPrice();
  const { currentSignal, forecast } = useSignals(priceHistory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700 font-medium">Loading Bitcoin data...</div>
          <div className="text-sm text-gray-500 mt-2">Fetching real-time market information</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-8 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-red-500 mb-4">
            <Activity className="w-16 h-16 mx-auto" />
          </div>
          <div className="text-xl text-red-600 font-medium mb-2">Connection Error</div>
          <div className="text-gray-600">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentPrice = priceHistory.length > 0 ? priceHistory[priceHistory.length - 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-3 rounded-full">
                <Bitcoin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bitcoin Trading Signals</h1>
                <p className="text-gray-600">AI-powered cryptocurrency trading recommendations</p>
              </div>
            </div>
            
            {currentPrice && (
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  ${currentPrice.price.toLocaleString()}
                </div>
                <div className={`flex items-center justify-end text-sm font-medium ${
                  currentPrice.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 mr-1 ${currentPrice.change24h < 0 ? 'rotate-180' : ''}`} />
                  {currentPrice.change24h >= 0 ? '+' : ''}{currentPrice.change24h.toFixed(2)}% (24h)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <SignalIndicator signal={currentSignal} forecast={forecast} />
      </div>
    </div>
  );
}

export default App;