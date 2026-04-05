'use client';

import { useEffect } from 'react';

export function HydrationErrorHandler() {
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args) => {
      // Skip hydration mismatch errors - they're a known issue with Turbopack
      if (
        args[0]?.includes?.('A tree hydrated') ||
        args[0]?.includes?.('hydration')
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
