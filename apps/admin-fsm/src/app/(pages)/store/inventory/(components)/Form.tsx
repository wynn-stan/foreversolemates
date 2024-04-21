import { schema } from '@foreversolemates/utils';
import { Button, Field } from '@fsm/ui';
import { addCollectionService } from 'apps/admin-fsm/src/services/store';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface IForm {
  name: string;
  top_tagline: string;
  bottom_tagline: string;
  image?: File;
}

interface Props {
  onSubmit: (
    params: IForm & { image: File },
    actions: FormikHelpers<IForm & { image: File }>
  ) => void;
  defaultValues?: Partial<IForm & { image: File }>;
  onCancel: () => void;
}

export default function Form({ defaultValues, onSubmit, onCancel }: Props) {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={yup.object({
        name: yup.string().required('Collection name is required'),
        top_tagline: yup.string().required('Top tagline name is required'),
        bottom_tagline: yup.string().required('Bottom tagline is required'),
        image: schema.requireFile({
          field: 'image',
        }),
      })}
      initialValues={{
        name: defaultValues?.name || '',
        top_tagline: defaultValues?.top_tagline || '',
        bottom_tagline: defaultValues?.bottom_tagline || '',
        image: defaultValues?.image || ({} as File),
      }}
      onSubmit={(params, actions) => {
        onSubmit(params, actions);
      }}
    >
      {({
        values,
        errors,
        isSubmitting,
        isValid,
        handleSubmit,
        setFieldValue,
      }) => (
        <div className="space-y-6">
          <div className="space-y-4">
            <Field.Group
              wrapperClassName="!space-y-3"
              name="image"
              label="Banner Image"
            >
              {values.image?.name ? (
                <Field.ImageUpload.Preview
                  file={values.image}
                  onClose={() => setFieldValue('image', {} as File)}
                />
              ) : (
                <Field.ImageUpload
                  onChange={(files) => {
                    setFieldValue('image', files[0]);
                  }}
                />
              )}
            </Field.Group>

            <Field.Group name="name" label="Collection Name">
              <Field.Input
                name="name"
                value={values.name}
                placeholder="Collection name"
              />
            </Field.Group>

            <Field.Group name="top_tagline" label="Top tagline">
              <Field.Input
                name="top_tagline"
                value={values.top_tagline}
                placeholder="Top tagline"
              />
            </Field.Group>

            <Field.Group name="bottom_tagline" label="Bottom tagline">
              <Field.Input
                name="bottom_tagline"
                value={values.bottom_tagline}
                placeholder="Bottom tagline"
              />
            </Field.Group>
          </div>

          <div className="flex gap-4 justify-between">
            <Button
              className="!rounded-md"
              onClick={() => handleSubmit()}
              disabled={!isValid}
              {...{ isSubmitting }}
            >
              {defaultValues?.name ? 'Update Collection' : 'Add Collection'}
            </Button>

            <Button
              variant="outline-secondary"
              className="!rounded-md"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
}
