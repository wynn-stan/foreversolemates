import { ReactNode } from 'react';

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
}
