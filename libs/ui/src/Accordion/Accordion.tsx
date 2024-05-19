'use client';

import { Variants, motion, useCycle } from 'framer-motion';
import { HTMLAttributes, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  header: string;
}

export default function Dropdown({ children, header }: Props) {
  /**
   * State
   */
  const [toggle, setToggle] = useState(false);

  /**
   * Hooks
   */
  const [dropdownAnimation, cycleDropdownAnimation] = useCycle(
    'hidden',
    'visible'
  );
  const [chevronAnimation, cycleChevronAnimation] = useCycle('close', 'open');

  /**
   * Animation Variants
   */
  const dropdownVariants: Variants = {
    hidden: {
      height: 0,
    },
    visible: {
      height: 'fit-content',
    },
  };

  const chevronVariants: Variants = {
    open: {
      rotate: 180,
    },
    close: {
      rotate: 0,
    },
  };

  return (
    <div>
      <div
        onClick={() => {
          setToggle(!toggle);
          cycleChevronAnimation();
          cycleDropdownAnimation();
        }}
        className="flex py-4 px-2 justify-between border border-gray-10 cursor-pointer"
      >
        <div>{header}</div>
        <motion.div
          //   key={String(toggle)}
          variants={chevronVariants}
          animate={chevronAnimation}
          transition={{ type: 'spring', damping: 10 }}
        >
          <ChevronDownIcon size={20} />
        </motion.div>
      </div>
      <motion.div
        layout
        // key={String(toggle)}
        className="border border-gray-5 overflow-hidden"
        variants={dropdownVariants}
        initial="hidden"
        animate={dropdownAnimation}
      >
        {children}
      </motion.div>
    </div>
  );
}
