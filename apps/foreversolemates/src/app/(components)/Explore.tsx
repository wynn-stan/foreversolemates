import { useWidth } from '@foreversolemates/utils';
import { motion } from 'framer-motion';

import { LocalProductCard } from '../../components';
import Cover from './Explore/Cover';
import Header from './Explore/Header';
import { ArrowRightIcon } from 'lucide-react';
import clsx from 'clsx';
import { ProductModel } from '../../models';

interface Props {
  header: string;
  products: ProductModel[];
}

export default function Explore({ header, products }: Props) {
  //hooks
  const { width } = useWidth();

  //variables
  const product_length = (() => {
    if (width > 768) return 4;
    if (width > 648) return 3;

    return 2;
  })();

  return (
    <div>
      <Header title={header} />
      <div className="flex flex-wrap justify-center gap-6 relative ">
        {Array.from({ length: product_length }, (_, i) =>
          products?.[i] ? (
            <LocalProductCard.Compact key={i} details={products[i]} />
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}
