import { CartItem } from '../models';

export const getFormattedCartData = ({
  cartItems,
}: {
  cartItems: Partial<CartItem>[];
}) => {
  //variables - constant tax
  const taxPercent = 0;

  //variables - subtotal
  const subtotal = cartItems.reduce(
    (total, currValue) =>
      total +
      (currValue?.final_price || currValue?.initial_price || 0) *
        (currValue?.selectedQuantity || 1),
    0
  );

  //variables - tax
  const taxAmount = (taxPercent / 100) * subtotal;

  //variables - total
  const totalAmount = subtotal + taxAmount;

  //variables
  const getAllProductsCombined = cartItems
    .map(
      (item, index) =>
        `[Name:${item.product_name}-Size:${item.selectedSize}-Color:${item.selectedColor}-Quantity:${item.selectedQuantity}-ProductId:${item._id}]`
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
    taxAmount,
    totalAmount,
    items: cartItems,
    custom_fields: dashboard_display,
  };

  return details;
};
