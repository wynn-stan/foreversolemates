import { Formik } from 'formik';
import * as yup from 'yup';

export default function Form() {
  return (
    <Formik
      validationSchema={yup.object({
        name: yup.string().required('Collection name is required'),
      })}
      initialValues={{ name: '', top_tagline: '', bottom_tagline: '' }}
      onSubmit={() => {}}
    >
      {({ values, isSubmitting, handleSubmit }) => <></>}
    </Formik>
  );
}
