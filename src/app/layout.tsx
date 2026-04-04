import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lending Club - Personal Loans Made Simple",
  description:
    "Get personal loans from $2,000 to $50,000 with competitive rates. Fast approval, transparent terms, and funding in as little as 24 hours.",
  keywords:
    "personal loans, lending, quick loans, low interest loans, debt consolidation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
