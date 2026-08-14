import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          border: "3px solid #c9a961",
          borderRadius: 14,
          color: "#c9a961",
          fontSize: 28,
          fontStyle: "italic",
          fontWeight: 600,
        }}
      >
        UI
      </div>
    ),
    size
  );
}
