import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  size?: number;
}

export default function Checkbox({
  checked,
  children,
  className,
  size = 20,
  onClick,
  ...props
}: Props) {
  return (
    <div onClick={onClick} className="flex gap-2 items-center">
      <div
        className={clsx(
          `rounded-md flex items-center justify-center w-[${size}px] h-[${size}px]`,
          checked
            ? 'text-white bg-gray-60'
            : 'border  border-gray-20 text-gray-20 bg-white',
          className
        )}
        {...props}
      >
        <CheckIcon size={size - 4} />
      </div>
      <div>{children}</div>
    </div>
  );
}
