import { Modal } from '@fsm/ui';
import { ModalProps } from '../../../../../models';
import Form from './Form';
import { addCollectionService } from '../../../../../services/store';
import { toast } from 'react-toastify';

interface Props extends ModalProps {}

export default function Add({ show, onHide, mutate }: Props) {
  return (
    <Modal header="Add Collection" size="sm" {...{ show, onHide }}>
      <Form
        onCancel={onHide}
        onSubmit={(params, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('name', params.name);
          formData.append('top_tagline', params.top_tagline);
          formData.append('bottom_tagline', params.bottom_tagline);
          formData.append('image', params.image);

          addCollectionService(formData)
            .then(() => {
              toast.success('Collection added successfully');
              mutate && mutate();
              onHide();
            })
            .catch(() => {
              toast.error('Unable to add collection. Please try again');
              setSubmitting(false);
            });
        }}
      />
    </Modal>
  );
}
