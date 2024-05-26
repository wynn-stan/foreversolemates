import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import { type FiltersProps, Item, Menu, Toggle } from './Template';
import { CreditCardIcon } from 'lucide-react';

export default function Channel({ filters, setFilters }: FiltersProps) {
  /**
   * Variables
   */
  const options = [
    { label: 'Card', value: 'card' },
    { label: 'Mobile money', value: 'mobile_money' },
  ];

  const filterIsActive = filters?.channel;

  return (
    <Dropdown>
      <Toggle filterIsActive={filterIsActive}>
        <div className="flex gap-2 items-center">
          <CreditCardIcon size={16} />
          {filterIsActive ? filters?.channel_label : 'Any channel'}
        </div>
      </Toggle>
      <Menu>
        {options.map((item, key) => (
          <Item
            checked={filters?.channel === item.value}
            key={key}
            onClick={() =>
              setFilters((filters: any) => {
                // an uncheck scenario
                if (filters?.channel === item.value) {
                  return {
                    ...filters,
                    channel: '',
                    channel_label: '',
                  };
                } else {
                  return {
                    ...filters,
                    channel: item.value,
                    channel_label: item.label,
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
