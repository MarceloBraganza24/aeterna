import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          padding: "72px",
          background:
            "radial-gradient(circle at 20% 20%, #61c653 0%, transparent 30%), radial-gradient(circle at 80% 15%, #08553e 0%, transparent 34%), radial-gradient(circle at 25% 80%, #85b9bd 0%, transparent 34%), linear-gradient(135deg, #027c42 0%, #043f35 45%, #02180f 100%)",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            letterSpacing: "0.42em",
            fontWeight: 700,
          }}
        >
          AETERNA
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              lineHeight: 0.92,
              letterSpacing: "-0.07em",
              fontWeight: 600,
              maxWidth: "860px",
            }}
          >
            Construí tu futuro digital.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "32px",
              fontSize: "30px",
              lineHeight: 1.35,
              maxWidth: "760px",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            Guías prácticas para organizar, automatizar y monetizar conocimiento
            en la economía digital.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <span>Latinoamérica y España</span>
          <span>·</span>
          <span>Pagos seguros en USD</span>
        </div>
      </div>
    ),
    size
  );
}