import { useWidth } from '@foreversolemates/utils';
import { motion } from 'framer-motion';

import LocalProductCard from '../../components/LocalProductCard/LocalProductCard';
import Cover from './Explore/Cover';
import Header from './Explore/Header';
import { ArrowRightIcon } from 'lucide-react';
import clsx from 'clsx';

export default function Explore() {
  //hooks
  const width = useWidth() || 0;

  //variables
  const product_length = (() => {
    if (width > 768) return 4;
    if (width > 648) return 3;

    return 2;
  })();

  return (
    <div>
      <Header title="Explore Taj" />
      <div className="flex justify-center gap-6 relative">
        {/* <Cover imgSrc="/assets/all-collections.png" onClick={() => {}} /> */}
        {Array.from({ length: product_length }, (_, i) => (
          <LocalProductCard.Compact
            key={i}
            details={{
              _id: '',
              alert: 0,
              available_colors: [''],
              available_sizes: [30],
              available_units: 20,
              collection_id: '',
              description: '',
              createdOn: '',
              discount: 0,
              final_price: 0,
              images: ['/assets/all-collections.png'],
              initial_price: 0,
              product_name: 'Gravity Falls',
              status: '',
            }}
          />
        ))}

        {/* <motion.div
          whileHover={{
            backgroundColor: '#262626',
            color: 'white',
            width: '100px',
          }}
          className={clsx(
            ' px-4 py-3 flex justify-center border border-black',
            'h-fit',
            'absolute my-auto top-0 bottom-0 right-0',
            'cursor-pointer'
          )}
        >
          <div className="mx-auto flex gap-2 w-full overflow-hidden">
            <div>
              <ArrowRightIcon />
            </div>
            <div>Explore</div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
