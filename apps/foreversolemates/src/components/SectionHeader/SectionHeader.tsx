import { Icons } from '@fsm/ui';
import clsx from 'clsx';

interface Props {
  title: string;
  headerClassName?: string;
}

export default function SectionHeader({ title, headerClassName }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 px-10">
      <div className={clsx('font-medium text-xl', headerClassName)}>
        {title}
      </div>
      <Icons.Line />
    </div>
  );
}
