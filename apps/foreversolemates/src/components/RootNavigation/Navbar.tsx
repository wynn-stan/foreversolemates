'use client';

import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserRoundIcon,
} from 'lucide-react';
import { HoverDropdown, Logo } from '@fsm/ui';
import Link from 'next/link';

import { NavProps } from './RootNavigation';
import routes from '../../routes';
import { useStore } from '../../hooks';
import clsx from 'clsx';
import styled from 'styled-components';

export default function Navbar({ setShowSidebar, showSidebar }: NavProps) {
  //hooks
  const { store } = useStore();

  return (
    <div className={clsx('flex justify-between items-center py-4 px-8')}>
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setShowSidebar(true)}
      >
        <MenuIcon />
      </div>

      <Link href={routes.home.index}>
        <Logo.Full />
      </Link>

      <div className="hidden md:flex gap-4 items-center">
        <HoverDropdown href={routes.home.index} label="Home" />
        <HoverDropdown href={routes.shop.all.index} label="Shop" />
        <HoverDropdown href="#" label="About us" />

        <HoverDropdown label="Cart & Orders">
          <div
            className={clsx(
              'flex flex-col gap-2 px-4 min-w-[200px] text-right',
              'font-medium '
            )}
          >
            <div
              className={clsx(
                'flex gap-2 justify-end items-center p-2 rounded-md',
                'hover:bg-gray-60 hover:text-gray-5'
              )}
            >
              <Link className="" href={routes.cart.index}>
                My Cart
              </Link>
              <ShoppingBagIcon size={16} />
            </div>

            <div
              className={clsx(
                'flex gap-2 justify-end items-center p-2 rounded-md',
                'hover:bg-gray-60 hover:text-gray-5'
              )}
            >
              <Link className="" href={routes.track_my_order.index}>
                Track my order
              </Link>
              <TruckIcon size={16} />
            </div>
          </div>
        </HoverDropdown>
      </div>

      {/* <Link href={routes.home.index}>Home</Link>
        <Link href={routes.shop.all.index}>Shop</Link>
        <Link href="#">About us</Link> */}

      <div className="flex gap-4 items-center">
        {/* <Link href="#">
          <SearchIcon />
        </Link> */}
        {/* <Link href="#">
            <UserRoundIcon />
          </Link> */}
        <Link className="relative" href={routes.cart.index}>
          <ShoppingBagIcon />
          <div
            className={clsx(
              'absolute top-[-15px] right-[-15px] w-5 h-5 rounded-full',
              ' bg-gray-800 flex justify-center items-center',
              'text-white text-sm'
            )}
          >
            {store?.cart?.length || 0}
          </div>
        </Link>
      </div>
    </div>
  );
}

const StyledLinks = styled.div`
  & a:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;
