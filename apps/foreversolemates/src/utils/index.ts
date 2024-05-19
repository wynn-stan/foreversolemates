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

export * from './animations';
export * from './cart';
