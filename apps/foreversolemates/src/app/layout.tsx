import { Analytics } from '@vercel/analytics/react';

import './styles.scss';
import { StyledComponentsRegistry } from './registry';
import { Layout } from '../components';
import AppProvider from '../providers/app';

export const metadata = {
  title: {
    template: '%s | ForeverSoleMates',
    default: 'ForeverSoleMates',
  },
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <StyledComponentsRegistry>
          <AppProvider>
            <Layout.Root>{children}</Layout.Root>
          </AppProvider>
        </StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}
