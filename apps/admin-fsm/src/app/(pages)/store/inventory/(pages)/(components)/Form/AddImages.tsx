'use client';

import { Field } from '@fsm/ui';
import { FieldArray } from 'formik';

interface Props {
  images: File[];
  name: string;
  label: string;
  onAdd: (file: File) => void;
}

export default function AddImages({ images, name, label, onAdd }: Props) {
  return (
    <Field.Group wrapperClassName="" name={name} label={label}>
      <div className="w-full flex gap-3">
        <FieldArray name={name}>
          {(arrayHelpers) => (
            <div className="flex flex-wrap gap-3">
              {images.map((image, index) => (
                <>
                  <Field.ImageUpload.Preview
                    key={index}
                    file={image}
                    onClose={() => arrayHelpers.remove(index)}
                  />
                </>
              ))}
              <Field.ImageUpload
                onChange={(file) => {
                  onAdd(file[0]);
                }}
              />
            </div>
          )}
        </FieldArray>
      </div>
    </Field.Group>
  );
}
