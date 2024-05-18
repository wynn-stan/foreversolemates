import { Button } from '@fsm/ui';

interface Props {
  items: { final_price: number }[];
  taxPercent: number;
  onCheckout: () => void;
  onCancel: () => void;
  showActions?: boolean;
}

export default function Summary({
  items,
  taxPercent,
  onCancel,
  onCheckout,
  showActions = true,
}: Props) {
  //variables - subtotal
  const subtotal = items.reduce(
    (total, currValue) => total + currValue.final_price,
    0
  );

  //variables - tax
  const tax = (taxPercent / 100) * subtotal;

  //variables - total
  const total = subtotal + tax;

  //variables - disabled button
  const isValid = items.length;

  return (
    <div className="space-y-4">
      <div className=" text-lg font-medium underline text-center">
        Order Summary
      </div>

      {/* Subtotal */}
      <div className="space-y-4">
        <div className=" flex justify-between font-medium">
          <div>Subtotal</div>
          <div>GH₵{subtotal}</div>
        </div>

        {/* Tax */}
        <div className="text-sm text-gray-30 flex justify-between font-medium">
          <div>Tax</div>
          <div>GH₵{tax}</div>
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
