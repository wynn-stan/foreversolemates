import { FieldAttributes } from 'formik';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

interface Option {
  label: string;
  value: any;
  [key: string]: any;
}

interface Props {
  name?: string;
  className?: string;
  options?: Option[];
  value: any;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  defaultValue?: Option;
  onInputChange?: (value: string) => void;
  isAsync?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: Option[]) => void
  ) => void;
}

export default function ({
  name,
  value,
  onChange,
  options,
  className,
  placeholder,
  defaultValue,
  onInputChange,
  loadOptions,
  isAsync,
}: Props) {
  //component
  const Component = isAsync ? AsyncSelect : Select;

  return (
    <Component
      defaultValue={defaultValue}
      classNames={{
        control: (state) =>
          state.isFocused ? '!border-gray-20 !shadow-none' : '',
      }}
      className={className}
      placeholder={placeholder}
      inputId={value}
      options={options}
      onChange={onChange}
      onInputChange={onInputChange}
      loadOptions={loadOptions}
    />
  );
}
