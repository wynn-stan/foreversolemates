'use client';

import { Button, Field, Modal } from '@fsm/ui';
import { ModalProps } from '../../../../models';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { schema } from '@foreversolemates/utils';

export default function LocalModal({ show, onHide }: ModalProps) {
  return (
    <Modal className="max-w-[500px]" {...{ show, onHide }}>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={object({
          order_reference: schema.requireString('Order reference'),
        })}
        initialValues={{ order_reference: '' }}
        onSubmit={() => {
          //
        }}
      >
        {({ values, isValid, isSubmitting, setSubmitting, handleSubmit }) => (
          <div className="space-y-6">
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
                onClick={() => handleSubmit()}
                className="w-full"
                direction="left"
                icon="search"
              >
                Search
              </Button>
            </div>
          </div>
        )}
      </Formik>
    </Modal>
  );
}
