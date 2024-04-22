'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import Spinner from '../Spinner/Spinner';
import { ChevronDownIcon, EyeIcon, PlusIcon } from 'lucide-react';

type Variant =
  | 'default'
  | 'alert'
  | 'outline-secondary'
  | 'outline-tertiary'
  | 'outline-alert'
  | 'outline-black';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  variant?: Variant;
  icon?: 'plus' | 'eye' | 'chevrondown';
}

export default function Button({
  variant = 'default',
  icon,
  disabled,
  children,
  className,
  isSubmitting = false,
  ...props
}: Props) {
  //variables
  const isDisabled = (() => {
    if (isSubmitting) return true;
    return disabled;
  })();

  //variant styles
  const variant_style: { [key: string]: string } = {
    default: 'text-white bg-black',
    alert: 'text-white bg-red-40',
    'outline-secondary': 'text-black border border-gray-10',
    'outline-tertiary': 'text-black border border-gray-30',
    'outline-alert': 'text-red-40 bg-white border border-red-10',
    'outline-black': 'text-black bg-white border border-black',
  };

  return (
    <button
      className={twMerge(
        'flex items-center justify-center gap-2',
        'py-3 px-4',
        'rounded-sm',
        'font-medium',
        'disabled:pointer-events-none disabled:bg-gray-10 disabled:text-gray-40',
        variant_style[variant],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isSubmitting ? <Spinner /> : ''}
      <>
        {icon && icon === 'plus' ? <PlusIcon size={20} /> : <></>}
        {children}
        {icon && icon === 'eye' ? <EyeIcon size={20} /> : <></>}
        {icon && icon === 'chevrondown' ? <ChevronDownIcon size={20} /> : <></>}
      </>
    </button>
  );
}
