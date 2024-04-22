import toast from 'react-hot-toast';
import { Modal } from '@fsm/ui';

import { updateProductService } from '../../../../../../services/store';
import { ModalProps, ProductModel } from '../../../../../../models';
import { getFinalPrice } from './Form/Utils';
import Form from './Form';
import { useEffect, useState } from 'react';

interface Props extends ModalProps {
  mutate: () => void;
  details: ProductModel;
}

export default function Update({ details, mutate, show, onHide }: Props) {
  //state
  const [imageFiles, setImageFiles] = useState<File[]>();

  //variables
  const filenames = (() => {
    const list = details?.images?.map((url) => {
      const all_list = url.split('/');
      return all_list[all_list.length - 1];
    });
    return list || [];
  })();

  //variables - form default values
  const defaultValues = {
    ...details,
    name: details.product_name,
    images: imageFiles,
  };

  //effect
  useEffect(() => {
    //since we are given the image url from api, get the blob of that and make it a file

    const fetch_requests = details?.images?.map((item) =>
      fetch(item).then((res) => res.blob())
    );

    details.images?.length &&
      details.images.map(async (image, index) => {
        const image_files = await Promise.all(fetch_requests).then((blobs) => {
          return blobs.map((blob, index) => {
            const file_type = (() => {
              const list = filenames?.[index]?.split('.');
              return list[list.length - 1];
            })();
            const file = new File([blob], filenames?.[index], {
              type: file_type,
            });
            return file;
          });
        });

        setImageFiles(image_files);
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
