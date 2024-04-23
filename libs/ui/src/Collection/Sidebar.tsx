'use client';

import clsx from 'clsx';
import { MinusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface CoreCollection {
  id: string;
  collection_name: string;
  slug?: string;
}

export interface Collection extends CoreCollection {
  sub_collections?: CoreCollection[];
  [key: string]: any;
}

interface Props {
  collections: Collection[];
}

export default function Sidebar({ collections }: Props) {
  //hooks
  const path = usePathname();

  return (
    <div className="space-y-6 w-[225px]">
      {collections?.map((item, key) => (
        <div key={key}>
          <Link href={item.slug || ''}>
            <div
              className={clsx(
                'font-medium  text-sm',
                'hover:text-gray-50',
                'space-y-4',
                path.includes(item.slug || '') ? 'text-black' : 'text-gray-30'
              )}
            >
              <div className="flex justify-between items-center">
                {item.sub_collections?.length ? (
                  <>
                    {item.collection_name}
                    <MinusIcon size={16} />
                  </>
                ) : (
                  <>{item.collection_name}</>
                )}
              </div>
              <div className="pl-4 space-y-4">
                {item.sub_collections?.map((sub_item, key) => {
                  return (
                    <div key={key}>
                      <Link href={sub_item.slug || ''}>
                        <div
                          className={clsx(
                            'font-medium text-sm',
                            'hover:text-gray-50',
                            path.includes(sub_item.id)
                              ? '!text-black'
                              : '!text-gray-30'
                          )}
                        >
                          <div>{sub_item.collection_name}</div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
