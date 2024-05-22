import clsx from 'clsx';
import {
  CircleCheckIcon,
  PackageCheckIcon,
  PackageOpenIcon,
  ShieldXIcon,
  TruckIcon,
} from 'lucide-react';

interface Props {
  state:
    | 'in production'
    | 'ready for delivery'
    | 'out for delivery'
    | 'delivered'
    | 'order reversed';
}

export default function OrderStatus({ state }: Props) {
  //variables - styles
  const item = (() => {
    switch (state) {
      case 'in production':
        return {
          label: 'In-production',
          Icon: PackageOpenIcon,
          styles: 'text-[#1F2424] bg-[#E3E4E5]',
        };

      case 'ready for delivery':
        return {
          label: 'Ready for Delivery',
          Icon: PackageCheckIcon,
          styles: 'bg-[#EADCB9] text-[#713E0E]',
        };

      case 'out for delivery':
        return {
          label: 'Out for delivery',
          Icon: TruckIcon,
          styles: 'bg-[#FFD1B3] text-[#803300]',
        };

      case 'delivered':
        return {
          label: 'Delivered',
          Icon: CircleCheckIcon,
          styles: 'bg-[#B4DBC4] text-[#045223]',
        };

      case 'order reversed':
        return {
          label: 'Order Reversed',
          Icon: ShieldXIcon,
          styles: 'bg-[#E2B8B5] text-[#5F0C07]',
        };

      default:
        return {
          label: 'In-production',
          Icon: PackageOpenIcon,
          styles: 'text-[#1F2424] bg-[#E3E4E5]',
        };
    }
  })();

  return (
    <div
      className={clsx(
        'rounded-full px-3 py-2 font-medium flex gap-2 w-fit',
        item.styles
      )}
    >
      <div>{<item.Icon size={20} />}</div>
      <div>{item.label}</div>
    </div>
  );
}
