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

export const metadata: Metadata = {
  title: "First Move (11–18) | Educational Technology Learning Platform",
  description: "First Move (11–18) - Learn technology from foundational to advanced mastery through structured learning paths, active practice, and curated resources.",
  openGraph: {
    title: "First Move (11–18) | Educational Technology Learning Platform",
    description: "First Move (11–18) - Learn technology from foundational to advanced mastery through structured learning paths, active practice, and curated resources.",
    siteName: "First Move (11–18)",
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
