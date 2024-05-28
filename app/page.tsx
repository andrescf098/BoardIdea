'use client';

import { SignInButton } from '@clerk/nextjs';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
export default function Home() {
  const { isAuthenticated } = useConvexAuth();
  return (
    <main>
      {isAuthenticated ? 'Hola humano' : <SignInButton mode='modal' />}
    </main>
  );
}
