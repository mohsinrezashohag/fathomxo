import SmoothScrollProvider from '@/src/components/animation/smooth-scroll';
import Footer from '@/src/components/shared/layout/footer/footer';
import Navbar from '@/src/components/shared/layout/navbar/navbar';
import { fontVariables } from '@/src/utils/font';
import { generateMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Extensions (ColorZilla, Grammarly, and the like) inject attributes into
          body before React hydrates; suppressHydrationWarning does not inherit
          from html, so body needs its own. */}
      <body className={`${fontVariables} antialiased`} suppressHydrationWarning>
        <SmoothScrollProvider>
          <Navbar />
          <main className="bg-canvas">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
