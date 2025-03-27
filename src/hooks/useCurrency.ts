import { useState, useEffect } from 'react';

interface ExchangeRate {
  [key: string]: number;
}

// Exchange rates (in production, these should come from an API)
const EXCHANGE_RATES: ExchangeRate = {
  USD: 1,
  EUR: 1,
  GBP: 0.7,
  JPY: 150.14,
  AUD: 1.53,
  CAD: 1.35,
  INR: 59.9
};

export const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  INR: '₹'
};

export const CURRENCY_NAMES: { [key: string]: string } = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  AUD: 'AUD',
  CAD: 'CAD',
  INR: 'INR'
};

export function useCurrency() {
  const [currency, setCurrency] = useState(CURRENCY_NAMES.USD);
  const [symbol, setSymbol] = useState(CURRENCY_SYMBOLS.USD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedCurrency = data.currency || 'USD';
        
        if (EXCHANGE_RATES[detectedCurrency]) {
          setCurrency(detectedCurrency);
          setSymbol(CURRENCY_SYMBOLS[detectedCurrency] || '$');
        }
      } catch (error) {
        console.error('Error detecting currency:', error);
        // Fallback to USD
        setCurrency('USD');
        setSymbol('$');
      } finally {
        setLoading(false);
      }
    };

    detectCurrency();
  }, []);

  const convertPrice = (usdPrice: number): number => {
    const rate = EXCHANGE_RATES[currency] || 1;
    return Math.round(usdPrice * rate);
  };

  const formatPrice = (amount: number): string => {
    return `${symbol}${amount}`;
  };

  return {
    currency,
    symbol,
    loading,
    convertPrice,
    formatPrice
  };
}