import { Modal } from '@fsm/ui';
import { ModalProps } from '../../../../../models';
import Form from './Form';
import { updateCollectionService } from '../../../../../services/store';
import toast from 'react-hot-toast';

interface Props extends ModalProps {
  details: {
    _id: string;
    collection_name: string;
    banner_image?: string;
    bottom_tagline?: string;
    top_tagline?: string;
    [key: string]: any;
  };
}

export default function Update({ show, onHide, mutate, details }: Props) {
  return (
    <Modal header="Update Collection" size="sm" {...{ show, onHide }}>
      <Form
        defaultValues={{ name: details.collection_name, ...details }}
        onSubmit={(params, { setSubmitting }) => {
          //   updateCollectionService(formData)
          //     .then(() => {
          //       toast.success('Collection updated successfully');
          //       mutate && mutate();
          //       onHide();
          //     })
          //     .catch(() => {
          //       toast.error('Unable to update collection. Please try again');
          //       setSubmitting(false);
          //     });
        }}
      />
    </Modal>
  );
}
