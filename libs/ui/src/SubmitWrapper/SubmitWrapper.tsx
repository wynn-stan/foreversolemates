import { Dispatch, SetStateAction, useState } from 'react';
import { Spinner } from '../Spinner/Spinner';

interface ChildProps {
  isSubmitting: boolean;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  Spinner: (props: any) => JSX.Element;
}

interface Props {
  children: ({
    isSubmitting,
    setSubmitting,
    Spinner,
  }: ChildProps) => JSX.Element;
}

export default function SubmitWrapper({ children }: Props) {
  //state
  const [isSubmitting, setSubmitting] = useState(false);
  return <>{children({ isSubmitting, setSubmitting, Spinner })}</>;
}
