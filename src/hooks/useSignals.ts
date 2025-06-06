import { useState, useEffect } from 'react';
import { Signal, PriceData, ForecastSignal } from '../types';
import { calculateRSI, calculateMACD } from '../utils/technicalIndicators';

export function useSignals(priceHistory: PriceData[]) {
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);
  const [forecast, setForecast] = useState<ForecastSignal[]>([]);

  useEffect(() => {
    // Generate signals even with limited data
    if (!priceHistory || priceHistory.length === 0) {
      setCurrentSignal(null);
      setForecast([]);
      return;
    }

    const prices = priceHistory.map(p => p.price);
    const latestPrice = prices[prices.length - 1];
    const latestData = priceHistory[priceHistory.length - 1];
    
    let signalType: Signal['type'] = 'HOLD';
    let strength: Signal['strength'] = 'MODERATE';
    let reason = '';

    // If we have enough data for technical indicators
    if (prices.length >= 26) {
      const rsi = calculateRSI(prices);
      const { macd, signal, histogram } = calculateMACD(prices);

      if (rsi < 30 && histogram > 0) {
        signalType = 'BUY';
        reason = `Strong oversold conditions (RSI: ${rsi.toFixed(1)}) with positive MACD momentum`;
        strength = 'STRONG';
      } else if (rsi > 70 && histogram < 0) {
        signalType = 'SELL';
        reason = `Strong overbought conditions (RSI: ${rsi.toFixed(1)}) with negative MACD momentum`;
        strength = 'STRONG';
      } else if (macd > signal && histogram > 0) {
        signalType = 'BUY';
        reason = `Positive MACD crossover with bullish momentum`;
        strength = 'MODERATE';
      } else if (macd < signal && histogram < 0) {
        signalType = 'SELL';
        reason = `Negative MACD crossover with bearish momentum`;
        strength = 'MODERATE';
      } else if (rsi < 40) {
        signalType = 'BUY';
        reason = `Oversold conditions detected (RSI: ${rsi.toFixed(1)})`;
        strength = 'WEAK';
      } else if (rsi > 60) {
        signalType = 'SELL';
        reason = `Overbought conditions detected (RSI: ${rsi.toFixed(1)})`;
        strength = 'WEAK';
      } else {
        reason = `Market in neutral zone (RSI: ${rsi.toFixed(1)})`;
      }
    } else {
      // Generate signals based on price movement and volume when we don't have enough technical data
      const change24h = latestData.change24h;
      const volume24h = latestData.volume24h;

      if (change24h > 5 && volume24h > 20000000000) {
        signalType = 'BUY';
        reason = `Strong upward momentum (+${change24h.toFixed(2)}%) with high volume`;
        strength = 'STRONG';
      } else if (change24h < -5 && volume24h > 20000000000) {
        signalType = 'SELL';
        reason = `Strong downward momentum (${change24h.toFixed(2)}%) with high volume`;
        strength = 'STRONG';
      } else if (change24h > 2) {
        signalType = 'BUY';
        reason = `Positive price movement (+${change24h.toFixed(2)}%) indicates bullish sentiment`;
        strength = 'MODERATE';
      } else if (change24h < -2) {
        signalType = 'SELL';
        reason = `Negative price movement (${change24h.toFixed(2)}%) indicates bearish sentiment`;
        strength = 'MODERATE';
      } else {
        reason = `Market showing sideways movement (${change24h.toFixed(2)}% change)`;
      }
    }

    // Enhance signal strength based on volume
    if (latestData.volume24h > 30000000000) {
      if (strength === 'WEAK') strength = 'MODERATE';
      else if (strength === 'MODERATE') strength = 'STRONG';
      reason += ' with exceptionally high trading volume';
    }

    // Generate 5-day forecast
    const forecastSignals: ForecastSignal[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 5; i++) {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      
      // Create varied forecast based on current signal and market conditions
      let forecastType: Signal['type'];
      let forecastStrength: Signal['strength'];
      let confidence: number;
      
      // Add some randomness but bias towards current trend
      const trendBias = signalType === 'BUY' ? 0.3 : signalType === 'SELL' ? -0.3 : 0;
      const randomFactor = (Math.random() - 0.5) * 0.4;
      const dayFactor = trendBias + randomFactor + (Math.random() - 0.5) * 0.2 * i;
      
      if (dayFactor > 0.2) {
        forecastType = 'BUY';
        forecastStrength = dayFactor > 0.4 ? 'STRONG' : dayFactor > 0.25 ? 'MODERATE' : 'WEAK';
        confidence = Math.min(0.9, 0.5 + dayFactor);
      } else if (dayFactor < -0.2) {
        forecastType = 'SELL';
        forecastStrength = dayFactor < -0.4 ? 'STRONG' : dayFactor < -0.25 ? 'MODERATE' : 'WEAK';
        confidence = Math.min(0.9, 0.5 - dayFactor);
      } else {
        forecastType = 'HOLD';
        forecastStrength = 'MODERATE';
        confidence = 0.6 + Math.random() * 0.2;
      }

      // Generate realistic price prediction
      const volatility = Math.abs(latestData.change24h) / 100;
      const priceChange = (Math.random() - 0.5) * volatility * i * 0.5;
      const predictedPrice = latestPrice * (1 + priceChange);

      forecastSignals.push({
        type: forecastType,
        strength: forecastStrength,
        date: forecastDate,
        timestamp: forecastDate.getTime(),
        price: predictedPrice,
        reason: `Forecast based on current ${signalType.toLowerCase()} trend and market volatility analysis`,
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