'use client';

import { Auth, Copyright, Field } from '@fsm/ui';
import { Formik } from 'formik';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
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

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={() => {}}
      >
        {() => (
          <div className="space-y-6">
            <Field.Group name="email" label="Email">
              <Field.Input name="email" placeholder="Email address" />
            </Field.Group>

            <Field.Group name="password" label="Password">
              <Field.Input
                name="password"
                type="password"
                placeholder="Password"
              />
            </Field.Group>
          </div>
        )}
      </Formik>

      <div className="bg-black py-3 px-5 text-white w-fit text-sm ">Login</div>
      <div>
        <Copyright />
      </div>
    </div>
  );
}
