import clsx from 'clsx';

export const metadata = {
  title: 'My cart',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={clsx('py-12 px-2 md:px-6 mx-auto')}>{children}</div>;
}
