import clsx from 'clsx';
import Checkbox from '../../Checkbox/Checkbox';
import { currencyFormatter } from '../../Utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  name: string;
  amount?: number;
}

export default function ZoneOption({
  name,
  amount,
  checked = false,
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        'p-2 ',
        'flex gap-2 justify-between',
        'cursor-pointer ',
        className
      )}
      {...props}
    >
      <div className="flex gap-2">
        <Checkbox checked={checked} />
        <span className="font-medium truncate max-w-fit">{name}</span>
      </div>
      <div className="font-medium">
        {amount ? currencyFormatter(amount) : 'Free'}
      </div>
    </div>
  );
}
