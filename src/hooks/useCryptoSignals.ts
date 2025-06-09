import { useState, useEffect } from 'react';
import { Signal, PriceData, ForecastSignal, CryptoCurrency } from '../types';
import { calculateRSI, calculateMACD } from '../utils/technicalIndicators';

export function useCryptoSignals(priceHistory: PriceData[], cryptoId: CryptoCurrency) {
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);
  const [forecast, setForecast] = useState<ForecastSignal[]>([]);

  useEffect(() => {
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

    // Crypto-specific thresholds
    const isEthereum = cryptoId === 'ethereum';
    const volatilityMultiplier = isEthereum ? 1.2 : 1.0; // ETH is typically more volatile
    const volumeThreshold = isEthereum ? 10000000000 : 20000000000; // Different volume scales

    if (prices.length >= 26) {
      const rsi = calculateRSI(prices);
      const { macd, signal, histogram } = calculateMACD(prices);

      // Enhanced RSI thresholds for different cryptos
      const oversoldThreshold = isEthereum ? 25 : 30;
      const overboughtThreshold = isEthereum ? 75 : 70;

      if (rsi < oversoldThreshold && histogram > 0) {
        signalType = 'BUY';
        reason = `Strong oversold conditions for ${cryptoId.toUpperCase()} (RSI: ${rsi.toFixed(1)}) with positive MACD momentum`;
        strength = 'STRONG';
      } else if (rsi > overboughtThreshold && histogram < 0) {
        signalType = 'SELL';
        reason = `Strong overbought conditions for ${cryptoId.toUpperCase()} (RSI: ${rsi.toFixed(1)}) with negative MACD momentum`;
        strength = 'STRONG';
      } else if (macd > signal && histogram > 0) {
        signalType = 'BUY';
        reason = `Positive MACD crossover with bullish momentum for ${cryptoId.toUpperCase()}`;
        strength = 'MODERATE';
      } else if (macd < signal && histogram < 0) {
        signalType = 'SELL';
        reason = `Negative MACD crossover with bearish momentum for ${cryptoId.toUpperCase()}`;
        strength = 'MODERATE';
      } else if (rsi < 40) {
        signalType = 'BUY';
        reason = `${cryptoId.toUpperCase()} showing oversold conditions (RSI: ${rsi.toFixed(1)})`;
        strength = 'WEAK';
      } else if (rsi > 60) {
        signalType = 'SELL';
        reason = `${cryptoId.toUpperCase()} showing overbought conditions (RSI: ${rsi.toFixed(1)})`;
        strength = 'WEAK';
      } else {
        reason = `${cryptoId.toUpperCase()} market in neutral zone (RSI: ${rsi.toFixed(1)})`;
      }
    } else {
      // Price movement analysis with crypto-specific adjustments
      const change24h = latestData.change24h;
      const volume24h = latestData.volume24h;
      const strongMoveThreshold = 5 * volatilityMultiplier;
      const moderateMoveThreshold = 2 * volatilityMultiplier;

      if (change24h > strongMoveThreshold && volume24h > volumeThreshold) {
        signalType = 'BUY';
        reason = `Strong ${cryptoId.toUpperCase()} upward momentum (+${change24h.toFixed(2)}%) with high volume`;
        strength = 'STRONG';
      } else if (change24h < -strongMoveThreshold && volume24h > volumeThreshold) {
        signalType = 'SELL';
        reason = `Strong ${cryptoId.toUpperCase()} downward momentum (${change24h.toFixed(2)}%) with high volume`;
        strength = 'STRONG';
      } else if (change24h > moderateMoveThreshold) {
        signalType = 'BUY';
        reason = `Positive ${cryptoId.toUpperCase()} price movement (+${change24h.toFixed(2)}%) indicates bullish sentiment`;
        strength = 'MODERATE';
      } else if (change24h < -moderateMoveThreshold) {
        signalType = 'SELL';
        reason = `Negative ${cryptoId.toUpperCase()} price movement (${change24h.toFixed(2)}%) indicates bearish sentiment`;
        strength = 'MODERATE';
      } else {
        reason = `${cryptoId.toUpperCase()} showing sideways movement (${change24h.toFixed(2)}% change)`;
      }
    }

    // Volume-based strength enhancement
    const highVolumeThreshold = volumeThreshold * 1.5;
    if (latestData.volume24h > highVolumeThreshold) {
      if (strength === 'WEAK') strength = 'MODERATE';
      else if (strength === 'MODERATE') strength = 'STRONG';
      reason += ' with exceptionally high trading volume';
    }

    // Generate 5-day forecast with crypto-specific volatility
    const forecastSignals: ForecastSignal[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 5; i++) {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      
      let forecastType: Signal['type'];
      let forecastStrength: Signal['strength'];
      let confidence: number;
      
      const trendBias = signalType === 'BUY' ? 0.3 : signalType === 'SELL' ? -0.3 : 0;
      const randomFactor = (Math.random() - 0.5) * 0.4 * volatilityMultiplier;
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

      // Enhanced volatility for price prediction
      const baseVolatility = Math.abs(latestData.change24h) / 100;
      const cryptoVolatility = baseVolatility * volatilityMultiplier;
      const priceChange = (Math.random() - 0.5) * cryptoVolatility * i * 0.5;
      const predictedPrice = latestPrice * (1 + priceChange);

      forecastSignals.push({
        type: forecastType,
        strength: forecastStrength,
        date: forecastDate,
        timestamp: forecastDate.getTime(),
        price: predictedPrice,
        reason: `${cryptoId.toUpperCase()} forecast based on current ${signalType.toLowerCase()} trend and market volatility analysis`,
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
  }, [priceHistory, cryptoId]);

  return { currentSignal, forecast };
}