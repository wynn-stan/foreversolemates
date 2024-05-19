'use client';

import { Logo, Modal } from '@fsm/ui';
import {
  HomeIcon,
  ShoppingBag,
  ShoppingBagIcon,
  StoreIcon,
  TruckIcon,
  X,
} from 'lucide-react';
import clsx from 'clsx';

import { NavProps } from './RootNavigation';
import routes from '../../routes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Icon = (props: any) => JSX.Element | React.ReactNode;

type NavLinks = {
  [key: string]: {
    label: string;
    sub_items: {
      label: string;
      icon: Icon;
      slug: string;
      activeRoute?: boolean;
    }[];
  };
};

export default function Sidebar({ showSidebar, setShowSidebar }: NavProps) {
  //variables items
  const onHide = () => setShowSidebar(false);
  const path = usePathname();

  //nav
  const NavLinks: NavLinks = {
    explore: {
      label: 'Explore',
      sub_items: [
        {
          label: 'Home',
          icon: HomeIcon,
          slug: routes.home.index,
        },
        {
          label: 'Shop',
          icon: StoreIcon,
          slug: routes.shop.all.index,
        },
      ],
    },
    cart_and_orders: {
      label: 'Cart & Orders',
      sub_items: [
        {
          label: 'My cart',
          icon: ShoppingBagIcon,
          slug: routes.cart.index,
        },
        {
          label: 'Track my order',
          icon: TruckIcon,
          slug: '#',
        },
      ],
    },
  };

  return (
    <Modal.Side direction="left" show={showSidebar} onHide={onHide}>
      <div
        className={clsx(
          'py-4 px-4 min-w-[300px] bg-gray-60 text-gray-5',
          'h-full',
          'space-y-10'
        )}
      >
        <div className="flex justify-between items-center">
          <Logo.Full variant="dark" />

          <div
            className=" opacity-70 hover:opacity-100 hover:cursor-pointer"
            onClick={onHide}
          >
            <X size={24} />
          </div>
        </div>

        <div className={clsx('space-y-6')}>
          {Object.keys(NavLinks).map((key, index) => {
            const { label, sub_items } = NavLinks[key];

            return (
              <div key={index} className="space-y-3">
                <div className="text-sm font-medium text-gray-40">{label}</div>
                {sub_items.map((item, key) => {
                  //variables
                  const { icon: Icon, label, slug } = item;
                  const activeRoute =
                    slug === '/' ? path === '/' : path.includes(slug);

                  return (
                    <Link
                      // onClick={() => onHide()}
                      className={clsx(
                        'flex gap-2 py-2 px-2 ',
                        'rounded-md',
                        'cursor-pointer',
                        'text-gray-40',
                        'hover:text-black hover:bg-gray-10 hover:font-medium',
                        activeRoute ? '!text-black font-medium bg-gray-10' : ''
                      )}
                      href={slug}
                      key={key}
                    >
                      <span>
                        <Icon
                          width={20}
                          height={20}
                          variant={activeRoute ? 'solid' : 'line'}
                        />
                      </span>
                      <div>{label}</div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Modal.Side>
  );
}
