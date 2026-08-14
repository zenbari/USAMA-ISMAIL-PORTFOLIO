import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0a0a0b",
          color: "#f2f0ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 72,
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #c9a961",
            borderRadius: 16,
            color: "#c9a961",
            fontSize: 30,
            fontStyle: "italic",
            marginBottom: 48,
          }}
        >
          UI
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 600, maxWidth: 900 }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a5a19a", marginTop: 20 }}>
          {SITE.role} — London
        </div>
      </div>
    ),
    size
  );
}
