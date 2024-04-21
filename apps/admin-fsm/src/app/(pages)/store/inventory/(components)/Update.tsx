import { Modal } from '@fsm/ui';
import { ModalProps } from '../../../../../models';
import Form from './Form';
import { updateCollectionService } from '../../../../../services/store';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

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
  //state
  const [imageFile, setImageFile] = useState<File>();

  //variables
  const filename = (() => {
    const list = details.banner_image?.split('/') || [];
    return list[list.length - 1];
  })();

  //variables - form default values
  const defaultValues = {
    name: details.collection_name,
    ...details,
    image: imageFile,
  };

  //since we are given the image url from api, get the blob of that and make it a file

  //effect
  useEffect(() => {
    details.banner_image &&
      fetch(details.banner_image)
        .then((res) => res.blob())
        .then((blob) => {
          const file_type = (() => {
            const list = filename.split('.');
            return list[list.length - 1];
          })();
          const file = new File([blob], filename, { type: file_type });
          setImageFile(file);
        });
  }, []);

  return (
    <Modal header="Update Collection" size="sm" {...{ show, onHide }}>
      {(details?.banner_image && imageFile) || !details.banner_image ? (
        <Form
          onCancel={onHide}
          defaultValues={defaultValues}
          onSubmit={(params, { setSubmitting }) => {
            const formData = new FormData();
            formData.append('name', params.name);
            formData.append('top_tagline', params.top_tagline);
            formData.append('bottom_tagline', params.bottom_tagline);
            formData.append('image', params.image);

            updateCollectionService(details._id, formData)
              .then(() => {
                toast.success('Collection updated successfully');
                mutate && mutate();
                onHide();
              })
              .catch(() => {
                toast.error('Unable to update collection. Please try again');
                setSubmitting(false);
              });
          }}
        />
      ) : (
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div className="min-w-[100px] w-full h-[25px] bg-gray-20 animate-pulse" />
          ))}
        </div>
      )}
    </Modal>
  );
}
