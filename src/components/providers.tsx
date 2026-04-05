'use client';

import { ClientSession } from './ClientSession';
import type { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ClientSession>
      {children}
    </ClientSession>
  );
}
