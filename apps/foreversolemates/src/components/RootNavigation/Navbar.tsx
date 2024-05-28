'use client';

import {
  CircleUserIcon,
  ClipboardPenLineIcon,
  ContactIcon,
  HistoryIcon,
  MenuIcon,
  ScanFaceIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserRoundIcon,
} from 'lucide-react';
import { Dropdown, HoverDropdown, Logo } from '@fsm/ui';
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
          <HoverDropdown.DropdownItem>
            <ShoppingBagIcon size={16} />

            <Link className="" href={routes.cart.index}>
              My Cart
            </Link>
          </HoverDropdown.DropdownItem>

          <HoverDropdown.DropdownItem>
            <TruckIcon size={16} />

            <Link className="" href={routes.track_my_order.index}>
              Track my order
            </Link>
          </HoverDropdown.DropdownItem>
        </HoverDropdown>
      </div>

      {/* <Link href={routes.home.index}>Home</Link>
        <Link href={routes.shop.all.index}>Shop</Link>
        <Link href="#">About us</Link> */}

      <div className="flex gap-4 items-center">
        {/* <Link href="#">
          <SearchIcon />
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

        <Dropdown>
          <Dropdown.Toggle>
            <CircleUserIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu className="font-medium px-2 py-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.9)]">
            <DropdownItem>
              <Link className="flex gap-2 items-center" href="/login">
                <ScanFaceIcon size={20} />
                <span>Log in</span>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link className="flex gap-2 items-center" href="/sign-up">
                <ClipboardPenLineIcon size={20} />
                <span>Sign up</span>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link className="flex gap-2 items-center" href="/profile">
                <ContactIcon size={20} />
                <span>My Profile</span>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link
                className="flex gap-2 items-center"
                href="/purchase-history"
              >
                <HistoryIcon size={20} />
                <span>Purchase History</span>
              </Link>
            </DropdownItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

const DropdownItem = styled(Dropdown.Item)`
  padding: 12px 8px;
  border-radius: 8px;
  &:hover {
    background-color: #1e1e1e;
    color: #f0f0f0;
  }
`;
