import { Modal } from '@fsm/ui';

import { addLocationService } from '../../../../../services/store';
import { ModalProps } from '../../../../../models';
import LocalForm from './Form';
import { toast } from 'react-toastify';

export default function Add({ onHide, show, mutate }: ModalProps) {
  return (
    <Modal size="sm" header="Add Location" {...{ onHide, show }}>
      <LocalForm
        onCancel={onHide}
        onSubmit={(params, { setSubmitting }) => {
          addLocationService([{ ...params }])
            .then(() => {
              toast.success('Success');
              mutate?.();
              setSubmitting(false);
            })
            .catch(() => {
              toast.error('Could not add location. Please try again.');
              setSubmitting(false);
            });
        }}
      />
    </Modal>
  );
}
