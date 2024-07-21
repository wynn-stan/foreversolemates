import Image from 'next/image';
import { Button, Dropdown, ProductCard } from '@fsm/ui';
import { ChevronDown, EyeIcon } from 'lucide-react';
import { helpers, useWidth } from '@foreversolemates/utils';
import styled from 'styled-components';
import clsx from 'clsx';

import { ProductModel } from '../../models';

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

  //hooks - mobile
  const { width } = useWidth();
  const isMobile = width ? width <= 1024 : undefined;

  return (
    <ProductCard.Compact
      onClick={() => onUpdate(details)}
      details={{
        discount: details.discount,
        initial_price: details.initial_price,
        product_image: details.images?.[0],
        product_name: details.product_name,
        available_units: details.total_available_units,
      }}
      actions={
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx('flex gap-4', 'flex-col lg:flex-row')}
        >
          <Button
            onClick={() => onPreview(details)}
            className={clsx(
              'flex gap-2 !rounded-md',
              'py-2 px-2 text-sm',
              'lg:py-3 lg:px-2 lg:text-base',
              'hover:bg-gray-60 hover:text-white'
            )}
            variant="outline-tertiary"
          >
            <span>Preview</span>
            <EyeIcon size={isMobile ? 16 : 20} />
          </Button>

          <Dropdown>
            <Dropdown.Toggle className="w-full">
              <Button
                className={clsx(
                  'flex gap-2 !rounded-md',
                  'py-2 px-2 text-sm',
                  'lg:py-3 lg:px-2 lg:text-base',
                  'w-full'
                )}
                variant="outline-secondary"
              >
                <span>More</span>
                <ChevronDown size={isMobile ? 16 : 20} />
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
      }
    />
  );
}

const StyledCard = styled.div`
  @media (max-width: 768px) {
    .product-image {
      width: 150px;
      height: 150px;
    }

    .product-name {
      font-size: 16px;
    }

    .discounted-price {
      font-size: 14px;
    }

    .initial-price {
      font-size: 12px;
    }

    svg {
    }
  }
`;
