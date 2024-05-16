import { forwardRef, useCallback, useMemo } from 'react';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { Calendar } from 'lucide-react';
import dayjs from 'dayjs';
import clsx from 'clsx';

// eslint-disable-next-line
export interface DateProps extends DateTimePickerProps {
  setFieldValue: (
    field: string,
    value: string | string[],
    shouldValidate?: boolean
  ) => void;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}

export const Date = forwardRef<any, DateProps>(
  (
    {
      name,
      value,
      options,
      className,
      placeholder,
      setFieldValue,
      setFieldTouched,
      ...props
    },
    ref
  ) => {
    /**
     * variables
     */
    const _options = useMemo(
      () => ({ noCalendar: false, ...options }),
      [options]
    );

    /**
     * function
     */

    const handleDates = useCallback(() => {
      if (_options?.mode === 'range') {
        const dates = (value as string[]).filter(Boolean);
        if (dates.length === 2) {
          return dates.map((i) => dayjs(i).toDate());
        }
        return [];
      } else {
        return value ? dayjs(value as string).toDate() : '';
      }
    }, [_options, value]);

    const dates = (() => {
      return handleDates();
    })();

    return (
      <>
        <Flatpickr
          ref={ref}
          value={dates}
          className={clsx(className, 'form-input')}
          onChange={(date) => {
            const value =
              _options?.mode === 'range'
                ? date.map((d) => dayjs(d).format('YYYY-MM-DD'))
                : dayjs(date[0]).format(
                    _options?.enableTime ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD'
                  );

            setFieldValue(String(name), value);
            if (Array.isArray(value) ? value.length === 2 : value) {
              setTimeout(() => setFieldTouched?.(String(name), true));
            }
          }}
          options={{
            ..._options,
            disableMobile: true,
            ...(!_options?.noCalendar && {
              dateFormat:
                _options?.dateFormat ||
                (_options?.enableTime ? 'd - M - Y @ h:i K' : 'd - M - Y'),
            }),
          }}
          placeholder={
            placeholder ||
            (_options?.enableTime
              ? '01 - jan - 2023 @ 6:00 PM'
              : _options?.mode === 'range'
              ? '01 - jan - 2023  to  01 - feb - 2023'
              : '01 -  jan - 2023')
          }
          {...props}
        />
        {!options?.inline && (
          <span className="px-4 pointer-events-none absolute right-0">
            <Calendar className="text-neutral-500" />
          </span>
        )}
      </>
    );
  }
);

export default Date;
