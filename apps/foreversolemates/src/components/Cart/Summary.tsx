import { Button } from '@fsm/ui';

import { getFormattedCartData } from '../../utils/cart';
import { CartItem } from '../../models';
import List from './Summary/List';

interface Props {
  items: Partial<CartItem>[];
  onCheckout: () => void;
  onCancel: () => void;
  showActions?: boolean;
  showList?: boolean;
  shipping_cost?: number;
  custom_message_cost?: number;
}

export default function Summary({
  items,
  onCancel,
  onCheckout,
  showActions = true,
  showList = false,
  shipping_cost,
  custom_message_cost,
}: Props) {
  //variables - disabled button
  const isValid = items.length;

  //variables - cart summary
  const cartSummary = getFormattedCartData({
    cartItems: items,
    shipping_cost,
    custom_message_cost,
  });

  return (
    <div className="space-y-4">
      <div className=" text-lg font-medium underline text-center">
        Order Summary
      </div>

      {/* Item Lists */}
      {showList && <List items={items as CartItem[]} />}

      {/* Subtotal */}
      <div className="space-y-4">
        <div className=" flex justify-between font-medium">
          <div>Subtotal</div>
          <div>GH₵{cartSummary.subtotal}</div>
        </div>

        {/* Custom Message Cost */}
        <div className="text-sm text-gray-60 flex justify-between font-medium">
          <div>Packaging Message </div>
          <div>{custom_message_cost ? `GH₵${custom_message_cost}` : '--'}</div>
        </div>

        {/* Shipping Cost */}
        <div className="text-sm text-gray-60 flex justify-between font-medium">
          <div>Shipping </div>
          <div>{shipping_cost ? `GH₵${shipping_cost}` : '--'}</div>
        </div>

        {/* Tax */}
        <div className="text-sm text-gray-30 flex justify-between font-medium">
          <div>Tax</div>
          <div>GH₵{cartSummary.tax_amount}</div>
        </div>

        <div className="min-w-[5px] w-full h-[3px] bg-gray-5" />

        {/* Total */}
        <div className=" flex justify-between font-medium">
          <div>Total</div>
          <div>GH₵{cartSummary.total}</div>
        </div>
      </div>

      {showActions && (
        <div className="space-y-2 pt-6">
          <Button disabled={!isValid} onClick={onCheckout} className="w-full">
            Proceed to checkout
          </Button>
          <Button onClick={onCancel} className="w-full" variant="outline-black">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
