'use client';

import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { schema } from '@foreversolemates/utils';
import { object } from 'yup';
import clsx from 'clsx';

import { Button, Field } from '../index';

interface IForm {
  // personal_email: string;
  // personal_phone: string;
  country: string;
  recipient_first_name: string;
  recipient_last_name: string;
  recipient_address: string;
  recipient_city: string;
  recipient_postal_code: string;
  recipient_phone: string;
  recipient_email: string;
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
  defaultValues?: IForm;
  disabled?: boolean;
}

export default function DeliveryForm({
  onSubmit,
  disabled,
  defaultValues,
}: Props) {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={object({
        // personal_email: schema.requireEmail('Personal email'),
        // personal_phone: schema.requirePhoneNumber('Personal phone number'),
        country: schema.requireString('Country'),
        recipient_first_name: schema.requireString("recipient's first name"),
        recipient_last_name: schema.requireString("recipient's last name"),
        recipient_address: schema.requireString("recipient's address"),
        recipient_city: schema.requireString("recipient's city"),
        recipient_phone: schema.requirePhoneNumber("recipient's phone number"),
        recipient_email: schema.requireString("recipient's email"),
      })}
      initialValues={{
        // personal_email: '',
        // personal_phone: '',
        country: 'Ghana',
        recipient_first_name: defaultValues?.recipient_first_name || '',
        recipient_last_name: defaultValues?.recipient_last_name || '',
        recipient_address: defaultValues?.recipient_address || '',
        recipient_city: defaultValues?.recipient_city || '',
        recipient_postal_code: defaultValues?.recipient_postal_code || '',
        recipient_phone: defaultValues?.recipient_phone || '',
        recipient_email: defaultValues?.recipient_email || '',
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
        <FormikForm className={clsx('space-y-6 w-full')}>
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
            <div className="text-xl font-semibold">Delivery Details</div>
            <div className="space-y-4">
              <Field.Group disabled name="country" label="Country">
                <Field.Input name="country" placeholder="" value="Ghana" />
              </Field.Group>

              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="recipient_first_name"
                  label="Recipient First name"
                  {...{ disabled }}
                >
                  <Field.Input
                    name="recipient_first_name"
                    placeholder="Recipient First name"
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="recipient_last_name"
                  label="Recipient Last name"
                  {...{ disabled }}
                >
                  <Field.Input
                    name="recipient_last_name"
                    placeholder="Recipient Last name"
                  />
                </Field.Group>
              </div>

              <Field.Group
                wrapperClassName="w-full"
                name="recipient_address"
                label="Recipient Address/Location"
                {...{ disabled }}
              >
                <Field.Input
                  name="recipient_address"
                  placeholder="Recipient Address/Location"
                />
              </Field.Group>

              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="recipient_city"
                  label="Recipient City"
                  {...{ disabled }}
                >
                  <Field.Input
                    name="recipient_city"
                    placeholder="Recipient City"
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="recipient_postal_code"
                  label="Recipient Postal code (optional)"
                  {...{ disabled }}
                >
                  <Field.Input
                    name="recipient_postal_code"
                    placeholder="Recipient Postal code"
                  />
                </Field.Group>
              </div>

              <div className="md:flex space-y-4 md:space-y-0 gap-4">
                <Field.Group
                  wrapperClassName="w-full"
                  name="recipient_email"
                  label="Recipient email"
                  {...{ disabled }}
                >
                  <Field.Input
                    name="recipient_email"
                    placeholder="Recipient email"
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="w-full"
                  name="recipient_phone"
                  label="Recipient Phone number"
                  {...{ disabled }}
                >
                  <Field.Phone
                    name="recipient_phone"
                    placeholder="Recipient Phone number"
                    value={''}
                    defaultCountry="GH"
                    onlyCountries={['GH']}
                    {...{ setFieldValue, setFieldTouched }}
                  />
                </Field.Group>
              </div>

              {!disabled && (
                <Button
                  type="submit"
                  disabled={!isValid}
                  {...{ isSubmitting }}
                  className="w-full"
                >
                  Checkout
                </Button>
              )}
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
