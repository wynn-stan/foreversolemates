import { helpers } from '@foreversolemates/utils';
import { Pill } from '@fsm/ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';

interface Props {
  onClick?: () => void;
}

export default function OrderHistoryItem({ onClick }: Props) {
  return (
    <div
      className={clsx(
        'flex gap-4 justify-between px-2 py-4',
        'border border-gray-5 rounded-md shadow-sm',
        'cursor-pointer',
        ''
      )}
      onClick={onClick}
    >
      <div className="space-y-1">
        <div>FSM-lwjfu4oy-kmc</div>
        <Pill.OrderStatus state="ready for delivery" />
      </div>

      <div className="text-right">
        <div className="flex gap-1 items-center text-sm text-gray-30">
          <CalendarIcon size={12} />
          <span>{dayjs().format('ddd, MMM D, YYYY')}</span>
        </div>
        <div className="text-lg text-gray-60 font-medium ">
          {/* Math.floor(Math.random() * (max - min)) + min */}
          {helpers.currencyFormatter(
            Math.floor(Math.random() * (800 - 150)) + 150
          )}
        </div>
      </div>
    </div>
  );
}
