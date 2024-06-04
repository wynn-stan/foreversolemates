import { LoaderIcon } from 'lucide-react';
import clsx from 'clsx';

import { type FiltersProps, Item, Menu, Toggle } from './Template';
import Dropdown from '../Dropdown/Dropdown';

export default function Status({ filters, setFilters }: FiltersProps) {
  /**
   * Variables
   */
  const options = [
    { label: 'In-Production', value: 'in production' },
    { label: 'Ready for delivery', value: 'ready for delivery' },
    { label: 'Out for delivery', value: 'out for delivery' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Order Reversed', value: 'order reversed' },
  ];

  const filterIsActive = filters?.status;

  return (
    <Dropdown>
      <Toggle filterIsActive={filterIsActive}>
        <div className="flex gap-2 items-center">
          <LoaderIcon size={16} />
          {filterIsActive ? filters?.status_label : 'Any Status'}
        </div>
      </Toggle>
      <Menu>
        {options.map((item, key) => (
          <Item
            checked={filters?.status === item.value}
            key={key}
            onClick={() =>
              setFilters((filters: any) => {
                // an uncheck scenario
                if (filters?.status === item.value) {
                  return {
                    ...filters,
                    page: 0,

                    status: '',
                    status_label: '',
                  };
                } else {
                  return {
                    ...filters,
                    page: 0,

                    status: item.value,
                    status_label: item.label,
                  };
                }
              })
            }
          >
            {item.label}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
}
