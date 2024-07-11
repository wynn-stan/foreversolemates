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
    <div className="space-y-2 w-[260px]">
      {collections?.map((item, key) => (
        <div key={key}>
          <div>
            <div
              className={clsx(
                'font-medium text-sm',
                'hover:text-gray-50',
                'px-3 py-3',
                'space-y-2',
                'rounded-md',
                !item.sub_collections?.length && 'hover:bg-gray-5',
                path.includes(item.slug || '') && !item.sub_collections?.length
                  ? 'text-gray-50 bg-gray-5  '
                  : 'text-gray-30'
              )}
            >
              <Link href={item.slug || ''}>
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
              </Link>
              {!!item.sub_collections?.length && (
                <div className="pl-6 space-y-1">
                  {item.sub_collections?.map((sub_item, key) => {
                    return (
                      <div key={key}>
                        <Link
                          onClick={(e) => e.stopPropagation()}
                          href={sub_item.slug || ''}
                        >
                          <div
                            className={clsx(
                              'font-medium',
                              'hover:text-gray-50 hover:bg-gray-5',
                              'px-3 py-3',
                              'rounded-md',
                              path.includes(sub_item.id)
                                ? 'text-gray-50 bg-gray-5 '
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
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
