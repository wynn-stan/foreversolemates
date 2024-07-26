'use client';

import { useEffect } from 'react';
import { useLayout } from '../../../../../hooks';
import Section from '../(components)/Section';

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

  return (
    <Section.Wrapper>
      <Section.Content
        header="Payments"
        description={
          <div className="text-center">
            All payaments are processed with our payment partner, Paystack
          </div>
        }
      />
      <Section.Content
        header="Domestic Delivery"
        description={
          <>
            <p>
              You will be contacted once your order is ready. Orders are
              normally delivered within 10 am and 5 pm.
            </p>
            <p>
              Please stay by your phone and keep us promptly informed of any
              changes in your location or contact number. If we`re unable to
              reach you upon reaching your destination, there will be a 5-minute
              waiting period. After that, your order will be scheduled for
              delivery the next day with an additional fee.
            </p>
          </>
        }
      />
    </Section.Wrapper>
  );
}
