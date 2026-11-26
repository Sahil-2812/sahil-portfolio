import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Muhammad Sahil portfolio — web and mobile developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px",
          color: "#f4efe6",
          background:
            "radial-gradient(circle at top right, rgba(255,148,84,0.25), transparent 30%), radial-gradient(circle at bottom left, rgba(97,245,196,0.25), transparent 30%), linear-gradient(135deg, #050816 0%, #0d1430 50%, #08101f 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          <span>Software Engineering Student</span>
          <span>Web + Mobile Development</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 700 }}>Muhammad Sahil</div>
          <div style={{ fontSize: 34, lineHeight: 1.3, maxWidth: 860 }}>
            Designing fast, polished products with Next.js, React, Firebase, and mobile-first UX.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 24,
          }}
        >
          {["Next.js", "React", "Tailwind CSS", "GSAP", "Framer Motion"].map((item) => (
            <span
              key={item}
              style={{
                padding: "14px 22px",
                borderRadius: 999,
                border: "1px solid rgba(244,239,230,0.2)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
