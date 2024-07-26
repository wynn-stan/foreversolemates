'use client';

import { useEffect } from 'react';
import { useLayout } from '../../../../../hooks';
import Section from '../(components)/Section';

export default function Page() {
  const { layout, setLayout } = useLayout();

  //effect
  useEffect(() => {
    const banner = {
      title: 'Returns and Warranties',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  return (
    <div>
      <Section.Wrapper>
        <Section.Content
          header="Returns"
          description={
            <>
              If you wish to return your footwear, you may do so within 14 days
              after purchase. Inspect your footwear immediately after you
              receive it, fill the Returns form included in your package, and
              send the shoes and the form to our retail store.
              <br /> To be eligible for a return, your shoes must be unused,
              unwashed, and in the same condition that you received them. They
              must also be in the original packaging with the Returns form
              included. <br />
              <br />
              Once the return is approved, you will receive a replacement in the
              right size or store credit where a replacement is unavailable. We
              reserve the right to only accept returns that fall within our
              14-day period. Note that you are responsible for returns, except
              where you have received a faulty item or wrong order, in which
              case Forever Sole Mates will be responsible for the return.
              <br />
              <br /> If you have any questions on our return process, click here
              to contact us via Whatsapp or email.
            </>
          }
        />

        <Section.Content
          header="Warranty"
          description={
            <>
              Forever Sole Mates footwear comes with a 90-day limited warranty
              against manufacturing defects when purchased from our website,
              store, or direct sales channel established by us.
              <br />
              <br /> If a manufacturing defect is found, we will repair it, or
              give you a 5-15% discount towards a future purchase. The discount
              is determined by several factors including, but not limited to,
              the date of purchase, type of defect, and the amount of wear on
              the footwear. We reserve the right to only accept warranty
              replacements that follow our policies.
              <br />
              <br /> Warranty Exclusions include:
              <br />
              <br />
              <ul>
                <li>Normal wear and tear of used footwear </li>
                <li>
                  Damage caused by chemical or other foreign contamination
                </li>
                <li>Fit and comfort issues of used footwear </li>
                <li>Odours from the footwear after they have been worn</li>
                <li>
                  Cuts, abrasions, or damage resulting from accident, neglect,
                  abuse, misuse of the footwear
                </li>
              </ul>
            </>
          }
        />
      </Section.Wrapper>
    </div>
  );
}
