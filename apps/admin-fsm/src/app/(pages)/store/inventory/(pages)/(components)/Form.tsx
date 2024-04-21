'use client';

import { Button, Field, Modal } from '@fsm/ui';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface IForm {
  collection_id: string;
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
  defaultValues?: Partial<IForm>;
}

export default function Form({ onSubmit, defaultValues }: Props) {
  return (
    <Formik
      validateOnMount
      validationSchema={yup.object({})}
      initialValues={{
        collection_id: '',
      }}
      onSubmit={(params, actions) => onSubmit(params, actions)}
    >
      {({ values, handleSubmit, isSubmitting, isValid }) => (
        <div>
          <Field.Group name="collection_id" label="Collection">
            <Field.Input
              name="collection_id"
              value={values.collection_id}
              placeholder="Select Collection"
            />
          </Field.Group>
        </div>
      )}
    </Formik>
  );
}
