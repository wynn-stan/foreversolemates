import { Layers } from 'lucide-react';

interface Props {
  low_stock_indicator: number;
  available_units: number;
}

export default function StockIndicator({
  available_units,
  low_stock_indicator,
}: Props) {
  //variables
  const below_stock = low_stock_indicator >= available_units;
  const out_of_stock = available_units <= 0;

  return (
    <div className="flex items-center gap-2 font-medium text-sm">
      <Layers size={16} />
      {below_stock ? (
        <div className="text-red-40">{`Only ${available_units} left`}</div>
      ) : (
        <div className="text-[#13AA3B] font-medium">In-Stock</div>
      )}
    </div>
  );
}
