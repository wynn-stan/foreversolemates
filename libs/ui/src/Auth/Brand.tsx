import clsx from 'clsx';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Brand({ className, ...props }: Props) {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <Image
        src="/assets/logo.jpg"
        className="rounded-full"
        width={32}
        height={32}
        alt="logo"
      />
      <div className="font-semibold">
        <span>
          <span className="text-gray-40">Forever</span> SoleMates
        </span>
      </div>
    </div>
  );
}
