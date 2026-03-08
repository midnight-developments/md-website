import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTebexDescription(htmlDescription: string) {
  try {
    const cleanJsonString = htmlDescription.replace(/<[^>]*>/g, '');
    const data = JSON.parse(cleanJsonString);

    return data;
  } catch (error) {
    console.error("Failed to parse Tebex JSON description:", error);
    return null;
  }
}
