import { HTMLAttributes } from 'react';
import Pill from '../../Pill/Pill';

interface Props {
  colors: string[];
  onClick?: (color: string) => void;
  checkedColor?: string;
}

export default function ColorOptions({ colors, onClick, checkedColor }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Available colors</div>
      <div className="flex gap-3 flex-wrap">
        {colors.map((color, index) => (
          <Pill
            size="sm"
            key={index}
            checked={checkedColor === color}
            onClick={() => onClick?.(color)}
          >
            {color}
          </Pill>
        ))}
      </div>
    </div>
  );
}
