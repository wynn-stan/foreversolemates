'use client';

import { useEffect } from 'react';
import { useLayout } from '../../../../../hooks';

export default function Page() {
  const { layout, setLayout } = useLayout();

  //effect
  useEffect(() => {
    const banner = {
      title: 'Payments and Deliveries',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  return <div>Coming soon...</div>;
}
