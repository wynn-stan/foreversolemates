'use client';

import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { http, schema } from '@foreversolemates/utils';
import { components } from 'react-select';
import { debounce, set } from 'lodash';
import { useState } from 'react';
import { object } from 'yup';
import * as yup from 'yup';
import useSWR from 'swr';
import clsx from 'clsx';

import ZoneOption from './DeliveryForm/ZoneOption';
import { currencyFormatter } from '../Utils';
import { PaginatedData } from '../models';
import { Button, Field } from '../index';
import Checkbox from '../Checkbox/Checkbox';

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
  shipping_method: {
    label: string;
    value: string;
    cost: number;
  };
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
  defaultValues?: Partial<IForm>;
  disabled?: boolean;
  onZoneSelect: (cost: number) => void;
  onLogin?: () => void;
  onUseDetails?: () => void;
  isUsingUserDetails?: boolean;
}

export default function DeliveryForm({
  onLogin,
  onSubmit,
  disabled,
  defaultValues,
  onZoneSelect,
  onUseDetails,
  isUsingUserDetails = false,
}: Props) {
  //state
  const [zoneOption, setZoneOption] = useState<{
    value: string;
    label: string;
    cost: number;
  } | null>();

  /**
   * function
   */
  const handleZoneSearch = debounce((value, callback) => {
    http
      .get<
        never,
        PaginatedData<{
          cost: number;
          name: string;
          _id: string;
        }>
      >(`/locations?name=${value}&size=${5}`)
      .then((res) => {
        /**
         * Variables - options
         */
        const options =
          res.data?.map((item) => ({
            value: item._id,
            label: item.name,
            cost: item.cost,
          })) || [];

        callback(options);
      });
  }, 500);

  return (
    <Formik
      validateOnMount
      enableReinitialize
      validationSchema={object({
        country: schema.requireString('Country'),
        recipient_first_name: schema.requireString("recipient's first name"),
        recipient_last_name: schema.requireString("recipient's last name"),
        recipient_address: schema.requireString("recipient's address"),
        recipient_city: schema.requireString("recipient's city"),
        recipient_phone: schema.requirePhoneNumber("recipient's phone number"),
        recipient_email: schema.requireString("recipient's email"),
        shipping_method: yup.object({
          label: yup.string().required(''),
          cost: yup.number().required(''),
          value: yup.string().required(''),
        }),
      })}
      initialValues={{
        country: 'Ghana',
        recipient_first_name: defaultValues?.recipient_first_name || '',
        recipient_last_name: defaultValues?.recipient_last_name || '',
        recipient_address: defaultValues?.recipient_address || '',
        recipient_city: defaultValues?.recipient_city || '',
        recipient_postal_code: defaultValues?.recipient_postal_code || '',
        recipient_phone: defaultValues?.recipient_phone || '',
        recipient_email: defaultValues?.recipient_email || '',
        shipping_method: {} as any,
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
          {/* Delivery */}
          <div className="space-y-2">
            <div className="flex justify-between gap-4">
              <div className="cursor-pointer flex flex-col gap-2">
                <div className="text-xl font-semibold">Delivery Details</div>
                {!disabled ? (
                  <div className="mb-2">
                    <Checkbox
                      onClick={onUseDetails}
                      size={16}
                      checked={isUsingUserDetails}
                    >
                      <span
                        className={clsx(
                          'text-sm ',
                          onUseDetails ? 'text-gray-50' : 'text-gray-30'
                        )}
                      >
                        Use my details
                      </span>
                    </Checkbox>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {onLogin ? (
                <Button
                  type="button"
                  onClick={onLogin}
                  className="!rounded-lg !px-4 !py-2 !h-fit hover:!bg-gray-60 hover:!text-gray-5"
                  variant="outline-secondary"
                >
                  Login
                </Button>
              ) : (
                ''
              )}
            </div>

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
                    value={values.recipient_phone}
                    defaultCountry="GH"
                    onlyCountries={['GH']}
                    {...{ setFieldValue, setFieldTouched }}
                  />
                </Field.Group>
              </div>

              <Field.Group name="name" label="Delivery Zone">
                <div className="flex flex-col gap-2 w-full">
                  {!disabled && !zoneOption?.label && (
                    <Field.Select
                      isAsync
                      cacheOptions
                      defaultOptions
                      className="w-full border-gra"
                      placeholder={`Search Delivery zones`}
                      value={''}
                      onChange={(option) => {
                        if (option) {
                          setZoneOption(option as any);
                          setFieldValue('shipping_method', option);
                          onZoneSelect(option?.cost);
                        }
                      }}
                      loadOptions={(inputValue, callback) => {
                        handleZoneSearch(inputValue, callback);
                      }}
                      components={{
                        Option: (props: any) => {
                          return (
                            <components.Option {...props}>
                              <ZoneOption
                                name={props?.data?.label}
                                amount={props?.data?.cost}
                                checked={false}
                              />
                            </components.Option>
                          );
                        },
                      }}
                    />
                  )}

                  {!zoneOption?.label && disabled && <div>--</div>}

                  {zoneOption?.label && (
                    <ZoneOption
                      className="hover:bg-gray-5 border border-gray-10 "
                      name={zoneOption.label}
                      amount={zoneOption.cost}
                      checked={true}
                      onClick={() => {
                        setZoneOption(null);
                        setFieldValue('shipping_method', {} as any);
                        onZoneSelect(0);
                      }}
                    />
                  )}
                </div>
              </Field.Group>

              {!disabled && (
                <Button
                  type="submit"
                  disabled={!isValid}
                  {...{ isSubmitting }}
                  className="w-full mt-2"
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
