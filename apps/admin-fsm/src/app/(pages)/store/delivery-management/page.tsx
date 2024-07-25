'use client';

import { useEffect, useState } from 'react';
import { Button, Field, Modal, Models, Paginate } from '@fsm/ui';
import useSWR from 'swr';

import { LocationModel, PaginatedData } from '../../../../models';
import { useLayout } from '../../../../hooks';
import queryString from 'query-string';
import { MapPinIcon } from 'lucide-react';
import { helpers } from '@foreversolemates/utils';
import clsx from 'clsx';
import Add from './(components)/Add';

export default function Page() {
  /**
   * Hooks
   */
  const { setLayout } = useLayout();

  /**
   * State
   */
  const [page, setPage] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [filters, setFilters] = useState<{ page?: number; name?: string }>({
    page,
  });

  /**
   * API
   */
  const { data, isLoading, mutate } = useSWR<PaginatedData<LocationModel>>(
    `/locations?${queryString.stringify({
      ...filters,
      page: (filters?.page || 0) + 1,
      size: 24,
    })}`
  );
  const locations = data?.data;
  /**
   * Variables - paginated data
   */
  const paginationInfo =
    data &&
    helpers.getPaginationInfo({
      page: data?.page,
      size: data?.size,
      totalCount: data?.totalCount,
    });

  /**
   * Effects
   */
  useEffect(() => {
    setLayout({
      menuText: `Delivery Management`,
    });
  }, []);

  /**
   * effect on page
   */
  useEffect(() => {
    setFilters((filters) => ({ ...filters, page }));
  }, [page, setFilters]);

  return (
    <>
      <div className="space-y-10">
        <div className={clsx('flex gap-5', 'flex-col sm:flex-row')}>
          <Field.Search
            wrapperClassName={clsx('min-w-[200px]', 'w-full sm:max-w-[300px]')}
            onSearch={(search) => {
              setFilters((filters) => ({
                ...filters,
                page: 0,
                name: search,
              }));
            }}
          />
          <Button
            variant="outline-secondary"
            className="flex gap-2"
            icon="plus"
            direction="left"
            onClick={() => {
              setShowAdd(true);
            }}
          >
            <span>Add Location</span>
          </Button>
        </div>

        <div
          className={clsx(
            'grid gap-8',
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg'
          )}
        >
          {/* Loading State */}
          {!data &&
            Array.from({ length: 16 }, (_, index) => (
              <div
                key={index}
                className="h-[84px] w-full bg-gray-20 animate-pulse rounded-xl"
              ></div>
            ))}
          {/* Data is Present */}
          {locations?.map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'py-6 px-3 w-full',
                  'flex items-center gap-3',
                  'border border-grey-30 rounded-xl'
                )}
              >
                <MapPinIcon size={24} className="text-gray-30" />
                <div className="font-medium">
                  <div>{item.name}</div>
                  <div>{helpers.currencyFormatter(item.cost)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {data && paginationInfo && (
          <div className="flex justify-center pb-8">
            <Paginate
              to={paginationInfo.to}
              from={paginationInfo.from + 1}
              total={data?.totalCount}
              pageCount={data?.totalPages || 0}
              {...{ page, setPage }}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <Add
        onHide={() => setShowAdd(false)}
        show={showAdd}
        mutate={() => {
          setPage(0);
          setTimeout(() => mutate());
        }}
      />
    </>
  );
}
