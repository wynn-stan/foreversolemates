'use client';

import { createContext, useState } from 'react';

type GenericObject = { [key: string]: any };

export const FiltersContext = createContext<{
  filters: GenericObject;
  setFilters: React.Dispatch<React.SetStateAction<GenericObject>>;
}>({
  filters: {},
  setFilters: () => {
    //
  },
});

function FiltersProvider({ children }: { children: React.ReactNode }) {
  /**
   * State
   */
  const [filters, setFilters] = useState({});

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersProvider;
