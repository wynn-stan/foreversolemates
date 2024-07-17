'use client';

import { Button, Field } from '@fsm/ui';
import { Formik } from 'formik';
import * as yup from 'yup';

interface Props {
  onSubmit: (value: number | string) => void;
  valueType: 'string' | 'number';
  errorMessage: string;
  label: string;
}

export default function AddAttribute({
  label,
  onSubmit,
  valueType = 'string',
  errorMessage,
}: Props) {
  //variables
  const schema = valueType === 'string' ? yup.string() : yup.number();
  const initialValue = valueType === 'string' ? '' : 1;
  const inputProps = valueType === 'number' ? { min: 1, type: 'number' } : {};

  return (
    <Formik
      validateOnMount
      enableReinitialize
      validationSchema={yup.object({
        value: schema.required(errorMessage),
      })}
      initialValues={{ value: initialValue }}
      onSubmit={({ value }) => {
        onSubmit(value);
      }}
    >
      {({ values, handleSubmit, isValid }) => (
        <Field.Group
          wrapperClassName="max-w-[260px]"
          name="value"
          label={label}
        >
          <div className="flex gap-2">
            <Field.Input name="value" value={values.value} {...inputProps} />
            <Button
              disabled={!isValid}
              onClick={() => handleSubmit()}
              variant="outline-secondary"
              icon="plus"
            ></Button>
          </div>
        </Field.Group>
      )}
    </Formik>
  );
}
