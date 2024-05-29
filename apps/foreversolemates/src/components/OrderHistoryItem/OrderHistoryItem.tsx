import { helpers } from '@foreversolemates/utils';
import { Pill } from '@fsm/ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  total: number;
  delivery_status: string;
  order_reference: string;
  createdOn: string;
}

export default function OrderHistoryItem({
  className,
  total,
  delivery_status,
  order_reference,
  createdOn,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        'flex gap-4 justify-between px-2 py-4',
        'border border-gray-5 rounded-md shadow-sm',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <div>{order_reference}</div>
        <Pill.OrderStatus state={delivery_status as any} />
      </div>

      <div className="text-right">
        <div className="flex gap-1 items-center text-sm text-gray-30">
          <CalendarIcon size={12} />
          <span>{dayjs(createdOn).format('ddd, MMM D, YYYY')}</span>
        </div>
        <div className="text-lg text-gray-60 font-medium ">
          {/* Math.floor(Math.random() * (max - min)) + min */}
          {helpers.currencyFormatter(total)}
        </div>
      </div>
    </div>
  );
}
