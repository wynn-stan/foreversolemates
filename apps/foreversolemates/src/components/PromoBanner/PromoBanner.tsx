import styled from 'styled-components';

export default function PromoBanner() {
  return (
    <div>
      <div className="h-[500px] flex justify-between">
        <div className="h-full w-full blur-lg">
          <StyledLeftImage src="/assets/images/homepage/promo-3.jpg" />
        </div>
        <StyledImage src="/assets/images/homepage/promo-3.jpg" />
      </div>
    </div>
  );
}

const StyledImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: cover;
  object-position: center;
`;

const StyledLeftImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;
