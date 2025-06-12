import React, { useState } from 'react';
import { Check, Star, Zap, Shield, TrendingUp, Crown } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  stripePriceId: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  gradient: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Signals',
    price: 29,
    interval: 'month',
    stripePriceId: 'prod_SU93iC2yIOkSWK', // Replace with your actual Stripe Price ID
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Real-time signals for Bitcoin',
      'Basic technical analysis',
      '24/7 signal updates',
      'Email notifications',
      'Mobile-friendly dashboard'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Trader',
    price: 79,
    interval: 'month',
    stripePriceId: 'prod_SU95EWQ37znLQA', // Replace with your actual Stripe Price ID
    popular: true,
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-500',
    features: [
      'All cryptocurrencies (BTC, ETH, SOL)',
      'Advanced technical indicators',
      '5-day predictive forecasting',
      'Confidence scoring',
      'Priority support',
      'API access',
      'Custom alerts'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    interval: 'month',
    stripePriceId: 'prod_SU93iC2yIOkSWK', // Replace with your actual Stripe Price ID
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-orange-500 to-red-500',
    features: [
      'Everything in Pro',
      'White-label solutions',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics',
      'Multi-user accounts',
      'SLA guarantee'
    ]
  }
];

export function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planId: string) => {
    setLoading(planId);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Call your backend to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
            <Star className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold">Choose Your Trading Edge</span>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Pricing Plans
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our free tier or unlock advanced features with our premium plans. 
            All plans include our core signal technology with different levels of access.
          </p>
        </div>

        {/* Free Tier */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Tier</h3>
            <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-500">/month</span></p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Basic Bitcoin signals (3 per day)</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Simple technical indicators</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Community support</span>
              </li>
            </ul>
            
            <button className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              Get Started Free
            </button>
          </div>
        </div>

        {/* Premium Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular 
                  ? 'border-purple-500 transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                  <span className="text-lg text-gray-500">/{plan.interval}</span>
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.stripePriceId, plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading === plan.id ? 'Processing...' : `Subscribe to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-green-100 rounded-full px-6 py-3">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}