import { Icons } from '@fsm/ui';
import clsx from 'clsx';

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 px-10">
      <div className="font-medium text-xl">{title}</div>
      <Icons.Line />
    </div>
  );
}
