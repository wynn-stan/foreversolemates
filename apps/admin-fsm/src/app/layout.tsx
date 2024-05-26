import './styles.scss';
import { StyledComponentsRegistry } from './registry';
import StoreProvider from '../contexts/store';
import AppProvider from '../providers/app';

export const metadata = {
  title: {
    template: '%s |  Admin ForeverSoleMates',
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
        <StoreProvider>
          <AppProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </AppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
