import { PriceData } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const CRYPTO_NEWS_API = 'https://cryptonews-api.com/api/v1';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export async function getBitcoinPrice(): Promise<PriceData> {
  const response = await fetch(
    `${COINGECKO_API}/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`
  );
  const data = await response.json();
  
  return {
    price: data.bitcoin.usd,
    timestamp: Date.now(),
    change24h: data.bitcoin.usd_24h_change,
    volume24h: data.bitcoin.usd_24h_vol
  };
}

export async function getNewsData() {
  try {
    const response = await fetch(
      `${CRYPTO_NEWS_API}/news?tickers=BTC&items=10&token=${API_KEY}`
    );
    const data = await response.json();
    return data.news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getMarketSentiment() {
  try {
    const response = await fetch(
      `${CRYPTO_NEWS_API}/sentiment?tickers=BTC&token=${API_KEY}`
    );
    const data = await response.json();
    return data.sentiment;
  } catch (error) {
    console.error('Error fetching sentiment:', error);
    return 'neutral';
  }
}