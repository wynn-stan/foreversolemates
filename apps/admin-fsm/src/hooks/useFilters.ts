'use client';

import { useContext } from 'react';

import { FiltersContext } from '../providers/filters';

const useFilters = () => {
  /**
   * Hooks
   */
  const { filters, setFilters } = useContext(FiltersContext);

  return { filters, setFilters };
};

export default useFilters;
