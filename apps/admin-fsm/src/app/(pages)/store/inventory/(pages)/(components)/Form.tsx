'use client';

import { Button, Field, Modal, Pill } from '@fsm/ui';
import { FieldArray } from 'formik';
import { options } from '../../../../../../hooks';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import AddAvailableAttribute from './Form/AddAvailableAttribute';
import AddImages from './Form/AddImages';
import { getFinalPrice } from './Form/Utils';
import { schema } from '@foreversolemates/utils';
import { useState } from 'react';
import Preview from './Preview';

interface IForm {
  collection_id: string;
  name: string;
  initial_price: number;
  discount: number;
  available_units: number;
  alert: number;
  description: string;
  images: File[];
  available_sizes: number[];
  available_colors: string[];
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
  defaultValues?: Partial<IForm>;
  actionType: 'Add' | 'Update' | 'Delete';
}

export default function Form({ onSubmit, defaultValues, actionType }: Props) {
  //hooks
  const { collections, collectionOptions } = options.useGetCollections();

  //state
  const [showPreview, setShowPreview] = useState(false);
  const [previewDetails, setPreviewDetails] = useState<IForm>({} as IForm);

  const defaultCollection = collectionOptions.find(
    (item) => item.value === defaultValues?.collection_id
  );

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={yup.object({
          name: schema.requireString('Product name'),
          collection_id: schema.requireString('Collection'),
          initial_price: schema.requireNumber('Initial price').min(1),
          available_units: schema.requireNumber('Available units').min(1),
          alert: schema.requireNumber('Low stock indicator'),
          description: schema.requireString('Description'),
          images: yup.array().of(
            schema.requireFile({
              field: 'image',
            })
          ),
          available_sizes: yup
            .array()
            .of(schema.requireNumber('Available size')),
          available_colors: yup
            .array()
            .of(schema.requireString('Available colors')),
        })}
        initialValues={{
          collection_id: defaultValues?.collection_id || '',
          name: defaultValues?.name || '',
          initial_price: defaultValues?.initial_price || 0,
          discount: defaultValues?.discount || 0,
          available_units: defaultValues?.available_units || 0,
          alert: defaultValues?.alert || 0,
          description: defaultValues?.description || '',
          images: defaultValues?.images || ([] as File[]),
          available_sizes: defaultValues?.available_sizes || ([] as number[]),
          available_colors: defaultValues?.available_colors || ([] as string[]),
        }}
        onSubmit={(params, actions) => onSubmit(params, actions)}
      >
        {({ values, handleSubmit, isSubmitting, isValid, setFieldValue }) => (
          <div
            className={clsx(
              'w-full h-full p-6 pb-0',
              ' flex flex-col justify-between'
            )}
          >
            <div className="space-y-6">
              <AddImages
                label="Product images"
                name="images"
                images={values.images}
                onAdd={(file) =>
                  setFieldValue('images', [...values.images, file])
                }
              />

              <Field.Group name="collection_id" label="Collection">
                <Field.Select
                  name="collection_id"
                  className="w-full"
                  value={values.collection_id}
                  defaultValue={defaultCollection}
                  placeholder="Select Collection"
                  options={collectionOptions}
                  onChange={(option) => {
                    setFieldValue('collection_id', option?.value);
                  }}
                />
              </Field.Group>

              <Field.Group name="name" label="Product name">
                <Field.Input
                  name="name"
                  placeholder="Product name"
                  value={values.name}
                />
              </Field.Group>

              <div className="flex gap-6">
                <Field.Group
                  wrapperClassName=""
                  name="initial_price"
                  label="Initial Price (GH₵)"
                >
                  <Field.Input
                    type="number"
                    min={1}
                    name="initial_price"
                    placeholder="0"
                    value={values.initial_price}
                  />
                </Field.Group>

                <Field.Group name="discount" label="Discount (%)">
                  <Field.Input
                    name="discount"
                    placeholder="0"
                    value={values.discount}
                  />
                </Field.Group>

                <Field.Group name="undefined" label="Final Price (GH₵)">
                  <Field.Input
                    name="undefined"
                    className="bg-gray-10 pointer-events-none"
                    placeholder="0"
                    value={getFinalPrice(values.initial_price, values.discount)}
                  />
                </Field.Group>
              </div>

              <div className="flex gap-6">
                <Field.Group
                  wrapperClassName="flex-grow"
                  name="available_units"
                  label="Available units"
                >
                  <Field.Input
                    type="number"
                    name="available_units"
                    placeholder="0"
                    value={values.available_units}
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="flex-grow"
                  name="alert"
                  label="Low stock indicator"
                >
                  <Field.Input
                    type="number"
                    name="alert"
                    placeholder="0"
                    value={values.alert}
                  />
                </Field.Group>
              </div>

              <Field.Group name="description" label="Description">
                <Field.Input
                  as="textarea"
                  rows={7}
                  name="description"
                  placeholder="Description"
                  value={values.description}
                />
              </Field.Group>

              <AddAvailableAttribute
                fieldname="available_sizes"
                addComponentLabel="Add Size"
                errorMessage="Size is required"
                label="Available sizes"
                valueType="number"
                values={values.available_sizes}
              />

              <AddAvailableAttribute
                fieldname="available_colors"
                addComponentLabel="Add colors"
                errorMessage="Color is required"
                label="Available colors"
                valueType="string"
                values={values.available_colors}
              />
            </div>

            <div className=" sticky bottom-0 bg-white flex justify-between gap-4 py-4 border-t-2 border-gray-10">
              {/* Under design */}
              {/* <Button onClick={() =>{
              setPreviewDetails(values);
               setShowPreview(true)
            }} variant="outline-secondary" icon="eye">
              Preview
            </Button> */}

              <div className="flex justify-end w-full">
                <Button
                  onClick={() => handleSubmit()}
                  disabled={!isValid}
                  variant={actionType === 'Delete' ? 'alert' : 'default'}
                  {...{ isSubmitting }}
                >
                  {`${actionType} product`}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
