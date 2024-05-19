'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import clsx from 'clsx';

export interface NavProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RootNavigation() {
  //state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={clsx('w-full', 'sticky top-0 z-10 bg-white')}>
      <Navbar {...{ showSidebar, setShowSidebar }} />
      <Sidebar {...{ showSidebar, setShowSidebar }} />
    </div>
  );
}
