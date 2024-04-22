import clsx from 'clsx';
import Images from './Details/Images';
import Price from './Details/Price';
import StockIndicator from './Details/StockIndicator';
import Description from './Details/Description';
import SizeOptions from './Details/SizeOptions';

interface ProductModel {
  _id: string;
  available_sizes: number[];
  images: string[];
  available_colors: string[];
  product_name: string;
  initial_price: number;
  discount: number;
  available_units: number;
  alert: number;
  description: string;
  status: string;
  collection_id: string;
  createdOn: string;
}

interface Props {
  details: ProductModel;
  onSizeClick: (index: number) => void;
  checkedSize?: number;
}

function Details({ checkedSize, onSizeClick, details }: Props) {
  return (
    <div className={clsx('flex flex-col md:flex-row gap-4')}>
      <Images urls={details.images} />
      <div className="space-y-3">
        <div className="">
          <div className="text-3xl tracking-tight font-medium">
            {details.product_name}
          </div>
          <Price
            initial_price={details.initial_price}
            discount={details.discount}
          />
        </div>
        <StockIndicator
          available_units={details.available_units}
          low_stock_indicator={details.alert}
        />
        <Description description={details.description} />
        <SizeOptions
          checkedSize={checkedSize}
          onClick={onSizeClick}
          sizes={details.available_sizes}
        />
      </div>
    </div>
  );
}

export default Object.assign(Details, { Price });
