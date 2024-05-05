import { Button } from '@fsm/ui';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  onClick: () => void;
  imgSrc: string;
  actionDirection?: 'left' | 'right';
}

export default function Cover({
  imgSrc,
  onClick,
  actionDirection = 'right',
}: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx('bg-gray-5', ' px-6 py-4', 'w-full max-w-[500px]')}
    >
      <Image src={imgSrc} width={200} height={200} alt="banner" />
      <Button className="text-sm" variant="outline-black">
        Shop Now
      </Button>
    </div>
  );
}
