import { Modal } from '@fsm/ui';
import toast from 'react-hot-toast';

import { addAdminAccountService } from '../../../../../../services/user';
import { ModalProps } from '../../../../../../models';
import Form from './Form';

interface Props extends ModalProps {
  mutate: () => void;
}

export default function Add({ mutate, show, onHide }: Props) {
  return (
    <Modal.Side
      containerClassName="!w-full max-w-[600px]"
      direction="right"
      header="Add Product"
      {...{ show, onHide }}
    >
      <Form actionType="Add" onSubmit={(params, { setSubmitting }) => {}} />
    </Modal.Side>
  );
}
