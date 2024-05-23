'use client';

import { useSearchParams } from 'next/navigation';
import { Button, Field, Order } from '@fsm/ui';
import { object, string } from 'yup';
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import useSWR from 'swr';
import clsx from 'clsx';

import { useLayout, useStore } from '../../../hooks';
import LocalModal from './(components)/Modal';
import { OrderModel } from '../../../models';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store } = useStore();
  const order_reference_param = useSearchParams().get('order-reference');

  const store_reference = store?.user?.order_reference;

  //state
  const [orderReference, setOrderReference] = useState(
    order_reference_param || store_reference
  );
  const [showModal, setShowModal] = useState(
    order_reference_param || store_reference ? false : true
  );

  //api
  const {
    data: apiData,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: OrderModel[] }>(
    `/get_order_by_reference/${orderReference}`
  );

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

  const data = apiData?.data?.[0];

  const products_bought =
    data?.products_bought?.map((item) => {
      const { product_id, ...rest } = item;
      return { ...rest, ...product_id };
    }) || [];

  //function - handleSearchSubmit
  const handleSearchSubmit = (
    params: { order_reference: string },
    actions: { setSubmitting: any }
  ) => {
    setOrderReference(params.order_reference);
    if (!isLoading) actions.setSubmitting(false);
  };

  return (
    <>
      <div className="max-w-[1152px] mx-auto p-4 lg:p-6 space-y-10">
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

        {!data && <div>Nothing found</div>}

        {data && (
          <div className={clsx('flex flex-col lg:flex-row gap-4 lg:gap-5')}>
            <div className="lg:max-w-[450px] space-y-10 w-full">
              <Order.OrderSummary
                items={products_bought}
                showList={true}
                showActions={false}
                subtotal={data.subtotal}
                tax_amount={data.tax_amount}
                total={data.total}
                status={data?.delivery_status as any}
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
        )}
      </div>

      <LocalModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={(params) => {
          setOrderReference(params.order_reference);
          setShowModal(false);
        }}
      />
    </>
  );
}
