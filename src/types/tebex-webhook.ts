export interface TebexPrice {
    amount: number;
    currency: string;
}

export interface TebexCustomer {
    first_name: string;
    last_name: string;
    email: string;
    ip: string;
    username: {
        id: string;
        username: string;
    };
    marketing_consent: boolean;
    country: string;
    postal_code: string;
}

export interface TebexWebhookProduct {
    id: number;
    name: string;
    quantity: number;
    base_price: TebexPrice;
    paid_price: TebexPrice;
    variables: Array<{
        identifier: string;
        option: string;
    }>;
    expires_at: string | null;
    custom: any;
    username: {
        id: string;
        username: string;
    };
}

export interface TebexWebhookSubject {
    transaction_id: string;
    status: {
        id: number;
        description: string;
    };
    payment_sequence: string;
    created_at: string;
    price: TebexPrice;
    price_paid: TebexPrice;
    payment_method: {
        name: string;
        refundable: boolean;
    };
    fees: {
        tax: TebexPrice;
        gateway: TebexPrice;
    };
    customer: TebexCustomer;
    products: TebexWebhookProduct[];
    coupons: any[];
    gift_cards: any[];
    recurring_payment_reference: string | null;
    decline_reason?: {
        code: string;
        message: string;
    };
    creator_code: string | null;
    settled_at: string | null;
    custom?: Record<string, any>;
}

export interface TebexWebhookPayload {
    id: string;
    type: string;
    subject: TebexWebhookSubject;
}
