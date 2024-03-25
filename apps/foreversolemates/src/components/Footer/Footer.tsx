import styled from 'styled-components';
import { Button } from '@fsm/ui';
import dayjs from 'dayjs';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

export default function Footer() {
  return (
    <div className="text-white flex justify-center bg-black py-10 px-4">
      <div className="flex flex-col gap-8 w-full max-w-[1320px]">
        <div className="flex flex-wrap gap-6 justify-between items-center">
          <p>Get Exclusive Offers</p>
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
            <input
              className="bg-transparent border-b-2 py-3 outline-none px-2 lg:min-w-[500px] w-full max-w-full"
              placeholder="Enter your e-mail address here"
            />
            <Button className="text-black bg-white px-4 py-3">Subscribe</Button>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-600" />
        <div className="flex gap-6 flex-wrap">
          <StyledSection>
            <div>Our Customer Service Hours:</div>
            <div className="item-list">
              <div>Monday - Friday 10am - 5pm</div>
              <div>Sat 10am - 4pm West Africa Time</div>
              <div>Contact Us</div>
              <div>Phone</div>
              <div>+234 07025005554</div>
            </div>
          </StyledSection>

          <StyledSection>
            <div>Customer Care</div>
            <div className="item-list">
              <div>Login/Register</div>
              <div>FAQs</div>
              <div>Size Guide</div>
              <div>Privacy Policy</div>
              <div>Return Policy</div>
              <div>Terms & Conditions</div>
            </div>
          </StyledSection>

          <StyledSection>
            <div>Useful Links</div>
            <div className="item-list">
              <div>About Us</div>
              <div>Our Collection</div>
              <div>Gift Cards</div>
              <div>Blog</div>
            </div>
          </StyledSection>

          <StyledSection>
            <div>Follow Us</div>
            <div className="item-list flex gap-4">
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
            </div>
          </StyledSection>
        </div>
        <div className="text-center">
          &copy; {dayjs().format('YYYY')}, Forever Solemates
        </div>
      </div>
    </div>
  );
}

const StyledSection = styled.div`
  max-width: 312px;
  width: 100%;

  & .item-list {
    margin: 20px 0px;
    font-size: 14px;
    font-weight: 400;
  }

  & div {
    width: 100%;
  }
`;
