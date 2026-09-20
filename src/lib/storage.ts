export const STORAGE_KEYS = {
    DISCORD_ID: "discordID",
    DISCORD_USERNAME: "discordUsername",
    DISCORD_AVATAR: "discordAvatar",
    PENDING_ITEMS: "tebex_pending_items",
    SELECTED_CURRENCY: "selectedCurrency",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const storage = {
    getItem(key: string): string | null {
        if (typeof window === "undefined") return null;
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },

    setItem(key: string, value: string): void {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.warn(`Failed to save to localStorage key "${key}":`, error);
        }
    },

    removeItem(key: string): void {
        if (typeof window === "undefined") return;
        try {
            localStorage.removeItem(key);
        } catch {
            // Silently ignore storage errors on remove
        }
    },

    getJSON<T>(key: string, fallback: T): T {
        const item = this.getItem(key);
        if (!item) return fallback;
        try {
            return JSON.parse(item) as T;
        } catch {
            return fallback;
        }
    },

    setJSON<T>(key: string, value: T): void {
        try {
            this.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Failed to serialize and save to localStorage key "${key}":`, error);
        }
    },
};
