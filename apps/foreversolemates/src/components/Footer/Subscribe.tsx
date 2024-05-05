'use client';

import { schema } from '@foreversolemates/utils';
import { Button, Field } from '@fsm/ui';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function Subscribe() {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={yup.object({
        email: schema.requireEmail('', false).required(''),
      })}
      initialValues={{ email: '' }}
      onSubmit={() => {}}
    >
      {({ values, isValid, isSubmitting, handleSubmit }) => (
        <div className="space-y-2 sm:max-w-sm">
          <div className="font-medium">Get Exclusive Offers</div>
          <div className="text-sm text-gray-50">
            Get our latest news and promo updates directly to your email address
            every month
          </div>
          <div className="flex gap-4">
            <Field.Group wrapperClassName="w-full" name="email" label="">
              <Field.Input
                placeholder="Email address"
                name="email"
                value={values.email}
              />
            </Field.Group>
            <div>
              <Button className="" disabled={!isValid} {...{ isSubmitting }}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
