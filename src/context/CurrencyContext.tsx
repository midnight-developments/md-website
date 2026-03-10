"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "BRL" | "MXN" | "JPY" | "CHF" | "SEK" | "NZD" | "DKK" | "NOK" | "PLN" | "TRY";
export const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "CAD", "AUD", "BRL", "MXN", "JPY", "CHF", "SEK", "NZD", "DKK", "NOK", "PLN", "TRY"];

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (usdAmount: number) => string;
}

const EXCHANGE_RATES: Record<Currency, number> = {
    USD: 1.0,
    EUR: 0.93,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.54,
    BRL: 5.0,
    MXN: 17.0,
    JPY: 150.0,
    CHF: 0.88,
    SEK: 10.4,
    NZD: 1.65,
    DKK: 6.9,
    NOK: 10.6,
    PLN: 4.0,
    TRY: 32.0,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "CA$",
    AUD: "A$",
    BRL: "R$",
    MXN: "MX$",
    JPY: "¥",
    CHF: "Fr.",
    SEK: "kr",
    NZD: "NZ$",
    DKK: "kr.",
    NOK: "kr",
    PLN: "zł",
    TRY: "₺",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>("USD");

    // Load from localStorage on mount
    useEffect(() => {
        const savedCurrency = localStorage.getItem("selectedCurrency") as Currency;
        if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
            setCurrencyState(savedCurrency);
        }
    }, []);

    const setCurrency = (newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        localStorage.setItem("selectedCurrency", newCurrency);
    };

    const formatPrice = useCallback((usdAmount: number): string => {
        if (usdAmount <= 0) return "FREE";

        const rate = EXCHANGE_RATES[currency] || 1;
        const convertedAmount = usdAmount * rate;
        const symbol = CURRENCY_SYMBOLS[currency];

        return `${symbol}${convertedAmount.toFixed(2)} ${currency}`;
    }, [currency]);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
