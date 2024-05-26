'use client';

import { Form, Formik } from 'formik';
import Link from 'next/link';

import { useBanner } from '../../../../hooks';
import { Button, Field } from '@fsm/ui';

export default function Page() {
  // hooks
  useBanner({
    title: 'Login',
  });

  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        //
      }}
    >
      {({ values, isValid, isSubmitting, handleSubmit }) => (
        <Form className="space-y-8 max-w-[350px] mx-auto">
          <div className="text-center">
            <div className="font-medium text-lg text-gray-50">
              Log In To Your Account
            </div>
            <div className="text-sm text-gray-30">
              Don`t have an account?
              <Link href="/sign-up" className="text-gray-60 underline">
                Register Here
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <Field.Group name="email" label="Email">
              <Field.Input name="email" placeholder="Email" />
            </Field.Group>

            <Field.Group name="password" label="Password">
              <Field.Input name="password" placeholder="Password" />
            </Field.Group>

            <Button
              type="submit"
              disabled={!isValid}
              {...{ isSubmitting }}
              className="w-full"
            >
              Login
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
