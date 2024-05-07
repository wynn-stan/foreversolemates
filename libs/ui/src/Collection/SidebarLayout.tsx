import clsx from 'clsx';
import Sidebar, { Collection } from './Sidebar';

interface Props {
  children: React.ReactNode;
  collections: Collection[];
}

export default function SidebarLayout({ children, collections }: Props) {
  return (
    <div className="py-8 px-6 md:px-8 flex gap-10 h-full">
      <div className="hidden md:block">
        <Sidebar collections={collections} />
      </div>
      <div
        className={clsx('h-full w-[1px] bg-gray-10', 'hidden md:block')}
      ></div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
