declare global {
    interface TebexCheckoutThemeColor {
        name: string;
        color: string;
    }

    const TebexCheckoutEvents: {
        CLOSE: "close";
        OPEN: "open";
        PAYMENT_COMPLETE: "payment_complete";
        PAYMENT_ERROR: "payment_error";
    };

    interface TebexCheckoutConfig {
        ident: string;
        theme: "light" | "dark";
        colors?: TebexCheckoutThemeColor[];
    }

    interface TebexCheckout {
        init: (config: TebexCheckoutConfig) => void;
        on: (
            event: "close" | "open" | "payment_complete" | "payment_error",
            callback: () => void,
        ) => void;
        launch: () => void;
    }

    interface Tebex {
        events: typeof TebexCheckoutEvents;
        checkout: TebexCheckout;
    }

    interface Window {
        Tebex: Tebex;
    }
}

export { };