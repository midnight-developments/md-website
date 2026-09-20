// --- Basket & Checkout Types ---

export interface TebexBasketPackage {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    in_basket: {
        quantity: number;
        price: number;
        gift_username_id: number | string | null;
        gift_username: string | null;
    };
}

export interface TebexCoupon {
    id: number;
    code: string;
}

export interface TebexGiftCard {
    id: number;
    card_number: string;
    balance: number;
}

export interface TebexCustomer {
    first_name?: string;
    last_name?: string;
    email?: string;
    ip?: string;
    username?: {
        id: string | number;
        username: string;
    };
    marketing_consent?: boolean;
    country?: string;
    postal_code?: string;
}

export interface TebexBasketCustomData {
    discord_id?: string;
    [key: string]: unknown;
}

export interface TebexBasket {
    ident: string;
    complete: boolean;
    id: number;
    username_id: string | number | null;
    username: string | null;
    base_price: number;
    sales_tax: number;
    total_price: number;
    currency: string;
    packages: TebexBasketPackage[];
    coupons?: TebexCoupon[];
    giftcards?: TebexGiftCard[];
    creator_code?: string | null;
    customer?: TebexCustomer | null;
    links: {
        checkout: string;
        payment?: string;
    };
    custom?: TebexBasketCustomData;
}

export interface TebexAuthLink {
    name: string;
    url: string;
}

export class TebexAPIError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly isRateLimit: boolean = false
    ) {
        super(message);
        this.name = "TebexAPIError";
    }
}

// --- Product & Catalog Types ---

export interface TebexCategory {
    id: number;
    name: string;
}

export interface TebexMedia {
    type: string;
    name: string;
    url: string;
    primary: boolean;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    media: TebexMedia[];
    type: string;
    category: TebexCategory;
    base_price: number;
    sales_tax: number;
    total_price: number;
    currency: string;
    discount: number;
    disable_quantity: boolean;
    disable_gifting: boolean;
    expiration_date: string | null;
    user_limit: number | null;
    created_at: string;
    updated_at: string;
    order: number;
}

// --- Webhook Types ---

export interface TebexWebhookPayload {
    id: string;
    type: string;
    subject?: {
        transaction_id?: string;
        custom?: {
            discord_id?: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    };
}

// --- Tebex JavaScript SDK Types ---

export interface TebexCheckoutThemeColor {
    name: string;
    color: string;
}

export interface TebexCheckoutEvents {
    CLOSE: "close";
    OPEN: "open";
    PAYMENT_COMPLETE: "payment_complete";
    PAYMENT_ERROR: "payment_error";
}

export interface TebexCheckoutConfig {
    ident: string;
    theme: "light" | "dark";
    colors?: TebexCheckoutThemeColor[];
}

export interface TebexCheckout {
    init: (config: TebexCheckoutConfig) => void;
    on: (
        event: "close" | "open" | "payment_complete" | "payment_error",
        callback: () => void,
    ) => void;
    launch: () => void;
}

export interface TebexSDK {
    events: TebexCheckoutEvents;
    checkout: TebexCheckout;
}

declare global {
    interface Window {
        Tebex?: TebexSDK;
        TebexCheckoutEvents?: TebexCheckoutEvents;
    }
}
