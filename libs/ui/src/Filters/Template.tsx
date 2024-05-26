import { ChevronDownIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import Dropdown from '../Dropdown/Dropdown';
import Checkbox from '../Checkbox/Checkbox';

export interface FiltersProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Toggle({
  children,
  filterIsActive,
}: Props & { filterIsActive: boolean }) {
  return (
    <Dropdown.Toggle
      className={clsx(
        'text-sm font-medium text-gray-30',
        'py-3 px-4 flex gap-2 rounded-sm',
        filterIsActive
          ? 'bg-gray-60 text-gray-5'
          : 'border border-gray-5 shadow-sm'
      )}
    >
      <div>{children}</div>
      <ChevronDownIcon size={20} />
    </Dropdown.Toggle>
  );
}

export function Menu({ children }: Props) {
  return <Dropdown.Menu>{children}</Dropdown.Menu>;
}

export function Item({
  children,
  checked,
  ...props
}: Props & { checked: boolean }) {
  return (
    <Dropdown.Item {...props}>
      <Checkbox checked={checked}>{children}</Checkbox>
    </Dropdown.Item>
  );
}
