"use client"

import "./globals.css";
import Script from "next/script";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
      <Script
        src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('PptxGenJS script loaded successfully')}
        onError={(e) => console.error('PptxGenJS script failed to load', e)}
      />
      </head>
      <body>{children}</body>
    </html>
    
  );
}
