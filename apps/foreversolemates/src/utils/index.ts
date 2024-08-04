import queryString from 'query-string';

interface GetStockSummaryProps {
  low_stock_indicator: number;
  available_units: number;
}

export function getStockSummary({
  available_units,
  low_stock_indicator,
}: GetStockSummaryProps) {
  //variables
  const below_stock = low_stock_indicator >= available_units;
  const out_of_stock = available_units <= 0;

  const message = (() => {
    if (out_of_stock)
      return {
        message: 'Out of stock',
        colorClassName: 'text-red-40',
      };

    if (below_stock)
      return {
        message: `Only ${available_units} left`,
        colorClassName: 'text-red-40',
      };

    return {
      message: 'In-Stock',
      colorClassName: 'text-[#13AA3B]',
    };
  })();

  return message;
}

export const getPriceAndDiscount = ({
  discount,
  initial_price,
}: {
  discount: number;
  initial_price: number;
}) => {
  //variables
  const final_price = discount
    ? initial_price - initial_price * (discount / 100)
    : initial_price;

  return {
    initial_price,
    discount,
    final_price,
  };
};

export const generateID = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 5);
  return `FSM-${timestamp}-${randomPart}`;
};

export const getAvatarImage = ({
  name,
  radius,
  size,
}: {
  name?: string;
  radius?: number;
  size?: number;
}) =>
  `https://api.dicebear.com/8.x/initials/svg?${queryString.stringify({
    seed: name,
    radius,
    size,
  })}`;

export const formatAvailableSizesAndUnits = (
  available_sizes_and_units: { size: string; available_units: number }[],
  withInt?: boolean
) => {
  return available_sizes_and_units.filter(
    (item, index) => item.size !== 'DEFAULT'
  );
  // .map((item, index) => ({
  //   size: parseInt(item.size),
  //   available_units: item.available_units,
  // }));
};

export * from './animations';
export * from './cart';
