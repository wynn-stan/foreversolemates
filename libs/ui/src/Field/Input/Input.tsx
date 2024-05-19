import { Field, FieldAttributes } from 'formik';
import { twJoin, twMerge } from 'tailwind-merge';

export default function Input({
  name,
  className,
  value,
  ...props
}: FieldAttributes<unknown>) {
  return (
    <Field
      className={twMerge(
        'placeholder:text-gray-20',
        `outline-none py-3 px-4 border border-gray-10 w-full ${className}`
      )}
      name={name}
      {...props}
    />
  );
}
