'use client';

import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Field } from '@fsm/ui';

import { useLayout } from '../../../../hooks';

export default function Page() {
  const { layout, setLayout } = useLayout();

  useEffect(() => {
    const banner = {
      title: 'Checkout',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  return (
    <div>
      <Formik
        initialValues={
          {
            // delivery_phone: ""
          }
        }
        onSubmit={() => {
          //
        }}
      >
        {({ values, isValid, setFieldTouched, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Contact */}
            <div className="space-y-2">
              <div className="text-xl font-semibold">Contact</div>
              <div className="flex  gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="personal_email"
                  label="Your email"
                >
                  <Field.Input name="personal_email" placeholder="Your email" />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="personal_email"
                  label="Your phone number"
                >
                  <Field.Input
                    name="personal_email"
                    placeholder="Your phone number"
                  />
                </Field.Group>
              </div>
            </div>

            {/* Delivery */}
            <div className="space-y-2">
              <div className="text-xl font-semibold">Delivery</div>
              <div className="">
                <Field.Group disabled name="country" label="Country">
                  <Field.Input name="country" placeholder="" value="Ghana" />
                </Field.Group>

                <div className="flex gap-4">
                  <Field.Group
                    wrapperClassName="w-full"
                    name="first_name"
                    label="First name"
                  >
                    <Field.Input name="first_name" placeholder="First name" />
                  </Field.Group>

                  <Field.Group
                    wrapperClassName="w-full"
                    name="last_name"
                    label="Last name"
                  >
                    <Field.Input name="last_name" placeholder="Last name" />
                  </Field.Group>
                </div>

                <Field.Group
                  wrapperClassName="w-full"
                  name="address"
                  label="Address/Location"
                >
                  <Field.Input name="address" placeholder="Address/Location" />
                </Field.Group>

                <div className="flex gap-4">
                  <Field.Group
                    wrapperClassName="w-full"
                    name="city"
                    label="City"
                  >
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
                  name="delivery_phone"
                  label="Phone number"
                >
                  <Field.Phone
                    name="delivery_phone"
                    placeholder="Phone number"
                    value={''}
                    defaultCountry="GH"
                    onlyCountries={['GH']}
                    {...{ setFieldValue, setFieldTouched }}
                  />
                </Field.Group>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
