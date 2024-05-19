import { Button, EmptyFormik, Field, Modal } from '@fsm/ui';
import { ModalProps } from '../../../../../models';
import Form from './Form';
import {
  addCollectionService,
  deleteCollectionService,
} from '../../../../../services/store';
import { toast } from 'react-toastify';
import { useState } from 'react';

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

export default function Delete({ show, onHide, mutate, details }: Props) {
  //state
  const [isSubmitting, setSubmitting] = useState(false);

  //api
  const handleDelete = () => {
    deleteCollectionService(details._id)
      .then(() => {
        toast.success('Collection deleted successfully');
        mutate && mutate();
        onHide();
      })
      .catch(() => {
        toast.error('Unable to delete collection. Please try again');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal header="Delete Collection" size="sm" {...{ show, onHide }}>
      <div className="space-y-4">
        <EmptyFormik>
          <div className="space-y-4">
            {details?.banner_image ? (
              <Field.Group
                wrapperClassName="!space-y-3"
                name="image"
                label="Banner Image"
              >
                <Field.ImageUpload.Preview url={details.banner_image} />
              </Field.Group>
            ) : (
              ''
            )}

            <Field.Group disabled name="name" label="Collection Name">
              <Field.Input
                name="name"
                value={details.collection_name}
                placeholder="Collection name"
              />
            </Field.Group>

            <Field.Group disabled name="top_tagline" label="Top tagline">
              <Field.Input
                disabled
                name="top_tagline"
                value={details.top_tagline}
                placeholder="Top tagline"
              />
            </Field.Group>

            <Field.Group disabled name="bottom_tagline" label="Bottom tagline">
              <Field.Input
                disabled
                name="bottom_tagline"
                value={details.bottom_tagline}
                placeholder="Bottom tagline"
              />
            </Field.Group>
          </div>
        </EmptyFormik>
        <div className="flex justify-end rounded-md mt-4">
          <Button
            onClick={() => {
              setSubmitting(true);
              handleDelete();
            }}
            {...{ isSubmitting }}
            variant="alert"
          >
            Delete collection
          </Button>
        </div>
      </div>
    </Modal>
  );
}
