'use client';

import {
  LogOutIcon,
  LucideIcon,
  ShoppingBagIcon,
  TruckIcon,
  UserCogIcon,
  Users,
  X,
} from 'lucide-react';
import routes from '../../routes';
import { ReactNode, useState } from 'react';
import { Auth, Logo, Spinner } from '@fsm/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '../../hooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';
import { helpers } from '@foreversolemates/utils';

interface Props {
  toggleSidebar?: () => void;
}

type Icon = (props: any) => JSX.Element | ReactNode;

type NavLinks = {
  [key: string]: {
    label: string;
    sub_items: { label: string; icon: Icon; slug: string }[];
  };
};

export default function Sidebar({ toggleSidebar }: Props) {
  //hooks
  const router = useRouter();
  const path = usePathname();

  //store
  const { store } = useStore();
  const user = store?.user;

  //state
  const [isSubmitting, setSubmitting] = useState(false);

  //nav
  const NavLinks: NavLinks = {
    store: {
      label: 'Store',
      sub_items: [
        {
          label: 'Inventory',
          icon: ShoppingBagIcon,
          slug: routes.store.inventory.index,
        },
        {
          label: 'Customer Management',
          icon: Users,
          slug: routes.store.customer_management.index,
        },
        {
          label: 'Order Management',
          icon: TruckIcon,
          slug: routes.store.order_management.index,
        },
      ],
    },
    system: {
      label: 'System',
      sub_items: [
        {
          label: 'Admin Users',
          icon: UserCogIcon,
          slug: routes.system.admin_users.index,
        },
      ],
    },
  };

  //functions
  const handleLogout = () => {
    setSubmitting(true);
    store?.logout?.();
  };
  return (
    <div className="bg-black min-w-[300px] border-r border-r-gray-10 h-screen overflow-auto py-4">
      <div className="h-full flex flex-col justify-between">
        <div className="">
          <div
            className={clsx(
              `px-8 flex gap-2  items-center font-semibold`,
              toggleSidebar ? 'justify-between' : 'justify-center'
            )}
          >
            <Logo.Full variant="light" />
            {toggleSidebar ? (
              <div
                className=" opacity-70 hover:opacity-100 hover:cursor-pointer"
                onClick={toggleSidebar}
              >
                <X size={24} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="py-4">
            {Object.keys(NavLinks).map((key, index) => {
              const { label, sub_items } = NavLinks[key];
              return (
                <div className="mb-6 px-3 space-y-1" key={index}>
                  <div className="text-sm font-normal tracking-tight text-gray-30">
                    {label}
                  </div>
                  {sub_items.map((item, key) => {
                    //variables
                    const { icon: Icon, label, slug } = item;
                    const activeRoute = path.includes(slug);
                    return (
                      <Link
                        href={slug}
                        key={slug}
                        className={twMerge(
                          'flex gap-2 py-3 px-2 ',
                          'rounded-md',
                          'text-base cursor-pointer',
                          'text-gray-40',
                          'hover:text-black hover:bg-gray-10 hover:font-medium',
                          activeRoute ? 'text-black font-medium bg-gray-10' : ''
                        )}
                        onClick={() => {
                          // router.push(slug);
                          toggleSidebar && toggleSidebar();
                        }}
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

        <div className="px-8 space-y-4">
          <div className="flex gap-3">
            <div>
              <Image
                width={34}
                height={34}
                alt="placeholder"
                src={'/placeholder.png'}
              />
            </div>

            <div className="tracking-tight">
              <div className="text-gray-200 font-medium">
                {helpers.capitalize(store?.user?.firstName || '--')}
                {'  '}
                {helpers.capitalize(store?.user?.lastName || '--')}
              </div>
              <div
                className={clsx(
                  'text-gray-30  break-words',
                  'sm:text-sm sm:max-w-[135px]'
                )}
              >
                {store?.user?.email}
              </div>
            </div>
          </div>
          <div
            onClick={() => handleLogout()}
            className={clsx(
              'hover:cursor-pointer py-2 flex items-center gap-2 font-medium',
              'text-gray-20'
            )}
          >
            {isSubmitting ? <Spinner /> : <LogOutIcon size={20} />}
            <div>Log out</div>
          </div>
        </div>
      </div>
    </div>
  );
}
