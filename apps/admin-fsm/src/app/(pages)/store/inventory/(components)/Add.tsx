import { Modal } from '@fsm/ui';
import { ModalProps } from '../../../../../models';
import Form from './Form';

interface Props extends ModalProps {}

export default function Add({ show, onHide }: Props) {
  return (
    <Modal {...{ show, onHide }}>
      <Form />
    </Modal>
  );
}
