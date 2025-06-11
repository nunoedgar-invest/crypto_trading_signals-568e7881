import React from 'react';
import { TrendingUp, Shield, Zap, Users, Award, BarChart3, Target, Clock } from 'lucide-react';

export function ValueProposition() {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Technical Analysis",
      description: "Multi-timeframe RSI, MACD, and proprietary algorithms analyzing market patterns across Bitcoin, Ethereum, and Solana.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "5-Day Predictive Forecasting",
      description: "AI-powered price predictions with confidence scoring, giving traders a strategic advantage in volatile markets.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Signal Generation",
      description: "Instant BUY/SELL/HOLD signals with strength indicators, updated every 30 seconds for maximum market responsiveness.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk-Calibrated Insights",
      description: "Crypto-specific volatility adjustments and volume analysis ensure signals are tailored to each asset's unique characteristics.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { value: "3", label: "Major Cryptocurrencies", sublabel: "BTC, ETH, SOL" },
    { value: "30s", label: "Update Frequency", sublabel: "Real-time data" },
    { value: "5-Day", label: "Forecast Horizon", sublabel: "Predictive analysis" },
    { value: "26+", label: "Technical Indicators", sublabel: "Advanced algorithms" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-6">
            <Award className="w-5 h-5 text-blue-300 mr-2" />
            <span className="text-blue-200 font-medium">Professional-Grade Trading Intelligence</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            Transform Your Crypto Trading
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Institutional-quality technical analysis and predictive forecasting for Bitcoin, Ethereum, and Solana. 
            Make informed decisions with confidence-scored signals and real-time market intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center text-green-300">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-semibold">Live Market Analysis</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="flex items-center text-cyan-300">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-semibold">30-Second Updates</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="flex items-center text-purple-300">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-semibold">Enterprise Ready</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-200 font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-blue-300">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-blue-100 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Revenue Model Highlight */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Scalable Revenue Architecture</h3>
          </div>
          <p className="text-green-100 text-lg mb-6 max-w-3xl mx-auto">
            Built for subscription-based monetization with tiered access levels, API licensing opportunities, 
            and enterprise integration capabilities. Ready for immediate revenue generation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-green-500/20 text-green-200 px-4 py-2 rounded-full border border-green-400/30">
              Freemium Model Ready
            </span>
            <span className="bg-green-500/20 text-green-200 px-4 py-2 rounded-full border border-green-400/30">
              API Monetization
            </span>
            <span className="bg-green-500/20 text-green-200 px-4 py-2 rounded-full border border-green-400/30">
              Enterprise Licensing
            </span>
            <span className="bg-green-500/20 text-green-200 px-4 py-2 rounded-full border border-green-400/30">
              White-Label Solutions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}