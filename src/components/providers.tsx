'use client';

import { SessionProvider } from 'next-auth/react';
import type { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider refetchInterval={0}>
      {children}
    </SessionProvider>
  );
}
