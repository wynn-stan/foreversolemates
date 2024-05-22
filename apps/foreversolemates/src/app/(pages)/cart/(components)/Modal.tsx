'use client';

import { CircleCheck, CircleCheckIcon, CircleXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from '@fsm/ui';
import axios from 'axios';

import { ModalProps } from '../../../../models';
import { useStore } from '../../../../hooks';
import routes from '../../../../routes';

interface Props extends ModalProps {
  reference: string;
}

export default function LocalModal({ show, onHide, reference }: Props) {
  //state
  const [isSubmitting, setSubmitting] = useState(true);
  const [status, setStatus] = useState<'success' | 'failed'>();

  //hooks
  const router = useRouter();
  const { store, setStore } = useStore();

  useEffect(() => {
    axios
      .get<never, any>(`/api/verify-transaction?reference=${reference}`)
      .then(
        (res: {
          data: {
            status: string | boolean;
          };
        }) => {
          if (res?.data?.status && res?.data?.status === 'success') {
            setStatus('success');
            setTimeout(() => {
              router.push(
                `${routes.track_my_order.index}?order-reference=${store?.user?.order_reference}`
              );
              setStore((store) => ({ ...store, cart: [] }));
            }, 1500);
          } else {
            setStatus('failed');
            setTimeout(onHide, 3000);
          }
        }
      )
      .catch((err) => {
        setStatus('failed');
        setTimeout(onHide, 3000);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }, []);

  return (
    <Modal backdrop="static" {...{ show, onHide }} className="max-w-[500px]">
      <div className="flex flex-col items-center space-y-4">
        {isSubmitting && <Spinner />}
        <div className="space-y-2 text-center">
          {isSubmitting && (
            <>
              <div>Verifying transaction.</div>
              <div className="text-gray-40 text-sm">
                Please wait a moment...
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <CircleCheckIcon className="text-green-50 mx-auto" />
              <div className="text-green-50">Success</div>
              <div className="text-gray-40 text-sm">Redirecting...</div>
            </>
          )}

          {status === 'failed' && (
            <>
              <CircleXIcon className="text-red-40 mx-auto" />
              <div className="text-red-40">Failed</div>
              <div className="text-gray-40 text-sm">
                Closing in 3 seconds...
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
