import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FaraNotar.ro — Contracte legale și calculatoare financiare pentru România";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Background decorative circles */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: "rgba(22, 163, 74, 0.08)", display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "rgba(22, 163, 74, 0.06)", display: "flex",
        }} />

        {/* Logo badge */}
        <div style={{
          background: "#16a34a",
          borderRadius: "20px",
          width: "88px",
          height: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "28px",
          boxShadow: "0 8px 32px rgba(22, 163, 74, 0.35)",
        }}>
          <span style={{ color: "white", fontSize: "34px", fontWeight: "800", letterSpacing: "-1px" }}>
            FN
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontSize: "72px",
          fontWeight: "800",
          color: "#111827",
          marginBottom: "12px",
          letterSpacing: "-2px",
        }}>
          FaraNotar.ro
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: "26px",
          color: "#6b7280",
          marginBottom: "48px",
          textAlign: "center",
          maxWidth: "700px",
        }}>
          Contracte legale & calculatoare financiare pentru România
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "14px" }}>
          {[
            "✓  5 tipuri de contracte",
            "✓  4 calculatoare gratuite",
            "✓  PDF instant",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                background: "white",
                border: "2px solid #bbf7d0",
                borderRadius: "100px",
                padding: "10px 22px",
                fontSize: "18px",
                color: "#15803d",
                fontWeight: "600",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom tag */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          fontSize: "15px",
          color: "#9ca3af",
          letterSpacing: "0.5px",
        }}>
          simplu, conform legii, fără notar
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
