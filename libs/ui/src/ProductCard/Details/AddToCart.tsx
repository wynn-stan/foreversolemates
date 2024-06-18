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
  isSubmitting: boolean;
  maxQuantity: number;
}

export default function AddToCart({
  isSubmitting,
  values,
  handleSubmit,
  isValid,
  setFieldValue,
  maxQuantity,
}: Props) {
  return (
    <Field.Group name="quantity" label="Purchase units">
      <div className="flex gap-4 flex-wrap w-full">
        <Field.Input
          type="number"
          name="quantity"
          min={0}
          max={maxQuantity}
          placeholder="0"
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid}
          isSubmitting={isSubmitting}
          className="w-full"
          icon="cart"
        >
          Add To Cart
        </Button>
      </div>
    </Field.Group>
  );
}
