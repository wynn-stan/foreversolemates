import { Button, Field, Modal } from '@fsm/ui';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
}

interface Props {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
  defaultValues?: Partial<IForm>;
}

export default function Form({ onSubmit, defaultValues }: Props) {
  return (
    <Formik
      validateOnMount
      validationSchema={yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email().required('Email is required'),
        mobileNo: yup.string().required('Phone Number is required'),
      })}
      initialValues={{
        firstName: defaultValues?.firstName || '',
        lastName: defaultValues?.lastName || '',
        email: defaultValues?.email || '',
        mobileNo: defaultValues?.mobileNo || '',
      }}
      onSubmit={(params, actions) => onSubmit(params, actions)}
    >
      {({ values, handleSubmit, isSubmitting, isValid }) => (
        <div className="space-y-4">
          <div className="space-y-4">
            <Field.Group name="firstName" label="First name">
              <Field.Input
                name="firstName"
                value={values.firstName}
                placeholder="First name"
              />
            </Field.Group>

            <Field.Group name="lastName" label="Last name">
              <Field.Input
                name="lastName"
                value={values.lastName}
                placeholder="Last name"
              />
            </Field.Group>

            <Field.Group name="email" label="Email">
              <Field.Input
                name="email"
                value={values.email}
                placeholder="Email address"
              />
            </Field.Group>

            <Field.Group name="mobileNo" label="Phone number">
              <Field.Input
                name="mobileNo"
                value={values.mobileNo}
                placeholder="Phone number"
              />
            </Field.Group>
          </div>

          <div className="flex justify-end">
            <Button
              className="!rounded-md"
              onClick={() => handleSubmit()}
              disabled={!isValid}
              {...{ isSubmitting }}
            >
              Add User
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
}
