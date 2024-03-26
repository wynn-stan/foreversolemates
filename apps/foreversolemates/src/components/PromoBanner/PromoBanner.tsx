import { helpers } from '@foreversolemates/utils';
import { Button } from '@fsm/ui';
import styled from 'styled-components';

export default function PromoBanner() {
  return (
    <div
      className={helpers.classNames(
        'w-full flex justify-center',
        '',
        'py-0 px-4'
      )}
    >
      {/* Card */}
      <div
        className={helpers.classNames(
          'h-[500px] w-full max-w-[1320px] flex shadow-md ',
          'border border-gray-300',
          'bg-white'
        )}
      >
        <div
          className={helpers.classNames(
            'flex-grow flex flex-col gap-6 justify-center items-center',
            'max-w-[55%] p-6'
          )}
        >
          <div className="text-4xl font-medium text-gray-800 max-w-[600px] text-center">
            Upgrade Your Shoe Care Routine: New Products Just In!
          </div>
          <div className="text-base text-center text-gray-700">
            Level up your shoe game with our latest arrivals! We've got
            everything you need to keep your footwear looking and smelling
            fresh.
          </div>
          <Button
            className={helpers.classNames(
              'w-fit !px-12 py-3 border !border-black',
              'hover:bg-black hover:text-white'
            )}
          >
            Explore
          </Button>
        </div>

        <StyledImage
          className="flex-grow"
          src="/assets/images/homepage/clean-products.jpeg"
        />
      </div>

      {/* <div className="h-[500px] flex items-center gap-16 justify-center bg-gray-300 p-8">
        
        
        <div className="h-full w-full blur-lg">
          <StyledLeftImage src="/assets/images/homepage/promo-3.jpg" />
        </div> 
        <div className="flex flex-col gap-4">
          <div className="text-5xl">Re-opening Soon!</div>
          <div className="text-base">
            Yes you heard that right. Just a few more days till we reopen
          </div>
          <Button className="w-fit px-12 py-3 border border-black">
            Explore
          </Button>
        </div>
        <StyledImage
          className="rounded-full"
          src="/assets/images/homepage/promo-1.jpg"
        />
      </div> */}
      {/* <StyledBackground className="h-[500px] w-full">
        <p className="text-2xl">hi</p>
      </StyledBackground> */}
    </div>
  );
}

const StyledBackground = styled.div`
  background-image: url('/assets/images/homepage/promo-1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* Add the blur effect */
  filter: blur(0px);
  -webkit-filter: blur(0px);
`;

const StyledImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: cover;
  object-position: center;
`;

const StyledLeftImage = styled.img`
  height: 100%;
  width: 100%;
  opacity: 0.3;
  object-fit: cover;
  object-position: center;
`;
