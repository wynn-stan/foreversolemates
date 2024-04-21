'use client';

import clsx from 'clsx';
import styled from 'styled-components';

export default function LoadingCard() {
  return (
    <div
      className={clsx(
        'w-[550px] h-[255px]  rounded-md',
        'bg-[#f0f0f0]',
        'px-8 py-6',
        'flex gap-6 items-center'
      )}
    >
      <div className="space-y-3">
        {Array.from({ length: 4 }, () => (
          <div className={clsx('w-[250px] h-7 bg-gray-20 animate-pulse')}></div>
        ))}
      </div>
      <div
        className={clsx('bg-gray-20 animate-pulse h-[200px] w-[200px]')}
      ></div>
    </div>
  );
}

const StyledCard = styled.div`
  width: 550px;
  height: 255px;
  background-color: #f0f0f0;
`;
