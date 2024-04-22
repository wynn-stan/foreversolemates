import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
}

export default function Pill({
  checked,
  className,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        'flex gap-1 items-center justify-center px-6 py-3 font-medium',
        'text-sm rounded-full ',
        'border border-gray-20',
        checked ? 'text-white bg-black' : 'text-black',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {checked ? <CheckIcon size={16} /> : ''}
      <div>{children}</div>
    </div>
  );
}
