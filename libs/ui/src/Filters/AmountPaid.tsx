import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import { type FiltersProps, Item, Menu, Toggle } from './Template';

export default function AmountPaid({ filters, setFilters }: FiltersProps) {
  /**
   * Variables
   */
  const options = [
    { label: '₵ High to Low', value: 'high-to-low' },
    { label: '₵ Low to High', value: 'low-to-high' },
  ];

  const filterIsActive = filters?.amount_label;

  return (
    <Dropdown>
      <Toggle filterIsActive={filterIsActive}>
        {filterIsActive ? filters?.amount_label : '₵ Any Amount'}
      </Toggle>
      <Menu>
        {options.map((item, key) => (
          <Item
            checked={filters?.amount === item.value}
            key={key}
            onClick={() =>
              setFilters((filters: any) => {
                // an uncheck scenario
                if (filters?.amount === item.value) {
                  return {
                    ...filters,
                    amount: '',
                    amount_label: '',
                  };
                } else {
                  return {
                    ...filters,
                    amount: item.value,
                    amount_label: item.label,
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
