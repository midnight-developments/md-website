"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { storage, STORAGE_KEYS } from "@/lib/storage";

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

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>("USD");

    useEffect(() => {
        const savedCurrency = storage.getItem(STORAGE_KEYS.SELECTED_CURRENCY) as Currency | null;
        if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
            setCurrencyState(savedCurrency);
        }
    }, []);

    const setCurrency = useCallback((newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        storage.setItem(STORAGE_KEYS.SELECTED_CURRENCY, newCurrency);
    }, []);

    const formatters = useMemo(() => new Map<Currency, Intl.NumberFormat>(), []);

    const formatPrice = useCallback((usdAmount: number): string => {
        if (usdAmount <= 0) return "FREE";

        const rate = EXCHANGE_RATES[currency] || 1;
        const convertedAmount = usdAmount * rate;

        let formatter = formatters.get(currency);
        if (!formatter) {
            formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
                currencyDisplay: "narrowSymbol",
                maximumFractionDigits: 2,
            });
            formatters.set(currency, formatter);
        }

        return formatter.format(convertedAmount);
    }, [currency, formatters]);

    const value = useMemo(
        () => ({
            currency,
            setCurrency,
            formatPrice,
        }),
        [currency, setCurrency, formatPrice]
    );

    return (
        <CurrencyContext.Provider value={value}>
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
