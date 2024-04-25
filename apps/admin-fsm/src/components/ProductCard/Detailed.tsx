import Image from 'next/image';
import { ProductModel } from '../../models';
import { Button, Dropdown, ProductCard } from '@fsm/ui';
import { ChevronDown, EyeIcon } from 'lucide-react';
import { helpers, useWidth } from '@foreversolemates/utils';
import styled from 'styled-components';
import clsx from 'clsx';

interface Props {
  details: ProductModel;
  onUpdate: (selectedProduct: ProductModel) => void;
  onDelete: (selectedProduct: ProductModel) => void;
  onPreview: (selectedProduct: ProductModel) => void;
}

export default function Detailed({
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
  const width = useWidth();
  const isMobile = width ? width <= 1024 : undefined;

  return (
    <div className="flex gap-4">
      <div
        className={clsx(
          'bg-gray-10 cursor-pointer ',
          'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'
        )}
      >
        <Image
          unoptimized
          className={clsx(
            'object-cover',
            'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'
          )}
          src={details.images[0]}
          alt="product_image"
          width={150}
          height={150}
        />
      </div>
      <div className="space-y-3 max-w-[420px] w-full 2xl:w-[420px]">
        <ProductCard.Details.StockIndicator
          available_units={details.available_units}
          low_stock_indicator={details.alert}
        />

        <div>
          <div className={clsx('font-medium truncate ', 'text-lg lg:text-xl')}>
            {details.product_name}
          </div>

          <ProductCard.Details.Price
            initial_price={details.initial_price}
            discount={details.discount}
          />
        </div>
        {/* 
        <div className="space-y-1">


          <div
            className={clsx(
              'flex gap-2 items-baseline',
              ' text-sm lg:text-base'
            )}
          >
            {helpers.currencyFormatter(discounted_price)}

            {details.discount ? (
              <div
                className={clsx(
                  'text-gray-30 line-through ',
                  'text-xs lg:text-sm'
                )}
              >
                {helpers.currencyFormatter(initial_price)}
              </div>
            ) : (
              ''
            )}
          </div>
        </div> */}

        <ProductCard.Details.Description
          withHeader={false}
          description={details.description}
        />

        {/* Actions */}
        <div className={clsx('flex gap-4 flex-wrap')}>
          <Button
            onClick={() => onPreview(details)}
            className={clsx(
              'flex gap-2 !rounded-md',
              'py-2 px-2 text-sm',
              'lg:py-3 lg:px-2 lg:text-base'
            )}
            variant="outline-black"
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
      </div>
    </div>
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
