import clsx from 'clsx';
import Image from 'next/image';

export default function ProductImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'bg-gray-10 ',
        'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]',
        'overflow-hidden',
        className
      )}
    >
      <Image
        unoptimized
        className={clsx('object-cover object-center', 'w-full h-full')}
        src={src}
        alt="product_image"
        width={150}
        height={150}
      />
    </div>
  );
}
