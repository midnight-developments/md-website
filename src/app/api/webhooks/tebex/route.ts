import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/services/supabase';
import { TebexWebhookPayload, TebexWebhookSubject } from '@/types/tebex-webhook';

export async function POST(request: NextRequest) {
    const secret = process.env.TEBEX_WEBHOOK_KEY;
    const tebexSignature = request.headers.get('x-signature');

    if (!tebexSignature) {
        return new NextResponse('Missing X-Signature', { status: 401 });
    }

    if (!secret) {
        console.error('TEBEX_WEBHOOK_KEY not configured');
        return new NextResponse('Webhook secret not configured', { status: 500 });
    }

    const rawBody = await request.text();
    const bodyBuffer = Buffer.from(rawBody);

    const bodyHash = crypto.createHash('sha256').update(bodyBuffer).digest('hex');
    const finalHash = crypto.createHmac('sha256', secret).update(bodyHash).digest('hex');

    try {
        const isVerified = crypto.timingSafeEqual(
            Buffer.from(finalHash, 'hex'),
            Buffer.from(tebexSignature, 'hex')
        );

        if (!isVerified) {
            console.error('Tebex webhook signature mismatch');
            return new NextResponse('Invalid signature', { status: 403 });
        }
    } catch (e) {
        console.error('Signature verification error:', e);
        return new NextResponse('Signature verification failed', { status: 403 });
    }

    const payload = JSON.parse(rawBody) as TebexWebhookPayload;
    const { type, subject } = payload;

    if (type === 'validation.webhook') {
        return NextResponse.json({ id: payload.id });
    }

    if (type === "payment.completed") {
        const transaction_id = subject.transaction_id
        const discord_id = subject.custom?.discord_id || null

        try {
            const { error: supabaseError } = await supabase
                .from('purchases')
                .insert({
                    transaction_id: transaction_id,
                    discord_id: discord_id,
                    purchase_data: subject,
                    role_assigned: discord_id ? false : null
                });

            if (supabaseError) throw supabaseError;

            console.log(`Successfully saved purchase ${transaction_id} to Supabase`);
        } catch (error) {
            console.error('Error processing Tebex payment in Supabase:', error);
        }

        return new NextResponse('Purchase processed', { status: 200 });
    }

    return new NextResponse('Webhook received', { status: 200 });
}
