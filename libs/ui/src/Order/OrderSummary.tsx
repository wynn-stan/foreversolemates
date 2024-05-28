import List from './OrderSummary/List';
import { CartItem } from '../models';
import { Button, Pill } from '../index';
import clsx from 'clsx';

interface Props {
  items: Partial<CartItem>[];
  subtotal: number;
  tax_amount: number;
  total: number;
  onCheckout?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
  showList?: boolean;
  status?:
    | 'in production'
    | 'ready for delivery'
    | 'out for delivery'
    | 'order reversed'
    | 'delivered';
  className?: string;
  order_reference?: string;
  shipping_cost?: number;
}

export default function Summary({
  order_reference,
  status,
  subtotal,
  total,
  tax_amount,
  items,
  onCancel,
  onCheckout,
  showActions = true,
  showList = false,
  className,
  shipping_cost,
}: Props) {
  //variables - disabled button
  const isValid = items.length;

  return (
    <div className={clsx('space-y-4', className)}>
      <div>
        {!status ? (
          <div className=" text-lg font-medium underline text-center">
            Order Summary
          </div>
        ) : (
          ''
        )}

        {status ? (
          <div className="flex justify-between">
            <div className=" text-lg font-medium text-center">
              Order Summary
            </div>
            <Pill.OrderStatus state={status} />
          </div>
        ) : (
          ''
        )}
      </div>

      {order_reference ? (
        <div className="flex justify-between">
          <div className="text-gray-40">Order reference</div>
          <div className="font-medium text-[#004682]">{order_reference}</div>
        </div>
      ) : (
        ''
      )}

      {/* Item Lists */}
      {showList && <List items={items as CartItem[]} />}

      {/* Subtotal */}
      <div className="space-y-4">
        <div className=" flex justify-between font-medium">
          <div>Subtotal</div>
          <div>GH₵{subtotal}</div>
        </div>

        {/* Shipping Cost */}
        <div className="text-sm text-gray-60 flex justify-between font-medium">
          <div>Shipping </div>
          <div>{shipping_cost ? `GH₵${shipping_cost}` : '--'}</div>
        </div>

        {/* Tax */}
        <div className="text-sm text-gray-30 flex justify-between font-medium">
          <div>Tax</div>
          <div>GH₵{tax_amount}</div>
        </div>

        <div className="min-w-[5px] w-full h-[3px] bg-gray-5" />

        {/* Total */}
        <div className=" flex justify-between font-medium">
          <div>Total</div>
          <div>GH₵{total}</div>
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
