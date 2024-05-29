'use client';

import { useEffect } from 'react';

import useLayout from './useLayout';

interface Props {
  title: string;
  top_tagline?: string;
  imageSrc?: string;
}

const useBanner = ({ title, imageSrc = '', top_tagline = '' }: Props) => {
  //hooks
  const { setLayout } = useLayout();

  // effect
  //effect
  useEffect(() => {
    setLayout({
      banner: {
        title,
        top_tagline,
        imageSrc,
      },
    });

    // return setLayout({});
  }, []);
};

export default useBanner;
