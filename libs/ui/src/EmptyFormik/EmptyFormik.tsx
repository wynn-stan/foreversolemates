import { Formik } from 'formik';

interface Props {
  children: React.ReactNode;
}

export default function EmptyFormik({ children }: Props) {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => <>{children}</>}
    </Formik>
  );
}
