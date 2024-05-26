'use client';

import { useRouter } from 'next/navigation';
import { Button, Field } from '@fsm/ui';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import useSWR from 'swr';
import clsx from 'clsx';

import { OrderHistoryItem } from '../../../../../components';
import { useBanner } from '../../../../../hooks';
import routes from '../../../../../routes';

export default function Page() {
  //state
  const [orderReference, setOrderReference] = useState('');

  //api
  const { data, isLoading, error, mutate } = useSWR(``);

  // hooks
  const router = useRouter();
  useBanner({
    title: 'Purchase history',
  });

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

      {/* {!data && <div>Nothing found</div>} */}

      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <OrderHistoryItem
            onClick={() =>
              router.push(
                `${routes.track_my_order.index}?order-reference=FSM-lwjfu4oy-kmc`
              )
            }
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
