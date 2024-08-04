import { toast } from 'react-toastify';
import { Modal } from '@fsm/ui';

import { addProductService } from '../../../../../../services/store';
import { ModalProps } from '../../../../../../models';
import { getFinalPrice } from './Form/utils/Utils';
import Form from './Form';

interface Props extends ModalProps {
  mutate: () => void;
}

export default function Add({ mutate, show, onHide }: Props) {
  return (
    <Modal className="!w-full max-w-[600px]" {...{ show, onHide }}>
      <Form
        header="Add Product"
        onCancel={onHide}
        onSubmit={(params, { setSubmitting }) => {
          //variables
          const final_price = getFinalPrice(
            params.initial_price,
            params.discount
          );

          const formData = new FormData();
          formData.append('name', params.name);
          formData.append('initial_price', params.initial_price.toString());
          formData.append('description', params.description);
          formData.append('discount', params.discount.toString());
          formData.append('final_price', final_price.toString());
          formData.append('alert', params.alert.toString());
          formData.append('collection_id', params.collection_id);
          params.images.map((image, index) => {
            formData.append(`image_${index}`, image);
          });

          formData.append(
            'available_sizes_and_units',
            params.available_sizes_and_units?.length
              ? JSON.stringify(params.available_sizes_and_units)
              : JSON.stringify([
                  {
                    size: 'DEFAULT',
                    available_units: params.total_available_units,
                  },
                ])
          );

          formData.append(
            'total_available_units',
            params.total_available_units.toString()
          );

          addProductService(formData)
            .then(() => {
              toast.success('Product added successfully');
              mutate && mutate();
              onHide();
            })
            .catch(({ message }: { message?: string }) => {
              toast.error(message || 'Unable to add product. Please try again');
              setSubmitting(false);
            });
        }}
        submitLabel="Add"
      />
    </Modal>
  );
}
