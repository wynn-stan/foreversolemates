'use client';

import { Field } from '@fsm/ui';
import { Form, Formik } from 'formik';

export default function Page() {
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          //
        }}
      >
        {() => (
          <Form>
            <div className="text-xl">Contact</div>
            <div className="flex flex-wrap gap-4">
              <Field.Group name="personal_email" label="Your email">
                <Field.Input name="personal_email" placeholder="Your email" />
              </Field.Group>

              <Field.Group name="personal_email" label="Your phone number">
                <Field.Input
                  name="personal_email"
                  placeholder="Your phone number"
                />
              </Field.Group>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
