import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';
import OrderStatus from './OrderStatus';

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  withoutIcon?: boolean;
}

function Pill({
  withoutIcon = false,
  size = 'lg',
  checked,
  className,
  onClick,
  children,
  ...props
}: Props) {
  //variables
  const sizeStyle = (() => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-xs';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3';
      default:
        return 'px-6 py-3';
    }
  })();

  return (
    <div
      className={clsx(
        sizeStyle,
        'flex gap-1 items-center justify-center font-medium',
        'text-sm rounded-full ',
        'border border-gray-20',
        checked ? 'text-white bg-black' : 'text-black',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {checked && !withoutIcon ? <CheckIcon size={16} /> : ''}
      <div>{children}</div>
    </div>
  );
}

export default Object.assign(Pill, { OrderStatus });
