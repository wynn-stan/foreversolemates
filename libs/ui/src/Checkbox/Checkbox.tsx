import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
}

export default function Checkbox({
  checked,
  children,
  className,
  ...props
}: Props) {
  return (
    <div className="flex gap-2">
      <div
        className={clsx(
          'rounded-md flex items-center justify-center w-[20px] h-[20px]',
          checked
            ? 'text-white bg-gray-60'
            : 'border  border-gray-20 text-gray-20',
          className
        )}
        {...props}
      >
        <CheckIcon size={16} />
      </div>
      <div>{children}</div>
    </div>
  );
}
