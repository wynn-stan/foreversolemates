'use client';

import { Auth, Button, Copyright, Field } from '@fsm/ui';
import { Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { helpers } from '@foreversolemates/utils';
import { useRouter, useSearchParams } from 'next/navigation';

import { useStore } from '../../../hooks';
import { useEffect } from 'react';
import { confirmAdminAccountService } from 'apps/admin-fsm/src/services/user';

export default function Page() {
  //hooks
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Auth.Brand />
        <Auth.Header
          HeaderText="Create your account"
          SubText={
            <>
              Already have an account?
              <Link href="/auth/login" className="text-black underline">
                Log in
              </Link>
            </>
          }
        />
      </div>

      <div className="">
        <Formik
          validateOnMount
          validationSchema={yup.object({
            // email: yup.string().email().required('Error'),
            password: yup.string().required('Password is required'),
            confirm_password: yup
              .string()
              .oneOf([yup.ref('password')], 'Passwords do not match')
              .required('Please confirm password'),
          })}
          initialValues={{
            confirm_password: '',
            password: '',
          }}
          onSubmit={({ password }, { setSubmitting }) => {
            confirmAdminAccountService({
              password,
              confirmationCode: token,
            })
              .then(() => {
                toast.success('Account created successfully');
                router.push('/auth/login');
              })
              .catch(() => {
                toast.error('Unable to create account. Please try again');
                setSubmitting(false);
              });
          }}
        >
          {({ values, errors, isValid, handleSubmit, isSubmitting }) => (
            <div className="space-y-6">
              <Field.Group name="password" label="Password">
                <Field.Input
                  name="password"
                  value={values.password}
                  type="password"
                  placeholder="Password"
                />
              </Field.Group>

              <Field.Group name="confirm_password" label="Confirm password">
                <Field.Input
                  name="confirm_password"
                  value={values.confirm_password}
                  type="password"
                  placeholder="Confirm password"
                />
              </Field.Group>

              <Button
                className="w-full"
                onClick={() => handleSubmit()}
                disabled={!isValid}
                {...{ isSubmitting }}
              >
                Create Account
              </Button>
            </div>
          )}
        </Formik>
      </div>
      <Copyright className="text-center" />
    </div>
  );
}
