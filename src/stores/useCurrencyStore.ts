"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCallback } from "react";

export type Currency =
    | "USD"
    | "EUR"
    | "GBP"
    | "CAD"
    | "AUD"
    | "BRL"
    | "MXN"
    | "JPY"
    | "CHF"
    | "SEK"
    | "NZD"
    | "DKK"
    | "NOK"
    | "PLN"
    | "TRY";

export const CURRENCIES: Currency[] = [
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "AUD",
    "BRL",
    "MXN",
    "JPY",
    "CHF",
    "SEK",
    "NZD",
    "DKK",
    "NOK",
    "PLN",
    "TRY",
];

export const EXCHANGE_RATES: Record<Currency, number> = {
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

const formatters = new Map<Currency, Intl.NumberFormat>();

function formatCurrencyAmount(usdAmount: number, currency: Currency): string {
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
}

interface CurrencyState {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set) => ({
            currency: "USD",
            setCurrency: (currency) => set({ currency }),
        }),
        {
            name: "selected_currency",
            partialize: (state) => ({ currency: state.currency }),
        }
    )
);

export function useFormatPrice() {
    const currency = useCurrencyStore((state) => state.currency);
    return useCallback(
        (usdAmount: number) => formatCurrencyAmount(usdAmount, currency),
        [currency]
    );
}
