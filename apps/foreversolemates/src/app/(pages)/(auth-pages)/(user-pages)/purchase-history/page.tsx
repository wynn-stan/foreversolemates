'use client';

import { useRouter } from 'next/navigation';
import { Button, Field, Paginate, Spinner } from '@fsm/ui';
import queryString from 'query-string';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import useSWR from 'swr';
import clsx from 'clsx';

import { OrderHistoryItem } from '../../../../../components';
import { PaginatedData } from '../../../../../models';
import { useBanner } from '../../../../../hooks';
import routes from '../../../../../routes';
import { helpers } from '@foreversolemates/utils';

export default function Page() {
  //state
  const [orderReference, setOrderReference] = useState('');
  const [page, setPage] = useState(0);

  //api
  const { data, isLoading, error, mutate } = useSWR<
    PaginatedData<{
      createdOn: string;
      delivery_status: string;
      order_reference: string;
      total: number;
      _id: string;
      payment_details: {
        channel: string;
      };
    }>
  >(
    `/orders/purchase_history?${queryString.stringify({
      page: 1,
      reference_order: orderReference,
    })}`
  );

  // hooks
  const router = useRouter();
  useBanner({
    title: 'Purchase history',
  });

  /**
   * Variables
   */
  const products = data?.data || [];

  //variables - paginated data
  const paginationInfo =
    data &&
    helpers.getPaginationInfo({
      page: data?.page,
      size: data?.size,
      totalCount: data?.totalCount,
    });

  return (
    <div className="space-y-4">
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={object({
          order_reference: string().required(' '),
        })}
        initialValues={{ order_reference: orderReference || '' }}
        onSubmit={({ order_reference }) => {
          setOrderReference(order_reference);
        }}
      >
        {({ values, isSubmitting, setSubmitting, handleSubmit, isValid }) => (
          <Form className="">
            <Field.Group
              name="order_reference"
              label="Order reference"
              containerClassName={clsx('flex gap-2')}
            >
              <Field.Input
                name="order_reference"
                placeholder="Order reference"
              />
              <Button
                className="flex-grow sm:flex-grow-0"
                type="submit"
                disabled={!isValid}
                direction="left"
                icon="search"
                isSubmitting={isLoading}
              >
                Search
              </Button>{' '}
            </Field.Group>
          </Form>
        )}
      </Formik>

      {!isLoading && !data?.data?.length && <div>Nothing found</div>}

      {isLoading && (
        <div className="flex flex-col justify-center gap-6">
          <div className="min-w-[300px] min-h-[100px] w-full animate-pulse bg-gray-10"></div>
          <div className="min-w-[300px] min-h-[100px] w-full animate-pulse bg-gray-10"></div>
          <div className="min-w-[300px] min-h-[100px] w-full animate-pulse bg-gray-10"></div>
        </div>
      )}

      {data && (
        <div className="space-y-4">
          {products.map((item, i) => (
            <OrderHistoryItem
              createdOn={item.createdOn}
              delivery_status={item.delivery_status}
              order_reference={item.order_reference}
              total={item.total}
              onClick={() =>
                router.push(
                  `${routes.track_my_order.index}?order-reference=${item.order_reference}`
                )
              }
              key={i}
            />
          ))}

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
      )}
    </div>
  );
}
