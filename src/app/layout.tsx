import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FastCut AI | Lightning-Fast AI-Driven Video Editing for Creators",
  description: "Automated premium video editing for TikTokers, YouTubers, and Streamers. Turn raw footage into highly engaging viral clips in seconds with Alex Hormozi subtitles, sound effects, and layouts.",
  keywords: ["video editing", "AI video editor", "TikTok editor", "YouTube Shorts editor", "automated captions", "Alex Hormozi style", "Stream highlights"],
  authors: [{ name: "FastCut AI Team" }],
  openGraph: {
    title: "FastCut AI | Lightning-Fast AI-Driven Video Editing",
    description: "Automated premium video editing for TikTokers, YouTubers, and Streamers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-charcoal-950 text-foreground selection:bg-brand-purple/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
