import { ChangeEvent, HtmlHTMLAttributes, useCallback, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { helpers } from '@foreversolemates/utils';
import debounce from 'lodash/debounce';

import Group from '../Group/Group';
import Input from '../Input/Input';
import clsx from 'clsx';
import EmptyFormik from '../../EmptyFormik/EmptyFormik';

export interface SearchProps extends HtmlHTMLAttributes<HTMLInputElement> {
  delay?: number;
  placeholder?: string;
  onSearch: (search: string) => void;
  wrapperClassName?: string;
  inputClassName?: string;
}

export function Search({
  delay = 500,
  onSearch,
  wrapperClassName,
  inputClassName,
  placeholder,
  ...props
}: SearchProps) {
  /**
   * state
   */
  const [search, setSearch] = useState<string>();

  /**
   * function
   */
  const handleSearch = useCallback(
    debounce((search) => {
      onSearch(search);
    }, delay),
    []
  );

  return (
    <div
      className={clsx(
        'placeholder:text-gray-20',
        'flex gap-3 items-center',
        `outline-none px-4 border border-gray-10 w-full ${wrapperClassName}`
      )}
    >
      <SearchIcon className="text-gray-30" size={20} />

      <input
        name="search"
        placeholder={placeholder || 'Search...'}
        className={clsx('py-3 outline-none w-full', inputClassName)}
        onChange={({
          currentTarget: { value },
        }: ChangeEvent<HTMLInputElement>) => {
          setSearch(value);
          handleSearch(value);
        }}
      />
    </div>
  );
}
