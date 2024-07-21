import { HTMLAttributes } from 'react';
import Pill from '../../Pill/Pill';
import { ProductModel } from '../../models';

type Option = { size: number; available_units: number };

interface Props {
  sizes: Option[];
  onClick?: (option: Option) => void;
  checkedSize?: number;
}

export default function SizeOptions({ sizes, onClick, checkedSize }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Available sizes</div>
      <div className="flex gap-3 flex-wrap">
        {sizes.map((item, index) => (
          <Pill
            size="sm"
            key={index}
            checked={checkedSize === item.size}
            onClick={() => onClick?.(item)}
          >
            {item.size}
          </Pill>
        ))}
      </div>
    </div>
  );
}
