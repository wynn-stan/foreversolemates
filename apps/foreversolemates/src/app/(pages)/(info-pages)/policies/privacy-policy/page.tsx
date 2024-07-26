'use client';

import { useEffect } from 'react';
import { useLayout } from '../../../../../hooks';
import Section from '../(components)/Section';

export default function Page() {
  const { layout, setLayout } = useLayout();

  //effect
  useEffect(() => {
    const banner = {
      title: 'Privacy Policy',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  return (
    <>
      <div className="py-10">
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit or make a purchase from
        foreversolemates.com (the “Site”).
      </div>
      <Section.Wrapper>
        <Section.Content
          header="Personal information we collect"
          description={
            <>
              When you visit the Site, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and some of the cookies that
              are installed on your device. Additionally, as you browse the
              Site, we collect information about the individual web pages or
              products that you view, what websites or search terms referred you
              to the Site, and information about how you interact with the Site.
              We refer to this automatically-collected information as “Device
              Information”.
              <br />
              <br /> We collect Device Information using the following
              technologies:
              <br />
              <br />
              <ul>
                <li>
                  “Cookies” are data files that are placed on your device or
                  computer and often include an anonymous unique identifier. For
                  more information about cookies, and how to disable cookies,
                  visit http://www.allaboutcookies.org.
                </li>
                <li>
                  “Log files” track actions occurring on the Site, and collect
                  data including your IP address, browser type, Internet service
                  provider, referring/exit pages, and date/time stamps.
                </li>
                <li>
                  “Web beacons”, “tags”, and “pixels” are electronic files used
                  to record information about how you browse the Site.
                </li>
              </ul>
              <br />
              Additionally when you make a purchase or attempt to make a
              purchase through the Site, we collect certain information from
              you, including your name, billing address, shipping address,
              payment information, email address, and phone number. We refer to
              this information as “Order Information”.When we talk about
              “Personal Information” in this Privacy Policy, we are talking both
              about Device Information and Order Information.
            </>
          }
        />
        <Section.Content
          header="How do we use your personal information?"
          description={
            <>
              We use the Order Information that we collect generally to fulfill
              any orders placed through the Site (including processing your
              payment information, arranging for shipping where applicable, and
              providing you with invoices and/or order confirmations).
              Additionally, we use this Order Information to:
              <br />
              <br />
              <ul>
                <li>Communicate with you</li>
                <li>Screen our orders for potential risk or fraud</li>
                <li>
                  When in line with the preferences you have shared with us,
                  provide you with information or advertising relating to our
                  products or services.
                </li>
              </ul>
              <br />
              We use the Device Information that we collect to help us screen
              for potential risk and fraud (in particular, your IP address), and
              more generally to improve and optimize our Site (for example, by
              generating analytics about how our customers browse and interact
              with the Site, and to assess the success of our marketing and
              advertising campaigns).
            </>
          }
        />
        <Section.Content
          header="Sharing your personal Information"
          description="We may  share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights."
        />

        <Section.Content
          header="Marketing"
          description={
            <>
              We value your privacy and the information you consent to share in
              relation to our SMS marketing service. We use this information to
              send you text notifications (for your order, including abandoned
              checkout reminders), text marketing offers, and transactional
              texts, including requests for reviews from us.
              <br />
              <br />
              Our website uses cookies to keep track of items you put into your
              shopping cart, including when you have abandoned your checkout.
              This information is used to determine when to send cart reminder
              messages via SMS.
            </>
          }
        />

        <Section.Content
          header="Do not track"
          description="Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser."
        />

        <Section.Content
          header="Data retention"
          description="When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information."
        />
        <Section.Content
          header="Changes"
          description="We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons."
        />
      </Section.Wrapper>
    </>
  );
}
