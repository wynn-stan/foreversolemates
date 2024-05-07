'use client';

import { useEffect } from 'react';

import { useLayout } from '../../../hooks';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();

  //effect
  useEffect(() => {
    const banner = {
      title: 'My Cart',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  return <>Cart</>;
}
