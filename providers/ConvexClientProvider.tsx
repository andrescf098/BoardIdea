'use client';

import { useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react';
import { Loading } from '@/components/auth/loading';

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = new ConvexReactClient(convexUrl as string);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      {children}
      <AuthLoading>
        <Loading />
      </AuthLoading>
    </ConvexProviderWithClerk>
  );
};