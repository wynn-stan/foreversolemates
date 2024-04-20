import { ErrorMessage } from 'formik';

interface Props {
  label: string;
  children: React.ReactNode;
  name: string;
}

export default function Group({ children, name, label }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-40">{label}</div>
      <div>{children}</div>
      <div className="text-red-40 text-xs px-3">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}
