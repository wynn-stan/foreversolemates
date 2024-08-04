import { CartItem } from '../models';

export const getFormattedCartData = ({
  cartItems,
  shipping_cost = 0,
  custom_message_cost = 0,
}: {
  shipping_cost?: number;
  cartItems: Partial<CartItem>[];
  custom_message_cost?: number;
}) => {
  //variables - constant tax
  const tax_percent = 0;

  //variables - subtotal
  const subtotal = cartItems.reduce(
    (total, currValue) =>
      total +
      (currValue?.final_price || currValue?.initial_price || 0) *
        (currValue?.selected_quantity || 1),
    0
  );

  //variables - add just id to products
  const formattedProducts = cartItems?.map((item) => ({
    ...item,
    id: item?._id,
    selected_size: item?.selected_size ? item?.selected_size : 'DEFAULT',
  }));

  //variables - tax
  const tax_amount = (tax_percent / 100) * subtotal;

  //variables - total
  const total = subtotal + tax_amount + shipping_cost + custom_message_cost;

  //variables
  const getAllProductsCombined = cartItems
    .map(
      (item, index) =>
        `[Name:${item.product_name}-Size:${item.selected_size}-Color:${item.selected_color}-Quantity:${item.selected_quantity}-ProductId:${item._id}]`
    )
    .join(',');

  //variables - items to pass to view on payment dashboard
  const dashboard_display = (() => {
    return cartItems.map((item, index) => ({
      display_name: 'Product Names',
      variable_name: 'product_names',
      value: getAllProductsCombined,
    }));
  })();

  const details = {
    subtotal,
    tax_amount,
    total,
    products_bought: formattedProducts,
    custom_fields: dashboard_display,
    shipping_cost,
    custom_message_cost,
  };

  return details;
};
