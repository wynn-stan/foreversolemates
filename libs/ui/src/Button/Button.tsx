'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import Spinner from '../Spinner/Spinner';

type Variant =
  | 'default'
  | 'alert'
  | 'outline-secondary'
  | 'outline-tertiary'
  | 'outline-alert';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  variant?: Variant;
}

export default function Button({
  variant = 'default',
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
      {children}
    </button>
  );
}

// import { ButtonHTMLAttributes, forwardRef } from 'react';
// import { Spinner } from '../Spinner/Spinner';
// import { helpers } from '@foreversolemates/utils';

// export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   isSubmitting?: boolean;
//   contentClassName?: string;
// }

// export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       children,
//       disabled,
//       className,
//       isSubmitting = false,
//       contentClassName,
//       ...props
//     },
//     ref
//   ) => {
//     /**
//      * variables
//      */
//     disabled = (() => {
//       if (isSubmitting) {
//         return true;
//       }
//       return disabled;
//     })();

//     return (
//       <button
//         ref={ref}
//         className={helpers.classNames(
//           'outline-0 h-12 px-3.5',
//           'text-sm font-semibold whitespace-nowrap select-none',
//           'border-[1px] border-transparent rounded-sm',
//           'gap-2 flex items-center justify-center',
//           'disabled:pointer-events-none',
//           'active:shadow-[inset_0_0_100px_100px_rgba(0,0,0,0.1)]',
//           className
//         )}
//         {...{ disabled, ...props }}
//       >
//         {isSubmitting ? <Spinner /> : ''}
//         <div
//           className={helpers.classNames(
//             contentClassName,
//             'flex items-center justify-center gap-2'
//           )}
//         >
//           {children}
//         </div>
//       </button>
//     );
//   }
// );

// export default Button;
