'use client';

import { Formik } from 'formik';
import * as yup from 'yup';
import Field from '../../Field/Field';
import Button from '../../Button/Button';

interface Props {
  onAdd: (quantity: number) => void;
  max?: number;
}

export default function AddToCart({ onAdd }: Props) {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={yup.object({
        quantity: yup
          .number()
          .min(1, 'Quantity must be at least 1')
          .required('Quantity is required'),
      })}
      initialValues={{ quantity: 0 }}
      onSubmit={({ quantity }) => {
        onAdd(quantity);
      }}
    >
      {({ values, handleSubmit, isValid }) => (
        <Field.Group name="quantity" label="Purchase units">
          <div className="flex gap-4 flex-wrap w-full">
            <Field.Input
              type="number"
              name="quantity"
              value={values.quantity || undefined}
              placeholder="0"
            />
            <Button
              onClick={() => handleSubmit()}
              disabled={!isValid}
              className="w-full"
              icon="cart"
            >
              Add To Cart
            </Button>
          </div>
        </Field.Group>
      )}
    </Formik>
  );
}
