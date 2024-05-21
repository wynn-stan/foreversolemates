'use client';

import { Button, Field, Order } from '@fsm/ui';
import { object, string } from 'yup';
import { useEffect } from 'react';
import { Formik } from 'formik';
import useSWR from 'swr';
import clsx from 'clsx';

import { PurchaseOrderDetails } from './(components)/tempData';
import LocalModal from './(components)/Modal';
import { useLayout, useStore } from '../../../hooks';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store } = useStore();

  //api
  //   const { data, isLoading } = useSWR('');

  //effect
  useEffect(() => {
    const banner = {
      title: 'Track my order',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  const data = PurchaseOrderDetails;

  return (
    <>
      <div className="max-w-[1152px] mx-auto p-4 lg:p-6 space-y-10">
        <Formik
          enableReinitialize
          validateOnMount
          validationSchema={object({
            order_reference: string().required(' '),
          })}
          initialValues={{ order_reference: '' }}
          onSubmit={() => {
            //
          }}
        >
          {({ values, isSubmitting, setSubmitting, handleSubmit, isValid }) => (
            <div className="">
              <Field.Group
                name="order_reference"
                label="Order reference"
                containerClassName={clsx(
                  'flex flex-col items-end md:flex-row gap-2'
                )}
              >
                <Field.Input
                  name="order_reference"
                  placeholder="Order reference"
                />
                <Button
                  type="submit"
                  disabled={!isValid}
                  onClick={() => handleSubmit()}
                  direction="left"
                  icon="search"
                >
                  Search
                </Button>{' '}
              </Field.Group>
            </div>
          )}
        </Formik>

        <div className={clsx('flex flex-col lg:flex-row gap-4 lg:gap-5')}>
          <div className="lg:max-w-[450px] space-y-10 w-full">
            <Order.OrderSummary
              items={store?.cart || []}
              showList={true}
              showActions={false}
              subtotal={0}
              tax_amount={0}
              total={0}
              status="in-production"
            />

            <Order.PaymentDetails {...data.payment_details} />
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
      </div>

      <LocalModal show={false} onHide={() => false} />
    </>
  );
}
