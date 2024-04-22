import Image from 'next/image';
import { ProductModel } from '../../models';
import { Button, Dropdown } from '@fsm/ui';
import { ChevronDown, EyeIcon } from 'lucide-react';
import { helpers } from '@foreversolemates/utils';

interface Props {
  details: ProductModel;
  onUpdate: (selectedProduct: ProductModel) => void;
  onDelete: (selectedProduct: ProductModel) => void;
  onPreview: (selectedProduct: ProductModel) => void;
}

export default function Compact({
  onDelete,
  onUpdate,
  details,
  onPreview,
}: Props) {
  //variables
  const initial_price = details.initial_price;
  const discounted_price = details.discount
    ? initial_price - initial_price * (details.discount / 100)
    : details.initial_price;

  return (
    <div className="space-y-4 max-w-[250px]">
      <div className="bg-gray-10 w-[250px] h-[250px]">
        <Image
          unoptimized
          className="w-full h-full object-cover"
          src={details.images[0]}
          alt="product_image"
          width={250}
          height={250}
        />
      </div>
      <div className="space-y-1">
        <div className="text-xl font-medium">{details.product_name}</div>

        <div className="flex gap-2 items-baseline">
          {helpers.currencyFormatter(discounted_price)}

          {details.discount ? (
            <div className="text-sm text-gray-30 line-through">
              {helpers.currencyFormatter(initial_price)}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => onPreview(details)}
          className="flex gap-2 !rounded-md"
          variant="outline-black"
        >
          <span>Preview</span>
          <EyeIcon size={20} />
        </Button>

        <Dropdown>
          <Dropdown.Toggle>
            <Button
              className="flex gap-2 !rounded-md"
              variant="outline-secondary"
            >
              <span>More</span>
              <ChevronDown size={20} />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onUpdate(details)}>
              Update product
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onDelete(details)}
              className="text-red-40"
            >
              Delete product
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
