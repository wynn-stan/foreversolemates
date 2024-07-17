import { Modal } from '@fsm/ui';

import { ModalProps } from '../../../../../../models';
import Form from './Form';

interface Props extends ModalProps {
  mutate: () => void;
}

export default function Add({ mutate, show, onHide }: Props) {
  return (
    <Modal containerClassName="!w-full max-w-[600px]" {...{ show, onHide }}>
      <Form
        header="Add Product"
        onCancel={onHide}
        onSubmit={(params, actions) => {
          //
        }}
        submitLabel="Add"
      />
    </Modal>
  );
}
