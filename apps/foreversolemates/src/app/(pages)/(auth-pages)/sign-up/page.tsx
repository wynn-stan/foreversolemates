'use client';

import { Button, Field, Modal } from '@fsm/ui';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { registerUserService } from '../../../../services/auth';
import { useBanner } from '../../../../hooks';
import { schema } from '@foreversolemates/utils';
import { useState } from 'react';
import { InfoIcon } from 'lucide-react';

export default function Page() {
  //state
  const [showModal, setShowModal] = useState(true);

  // hooks
  useBanner({
    title: 'Sign up',
  });

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={yup.object({
          email: schema.requireString('Email'),
          firstName: schema.requireString('First name'),
          lastName: schema.requireString('Last name'),
          password: schema.requireString('Password'),
          confirm_password: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Please confirm password'),
          mobileNo: schema.requireString('Phone number'),
        })}
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          confirm_password: '',
          mobileNo: '',
          recipient_address: '',
          recipient_city: '',
          recipient_postal_code: '',
          recipient_phone: '',
        }}
        onSubmit={(params, actions) => {
          const {
            firstName,
            lastName,
            password,
            email,
            mobileNo,
            ...delivery_details
          } = params;
          registerUserService({
            country: 'GHANA',

            firstName,
            lastName,
            password,
            email,
            mobileNo,
            delivery_details: {
              ...delivery_details,
            },
          })
            .then((res: { message?: string }) => {
              toast.success(res?.message || 'Account created successfully');
              setShowModal(true);
            })
            .catch((err: { message?: string }) => {
              toast.error(
                err?.message ||
                  'Something unexpected happened. Please try again'
              );
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
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
            <StyledDiv className="space-y-2">
              <div className="text-xl font-semibold">User Details</div>
              <div className="space-y-4">
                <div className="md:flex space-y-4 md:space-y-0 gap-4">
                  <Field.Group
                    wrapperClassName="w-full"
                    name="firstName"
                    label="First name"
                  >
                    <Field.Input name="firstName" placeholder="First name" />
                  </Field.Group>

                  <Field.Group
                    wrapperClassName="w-full"
                    name="lastName"
                    label="Last name"
                  >
                    <Field.Input name="lastName" placeholder="Last name" />
                  </Field.Group>
                </div>

                <div className="md:flex space-y-4 md:space-y-0 gap-4">
                  <Field.Group
                    wrapperClassName="w-full"
                    name="email"
                    label="Email"
                  >
                    <Field.Input name="email" placeholder="Email" />
                  </Field.Group>

                  <Field.Group
                    wrapperClassName="w-full"
                    name="mobileNo"
                    label="Phone number"
                  >
                    <Field.Phone
                      name="mobileNo"
                      placeholder="Phone number"
                      value={''}
                      defaultCountry="GH"
                      onlyCountries={['GH']}
                      {...{ setFieldValue, setFieldTouched }}
                    />
                  </Field.Group>
                </div>

                <Field.Group
                  wrapperClassName="w-full"
                  name="password"
                  label="Password"
                >
                  <Field.Password name="password" placeholder="Password " />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="confirm_password"
                  label="Confirm Password"
                >
                  <Field.Password
                    name="confirm_password"
                    placeholder="Confirm Password"
                  />
                </Field.Group>
              </div>
            </StyledDiv>

            {/* Delivery Details */}
            <Line className="h-[4px]" />

            <div className="space-y-2">
              <div className="text-xl font-semibold">
                Delivery Details (optional)
              </div>
              <div className="space-y-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="recipient_address"
                  label="Address/Location"
                >
                  <Field.Input
                    name="recipient_address"
                    placeholder="Address/Location"
                  />
                </Field.Group>

                <div className="md:flex space-y-4 md:space-y-0 gap-4">
                  <Field.Group
                    wrapperClassName="w-full"
                    name="recipient_city"
                    label="City"
                  >
                    <Field.Input name="recipient_city" placeholder="City" />
                  </Field.Group>

                  <Field.Group
                    wrapperClassName="w-full"
                    name="recipient_postal_code"
                    label="Postal code"
                  >
                    <Field.Input
                      name="recipient_postal_code"
                      placeholder="Postal code"
                    />
                  </Field.Group>
                </div>
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

      <Modal
        className="max-w-[500px]"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <div className="flex flex-col items-center gap-3">
          <InfoIcon size={32} />
          <div className="text-gray-50">
            To complete the account creation process, We need to verify your
            email address.
          </div>
          <div>
            An email has been sent to your provided email address with a
            verification link.
          </div>
        </div>
      </Modal>
    </>
  );
}

const Line = styled.div`
  width: 100%;
  background-color: #e8e8e8;
`;

const StyledDiv = styled.div`
  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }
`;
