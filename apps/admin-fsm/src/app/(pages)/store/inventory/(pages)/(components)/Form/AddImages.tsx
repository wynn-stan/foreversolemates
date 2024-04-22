'use client';

import { Field } from '@fsm/ui';
import { FieldArray } from 'formik';

interface Props {
  images: File[];
  name: string;
  label: string;
}

export default function AddImages({ images, name, label }: Props) {
  return (
    <FieldArray name={name}>
      {(arrayHelpers) => (
        <Field.Group label={label} name={name}>
          <div className="flex gap-3 overflow-y-auto">
            {images.map((image, index) => (
              <>
                {/* 
              <Field.ImageUpload.Preview
                key={index}
                file={image}
                onClose={() => arrayHelpers.remove(index)}
              />
              */}
              </>
            ))}
            <Field.ImageUpload
              onChange={(file) => {
                arrayHelpers.push(file[0]);
              }}
            />
          </div>
        </Field.Group>
      )}
    </FieldArray>
  );
}
