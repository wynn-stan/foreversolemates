'use client';

import { schema } from '@foreversolemates/utils';
import { Button, Field } from '@fsm/ui';
import clsx from 'clsx';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { object } from 'yup';

interface IForm {
  // personal_email: string;
  // personal_phone: string;
  country: string;
  receipient_first_name: string;
  receipient_last_name: string;
  receipient_address: string;
  receipient_city: string;
  receipient_postal_code: string;
  receipient_phone: string;
  receipient_email: string;
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
}

export default function Form({ onSubmit }: Props) {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={object({
        // personal_email: schema.requireEmail('Personal email'),
        // personal_phone: schema.requirePhoneNumber('Personal phone number'),
        country: schema.requireString('Country'),
        receipient_first_name: schema.requireString("Receipient's first name"),
        receipient_last_name: schema.requireString("Receipient's last name"),
        receipient_address: schema.requireString("Receipient's address"),
        receipient_city: schema.requireString("Receipient's city"),
        receipient_phone: schema.requirePhoneNumber(
          "Receipient's phone number"
        ),
        receipient_email: schema.requireString("Receipient's email"),
      })}
      initialValues={{
        // personal_email: '',
        // personal_phone: '',
        country: 'Ghana',
        receipient_first_name: '',
        receipient_last_name: '',
        receipient_address: '',
        receipient_city: '',
        receipient_postal_code: '',
        receipient_phone: '',
        receipient_email: '',
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
        <FormikForm className={clsx('space-y-6 ', 'lg:max-w-[750px]')}>
          {/* Contact */}
          {/* <div className="space-y-2">
            <div className="text-xl font-semibold">Contact</div>
            <div className="md:flex space-y-4 md:space-y-0  gap-4">
              <Field.Group
                wrapperClassName="w-full"
                name="personal_email"
                label="Your email"
              >
                <Field.Input name="personal_email" placeholder="Your email" />
              </Field.Group>

              <Field.Group
                wrapperClassName="w-full"
                name="personal_phone"
                label="Your phone number"
              >
                <Field.Phone
                  name="personal_phone"
                  placeholder="Your phone number"
                  value={values.personal_phone}
                  {...{ setFieldTouched, setFieldValue }}
                />
              </Field.Group>
            </div>
          </div> */}

          {/* Delivery */}
          <div className="space-y-2">
            <div className="text-xl font-semibold">Delivery</div>
            <div className="space-y-4">
              <Field.Group disabled name="country" label="Country">
                <Field.Input name="country" placeholder="" value="Ghana" />
              </Field.Group>

              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="receipient_first_name"
                  label="Receipient First name"
                >
                  <Field.Input
                    name="receipient_first_name"
                    placeholder="Receipient First name"
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="receipient_last_name"
                  label="Receipient Last name"
                >
                  <Field.Input
                    name="receipient_last_name"
                    placeholder="Receipient Last name"
                  />
                </Field.Group>
              </div>

              <Field.Group
                wrapperClassName="w-full"
                name="receipient_address"
                label="Receipient Address/Location"
              >
                <Field.Input
                  name="receipient_address"
                  placeholder="Receipient Address/Location"
                />
              </Field.Group>

              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="receipient_city"
                  label="Receipient City"
                >
                  <Field.Input
                    name="receipient_city"
                    placeholder="Receipient City"
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="receipient_postal_code"
                  label="Receipient Postal code (optional)"
                >
                  <Field.Input
                    name="receipient_postal_code"
                    placeholder="Receipient Postal code"
                  />
                </Field.Group>
              </div>

              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="receipient_email"
                  label="Receipient email"
                >
                  <Field.Input
                    name="receipient_email"
                    placeholder="Receipient email"
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="receipient_phone"
                  label="Receipient Phone number"
                >
                  <Field.Phone
                    name="receipient_phone"
                    placeholder="Receipient Phone number"
                    value={''}
                    defaultCountry="GH"
                    onlyCountries={['GH']}
                    {...{ setFieldValue, setFieldTouched }}
                  />
                </Field.Group>
              </div>

              <Button
                type="submit"
                disabled={!isValid}
                {...{ isSubmitting }}
                className="w-full"
              >
                Checkout
              </Button>
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
