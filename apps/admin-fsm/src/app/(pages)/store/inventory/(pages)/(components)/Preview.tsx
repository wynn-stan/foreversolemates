import { Modal } from '@fsm/ui';
import { ModalProps } from 'apps/admin-fsm/src/models';

interface Props extends ModalProps {}

export default function Preview({ show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide}>
      <>hi</>
    </Modal>
  );
}
