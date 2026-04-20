import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sahil-portfolio.vercel.app"),
  title: {
    default: "Muhammad Sahil | Software Engineering Student",
    template: "%s | Muhammad Sahil",
  },
  description:
    "Modern portfolio for Muhammad Sahil, a Software Engineering student focused on web and mobile app development.",
  applicationName: "Muhammad Sahil Portfolio",
  keywords: [
    "Muhammad Sahil",
    "Software Engineering student",
    "Web Developer",
    "Mobile App Developer",
    "Next.js",
    "React developer",
  ],
  authors: [{ name: "Muhammad Sahil" }],
  creator: "Muhammad Sahil",
  openGraph: {
    title: "Muhammad Sahil | Software Engineering Student",
    description:
      "Portfolio showcasing web development, mobile app development, and modern frontend engineering projects.",
    url: "https://sahil-portfolio.vercel.app",
    siteName: "Muhammad Sahil Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Sahil portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Sahil | Software Engineering Student",
    description:
      "Portfolio showcasing web development, mobile app development, and modern frontend engineering projects.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
  ],
  colorScheme: "dark light",
};

const themeScript = `
(() => {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = storedTheme ?? (prefersDark ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
