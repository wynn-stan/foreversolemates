'use client';

import { helpers } from '@foreversolemates/utils';
import { Dropdown, Models, Paginate, Pill, Table } from '@fsm/ui';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import useSWR from 'swr';
import clsx from 'clsx';

import { updateOrderStatusService } from '../../../../services/store';
import { useLayout, useStore } from '../../../../hooks';
import { PaginatedData } from '../../../../models';
import routes from '../../../../routes';
import queryString from 'query-string';
import Filters from './(components)/Filters';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const router = useRouter();

  //store
  const { store } = useStore();

  //state
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<Models.FiltersModel>({});

  //api
  const { data, isLoading, error, mutate } = useSWR<
    PaginatedData<{
      _id: string;
      createdOn: string;
      total: number;
      order_reference: string;
      payment_details: {
        channel: string;
      };
      delivery_status: string;
    }>
  >(
    `/orders?${queryString.stringify({
      page: page + 1,
      size: 10,
      ...filters,
    })}`
  );

  //variables
  const orders = data?.data || [];

  //variables - status
  const allStatuses = helpers.getOrderStatuses();

  //variables - paginated data
  const paginationInfo =
    data &&
    helpers.getPaginationInfo({
      page: data?.page,
      size: data?.size,
      totalCount: data?.totalCount,
    });

  // effect
  useEffect(() => {
    setLayout({
      menuText: 'Order Management',
    });

    return () => setLayout({});
  }, []);

  //function - handle status update
  const handleStatusUpdate = (id: string, slug: string) => {
    updateOrderStatusService(id, slug)
      .then(() => {
        toast.success('Successfully update order status');
        mutate();
      })
      .catch(() => {
        toast.error('Something unexpected happened. Please try again. ');
      });
  };

  return (
    <div>
      <div className="mb-4">
        <Filters {...{ filters, setFilters }} />
      </div>

      <Table>
        <thead>
          <Table.Th>Amount</Table.Th>
          {/* <Table.Th>Customer</Table.Th> */}
          <Table.Th>Order Reference</Table.Th>
          <Table.Th>Channel</Table.Th>
          <Table.Th>Purchase Date</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th className="text-center">Actions</Table.Th>
        </thead>
        <tbody>
          {/* Loading */}
          {isLoading && <Table.Skeleton count={6} />}

          {/* Empty list */}
          {!isLoading && error && (
            <tr>
              <td colSpan={6}>
                <Table.Empty title="No records found" description="" />
              </td>
            </tr>
          )}

          {/* Response Recieved */}
          {data && (
            <>
              {/* Empty list */}
              {!orders.length && (
                <tr>
                  <td colSpan={7}>
                    <Table.Empty title="No records found" description="" />
                  </td>
                </tr>
              )}

              {/* Populated List */}
              {orders.map((order, key) => (
                <tr
                  key={key}
                  className="cursor-pointer hover:bg-gray-5"
                  onClick={() => {
                    router.push(
                      routes.store.order_management.details.replace(
                        '[id]',
                        order._id
                      )
                    );
                  }}
                >
                  <Table.Td className="font-medium">
                    {helpers?.currencyFormatter(order?.total)}
                  </Table.Td>
                  {/* <Table.Td>{order?.email}</Table.Td> */}
                  <Table.Td>{order?.order_reference}</Table.Td>
                  <Table.Td>{order?.payment_details.channel}</Table.Td>
                  <Table.Td>
                    {dayjs(order?.createdOn).format('MMM D, YYYY h:mm A')}
                  </Table.Td>
                  <Table.Td>
                    <Pill.OrderStatus
                      state={order?.delivery_status || ('' as any)}
                    />
                  </Table.Td>
                  <Table.Td onClick={(e) => e.stopPropagation()}>
                    <Dropdown className="w-full">
                      <Dropdown.Toggle className="mx-auto p-2 border border-gray-10">
                        <MoreHorizontal />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {Object.values(allStatuses).map((item, key) => (
                          <Dropdown.Item
                            className={clsx(
                              `text-[${item.darkColor}] flex gap-2 justify-end`
                            )}
                            key={key}
                            onClick={() =>
                              handleStatusUpdate(order?._id, item.slug)
                            }
                          >
                            <div className="font-medium">{item.label}</div>
                            <div>
                              <item.Icon size={20} />
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Table.Td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </Table>

      {data && paginationInfo && (
        <div className="flex justify-end py-8 px-4 sm:px-0 ">
          <Paginate
            to={paginationInfo?.to}
            from={paginationInfo?.from + 1}
            total={data?.totalCount}
            pageCount={data?.totalPages || 0}
            {...{ page, setPage }}
          />
        </div>
      )}
    </div>
  );
}
