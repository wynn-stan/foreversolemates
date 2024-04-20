'use client';

import React, { useState } from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function RootNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  //state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //functions
  const toggleSidebar = () => setIsOpen((isOpen) => !isOpen);

  return (
    <div className="flex h-full max-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full h-full flex flex-col overflow-x-auto">
        <Navbar {...{ isOpen, setIsOpen }} />
        <div className="py-8 px-6 md:px-8 flex-grow flex flex-col overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
