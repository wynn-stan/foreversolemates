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
}

export default function Summary({
  items,
  onCancel,
  onCheckout,
  showActions = true,
  showList = false,
}: Props) {
  //variables - disabled button
  const isValid = items.length;

  //variables - cart summary
  const cartSummary = getFormattedCartData({ cartItems: items });

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

        {/* Tax */}
        <div className="text-sm text-gray-30 flex justify-between font-medium">
          <div>Tax</div>
          <div>GH₵{cartSummary.taxAmount}</div>
        </div>

        <div className="min-w-[5px] w-full h-[3px] bg-gray-5" />

        {/* Total */}
        <div className=" flex justify-between font-medium">
          <div>Total</div>
          <div>GH₵{cartSummary.totalAmount}</div>
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
