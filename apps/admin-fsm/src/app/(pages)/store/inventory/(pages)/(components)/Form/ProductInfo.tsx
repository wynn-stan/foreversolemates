import { useFormikContext } from 'formik';
import { Field } from '@fsm/ui';

import { options } from '../../../../../../../hooks';
import AddImages from './utils/AddImages';
import { IForm } from '../Form';

export default function ProductInformation() {
  /**
   * Formik Context
   */
  const { values, errors, setFieldValue, setFieldTouched } =
    useFormikContext<IForm>();

  /**
   * Hooks
   */
  const { collections, collectionOptions } = options.useGetCollections();

  return (
    <div>
      <div className="space-y-6">
        <AddImages
          label="Product images"
          name="images"
          images={values.images}
          onAdd={(file) => setFieldValue('images', [...values.images, file])}
        />

        <p>
          {errors.images?.includes('image size is too large') ? (
            <p className="text-red-40 text-xs">Image size is too large</p>
          ) : (
            ''
          )}
        </p>

        <Field.Group name="collection_id" label="Collection">
          <Field.Select
            name="collection_id"
            className="w-full"
            value={values.collection_id}
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

        <Field.Group name="description" label="Description">
          <Field.Input
            as="textarea"
            rows={7}
            name="description"
            placeholder="Description"
            value={values.description}
          />
        </Field.Group>
      </div>
    </div>
  );
}
