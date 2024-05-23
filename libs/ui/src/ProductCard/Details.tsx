'use client';

import clsx from 'clsx';
import Images from './Details/Images';
import Price from './Details/Price';
import StockIndicator from './Details/StockIndicator';
import Description from './Details/Description';
import SizeOptions from './Details/SizeOptions';
import ColorOptions from './Details/ColorOptions';
import AddToCart from './Details/AddToCart';
import { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';

interface ProductModel {
  _id: string;
  available_sizes: number[];
  images: string[];
  available_colors: string[];
  product_name: string;
  initial_price: number;
  discount: number;
  available_units: number;
  alert: number;
  description: string;
  status: string;
  collection_id: string;
  createdOn: string;
}

interface Props {
  details: ProductModel;
  onAdd?: (
    product: Partial<ProductSpecs>,
    actions: FormikHelpers<ProductSpecs>
  ) => void;
}

interface ProductSpecs {
  color: string;
  size: number;
  quantity: number;
}

function Details({
  details,
  onAdd = () => {
    //
  },
}: Props) {
  //variables - has available colors and sizes
  const hasColors = details?.available_colors?.length;
  const hasSizes = details?.available_sizes?.length;
  const hasColorsOrSizes = hasColors || hasSizes;

  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={yup.object({
        quantity: yup
          .number()
          .min(1, 'Quantity must be at least 1')
          .required('Quantity is required'),
        ...(hasColors
          ? { color: yup.string().required('Color is required') }
          : {}),
        ...(hasSizes
          ? { size: yup.number().required('Size is required') }
          : {}),
      })}
      initialValues={{ quantity: 0, color: '', size: 0 }}
      onSubmit={(params, actions) => {
        onAdd(params, actions);
        // resetForm();
      }}
    >
      {({
        values,
        isValid,
        handleSubmit,
        setFieldValue,
        resetForm,
        isSubmitting,
      }) => (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className={clsx('flex flex-col md:flex-row gap-4')}
        >
          <div className="">
            <Images urls={details.images} />
          </div>
          <div className="space-y-3 flex-grow md:max-w-[375px] ">
            <div className="">
              <div className="text-3xl tracking-tight font-medium">
                {details.product_name}
              </div>
              <Price
                initial_price={details.initial_price}
                discount={details.discount}
              />
            </div>
            <StockIndicator
              available_units={details.available_units}
              low_stock_indicator={details.alert}
            />
            <Description description={details.description} />
            {hasColorsOrSizes ? (
              <div className="flex gap-6 flex-wrap">
                {details?.available_sizes?.length ? (
                  <div className="flex-grow">
                    <SizeOptions
                      checkedSize={values.size}
                      onClick={(size) => {
                        setFieldValue('size', size);
                      }}
                      sizes={details.available_sizes}
                    />
                  </div>
                ) : (
                  ''
                )}

                {details?.available_colors?.length ? (
                  <div className="flex-grow">
                    <ColorOptions
                      colors={details.available_colors}
                      checkedColor={values.color}
                      onClick={(color) => {
                        setFieldValue('color', color);
                      }}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <></>
            )}
            <div className="h-full">
              <AddToCart
                handleSubmit={() => {
                  handleSubmit();
                }}
                {...{ isValid, values, setFieldValue, isSubmitting }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </Formik>
  );
}

export default Object.assign(Details, {
  Price,
  SizeOptions,
  StockIndicator,
  AddToCart,
  ColorOptions,
  Description,
  Images,
});
