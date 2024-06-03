'use client';

import { useRouter } from 'next/navigation';
import { Button, Field } from '@fsm/ui';
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

  return (
    <div>
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

      {isLoading && <div>Loading...</div>}

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
        </div>
      )}
    </div>
  );
}
