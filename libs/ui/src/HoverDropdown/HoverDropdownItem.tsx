import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import Dropdown from '../Dropdown/Dropdown';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function HoverDropdownItem({ children }: Props) {
  return (
    <Dropdown.Item
      className={clsx(
        'flex gap-2  items-center p-2 rounded-md',
        'font-medium',
        'hover:!bg-gray-60 hover:!text-gray-5'
      )}
    >
      {children}
    </Dropdown.Item>
  );
}
