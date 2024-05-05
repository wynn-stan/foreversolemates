import { Footer, RootNavigation } from '../index';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <RootNavigation />

      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
