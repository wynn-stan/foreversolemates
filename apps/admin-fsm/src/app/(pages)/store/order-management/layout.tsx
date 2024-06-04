import FiltersProvider from '../../../../providers/filters';

export const metadata = {
  title: 'Order management',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FiltersProvider>{children}</FiltersProvider>;
}
