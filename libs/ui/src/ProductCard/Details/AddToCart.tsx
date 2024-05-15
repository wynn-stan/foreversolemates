'use client';

import { Formik } from 'formik';
import * as yup from 'yup';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import EmptyFormik from '../../EmptyFormik/EmptyFormik';

interface Props {
  handleSubmit: () => void;
  values: { quantity: number };
  isValid: boolean;
  setFieldValue: any;
}

export default function AddToCart({
  values,
  handleSubmit,
  isValid,
  setFieldValue,
}: Props) {
  return (
    <Field.Group name="quantity" label="Purchase units">
      <div className="flex gap-4 flex-wrap w-full">
        <Field.Input
          type="number"
          name="quantity"
          value={values.quantity}
          placeholder="0"
        />

        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full"
          icon="cart"
        >
          Add To Cart
        </Button>
      </div>
    </Field.Group>
  );
}
