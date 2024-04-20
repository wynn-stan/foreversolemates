'use client';

import { useContext } from 'react';

import { StoreContext } from '../contexts/store';

const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

export default useStore;
