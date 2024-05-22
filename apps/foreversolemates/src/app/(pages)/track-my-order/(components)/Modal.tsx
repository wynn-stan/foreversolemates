'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import { schema } from '@foreversolemates/utils';
import { Button, Field, Modal } from '@fsm/ui';
import { object, string } from 'yup';

import { ModalProps } from '../../../../models';

type IForm = {
  order_reference: string;
};
interface Props extends ModalProps {
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
}

export default function LocalModal({ show, onHide, onSubmit }: Props) {
  return (
    <Modal className="max-w-[500px]" {...{ show, onHide }}>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={object({
          order_reference: schema.requireString('Order reference'),
        })}
        initialValues={{ order_reference: '' }}
        onSubmit={(params, actions) => {
          onSubmit(params, actions);
        }}
      >
        {({ values, isValid, isSubmitting, setSubmitting, handleSubmit }) => (
          <Form className="space-y-6">
            <div className="text-lg font-semibold text-center">
              Track your order
            </div>

            <div className="space-y-2">
              <Field.Group name="order_reference" label="Order reference">
                <Field.Input
                  name="order_reference"
                  placeholder="Order reference"
                />
              </Field.Group>

              <Button
                type="submit"
                disabled={!isValid}
                className="w-full"
                direction="left"
                icon="search"
                {...{ isSubmitting }}
              >
                Search
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
