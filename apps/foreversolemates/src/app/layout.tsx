import './styles.scss';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'Forever SoleMates',
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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
