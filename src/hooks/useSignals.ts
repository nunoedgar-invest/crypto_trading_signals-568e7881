import { useState, useEffect } from 'react';
import { Signal, PriceData, ForecastSignal } from '../types';
import { calculateRSI, calculateMACD } from '../utils/technicalIndicators';

export function useSignals(priceHistory: PriceData[]) {
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);
  const [forecast, setForecast] = useState<ForecastSignal[]>([]);

  useEffect(() => {
    if (!priceHistory || priceHistory.length < 26) return;

    const prices = priceHistory.map(p => p.price);
    const rsi = calculateRSI(prices);
    const { macd, signal, histogram } = calculateMACD(prices);
    const latestPrice = prices[prices.length - 1];
    const volume24h = priceHistory[priceHistory.length - 1].volume24h;
    const change24h = priceHistory[priceHistory.length - 1].change24h;

    let signalType: Signal['type'] = 'HOLD';
    let strength: Signal['strength'] = 'MODERATE';
    let reason = '';

    // Current signal analysis
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

    if (volume24h > 30000000000) {
      strength = 'STRONG';
      reason += ' with high trading volume';
    }

    if (Math.abs(change24h) > 5) {
      strength = 'STRONG';
      reason += ` and significant price movement (${change24h.toFixed(2)}%)`;
    }

    // Generate 5-day forecast
    const forecastSignals: ForecastSignal[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 5; i++) {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      
      // Use technical indicators to predict future signals
      const trendStrength = Math.abs(histogram) / Math.max(...prices) * 100;
      const momentum = change24h > 0 ? 1 : -1;
      const volatility = Math.abs(change24h) / 100;
      
      let forecastType: Signal['type'];
      let forecastStrength: Signal['strength'];
      let confidence = Math.min(Math.abs(rsi - 50) / 50 + trendStrength / 100, 1);
      
      if (rsi < 40 && momentum > 0) {
        forecastType = 'BUY';
        forecastStrength = confidence > 0.7 ? 'STRONG' : confidence > 0.4 ? 'MODERATE' : 'WEAK';
      } else if (rsi > 60 && momentum < 0) {
        forecastType = 'SELL';
        forecastStrength = confidence > 0.7 ? 'STRONG' : confidence > 0.4 ? 'MODERATE' : 'WEAK';
      } else {
        forecastType = 'HOLD';
        forecastStrength = 'MODERATE';
        confidence = Math.max(0.3, 1 - volatility);
      }

      forecastSignals.push({
        type: forecastType,
        strength: forecastStrength,
        date: forecastDate,
        timestamp: forecastDate.getTime(),
        price: latestPrice * (1 + (Math.random() * 0.1 - 0.05) * i),
        reason: `Forecast based on current ${forecastType.toLowerCase()} trend and market conditions`,
        confidence
      });
    }

    setCurrentSignal({
      type: signalType,
      strength,
      timestamp: Date.now(),
      price: latestPrice,
      reason
    });

    setForecast(forecastSignals);
  }, [priceHistory]);

  return { currentSignal, forecast };
}