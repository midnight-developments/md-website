"use server";

export interface DiscordAuthResult {
    success: boolean;
    user?: {
        id: string;
        username: string;
        avatar: string | null;
    };
    error?: string;
}

export async function exchangeDiscordCode(code: string, redirectUri: string): Promise<DiscordAuthResult> {
    const clientId =
        process.env.DISCORD_CLIENT_ID ||
        process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ||
        "1410523462585548894";
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const API_ENDPOINT = 'https://discord.com/api/v10';

    if (!clientId) {
        return { success: false, error: "Discord client ID is missing." };
    }

    if (!clientSecret) {
        console.error("DISCORD_CLIENT_SECRET is missing from server environment");
        return {
            success: false,
            error: "DISCORD_CLIENT_SECRET is missing from server environment (~/app.env). Please add it on your EC2 instance."
        };
    }

    try {
        const data = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
        });

        const tokenResponse = await fetch(`${API_ENDPOINT}/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json().catch(() => ({}));
            const errorMsg = errorData.error_description || errorData.error || `Discord error (Status ${tokenResponse.status})`;
            console.error("Discord Token Exchange Error:", errorMsg, errorData);
            return { success: false, error: errorMsg };
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const userResponse = await fetch(`${API_ENDPOINT}/users/@me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!userResponse.ok) {
            return {
                success: false,
                error: `Failed to fetch Discord user profile (Status ${userResponse.status})`
            };
        }

        const userData = await userResponse.json();

        return {
            success: true,
            user: {
                id: userData.id,
                username: userData.username,
                avatar: userData.avatar,
            },
        };
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Failed to exchange Discord code";
        console.error("Exception in exchangeDiscordCode:", err);
        return { success: false, error: errorMsg };
    }
}
