import { FieldArray, useFormikContext } from 'formik';
import { TrashIcon } from 'lucide-react';
import { Button, Field } from '@fsm/ui';
import { useEffect, useState } from 'react';

import { options } from '../../../../../../../hooks';
import { IForm, SectionProps } from '../Form';
import { getFinalPrice } from './utils/Utils';
import AddImages from './utils/AddImages';

export default function PricingAndAvailability({
  setActiveSectionIsValid,
}: SectionProps) {
  /**
   * Formik Context
   */
  const { values, errors, setFieldValue, setFieldTouched } =
    useFormikContext<IForm>();

  /**
   * Logic
   */
  const unitsIsValid = (() => {
    if (values.includes_sizes && !errors.available_sizes_and_units)
      return false;
    if (!values.includes_sizes && !errors.total_available_units) return false;
    return true;
  })();
  const isValid = Boolean(
    errors.initial_price ||
      errors.discount ||
      errors.final_price ||
      errors.alert ||
      unitsIsValid
  );

  console.log(errors, values);

  /**
   * Function
   */
  const disableSizesAndUnits = () => {
    setFieldValue('includes_sizes', false);
    setFieldValue('available_sizes_and_units', []);
  };

  /**
   * Effect
   */
  useEffect(() => {
    setActiveSectionIsValid(isValid);
  }, [isValid, setActiveSectionIsValid]);

  return (
    <div className="space-y-4">
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
            onChange={(e: any) => {
              setFieldValue('initial_price', e?.target?.value);
              setFieldValue(
                'final_price',
                getFinalPrice(e?.target.value, values.discount)
              );
            }}
          />
        </Field.Group>

        <Field.Group name="discount" label="Discount (%)">
          <Field.Input
            type="number"
            min={0}
            name="discount"
            placeholder="0"
            value={values.discount}
            onChange={(e: any) => {
              setFieldValue('discount', e?.target?.value);
              setFieldValue(
                'final_price',
                getFinalPrice(values.initial_price, e?.target.value)
              );
            }}
          />
        </Field.Group>
      </div>

      <Field.Group name="final_price" label="Final Price (GH₵)">
        <Field.Input
          name="final_price"
          className="bg-gray-10 pointer-events-none"
          placeholder="0"
        />
      </Field.Group>

      <FieldArray name="available_sizes_and_units">
        {({ push, remove }) => (
          <div>
            <div className="flex justify-between items-center">
              <div className="py-4">
                <Field.Checkbox
                  name="includes_sizes"
                  checked={values.includes_sizes}
                  onClick={() => {
                    if (!values.includes_sizes) {
                      push({ size: undefined, available_units: undefined });
                      setFieldValue('includes_sizes', true);
                    } else {
                      disableSizesAndUnits();
                    }
                  }}
                >
                  Include different sizes
                </Field.Checkbox>
              </div>
              {values.includes_sizes && (
                <Button
                  icon="plus"
                  direction="left"
                  variant="outline-secondary"
                  className="!bg-gray-5"
                  onClick={() =>
                    push({
                      size: undefined,
                      available_units: undefined,
                    })
                  }
                >
                  Add
                </Button>
              )}
            </div>

            {values.available_sizes_and_units?.map((item, index) => (
              <div key={index} className="flex gap-3 mb-5">
                <Field.Group
                  wrapperClassName="!space-y-0"
                  name={`available_sizes_and_units[${index}].size`}
                  label="Size"
                >
                  <Field.Input
                    type="number"
                    min={1}
                    name={`available_sizes_and_units[${index}].size`}
                    placeholder="0"
                    value={
                      values.available_sizes_and_units?.[index].size ||
                      undefined
                    }
                    // onChange={(e: any) => {
                    //  setFieldValue(`available_sizes_and_units[${index}].size`, e?.target?.value)
                    // }}
                  />
                </Field.Group>

                <Field.Group
                  wrapperClassName="!space-y-0"
                  name={`available_sizes_and_units[${index}].available_units`}
                  label="Available units"
                >
                  <div className="flex gap-3 items-end">
                    <Field.Input
                      type="number"
                      min={0}
                      name={`available_sizes_and_units[${index}].available_units`}
                      placeholder="0"
                      value={
                        values.available_sizes_and_units?.[index]
                          .available_units || undefined
                      }
                      // onChange={(e: any) => {
                      //   setFieldValue('discount', e?.target?.value);
                      //   setFieldValue(
                      //     'final_price',
                      //     getFinalPrice(values.initial_price, e?.target.value)
                      //   );
                      // }}
                    />
                    <Button
                      variant="outline-secondary"
                      className="!bg-gray-5 !h-fit "
                      onClick={() => {
                        if (values.available_sizes_and_units) {
                          if (values.available_sizes_and_units.length > 1) {
                            remove(index);
                          } else {
                            disableSizesAndUnits();
                          }
                        }
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </Field.Group>
              </div>
            ))}
          </div>
        )}
      </FieldArray>

      <div className="flex flex-col md:flex-row gap-6">
        {!values.includes_sizes && (
          <Field.Group
            wrapperClassName="flex-grow"
            name="total_available_units"
            label="Available units"
          >
            <Field.Input
              type="number"
              name="total_available_units"
              placeholder="0"
              value={values.total_available_units}
            />
          </Field.Group>
        )}

        <Field.Group
          wrapperClassName="flex-grow"
          name="alert"
          label="Alert when total stock is below"
        >
          <Field.Input
            type="number"
            name="alert"
            placeholder="0"
            value={values.alert}
          />
        </Field.Group>
      </div>
    </div>
  );
}
