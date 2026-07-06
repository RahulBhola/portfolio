import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul Bhola | Software Engineer",
  description:
    "Enterprise Software Engineer at Capgemini building scalable cloud applications for Disney. .NET Full Stack Developer specializing in Azure, ASP.NET Core, and Angular.",
  keywords: [
    "Rahul Bhola",
    "Software Engineer",
    "Capgemini",
    "Disney",
    ".NET Developer",
    "Full Stack Developer",
    "Azure",
    "ASP.NET Core",
    "Angular",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Rahul Bhola" }],
  openGraph: {
    title: "Rahul Bhola | Software Engineer",
    description:
      "Enterprise Software Engineer building scalable cloud applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Bhola | Software Engineer",
    description:
      "Enterprise Software Engineer building scalable cloud applications.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
