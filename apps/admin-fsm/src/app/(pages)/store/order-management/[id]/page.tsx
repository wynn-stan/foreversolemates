'use client';

import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dropdown, Order, Table } from '@fsm/ui';
import useSWR from 'swr';

import { useLayout, useStore } from '../../../../../hooks';
import { OrderModel, PaginatedData } from '../../../../../models';
import routes from '../../../../../routes';
import clsx from 'clsx';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Props) {
  //hooks
  const { layout, setLayout } = useLayout();
  const router = useRouter();

  //store
  const { store } = useStore();

  //state
  const [showAdd, setShowAdd] = useState(false);

  //api
  const {
    data: apiData,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: OrderModel }>(`/view/order/${id}`);

  //variables
  //   const orders = data?.data || [];

  // effect
  useEffect(() => {
    setLayout({
      back: () => router.push(routes.store.order_management.index),
      backComponent: <span>Order</span>,
    });

    return () => setLayout({});
  }, []);

  const data = apiData?.data;

  const products_bought =
    data?.products_bought?.map((item) => {
      const { product_id, ...rest } = item;
      return { ...rest, ...product_id };
    }) || [];

  return (
    <>
      {data && (
        <div className={clsx('flex flex-col xl:flex-row gap-4 lg:gap-5')}>
          <div
            className={clsx(
              'flex flex-col md:flex-row xl:flex-col gap-[40px]',
              'xl:max-w-[450px] w-full'
            )}
          >
            <Order.PaymentDetails
              className="w-full h-fit"
              {...data.payment_details}
              fees={(data?.payment_details?.fees || 0) / 100}
              amount={(data?.payment_details?.amount || 0) / 100}
            />

            <Order.OrderSummary
              items={products_bought}
              showList={true}
              showActions={false}
              subtotal={data?.subtotal}
              tax_amount={data?.tax_amount}
              total={data?.total}
              status={data?.delivery_status as any}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex-grow w-[2px] bg-gray-5 hidden md:block" />
          </div>

          <Order.DeliveryForm
            disabled
            defaultValues={data?.delivery_details}
            onSubmit={() => {
              //
            }}
          />
        </div>
      )}
    </>
  );
}
