import { HTMLAttributes } from 'react';
import Pill from '../../Pill/Pill';
import { ProductModel } from '../../models';
import { FootprintsIcon, LockKeyholeIcon } from 'lucide-react';

type Option = { size: number | string; available_units: number };

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
            withoutIcon
            size="sm"
            key={index}
            checked={checkedSize === item.size}
            onClick={() => onClick?.(item)}
          >
            <div className="flex gap-1 items-center justify-center">
              <div>
                {item.available_units >= 1 ? (
                  <FootprintsIcon size={16} />
                ) : (
                  <LockKeyholeIcon size={16} />
                )}
              </div>
              <div>{item.size}</div>
            </div>
          </Pill>
        ))}
      </div>
    </div>
  );
}
