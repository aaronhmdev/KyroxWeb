'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

interface ClientSessionProps {
  children: ReactNode;
}

export function ClientSession({ children }: ClientSessionProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
