interface Props {
  description?: string;
}

export default function Description({ description }: Props) {
  return (
    <div className="w-full">
      <div className="font-medium text-sm w-[80px] pb-1 border-b-2 border-black">
        Description
      </div>
      <div className=" text-sm text-gray-30 py-4 border-b-2 border-gray-10">
        {description}
      </div>
    </div>
  );
}
