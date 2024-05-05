import './styles.scss';
import { StyledComponentsRegistry } from './registry';
import { Layout } from '../components';

export const metadata = {
  title: 'ForeverSoleMates',
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
          <Layout.Root>{children}</Layout.Root>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
