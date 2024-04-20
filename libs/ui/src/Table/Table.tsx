import { ReactNode } from 'react';
import Empty from './Empty';
import clsx from 'clsx';

/* eslint-disable-next-line */
export interface TableProps {
  className?: string;
  children: ReactNode;
}

export function Table({ className, children }: TableProps) {
  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table>{children}</table>
    </div>
  );
}

export function Th({ className, children }: TableProps) {
  return (
    <th>
      <div className={clsx(className)}>{children}</div>
    </th>
  );
}

export function Td({
  className,
  children,
  onClick,
  colSpan,
  rowSpan,
  truncate = true,
}: TableProps & {
  onClick?: (e: any) => void;
  colSpan?: number;
  rowSpan?: number;
  truncate?: boolean;
}) {
  return (
    <td {...{ onClick, colSpan, rowSpan }}>
      <div className={clsx(className, truncate ? 'truncate-3' : '')}>
        {children}
      </div>
    </td>
  );
}

export function Skeleton({
  count,
  item_count,
}: {
  count: number;
  item_count?: number;
}) {
  return Array.from({ length: item_count || 10 }, (_, i) => (
    <tr key={i}>
      {Array.from({ length: count }, (_, i) => (
        <td key={i}>
          <div className="bg-neutral-200 animate-pulse h-3.5 rounded w-12" />
        </td>
      ))}
    </tr>
  ));
}

export default Object.assign(Table, { Th, Td, Skeleton, Empty });
