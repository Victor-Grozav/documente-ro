import { Font } from "@react-pdf/renderer";

const origin = typeof window !== "undefined" ? window.location.origin : "";

Font.register({
  family: "Roboto",
  fonts: [
    { src: `${origin}/fonts/Roboto-Regular.ttf`, fontWeight: "normal" },
    { src: `${origin}/fonts/Roboto-Bold.ttf`, fontWeight: "bold" },
  ],
});

/**
 * Inserts Zero-Width Non-Joiner (U+200C) between 'f' and 'i'/'l' to prevent
 * OpenType GSUB ligature substitution in fontkit (used by @react-pdf/renderer).
 * The GSUB pipeline runs before line-breaking, so Font.registerHyphenationCallback
 * cannot prevent it — ZWNJ at the character level is the correct fix.
 */
export function fixLigatures(text: string): string {
  if (!text) return text;
  return text.replace(/([fF])([ilL])/g, "$1\u200C$2");
}

/**
 * Applies fixLigatures to all string values in a data object.
 * Use this at the top of every PDF template component.
 */
export function fixData<T>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, typeof v === "string" ? fixLigatures(v) : v])
  ) as T;
}
