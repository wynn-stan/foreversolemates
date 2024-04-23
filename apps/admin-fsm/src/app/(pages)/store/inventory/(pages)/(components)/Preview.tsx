import { Modal, ProductCard } from '@fsm/ui';
import { ModalProps, ProductModel } from '../../../../../../models';

interface Props extends ModalProps {
  details: ProductModel;
}

export default function Preview({ details, show, onHide }: Props) {
  return (
    <Modal
      header="Preview"
      className="max-w-[880px]"
      show={show}
      onHide={onHide}
    >
      <ProductCard.Details
        onSizeClick={() => {}}
        onColorClick={() => {}}
        checkedSize={0}
        checkedColor={''}
        details={details}
      />
    </Modal>
  );
}
