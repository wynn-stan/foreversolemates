'use client';

import { Auth, Button, Copyright, Field } from '@fsm/ui';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { helpers } from '@foreversolemates/utils';
import { useRouter } from 'next/navigation';

import { useStore } from '../../../hooks';

export default function Page() {
  //navigation
  const router = useRouter();

  //store
  const { setStore } = useStore();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Auth.Brand />
        <Auth.Header
          HeaderText="Log in to your Account"
          SubText={<>Welcome back! Please enter your details</>}
        />
      </div>

      <div className="">
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
              .then(
                (response: {
                  data: { email: string; firstName: string; lastName: string };
                }) => {
                  setStore((store) => ({
                    ...store,
                    user: {
                      email: response?.data?.email,
                      firstName: response?.data?.firstName,
                      lastName: response?.data?.lastName,
                    },
                  }));
                  router.push('/');
                }
              )
              .catch(
                (err: {
                  response: { data: { message: string }; status: number };
                }) => {
                  setSubmitting(false);
                  err?.response?.status === 504
                    ? toast.error('Server is booting up. Please try again')
                    : toast.error(
                        helpers.capitalize(err?.response?.data?.message)
                      );
                }
              );
          }}
        >
          {({ values, errors, isValid, handleSubmit, isSubmitting }) => (
            <Form className="space-y-6">
              <Field.Group name="email" label="Email">
                <Field.Input
                  name="email"
                  value={values.email}
                  placeholder="Email address"
                />
              </Field.Group>

              <Field.Group name="password" label="Password">
                <Field.Input
                  name="password"
                  value={values.password}
                  type="password"
                  placeholder="Password"
                />
              </Field.Group>

              <Button
                type="submit"
                className="w-full"
                disabled={!isValid}
                {...{ isSubmitting }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <Copyright className="text-center" />
    </div>
  );
}
