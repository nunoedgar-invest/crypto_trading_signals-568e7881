# Crypto Trading Signals

A real-time cryptocurrency trading signals application that provides technical and fundamental analysis for Bitcoin and Ethereum trading decisions.

## Features

- **Multi-Cryptocurrency Support**: Real-time price monitoring for Bitcoin (BTC) and Ethereum (ETH)
- **Advanced Technical Analysis**: RSI, MACD indicators with crypto-specific analysis
- **Intelligent Trading Signals**: BUY, SELL, HOLD recommendations with strength indicators
- **5-Day Forecasting**: AI-powered price predictions with confidence levels
- **Volume Analysis**: High-volume trading detection and analysis
- **24-Hour Tracking**: Real-time price change monitoring
- **Responsive Design**: Beautiful, production-ready UI with Tailwind CSS
- **Crypto Selector**: Seamless switching between supported cryptocurrencies

## Supported Cryptocurrencies

- **Bitcoin (BTC)** - The original cryptocurrency with comprehensive technical analysis
- **Ethereum (ETH)** - Smart contract platform with enhanced volatility analysis

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for responsive, modern design
- **Charts**: Lightweight Charts for price visualization
- **Icons**: Lucide React for consistent iconography
- **API**: CoinGecko API for real-time cryptocurrency data

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-trading-signals.git
cd crypto-trading-signals
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional for news features):
```env
VITE_NEWS_API_KEY=your_news_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Trading Signals

The application provides intelligent trading signals based on multiple factors:

- **Technical Indicators**: RSI (Relative Strength Index) and MACD analysis
- **Volume Analysis**: Trading volume patterns and anomaly detection
- **Price Momentum**: Short-term and long-term trend analysis
- **Crypto-Specific Analysis**: Tailored algorithms for Bitcoin and Ethereum characteristics

### Signal Categories

**Signal Types:**
- 🟢 **BUY**: Bullish market conditions detected
- 🔴 **SELL**: Bearish market conditions detected  
- 🟡 **HOLD**: Neutral market conditions, wait for clearer signals

**Signal Strength:**
- 🔥 **STRONG**: High confidence recommendation with multiple confirming indicators
- ⚡ **MODERATE**: Good confidence with some supporting indicators
- 💫 **WEAK**: Low confidence, proceed with caution

### 5-Day Forecast

Each signal includes a 5-day trading forecast featuring:
- Daily price predictions
- Confidence levels for each prediction
- Trend analysis based on current market conditions
- Crypto-specific volatility considerations

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## API Integration

The application uses the CoinGecko API for real-time cryptocurrency data:
- Price feeds updated every 30 seconds
- 24-hour volume and change tracking
- Market cap information
- No API key required for basic functionality

## Project Structure

```
src/
├── components/          # React components
│   ├── CryptoSelector.tsx    # Cryptocurrency selection interface
│   └── SignalIndicator.tsx   # Trading signal display
├── hooks/              # Custom React hooks
│   ├── useCryptoPrices.ts    # Multi-crypto price management
│   └── useCryptoSignals.ts   # Signal generation logic
├── services/           # API and external services
│   └── api.ts         # CoinGecko API integration
├── types/             # TypeScript type definitions
│   └── index.ts       # Core application types
└── utils/             # Utility functions
    └── technicalIndicators.ts # RSI, MACD calculations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] MetaMask wallet integration
- [ ] Additional cryptocurrencies (ADA, SOL, DOT)
- [ ] Portfolio tracking and management
- [ ] Advanced charting with technical overlays
- [ ] Push notifications for signal alerts
- [ ] Historical backtesting of signal performance
- [ ] Social trading features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

⚠️ **Important**: This application is for educational and informational purposes only. Cryptocurrency trading involves substantial risk of loss and is not suitable for all investors. The trading signals and forecasts provided by this application should not be considered as financial advice. 

**Key Points:**
- Past performance does not guarantee future results
- All trading decisions should be made after thorough research
- Consider your risk tolerance and financial situation
- Consult with qualified financial advisors before making investment decisions
- The developers are not responsible for any financial losses incurred

**Remember**: Only invest what you can afford to lose in cryptocurrency markets.
