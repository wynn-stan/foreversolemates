import clsx from 'clsx';
import Sidebar, { Collection } from './Sidebar';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  collections: Collection[];
}

export default function SidebarLayout({
  children,
  collections,
  className,
  ...props
}: Props) {
  return (
    <div className={clsx('flex gap-10 h-full', className)} {...props}>
      <div className="hidden xl:block">
        <Sidebar collections={collections} />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
