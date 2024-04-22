import { HTMLAttributes } from 'react';
import Pill from '../../Pill/Pill';

interface Props {
  sizes: number[];
  onClick?: (size: number) => void;
  checkedSize?: number;
}

export default function SizeOptions({ sizes, onClick, checkedSize }: Props) {
  return (
    <div className="space-y-2">
      <div>Available sizes</div>
      <div className="flex gap-3">
        {sizes.map((size, index) => (
          <Pill
            key={index}
            checked={checkedSize === size}
            onClick={() => onClick?.(size)}
          >
            {size}
          </Pill>
        ))}
      </div>
    </div>
  );
}
