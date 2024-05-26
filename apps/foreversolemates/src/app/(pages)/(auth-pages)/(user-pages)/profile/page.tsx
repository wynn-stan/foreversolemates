'use client';

import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { schema } from '@foreversolemates/utils';
import { Button, Field } from '@fsm/ui';
import { object } from 'yup';
import clsx from 'clsx';

import { useBanner } from '../../../../../hooks';
import { ContactIcon } from 'lucide-react';
import styled from 'styled-components';

interface IForm {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
  defaultValues?: IForm;
  disabled?: boolean;
}

export default function Page({ onSubmit, disabled, defaultValues }: Props) {
  // hooks
  useBanner({
    title: 'My Profile',
  });

  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={object({
        first_name: schema.requireString('first name'),
        last_name: schema.requireString('last name'),
        address: schema.requireString('address'),
        city: schema.requireString('city'),
        phone: schema.requirePhoneNumber('phone number'),
        email: schema.requireString('email'),
      })}
      initialValues={{
        first_name: defaultValues?.first_name || '',
        last_name: defaultValues?.last_name || '',
        address: defaultValues?.address || '',
        city: defaultValues?.city || '',
        postal_code: defaultValues?.postal_code || '',
        phone: defaultValues?.phone || '',
        email: defaultValues?.email || '',
      }}
      onSubmit={(params, actions) => {
        onSubmit(params, actions);
      }}
    >
      {({
        values,
        isValid,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        errors,
      }) => (
        <FormikForm className="space-y-7">
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

              {/* <Field.Group
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
              </Field.Group> */}
            </div>
          </div>

          {/* Delivery Details */}
          {/* <Line className="h-[2px] bg-gray-5" /> */}

          <div className="space-y-2">
            <div className="text-xl font-semibold">Delivery Details</div>
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
            Save
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}

const Line = styled.div`
  width: 100%;
  background-color: #e8e8e8;
`;
