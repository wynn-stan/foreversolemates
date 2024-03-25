import { helpers } from '@foreversolemates/utils';
import { Button } from '@fsm/ui';
import Link from 'next/link';
import styled from 'styled-components';

export default function ShopByCategory() {
  //variables
  const sectionItems = [
    {
      imgSrc: '/assets/images/homepage/mijo-coll.jpg',
      linkText: 'Mijo Collection',
    },
    {
      imgSrc: '/assets/images/homepage/taj.jpg',
      linkText: 'Taj Collection',
    },
    {
      imgSrc: '/assets/images/homepage/clean-products.jpeg',
      linkText: 'Footcare Products',
    },
  ];

  return (
    <StyledContainer className="space-y-6 w-full overflow-auto px-6">
      <div className="text-center text-lg">Shop By Category</div>
      <div className="flex justify-start md:justify-center gap-10 text-center ">
        {sectionItems.map((item, key) => (
          <SectionItem {...item} />
        ))}
      </div>
    </StyledContainer>
  );
}

function SectionItem({
  imgSrc,
  linkText,
}: {
  imgSrc: string;
  linkText: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="container">
        <StyledImage src={imgSrc} />
      </div>
      <Link href="#" className="link">
        <p
          style={{ transition: 'border 1s' }}
          className={helpers.classNames(
            'mx-auto text-center w-fit px-3 border-b border-gray-300 font-medium',
            'hover:w-full hover:border-black'
          )}
        >
          {linkText}
        </p>
      </Link>
    </div>
  );
}

const StyledContainer = styled.div`
  & .container {
    height: 312px;
    width: 182px;
    overflow: hidden;
  }
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;
