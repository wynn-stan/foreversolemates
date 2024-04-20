'use client';

import { Dispatch, SetStateAction, useContext } from 'react';

import Sidebar from './Sidebar';
import { LayoutContext } from '../../providers/layout';
import { useRouter } from 'next/navigation';
import routes from '../../routes';
import { useStore } from '../../hooks';
import { ArrowLeftIcon, ChevronDownIcon, MenuIcon, X } from 'lucide-react';
import { Dropdown } from '@fsm/ui';
import Image from 'next/image';

interface Navbar {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ isOpen, setIsOpen }: Navbar) {
  //hooks
  const { layout, setLayout } = useContext(LayoutContext);
  const { store } = useStore();

  //functions
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  //navigation
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-white w-full px-6 py-4 md:px-8 border-b-2 border-gray-20">
      <div className="flex justify-between items-center text-[#1A2933]">
        {/* Right Section of Navbar */}
        {layout?.back ? (
          <div className="flex items-center gap-4">
            <span
              className="cursor-pointer"
              onClick={() => {
                layout?.back?.();
                setLayout({});
              }}
            >
              <ArrowLeftIcon />
            </span>
            {layout?.backComponent}
          </div>
        ) : (
          <div className="flex items-center gap-4 text-lg font-bold">
            <span className="cursor-pointer lg:hidden" onClick={toggleSidebar}>
              <MenuIcon />
            </span>
            <h4 className="text-2xl">{layout?.menuText}</h4>
          </div>
        )}

        {/* Sidebar when in mobile and tablet view */}
        {isOpen && (
          <div>
            <span
              className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
              onClick={toggleSidebar}
            />
            <div className="fixed z-50 gap-4 bg-white shadow-lg animate-in transition ease-in-out inset-y-0 left-0 h-full border-r sm:max-w-sm">
              <Sidebar {...{ toggleSidebar }} />
            </div>
          </div>
        )}

        {/* Left Section of Navbar */}
        <Dropdown>
          <Dropdown.Toggle className="flex items-center text-sm gap-2 relative">
            <Image
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
              src="/placeholder.png"
              alt="user image"
            />
            <div className="hidden sm:flex cursor-pointer flex-col gap-2 text-left">
              <small className="">{store?.user?.email || '--'}</small>
              <small className="text-muted font-medium">{'Harper'}</small>
            </div>

            <span className="hidden sm:block">
              <ChevronDownIcon size={24} />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="fixed">
            <Dropdown.Item
              onClick={() => {
                store?.logout?.();
                router.push(routes.auth.login.index);
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
