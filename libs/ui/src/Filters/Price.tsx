import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import { type FiltersProps, Item, Menu, Toggle } from './Template';

export default function Price({ filters, setFilters }: FiltersProps) {
  /**
   * Variables
   */
  const options = [
    { label: '₵ High to Low', value: 'high_to_low' },
    { label: '₵ Low to High', value: 'low_to_high' },
  ];

  const filterIsActive = filters?.price_label;

  return (
    <Dropdown>
      <Toggle filterIsActive={filterIsActive}>
        {filterIsActive ? filters?.price_label : '₵ Any Price'}
      </Toggle>
      <Menu>
        {options.map((item, key) => (
          <Item
            checked={filters?.price === item.value}
            key={key}
            onClick={() =>
              setFilters((filters: any) => {
                // an uncheck scenario
                if (filters?.price === item.value) {
                  return {
                    ...filters,
                    price: '',
                    price_label: '',
                  };
                } else {
                  return {
                    ...filters,
                    price: item.value,
                    price_label: item.label,
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
