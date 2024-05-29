import { Field, FieldAttributes } from 'formik';
import { useState } from 'react';
import clsx from 'clsx';

import Input from '../Input/Input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function Password({
  className,
  ...props
}: FieldAttributes<unknown>) {
  /**
   * state
   */
  const [view, setView] = useState(false);

  return (
    <div
      className={clsx(
        'flex gap-2 items-center',
        ` border border-gray-10 w-full ${className}`
      )}
    >
      <Field
        type={view ? 'text' : 'password'}
        className={clsx(
          'placeholder:text-gray-20 py-3 px-4 ',
          'outline-none w-full'
        )}
        {...props}
      />
      <div className="text-gray-20 pr-4 cursor-pointer">
        {view ? (
          <EyeOffIcon onClick={() => setView(false)} />
        ) : (
          <EyeIcon onClick={() => setView(true)} />
        )}
      </div>
    </div>
  );
}
