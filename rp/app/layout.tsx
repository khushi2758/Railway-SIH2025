import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Railway Traffic system",
  description: "A simple railway traffic system built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="geist-sans geist-mono antialiased">
        {children}
      </body>
    </html>
  );
}
