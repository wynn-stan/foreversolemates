'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  urls: string[];
}

export default function Images({ urls }: Props) {
  //state
  const [currentImage, setCurrentImage] = useState(urls[0]);

  return (
    <div className={clsx('flex flex-col-reverse md:flex-row gap-4')}>
      <div
        className={clsx(
          'flex md:flex-col justify-center md:justify-start gap-4',
          ''
        )}
      >
        {urls.map((link, index) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={() => setCurrentImage(link)}
          >
            <Image
              unoptimized
              className=""
              width={80}
              height={100}
              src={link}
              alt="product-image"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Image
          unoptimized
          className="w-[335px] h-[350px] object-cover"
          width={335}
          height={450}
          src={currentImage}
          alt="product-image"
        />
      </div>
    </div>
  );
}
