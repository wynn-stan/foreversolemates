import clsx from 'clsx';

export const metadata = {
  title: 'My cart',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={clsx('')}>{children}</div>;
}
