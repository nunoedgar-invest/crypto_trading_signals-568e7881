# Bitcoin Trading Signals

A real-time Bitcoin trading signals application that provides technical and fundamental analysis for cryptocurrency trading decisions.

## Features

- Real-time Bitcoin price monitoring
- Technical analysis indicators (RSI, MACD)
- Trading signals with strength indicators
- Volume analysis
- 24-hour price change tracking
- Beautiful, responsive UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lightweight Charts
- Lucide React Icons

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitcoin-trading-signals.git
cd bitcoin-trading-signals
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
VITE_NEWS_API_KEY=your_news_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Usage

The application displays real-time trading signals based on multiple factors:

- Technical indicators (RSI, MACD)
- Volume analysis
- Price momentum
- Market sentiment

Trading signals are categorized by:
- Type: BUY, SELL, or HOLD
- Strength: WEAK, MODERATE, or STRONG

Each signal includes:
- Current price
- Timestamp
- Reasoning behind the signal

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for educational purposes only. Trading cryptocurrencies carries significant risks, and all trading decisions should be made after thorough research and consideration of your financial situation.