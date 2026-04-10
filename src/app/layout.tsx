import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Pokémon Interface | Explore Pokedex',
  description: 'Pokémon explorer web application built with Next.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          'min-h-screen bg-background text-foreground font-inter antialiased',
          inter.variable,
          outfit.variable
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex overflow-hidden">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
