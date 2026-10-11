import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// U+2060 (word joiner) after a dash between digits, so "2–3x" or "€950–1,500"
// never wraps mid-range. Render-time only: data, JSON-LD and Markdown stay clean.
export const keepRangesWhole = (text: string) =>
  text.replace(/(\d)–(?=[\d€])/g, "$1–\u2060");
