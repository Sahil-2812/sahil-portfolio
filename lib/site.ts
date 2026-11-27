/** Canonical site URL — set NEXT_PUBLIC_SITE_URL when using a custom domain. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sahil-portfolio-2812.netlify.app";

export const siteConfig = {
  name: "Muhammad Sahil",
  shortTitle: "Muhammad Sahil | Software Engineer",
  title:
    "Muhammad Sahil | Web Developer & Software Engineer Portfolio",
  description:
    "Portfolio of Muhammad Sahil — software Engineer in Faisalabad, Punjab, Pakistan. Next.js, React, TypeScript, and mobile development. Professional projects, contact, and collaboration.",
  email: "maliksahil10996@gmail.com", 
  phone: "+923221022812",
  phoneDisplay: "0322 1022812",
  location: {
    locality: "Faisalabad",
    region: "Punjab",
    country: "Pakistan",
    label: "Faisalabad, Punjab, Pakistan",
  },
  jobTitle: "Software Engineer",
  locale: "en_US",
  githubProfile: "https://github.com/Sahil-2812",
  linkedIn: "https://www.linkedin.com/in/sahil2812",
  sameAs: [
    "https://github.com/Sahil-2812",
    "https://www.linkedin.com/in/sahil2812",
  ],
} as const;