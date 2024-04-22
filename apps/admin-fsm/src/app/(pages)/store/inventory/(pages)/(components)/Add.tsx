import toast from 'react-hot-toast';
import { Modal } from '@fsm/ui';

import { addAdminAccountService } from '../../../../../../services/user';
import { addProductService } from '../../../../../../services/store';
import { ModalProps } from '../../../../../../models';
import { getFinalPrice } from './Form/Utils';
import Form from './Form';
import { getBase64fromBlob } from '../../../../../../utils';

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
      <Form
        actionType="Add"
        onSubmit={async (params, { setSubmitting }) => {
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
          formData.append('available_units', params.available_units.toString());
          formData.append('alert', params.alert.toString());
          formData.append('collection_id', params.collection_id);
          formData.append(
            'available_sizes',
            JSON.stringify(params.available_sizes)
          );
          formData.append(
            'available_colors',
            JSON.stringify(params.available_colors)
          );

          params.images.map((image, index) => {
            formData.append(`image_${index}`, image);
          });

          addProductService(formData)
            .then(() => {
              toast.success('Product added successfully');
              mutate && mutate();
              onHide();
            })
            .catch(() => {
              toast.error('Unable to add product. Please try again');
              setSubmitting(false);
            });
        }}
      />
    </Modal.Side>
  );
}
