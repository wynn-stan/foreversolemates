import { Icons } from '@fsm/ui';
import clsx from 'clsx';

interface Props {
  title: string;
  actions?: React.ReactNode;
}

export default function WithLine({ title, actions }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 px-10">
      <div className="flex gap-8 items-center">
        <div className="font-medium text-xl">{title}</div>
        {actions && <div>{actions}</div>}
      </div>
      <Icons.Line />
    </div>
  );
}
