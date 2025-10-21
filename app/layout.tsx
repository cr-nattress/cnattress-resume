import type { Metadata } from "next";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "Chris Nattress - Software Engineer & AI Architect",
  description: "AI-enhanced portfolio showcasing full-stack development and AI integration expertise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
