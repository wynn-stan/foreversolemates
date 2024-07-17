import { toast } from 'react-toastify';
import { Modal } from '@fsm/ui';

import {
  deleteProductService,
  updateProductService,
} from '../../../../../../services/store';
import { ModalProps, ProductModel } from '../../../../../../models';
import { getFinalPrice } from './Form/Utils';
import Form from './Form';
import { useEffect, useState } from 'react';
import { helpers } from '@foreversolemates/utils';

interface Props extends ModalProps {
  mutate: () => void;
  details: ProductModel;
}

export default function Delete({ details, mutate, show, onHide }: Props) {
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
      header="Delete Product"
      {...{ show, onHide }}
    >
      <Form
        defaultValues={{ ...defaultValues }}
        actionType="Delete"
        onSubmit={(params, { setSubmitting }) => {
          deleteProductService(details._id)
            .then(() => {
              toast.success('Product deleted successfully');
              mutate && mutate();
              onHide();
            })
            .catch(() => {
              toast.error('Unable to delete product. Please try again');
              setSubmitting(false);
            });
        }}
      />
    </Modal.Side>
  );
}
