'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import Spinner from '../Spinner/Spinner';
import {
  ChevronDownIcon,
  EyeIcon,
  PlusIcon,
  ShoppingCartIcon,
} from 'lucide-react';

type Variant =
  | 'default'
  | 'alert'
  | 'dark'
  | 'outline-secondary'
  | 'outline-tertiary'
  | 'outline-alert'
  | 'outline-black';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  variant?: Variant;
  icon?: 'plus' | 'eye' | 'chevrondown' | 'cart';
  direction?: 'left' | 'right';
}

export default function Button({
  variant = 'default',
  direction = 'right',
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
    dark: 'text-white bg-[#262626]',
    alert: 'text-white bg-red-40',
    'outline-secondary': 'text-black border border-gray-10',
    'outline-tertiary': 'text-black border border-gray-30',
    'outline-alert': 'text-red-40 bg-white border border-red-10',
    'outline-black': 'text-black bg-white border border-black',
  };

  //icon
  const Icon = (() => {
    switch (icon) {
      case 'cart':
        return ShoppingCartIcon;
      case 'chevrondown':
        return ChevronDownIcon;
      case 'eye':
        return EyeIcon;
      case 'plus':
        return PlusIcon;
      default:
        return () => <></>;
    }
  })();

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
        {direction === 'left' ? <Icon size={20} /> : <></>}
        {children}
        {direction === 'right' ? <Icon size={20} /> : <></>}
      </>
    </button>
  );
}
