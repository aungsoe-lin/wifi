import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'WiFi Manager Pro | Empowering Infrastructure',
  description: 'Premium Wi-Fi customer management system for service providers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("antialiased", inter.variable, outfit.variable)}>
      <body suppressHydrationWarning className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
