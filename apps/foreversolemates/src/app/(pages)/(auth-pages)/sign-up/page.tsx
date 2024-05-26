'use client';

import styled from 'styled-components';
import { useBanner } from '../../../../hooks';
import { Form, Formik } from 'formik';
import { Button, Field } from '@fsm/ui';

export default function Page() {
  // hooks
  useBanner({
    title: 'Sign up',
  });

  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        //
      }}
    >
      {({
        values,
        isValid,
        isSubmitting,
        handleSubmit,
        setSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form className="space-y-7">
          <Line className="h-[2px]" />
          <div className="space-y-5">
            <div className="text-gray-50 font-semibold text-xl">
              Account Sign up
            </div>
            <div className="text-sm text-gray-50">
              By creating an account with our store, you will be able to move
              through the checkout process faster, store multiple shipping
              addresses, view and track your orders in your account and more.{' '}
            </div>
          </div>

          <Line className="h-[4px]" />

          {/* User Details */}
          <div className="space-y-2">
            <div className="text-xl font-semibold">User Details</div>
            <div className="space-y-4">
              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="first_name"
                  label="First name"
                >
                  <Field.Input name="first_name" placeholder="First name" />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="ast_name"
                  label="Last name"
                >
                  <Field.Input name="last_name" placeholder="Last name" />
                </Field.Group>
              </div>

              <Field.Group wrapperClassName="w-full" name="email" label="Email">
                <Field.Input name="email" placeholder="Email" />
              </Field.Group>

              <Field.Group
                wrapperClassName="w-full"
                name="password"
                label="Password"
              >
                <Field.Input name="password" placeholder="Password " />
              </Field.Group>

              <Field.Group
                wrapperClassName="w-full"
                name="confirm_password"
                label="Confirm Password"
              >
                <Field.Input
                  name="confirm_password"
                  placeholder="Confirm Password"
                />
              </Field.Group>
            </div>
          </div>

          {/* Delivery Details */}
          <Line className="h-[4px]" />

          <div className="space-y-2">
            <div className="text-xl font-semibold">
              Delivery Details (optional)
            </div>
            <div className="space-y-4">
              <Field.Group
                wrapperClassName="w-full"
                name="address"
                label="Address/Location"
              >
                <Field.Input name="address" placeholder="Address/Location" />
              </Field.Group>

              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group wrapperClassName="w-full" name="city" label="City">
                  <Field.Input name="city" placeholder="City" />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="postal_code"
                  label="Postal code"
                >
                  <Field.Input name="postal_code" placeholder="Postal code" />
                </Field.Group>
              </div>

              <Field.Group
                wrapperClassName="w-full"
                name="phone"
                label="Phone number"
              >
                <Field.Phone
                  name="phone"
                  placeholder="Phone number"
                  value={''}
                  defaultCountry="GH"
                  onlyCountries={['GH']}
                  {...{ setFieldValue, setFieldTouched }}
                />
              </Field.Group>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            {...{ isSubmitting }}
            className="w-full"
          >
            Register Now
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const Line = styled.div`
  width: 100%;
  background-color: #e8e8e8;
`;
