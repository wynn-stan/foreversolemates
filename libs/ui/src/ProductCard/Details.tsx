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
import { ProductModel } from '../models';

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
  /**
   * State
   */
  const [maxQuantity, setMaxQuantity] = useState(() => {
    if (!details.available_sizes_and_units.length) {
      return details.total_available_units > 0
        ? details.total_available_units
        : 0;
    }
    return 0;
  });

  //variables - has available colors and sizes
  // const hasColors = details?.available_colors?.length;
  // const hasColorsOrSizes = hasColors || hasSizes;
  const hasSizes = details?.available_sizes_and_units?.length;

  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={yup.object({
        quantity: yup
          .number()
          .min(1, 'Quantity must be at least 1')
          .max(maxQuantity, `Max quantity is ${maxQuantity}`)
          .required('Quantity is required'),
        // ...(hasColors
        //   ? { color: yup.string().required('Color is required') }
        //   : {}),
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
        validateForm,
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
              available_units={details.total_available_units}
              low_stock_indicator={details.alert}
            />

            <Description description={details.description} />

            {details?.available_sizes_and_units?.length ? (
              <div className="flex gap-6 flex-wrap">
                <div className="flex-grow">
                  <SizeOptions
                    checkedSize={values.size}
                    onClick={(item) => {
                      setMaxQuantity(item.available_units);
                      setFieldValue('size', item.size);
                      setTimeout(() => {
                        validateForm();
                      });
                    }}
                    sizes={details.available_sizes_and_units}
                  />
                </div>

                {/* Colors */}
                {/* {details?.available_colors?.length ? (
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
                )} */}
              </div>
            ) : (
              <></>
            )}
            <div className="h-full">
              <AddToCart
                maxQuantity={maxQuantity}
                handleSubmit={() => {
                  handleSubmit();
                }}
                {...{ isValid, values, setFieldValue, isSubmitting }}
              />

              {/* <Link
                href={'https://www.instagram.com/direct/t/17844626705847523'}
              >
                <Button>
                  Send a custom order
                  <InstagramIcon />{' '}
                </Button>
              </Link> */}
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
