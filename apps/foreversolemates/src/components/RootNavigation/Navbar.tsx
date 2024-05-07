'use client';

import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserRoundIcon,
} from 'lucide-react';
import { Logo } from '@fsm/ui';
import Link from 'next/link';

import { NavProps } from './RootNavigation';
import routes from '../../routes';

export default function Navbar({ setShowSidebar, showSidebar }: NavProps) {
  return (
    <div className="flex justify-between items-center py-4 px-8">
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
        <Link href={routes.home.index}>Home</Link>
        <Link href={routes.shop.all.index}>Shop</Link>
        <Link href="#">About us</Link>
      </div>

      <div className="flex gap-4 items-center">
        {/* <Link href="#">
          <SearchIcon />
        </Link> */}
        {/* <Link href="#">
            <UserRoundIcon />
          </Link> */}
        <Link href={routes.cart.index}>
          <ShoppingBagIcon />
        </Link>
      </div>
    </div>
  );
}
