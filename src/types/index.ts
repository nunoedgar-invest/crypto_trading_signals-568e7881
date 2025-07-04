export interface PriceData {
  price: number;
  timestamp: number;
  change24h: number;
  volume24h: number;
}

export interface Signal {
  type: 'BUY' | 'SELL' | 'HOLD';
  strength: 'WEAK' | 'MODERATE' | 'STRONG';
  timestamp: number;
  price: number;
  reason: string;
}

export interface ForecastSignal extends Signal {
  date: Date;
  confidence: number;
}