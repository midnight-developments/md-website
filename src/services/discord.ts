"use server";

export async function exchangeDiscordCode(code: string, redirectUri: string) {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const API_ENDPOINT = 'https://discord.com/api/v10';

    if (!clientId || !clientSecret) {
        throw new Error("Discord credentials not configured");
    }

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
        const error = await tokenResponse.json();
        console.error("Discord Token Exchange Error:", error);
        throw new Error(error.error_description || error.error || "Failed to exchange code");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();

    return {
        id: userData.id,
        username: userData.username,
        avatar: userData.avatar,
    };
}
