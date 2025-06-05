import { useState, useEffect } from 'react';
import { PriceData } from '../types';
import { getBitcoinPrice } from '../services/api';

const MAX_HISTORY_LENGTH = 100; // Limit history to prevent unbounded growth

export function useBitcoinPrice(refreshInterval = 30000) {
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchPrice() {
      try {
        const newPriceData = await getBitcoinPrice();
        if (mounted) {
          setPriceHistory(prevHistory => {
            const updatedHistory = [...prevHistory, newPriceData];
            // Keep only the last MAX_HISTORY_LENGTH items
            return updatedHistory.slice(-MAX_HISTORY_LENGTH);
          });
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch Bitcoin price');
          console.error('Error fetching Bitcoin price:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchPrice();

    const interval = setInterval(fetchPrice, refreshInterval);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refreshInterval]);

  return { priceHistory, error, loading };
}