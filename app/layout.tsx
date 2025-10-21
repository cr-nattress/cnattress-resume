import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chris Nattress | Technical Lead & Senior Software Engineer",
  description: "Technical Lead with 12+ years experience designing scalable web applications across healthcare, fintech, and hospitality. Specialized in C#/.NET Core, Angular, cloud architectures, and AI systems. Expertise in microservices, distributed teams, and AI-powered automation.",
  keywords: [
    "Chris Nattress",
    "Technical Lead",
    "Senior Software Engineer",
    "C#",
    ".NET Core",
    "Angular",
    "TypeScript",
    "Microservices",
    "Azure",
    "AWS",
    "Cloud Architecture",
    "AI Integration",
    "Full Stack Developer",
    "React",
    "Vue.js",
    "Software Architect"
  ],
  authors: [{ name: "Chris Nattress" }],
  creator: "Chris Nattress",
  publisher: "Chris Nattress",
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
    type: "website",
    locale: "en_US",
    url: "https://chris-nattress.com",
    siteName: "Chris Nattress Portfolio",
    title: "Chris Nattress | Technical Lead & Senior Software Engineer",
    description: "Technical Lead with 12+ years building scalable applications. Specialized in C#/.NET, Angular, cloud architectures, and AI systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chris Nattress - Technical Lead & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris Nattress | Technical Lead & Senior Software Engineer",
    description: "Technical Lead with 12+ years building scalable applications. Specialized in C#/.NET, Angular, cloud architectures, and AI systems.",
    images: ["/og-image.png"],
    creator: "@chrisnattress",
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
  },
  alternates: {
    canonical: "https://chris-nattress.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1e293b" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
