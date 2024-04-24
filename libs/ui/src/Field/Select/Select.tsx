import { FieldAttributes } from 'formik';
import Select from 'react-select';

interface Option {
  label: string;
  value: any;
  [key: string]: any;
}

interface Props {
  name?: string;
  className?: string;
  options: Option[];
  value: any;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  defaultValue?: Option;
}

export default function LocalSelect({
  name,
  value,
  onChange,
  options,
  className,
  placeholder,
  defaultValue,
}: Props) {
  return (
    <Select
      defaultValue={defaultValue}
      className={className}
      placeholder={placeholder}
      inputId={value}
      options={options}
      onChange={onChange}
    />
  );
}
