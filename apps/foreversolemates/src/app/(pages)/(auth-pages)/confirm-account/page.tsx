'use client';

import { Spinner } from '@fsm/ui';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { confirmAccountService } from '../../../../services/auth';
import { toast } from 'react-toastify';

export default function Page() {
  //hooks
  const token = useSearchParams().get('token');

  //state
  const [isSubmitting, setSubmitting] = useState(token ? true : false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    token &&
      confirmAccountService({ confirmationCode: token })
        .then(() => {
          toast.success('Account confirmed successfully');
          setIsValid(true);
        })
        .catch((err: { message?: string }) => {
          toast.error(err?.message || 'Unable to verify account');
          setIsValid(false);
        })
        .finally(() => {
          setSubmitting(false);
        });
  }, [token]);

  return (
    <div className="flex flex-col items-center text-center">
      {(!token || (!isValid && !isSubmitting)) && (
        <div className="space-y-2 text-red-40">
          <XCircleIcon className=" mx-auto" />
          <div>Link is invalid or has expired</div>
        </div>
      )}

      {isSubmitting && (
        <div className="space-y-2">
          <Spinner className="mx-auto" />
          <div>Verifying account</div>
        </div>
      )}
    </div>
  );
}
