/** Canonical site URL — set NEXT_PUBLIC_SITE_URL when using a custom domain. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sahil-portfolio-2812.netlify.app";

export const siteConfig = {
  name: "Muhammad Sahil",
  shortTitle: "Muhammad Sahil | Software Engineering Student",
  title:
    "Muhammad Sahil | Web Developer & Software Engineering Student Portfolio",
  description:
    "Portfolio of Muhammad Sahil — software engineering student specializing in Next.js, React, TypeScript, and mobile app development. View projects, skills, and contact for web and full-stack work.",
  email: "maliksahil10996@gmail.com",
  jobTitle: "Software Engineering Student",
  locale: "en_US",
  sameAs: [
    "https://github.com/example",
    "https://www.linkedin.com/in/example",
  ],
} as const;