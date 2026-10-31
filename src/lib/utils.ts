import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtml(html?: string | null): string {
  if (!html) return ""
  return html.replace(/<[^>]*>/g, "").trim()
}

export function sanitizeRedirectUrl(url: string | undefined, baseUrl: string): string {
  if (!url) return baseUrl;

  try {
    const parsed = new URL(url, baseUrl);
    const base = new URL(baseUrl);

    if (
      parsed.host === base.host &&
      (parsed.protocol === "http:" || parsed.protocol === "https:")
    ) {
      return parsed.toString();
    }
  } catch {
    // Fall back to baseUrl if URL parsing fails
  }

  return baseUrl;
}
