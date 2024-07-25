import { schema } from '@foreversolemates/utils';
import { Button, Field } from '@fsm/ui';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface IForm {
  cost: number;
  name: string;
}

interface Props {
  onCancel: () => void;
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
}

export default function LocalForm({ onCancel, onSubmit }: Props) {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      validationSchema={yup.object({
        name: schema.requireString('Location name'),
        cost: schema
          .requireNumber('Delivery cost')
          .min(1, 'Cost must be at least 1 GHC'),
      })}
      initialValues={{
        name: '',
        cost: 1,
      }}
      onSubmit={(params, actions) => {
        onSubmit(params, actions);
      }}
    >
      {({ values, isValid, isSubmitting, handleSubmit }) => (
        <Form className="space-y-6">
          <Field.Group name="name" label="Location name">
            <Field.Input
              name="name"
              placeholder="eg. Accra mall"
              value={values.name}
            />
          </Field.Group>

          <Field.Group name="cost" label="Delivery cost (GH₵)">
            <Field.Input
              min={1}
              type="number"
              name="cost"
              placeholder="0"
              value={values.cost}
            />
          </Field.Group>

          <div className="flex justify-between gap-3">
            <Button variant="outline-black" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => handleSubmit()}
              {...{ isSubmitting, disabled: !isValid }}
            >
              Add location
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
