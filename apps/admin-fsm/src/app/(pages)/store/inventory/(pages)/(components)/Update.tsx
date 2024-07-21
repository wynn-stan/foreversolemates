import { helpers } from '@foreversolemates/utils';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal } from '@fsm/ui';

import { updateProductService } from '../../../../../../services/store';
import { ModalProps, ProductModel } from '../../../../../../models';
import { getFinalPrice } from './Form/utils/Utils';
import Form from './Form';

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
    <Modal className="!w-full max-w-[600px]" {...{ show, onHide }}>
      <Form
        defaultValues={{ ...defaultValues }}
        header="Update Product"
        submitLabel="Update"
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

          params.available_sizes_and_units?.length &&
            formData.append(
              'available_sizes_and_units',
              JSON.stringify(params.available_sizes_and_units)
            );

          formData.append(
            'total_available_units',
            params.total_available_units.toString()
          );

          updateProductService(details._id, formData)
            .then(() => {
              toast.success('Product updated successfully');
              mutate && mutate();
              onHide();
            })
            .catch(({ message }: { message?: string }) => {
              toast.error(
                message || 'Unable to update product Please try again'
              );
              setSubmitting(false);
            });
        }}
      />
    </Modal>
  );
}
