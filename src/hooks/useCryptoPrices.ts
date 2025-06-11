import { useState, useEffect } from 'react';
import { PriceData, CryptoCurrency } from '../types';
import { getCryptoPrice } from '../services/api';

const MAX_HISTORY_LENGTH = 100;

export function useCryptoPrices(cryptoId: CryptoCurrency, refreshInterval = 30000) {
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    // Reset state when crypto changes
    setPriceHistory([]);
    setLoading(true);
    setError(null);

    async function fetchPrice() {
      try {
        const newPriceData = await getCryptoPrice(cryptoId);
        if (mounted) {
          setPriceHistory(prevHistory => {
            const updatedHistory = [...prevHistory, newPriceData];
            return updatedHistory.slice(-MAX_HISTORY_LENGTH);
          });
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : `Failed to fetch ${cryptoId} price`;
          setError(errorMessage);
          console.error(`Error fetching ${cryptoId} price:`, err);
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
  }, [cryptoId, refreshInterval]);

  return { priceHistory, error, loading };
}