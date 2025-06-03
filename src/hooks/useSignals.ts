import { useState, useEffect } from 'react';
import { Signal, PriceData } from '../types';
import { calculateRSI, calculateMACD } from '../utils/technicalIndicators';

export function useSignals(priceHistory: PriceData[]) {
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);

  useEffect(() => {
    if (priceHistory.length < 26) return; // Need minimum data for MACD

    const prices = priceHistory.map(p => p.price);
    const rsi = calculateRSI(prices);
    const { macd, signal, histogram } = calculateMACD(prices);
    const latestPrice = prices[prices.length - 1];
    const volume24h = priceHistory[priceHistory.length - 1].volume24h;
    const change24h = priceHistory[priceHistory.length - 1].change24h;

    let signalType: Signal['type'] = 'HOLD';
    let strength: Signal['strength'] = 'MODERATE';
    let reason = '';

    // Analyze technical indicators
    if (rsi < 30 && histogram > 0) {
      signalType = 'BUY';
      reason = 'Oversold conditions with positive MACD momentum';
      strength = 'STRONG';
    } else if (rsi > 70 && histogram < 0) {
      signalType = 'SELL';
      reason = 'Overbought conditions with negative MACD momentum';
      strength = 'STRONG';
    } else if (macd > signal && histogram > 0) {
      signalType = 'BUY';
      reason = 'Positive MACD crossover';
      strength = 'MODERATE';
    } else if (macd < signal && histogram < 0) {
      signalType = 'SELL';
      reason = 'Negative MACD crossover';
      strength = 'MODERATE';
    }

    // Volume analysis
    if (volume24h > 30000000000) { // High volume threshold
      strength = 'STRONG';
      reason += ' with high trading volume';
    }

    // Price momentum
    if (Math.abs(change24h) > 5) {
      strength = 'STRONG';
      reason += ` and significant price movement (${change24h.toFixed(2)}%)`;
    }

    setCurrentSignal({
      type: signalType,
      strength,
      timestamp: Date.now(),
      price: latestPrice,
      reason
    });
  }, [priceHistory]);

  return currentSignal;
}