import dayjs from 'dayjs';
import { HTMLAttributes } from 'react';

export default function Copyright({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-gray-30 text-sm ${className}`} {...props}>
      &copy; ForeverSoleMates {dayjs().format('YYYY')}
    </div>
  );
}
