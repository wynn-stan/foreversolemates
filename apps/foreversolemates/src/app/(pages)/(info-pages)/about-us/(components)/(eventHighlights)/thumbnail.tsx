import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  onClick: () => void;
  isActive: boolean;
  thumbnail_image: string;
  header: string;
}

export default function Thumbnail({
  isActive,
  onClick,
  thumbnail_image,
  header,
}: Props) {
  return (
    <div
      style={{
        boxShadow: isActive ? '0px 1px 16px rgba(0, 0, 0, 0.12)' : '',
      }}
      className={clsx(
        'rounded-lg border',
        !isActive ? ' border-gray-10' : 'border-gray-20 border-[2px]',
        'p-2 space-y-3'
      )}
      onClick={onClick}
    >
      <Image
        src={thumbnail_image}
        className={clsx(
          'w-full max-w-[180px] max-h-[86px] object-cover',
          'rounded-md',
          !isActive ? 'brightness-[0.4]' : ''
        )}
        width={180}
        height={86}
        alt="thumbnail"
      ></Image>
      <div className="truncate text-sm font-medium">{header}</div>
    </div>
  );
}
