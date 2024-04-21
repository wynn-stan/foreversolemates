'use client';

import { useEffect } from 'react';
import { RootNavigation } from '../../components';
import { useLayout } from '../../hooks';
import AuthProvider from '../../providers/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RootNavigation>{children}</RootNavigation>
    </AuthProvider>
  );
}
