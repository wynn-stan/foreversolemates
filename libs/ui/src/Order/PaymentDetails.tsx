import clsx from 'clsx';
import Pill from '../Pill/Pill';
import { currencyFormatter } from '../Utils';

interface Props {
  id: number | string;
  reference: string;
  receipt_number: string;
  amount: number;
  gateway_respone: string;
  paid_at: string;
  channel: string;
  currency: string;
  fees: number;
  className?: string;
}

export default function PaymentDetails(props: Props) {
  //variables - list item
  const list = [
    { label: 'Reference', value: props.reference },
    { label: 'Channel', value: props.channel },
    { label: 'Fees', value: currencyFormatter(props.fees) },
    { label: 'Paid at', value: props.paid_at },
  ];

  return (
    <div
      className={clsx('space-y-4 bg-gray-5 p-4 rounded-md', props.className)}
    >
      <div className="text-lg font-medium">Payment Details</div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-gray-30">Amount</div>
            <div className="font-medium">{currencyFormatter(props.amount)}</div>
          </div>

          <Pill size="md" className="text-green-50 bg-green-10">
            Success
          </Pill>
        </div>

        {list.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <div className="text-gray-50">{item.label}</div>
            <div className="">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
