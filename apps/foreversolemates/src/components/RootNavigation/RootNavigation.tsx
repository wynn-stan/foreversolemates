import Image from 'next/image';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Link from 'next/link';
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  UserRoundIcon,
} from 'lucide-react';

export default function RootNavigation() {
  return (
    <div className="px-8 py-4 flex justify-between gap-4 items-center">
      <div>
        <Link href="/">
          <StyledImage src="/assets/logo.jpg" alt="logo" />
        </Link>
      </div>

      <div className="hidden md:flex gap-4 items-center">
        <Link href="#">About us</Link>
        <Link href="#">Shop</Link>
        <Link href="#">Contact us</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link href="#">
          <SearchIcon />
        </Link>
        <Link href="#">
          <UserRoundIcon />
        </Link>
        <Link href="#">
          <ShoppingBagIcon />
        </Link>
      </div>
    </div>
  );
}

const StyledImage = styled.img`
  width: auto;
  height: 60px;
`;
