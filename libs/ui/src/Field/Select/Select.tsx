import { SelectComponents } from 'react-select/dist/declarations/src/components';
import Select, { GroupBase } from 'react-select';
import AsyncSelect from 'react-select/async';
import { FieldAttributes } from 'formik';

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
  components?:
    | Partial<SelectComponents<Option, false, GroupBase<Option>>>
    | undefined;
  isLoading?: boolean;
  [key: string]: any;
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
  components,
  isLoading,
  ...props
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
      components={components}
      isLoading={isLoading}
      {...props}
    />
  );
}
