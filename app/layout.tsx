import type { Metadata } from "next";
import { ThemeProvider } from "../src/context/ThemeProvider";
import data from "../data.json";
import "../src/index.css";

const { profile, timeline } = data;
const description = profile.profileDescription[0];
const siteUrl = "https://gligadumitru.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.fullName} — ${profile.title}`,
    template: `%s | ${profile.fullName}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${profile.fullName} — ${profile.title}`,
    description,
    siteName: profile.fullName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profile.fullName} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — ${profile.title}`,
    description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.theme;
    var isDark = stored === "dark" || (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.title,
  description,
  url: siteUrl,
  worksFor: timeline
    .filter((item) => item.endDate === "Present")
    .map((item) => ({
      "@type": "Organization",
      name: item.employer,
    })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className="dark:bg-neutral-900 w-full min-h-screen"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
