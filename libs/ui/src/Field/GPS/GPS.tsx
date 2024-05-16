import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { object, string } from 'yup';
import { Spinner as SpinnerIcon } from '../../';
import { debounce } from 'lodash';
import { http } from '@foreversolemates/utils';

export interface GPSProps {
  name: string;
  value?: string;
  setFieldValue: any;
  setFieldError: any;
  setFieldTouched: any;
  onSuccess: (props: { region: string; address: string; town: string }) => void;
}

const schema = object().shape({
  gps: string()
    .test('format', 'Enter a valid digital address', (address) =>
      /^[A-Z0-9]{2}-\d{3,4}-\d{3,4}$/.test(String(address))
    )
    .max(12, 'GPS must be maximum of 12 characters'),
});

// verify email with bouncer
const handleGpsVerification = debounce(
  ({
    name,
    gps,
    setValid,
    setTyping,
    onSuccess,
    setLoading,
    setFieldValue,
    setFieldError,
  }: any) => {
    setLoading(true);
    setTyping(false);

    schema.isValid({ gps }).then((valid) => {
      if (valid) {
        http
          .get<never, any>(`/verification/verify-gpsaddress/${gps}`)
          .then(
            ({
              data,
            }: {
              data: { Region: string; Community: string; Street: string };
            }) => {
              setValid(true);
              setFieldValue('is_gps_valid', true);
              onSuccess({
                region: data.Region,
                town: data.Community,
                address: data.Street,
              });
            }
          )
          .catch(() => {
            setValid(false);
            setFieldValue('is_gps_valid', false);

            if (setFieldError) {
              setFieldError(name, 'Unable to verify gps');
            }
          })
          .finally(() => setLoading(false));
      } else {
        setValid(false);
        setLoading(false);
        setFieldValue('is_gps_valid', false);
      }
    });
  },
  2000
);

export default function GPS({
  name,
  value,
  onSuccess,
  setFieldValue,
  setFieldError,
  setFieldTouched,
}: GPSProps) {
  /**
   * states
   */
  const [valid, setValid] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  // form change handler
  const handleChange = (value: string) => {
    setTyping(true);

    // for formik
    setFieldValue(name, value);
    setFieldValue('is_gps_valid', false);

    handleGpsVerification({
      name,
      gps: value,
      setValid,
      onSuccess,
      setTyping,
      setLoading,
      setFieldError,
      setFieldValue,
    });
  };

  return (
    <>
      <input
        name={name}
        value={value || ''}
        className="form-input"
        onBlur={() => setFieldTouched(name, true)}
        onChange={({ currentTarget: { value } }) => handleChange(value?.trim())}
      />
      <InputStatus {...{ typing, value, valid, loading }} />
    </>
  );
}

const InputStatus = ({
  typing,
  value,
  valid,
  loading,
}: {
  typing: boolean;
  value?: string;
  loading: boolean;
  valid: boolean;
}) => {
  return (
    value && (
      <div className="flex items-center justify-center px-4">
        {loading && <SpinnerIcon className="w-4 h-4" />}
        {!loading &&
          (valid ? (
            <CheckCircle className="w-4 h-4 text-green" />
          ) : (
            !typing && <XCircle className="text-red-600 w-4 h-4" />
          ))}
      </div>
    )
  );
};
