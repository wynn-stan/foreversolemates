import { Modal } from '@fsm/ui';

import { addAdminAccountService } from '../../../../../services/user';
import { ModalProps } from '../../../../../models';
import Form from './Form';
import toast from 'react-hot-toast';

interface Props extends ModalProps {
  mutate: () => void;
}

export default function Add({ mutate, show, onHide }: Props) {
  return (
    <Modal header="Add User" size="sm" {...{ show, onHide }}>
      <Form
        onSubmit={(params, { setSubmitting }) => {
          addAdminAccountService(params)
            .then(() => {
              toast.success('Added user successfully');
              mutate();
              onHide();
            })
            .catch(() => {
              toast.error('Unable to add user. Please try again');
            })
            .finally(() => setSubmitting(false));
        }}
      />
    </Modal>
  );
}
