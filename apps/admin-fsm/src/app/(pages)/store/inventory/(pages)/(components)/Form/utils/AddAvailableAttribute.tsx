'use client';

import { Field, Pill } from '@fsm/ui';
import { FieldArray } from 'formik';
import AddAttribute from './AddAttribute';

interface Props {
  values: any[];
  label: string;
  errorMessage: string;
  addComponentLabel: string;
  valueType: 'string' | 'number';
  fieldname: string;
}

export default function AddAvailableAttribute({
  fieldname,
  errorMessage,
  values,
  label,
  addComponentLabel,
  valueType,
}: Props) {
  return (
    <FieldArray name={fieldname}>
      {(arrayHelpers) => (
        <div className="flex gap-10 justify-between">
          {values.length > 0 ? (
            <Field.Group name="name" label={label}>
              <div className="max-w-[300px] max-h-[152px] overflow-y-auto flex flex-wrap gap-2">
                {values.map((item, index) => (
                  <Pill
                    onClick={() => {
                      arrayHelpers.remove(index);
                    }}
                    key={index}
                    checked
                  >
                    {item}
                  </Pill>
                ))}
              </div>
            </Field.Group>
          ) : (
            ''
          )}

          <AddAttribute
            valueType={valueType}
            errorMessage={errorMessage}
            label={addComponentLabel}
            onSubmit={(value) => arrayHelpers.push(value)}
          />
        </div>
      )}
    </FieldArray>
  );
}
