'use client';

import { helpers } from '@foreversolemates/utils';
import { useRouter } from 'next/navigation';
import { Button, Field } from '@fsm/ui';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import axios from 'axios';

import { useBanner, useStore } from '../../../../hooks';
import { UserModel } from '../../../../models';

export default function Page() {
  // hooks
  useBanner({
    title: 'Login',
  });

  //hooks
  const router = useRouter();
  const { store, setStore } = useStore();

  return (
    <Formik
      validateOnMount
      validationSchema={yup.object({
        email: yup.string().email().required('Email is required'),
        password: yup.string().required('Password is required'),
      })}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={({ email, password }, { setSubmitting }) => {
        axios
          .post<never, any>('/api/auth/login', {
            email,
            password,
          })
          .then((response: { data: UserModel }) => {
            toast.success('Login successful.');
            setStore((store) => ({
              ...store,
              user: response?.data,
            }));
            router.push('/shop/all');
          })
          .catch(
            (err: {
              response: { data: { message: string }; status: number };
            }) => {
              setSubmitting(false);
              err?.response?.status === 504
                ? toast.error('Server is booting up. Please try again')
                : toast.error(helpers.capitalize(err?.response?.data?.message));
            }
          );
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
              <Field.Password name="password" placeholder="Password" />
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
