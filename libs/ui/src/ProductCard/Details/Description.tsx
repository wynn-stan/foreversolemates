import clsx from 'clsx';

interface Props {
  description?: string;
  withHeader?: boolean;
}

export default function Description({ description, withHeader = true }: Props) {
  return (
    <div className="w-full">
      {withHeader ? (
        <div className="font-medium text-sm w-[80px] pb-1 border-b-2 border-black">
          Description
        </div>
      ) : (
        <></>
      )}
      <div
        className={clsx(
          ' text-sm text-gray-30  border-gray-10',
          withHeader && 'py-4 border-b-2'
        )}
      >
        {description}
      </div>
    </div>
  );
}
