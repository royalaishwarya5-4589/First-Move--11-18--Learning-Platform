import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AITutorProvider } from "@/components/AITutor/AITutorContext";
import { AITutorLauncher } from "@/components/AITutor/AITutorLauncher";
import { AITutorPanel } from "@/components/AITutor/AITutorPanel";

import { NavigationProgress } from "@/components/NavigationProgress";
import { getSiteBaseUrl } from "@/lib/urlUtils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E0B" },
  ],
};

const siteUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "First Move (11~18) | Educational Technology Learning Platform",
    template: "%s | First Move (11~18)",
  },
  description: "First Move (11~18) — CODE • LEARN • BUILD. Learn technology from foundational to advanced mastery through structured learning paths, active practice, and curated resources.",
  applicationName: "First Move (11~18)",
  authors: [{ name: "First Move (11~18)" }],
  keywords: [
    "First Move",
    "First Move 11~18",
    "Code Learn Build",
    "Computer Science Learning",
    "Python Programming",
    "Web Development",
    "Artificial Intelligence",
    "Career Compass",
    "Tech Education"
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/images/firstmove-icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/images/firstmove-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "First Move (11~18) | CODE • LEARN • BUILD",
    description: "First Move (11~18) — Master Software Engineering, Computer Science, and AI through structured roadmaps, browser-based coding, and cryptographically verified certificates.",
    siteName: "First Move (11~18)",
    url: "/",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/firstmove-logo.png",
        width: 1200,
        height: 630,
        alt: "First Move (11~18) - CODE • LEARN • BUILD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "First Move (11~18) | CODE • LEARN • BUILD",
    description: "Master Software Engineering, Computer Science, and AI through structured roadmaps, browser-based coding, and cryptographically verified certificates.",
    images: ["/images/firstmove-logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${siteUrl}#organization`,
  name: "First Move (11~18)",
  alternateName: ["First Move", "First Move 11–18"],
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/firstmove-logo.png`,
    caption: "First Move (11~18) - CODE • LEARN • BUILD",
  },
  slogan: "CODE • LEARN • BUILD",
  description: "Next-generation educational technology learning ecosystem guiding learners from absolute beginner foundations to industry-level mastery.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  url: siteUrl,
  name: "First Move (11~18)",
  description: "First Move (11~18) — CODE • LEARN • BUILD. Master Software Engineering, Computer Science, and AI through structured roadmaps, interactive coding, and verified certificates.",
  publisher: {
    "@id": `${siteUrl}#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <NavigationProgress />
        <AuthProvider>
          <ThemeProvider>
            <AITutorProvider>
              <div className="page-container">
                <Header />
                <main className="main-content">
                  {children}
                </main>
                <Footer />
                <AITutorLauncher />
                <AITutorPanel />
              </div>
            </AITutorProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
