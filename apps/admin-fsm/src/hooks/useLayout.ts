'use client';

import { useContext } from 'react';

import { LayoutContext } from '../providers/layout';

const useLayout = () => {
  const store = useContext(LayoutContext);
  return store;
};

export default useLayout;
