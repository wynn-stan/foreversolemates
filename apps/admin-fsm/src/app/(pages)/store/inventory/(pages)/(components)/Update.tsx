import toast from 'react-hot-toast';
import { Modal } from '@fsm/ui';

import { updateProductService } from '../../../../../../services/store';
import { ModalProps, ProductModel } from '../../../../../../models';
import { getFinalPrice } from './Form/Utils';
import Form from './Form';
import { useEffect, useState } from 'react';
import { helpers } from '@foreversolemates/utils';

interface Props extends ModalProps {
  mutate: () => void;
  details: ProductModel;
}

export default function Update({ details, mutate, show, onHide }: Props) {
  //state
  const [imageFiles, setImageFiles] = useState<File[]>();

  //variables - form default values
  const defaultValues = {
    ...details,
    name: details.product_name,
    images: imageFiles,
  };

  //effect
  useEffect(() => {
    const files = helpers.getFilesFromImageUrls(details.images);
    files.then((files) => {
      return setImageFiles(files);
    });
  }, []);

  return (
    <Modal.Side
      containerClassName="!w-full max-w-[600px]"
      direction="right"
      header="Update Product"
      {...{ show, onHide }}
    >
      <Form
        defaultValues={{ ...defaultValues }}
        actionType="Update"
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

          updateProductService(details._id, formData)
            .then(() => {
              toast.success('Product updated successfully');
              mutate && mutate();
              onHide();
            })
            .catch(() => {
              toast.error('Unable to update product. Please try again');
              setSubmitting(false);
            });
        }}
      />
    </Modal.Side>
  );
}
