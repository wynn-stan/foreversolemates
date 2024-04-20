'use client';

import { RootNavigation } from '../../components';
import AuthProvider from '../../providers/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RootNavigation>{children}</RootNavigation>
    </AuthProvider>
  );
}
