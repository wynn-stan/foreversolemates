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
    <Modal.Side direction="right" header="Add User" {...{ show, onHide }}>
      <div className="max-w-[500px] w-full">
        <Form onSubmit={(params, { setSubmitting }) => {}} />
      </div>
    </Modal.Side>
  );
}
