import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/navbar/Navbar';
import Providers from '@/components/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kyrox - Educational Platform',
  description: 'Learn web development and become a Kyroxer',
  keywords: 'education, web development, courses, learning',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#16213e] text-white min-h-screen">
        <Providers>
          <Navbar session={session} />
          <main className="relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

