import { Font } from "@react-pdf/renderer";

const origin = typeof window !== "undefined" ? window.location.origin : "";

Font.register({
  family: "Roboto",
  fonts: [
    { src: `${origin}/fonts/Roboto-Regular.ttf`, fontWeight: "normal" },
    { src: `${origin}/fonts/Roboto-Bold.ttf`, fontWeight: "bold" },
  ],
});

// Prevents fi/fl/ffi ligature substitution by treating each character as a
// separate shaping unit — the font shaping engine never sees adjacent "fi"
Font.registerHyphenationCallback((word) => [...word]);
