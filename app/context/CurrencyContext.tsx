"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Currency = {
  _id: string;
  name: string;
  symbol: string;
  value: number;
  isDefault?: boolean;
};

type CurrencyContextType = {
  defaultCurrency: Currency | null;
  selectedCurrency: Currency | null;
  currencies: Currency[];
  refreshCurrencies: () => void;
  setSelectedCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState<Currency | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

  const fetchCurrencies = async () => {
    const res = await fetch('/api/currency');
    const data = await res.json();
    setCurrencies(data);
    const defaultCurr = data.find((c: Currency) => c.isDefault);
    setDefaultCurrency(defaultCurr);
    setSelectedCurrency(defaultCurr);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        defaultCurrency,
        selectedCurrency,
        currencies,
        refreshCurrencies: fetchCurrencies,
        setSelectedCurrency
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
