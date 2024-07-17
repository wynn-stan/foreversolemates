import { useFormikContext } from 'formik';
import { Field } from '@fsm/ui';

import { options } from '../../../../../../../hooks';
import AddImages from './utils/AddImages';
import { IForm } from '../Form';
import { getFinalPrice } from './utils/Utils';

export default function PricingAndAvailability() {
  /**
   * Formik Context
   */
  const { values, errors, setFieldValue, setFieldTouched } =
    useFormikContext<IForm>();

  return (
    <div>
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
            value={values.total_available_units}
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
    </div>
  );
}
