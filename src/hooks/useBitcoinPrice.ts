import { useState, useEffect } from 'react';
import { PriceData } from '../types';
import { getBitcoinPrice } from '../services/api';

export function useBitcoinPrice(refreshInterval = 30000) {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchPrice() {
      try {
        const data = await getBitcoinPrice();
        if (mounted) {
          setPriceData(data);
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

  return { priceData, error, loading };
}