import "server-only";
import { TebexAPIError } from "@/types/tebex";

const TEBEX_API_BASE = "https://headless.tebex.io/api";

export function getTebexToken(): string {
    const token = process.env.TEBEX_PUBLIC_KEY;
    if (!token) {
        throw new Error("TEBEX_PUBLIC_KEY environment variable is not configured");
    }
    return token;
}

export async function tebexFetch<T>(
    endpoint: `/${string}`,
    options?: RequestInit,
    defaultErrorMessage = "Tebex API request failed"
): Promise<T> {
    const url = `${TEBEX_API_BASE}${endpoint}`;

    const headers = new Headers(options?.headers);
    if (options?.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const signal = options?.signal || AbortSignal.timeout(6000);

    const response = await fetch(url, { ...options, headers, signal, });

    if (!response.ok) {
        if (response.status === 429) {
            throw new TebexAPIError("Tebex rate limit reached. Please wait a moment and try again.", 429, true);
        }

        const errorData = await response.json().catch(() => ({} as Record<string, string>));
        const message =
            errorData.error_message ||
            errorData.detail ||
            errorData.message ||
            `${defaultErrorMessage} (Status ${response.status})`;


        throw new TebexAPIError(message, response.status, false);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const json = await response.json();
    return (json?.data !== undefined ? json.data : json) as T;
}
