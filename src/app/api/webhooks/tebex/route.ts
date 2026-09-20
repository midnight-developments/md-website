import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/services/supabase';

import type { TebexWebhookPayload } from '@/types/tebex';

function verifyTebexSignature(rawBody: string, signature: string, secret: string): boolean {
    const bodyHash = crypto.createHash('sha256').update(rawBody).digest('hex');
    const expectedHash = crypto.createHmac('sha256', secret).update(bodyHash).digest('hex');

    const expectedBuffer = Buffer.from(expectedHash, 'hex');
    const signatureBuffer = Buffer.from(signature, 'hex');

    if (expectedBuffer.length !== signatureBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function POST(request: NextRequest) {
    const secret = process.env.TEBEX_WEBHOOK_KEY;
    const signature = request.headers.get('x-signature');

    if (!signature) {
        return new NextResponse('Missing X-Signature', { status: 401 });
    }

    if (!secret) {
        console.error('TEBEX_WEBHOOK_KEY not configured');
        return new NextResponse('Webhook secret not configured', { status: 500 });
    }

    const rawBody = await request.text();

    try {
        if (!verifyTebexSignature(rawBody, signature, secret)) {
            return new NextResponse('Invalid signature', { status: 403 });
        }
    } catch {
        return new NextResponse('Signature verification failed', { status: 403 });
    }

    let payload: TebexWebhookPayload;
    try {
        payload = JSON.parse(rawBody);
    } catch {
        return new NextResponse('Invalid JSON', { status: 400 });
    }

    if (payload.type === 'validation.webhook') {
        return NextResponse.json({ id: payload.id });
    }

    if (payload.type === 'payment.completed' && payload.subject?.transaction_id) {
        const { transaction_id, custom } = payload.subject;
        const discord_id = custom?.discord_id || null;

        const { error: upsertError } = await supabase
            .from('purchases')
            .upsert(
                {
                    transaction_id,
                    discord_id,
                    purchase_data: payload.subject,
                    role_assigned: discord_id ? false : null,
                },
                { onConflict: 'transaction_id' }
            );

        if (upsertError) {
            console.error('Database error saving purchase:', upsertError);
            return new NextResponse('Database error', { status: 500 });
        }
    }

    return new NextResponse('OK', { status: 200 });
}
