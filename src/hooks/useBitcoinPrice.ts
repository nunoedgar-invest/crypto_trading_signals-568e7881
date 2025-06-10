import { useState, useEffect } from 'react';
import { getBitcoinPrice } from '../services/api';

interface BitcoinPriceData {
  price: number;
  timestamp: number;
  change24h?: number;
}

interface UseBitcoinPriceReturn {
  currentPrice: number | null;
  priceHistory: BitcoinPriceData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export const useBitcoinPrice = (): UseBitcoinPriceReturn => {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceHistory, setPriceHistory] = useState<BitcoinPriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchBitcoinPrice = async () => {
    try {
      setError(null);
      const priceData = await getBitcoinPrice();
      const timestamp = Date.now();
      
      setCurrentPrice(priceData.price);
      setLastUpdated(timestamp);
      
      // Add to price history
      const newPriceData: BitcoinPriceData = {
        price: priceData.price,
        timestamp,
        change24h: priceData.change24h
      };
      
      setPriceHistory(prev => {
        const updated = [...prev, newPriceData];
        // Keep only last 100 entries to prevent memory issues
        return updated.slice(-100);
      });
      
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Bitcoin price');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBitcoinPrice();
    
    // Set up periodic updates every 30 seconds
    const interval = setInterval(fetchBitcoinPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    currentPrice,
    priceHistory,
    isLoading,
    error,
    lastUpdated
  };
};