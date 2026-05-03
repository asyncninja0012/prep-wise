import { isAuthenticated } from '@/lib/actions/auth.actions';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

async function LandingLayout({ children }: { children: ReactNode }) {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect('/dashboard');

  return <>{children}</>;
}

export default LandingLayout;
