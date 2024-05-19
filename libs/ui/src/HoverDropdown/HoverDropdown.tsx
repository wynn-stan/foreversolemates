'use client';

import clsx from 'clsx';
import { AnimatePresence, Variants, motion, useCycle } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { HTMLAttributes, useState } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  href?: string;
  label: string;
  labelClassName?: string;
}

export default function NavbarDropdown({
  children,
  href,
  label,
  labelClassName,
}: Props) {
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
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
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
      <motion.div
        key={String(toggle)}
        onHoverEnd={() => setToggle(false)}
        onHoverStart={() => setToggle(true)}
        // onHoverEnd={() => cycleDropdownAnimation()}
        className={clsx(
          'relative',
          'px-2 py-2 flex gap-2 items-center',
          'cursor-pointer transition hover:bg-gray-60 hover:text-gray-5 rounded-md',
          labelClassName
        )}
      >
        <Link
          href={href || ''}
          onClick={
            !href
              ? () => {
                  cycleDropdownAnimation();
                }
              : undefined
          }
        >
          {label}
        </Link>
        {children && (
          <motion.div
            //   key={String(toggle)}
            variants={chevronVariants}
            animate={chevronAnimation}
            transition={{ type: 'spring', damping: 10 }}
          >
            <ChevronDownIcon size={16} />
          </motion.div>
        )}

        {children && (
          <AnimatePresence>
            <motion.div
              key={String(toggle)}
              variants={dropdownVariants}
              initial="hidden"
              animate={toggle ? 'visible' : 'hidden'}
              exit="hidden"
              className={clsx(
                'z-10 absolute top-[100%] right-0 py-2',
                toggle ? 'block' : 'hidden'
              )}
            >
              <div
                onClick={() => setToggle(false)}
                className={clsx(
                  'px-2 py-4 rounded-md ',
                  'bg-white shadow-[2px_2px_8px_0px_rgba(0,0,0,0.9)]',
                  'text-black'
                )}
              >
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
