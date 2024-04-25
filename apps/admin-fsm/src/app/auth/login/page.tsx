'use client';

import { Auth, Button, Copyright, Field } from '@fsm/ui';
import { Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
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
            email: yup.string().email().required('Error'),
            password: yup.string().required('Error'),
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
              .catch((err: { response: { data: { message: string } } }) => {
                setSubmitting(false);
                toast.error(helpers.capitalize(err?.response?.data?.message));
              });
          }}
        >
          {({ values, errors, isValid, handleSubmit, isSubmitting }) => (
            <div className="space-y-6">
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
                className="w-full"
                onClick={() => handleSubmit()}
                disabled={!isValid}
                {...{ isSubmitting }}
              >
                Login
              </Button>
            </div>
          )}
        </Formik>
      </div>
      <Copyright className="text-center" />
    </div>
  );
}
