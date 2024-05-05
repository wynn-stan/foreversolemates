'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export interface NavProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RootNavigation() {
  //state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="w-full">
      <Navbar {...{ showSidebar, setShowSidebar }} />
      <Sidebar {...{ showSidebar, setShowSidebar }} />
    </div>
  );
}
