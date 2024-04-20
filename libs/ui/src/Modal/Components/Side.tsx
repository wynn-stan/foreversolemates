import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as Restart from '@restart/ui';
import { X } from 'lucide-react';
import clsx from 'clsx';

export interface SideProps {
  show: boolean;
  header?: string;
  onHide?: () => void;
  direction?: 'left' | 'right';
  children: any;
}

export function Side({
  show,
  onHide,
  header,
  children,
  direction = 'right',
}: SideProps) {
  /**
   * variables
   */
  const val = direction === 'left' ? -1 : 1;

  /**
   * state
   */
  const [showModal, setShowModal] = useState(false);

  /**
   * effect
   */
  useEffect(() => {
    if (show) {
      setShowModal(true);
    }

    if (!show) {
      setTimeout(() => setShowModal(false), 300);
    }
  }, [show]);

  return (
    <Restart.Modal
      show={showModal}
      enforceFocus={false}
      aria-labelledby="modal"
    >
      <>
        <motion.div
          exit="closed"
          animate={show ? 'open' : 'closed'}
          initial="closed"
          variants={{
            closed: { x: 520 * val },
            open: { x: 0 },
          }}
          transition={{ type: 'tween' }}
          className={clsx(
            'bg-white',
            'flex flex-col',
            'h-full w-full max-w-[520px]',
            'fixed top-0 overflow-y-auto z-[1050]',
            direction === 'left' ? 'left-0' : 'right-0'
          )}
        >
          {/* header
           */}
          {header && (
            <div
              className={clsx(
                'border-b border-gray-20',
                'px-6 py-4 md:px-10 md:py-6',
                'sticky top-0 bg-white z-[1]'
              )}
            >
              <div className="flex items-center justify-center relative">
                <button onClick={() => onHide?.()} className="absolute left-0">
                  <X />
                </button>
                <p className="text-lg font-semibold">{header}</p>
              </div>
            </div>
          )}

          {/* children */}
          {children}
        </motion.div>

        <motion.div
          exit="closed"
          initial="closed"
          onClick={() => onHide?.()}
          animate={show ? 'open' : 'closed'}
          variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
          className={clsx(
            'h-full w-full',
            'bg-black/[0.15]',
            'fixed top-0 left-0 z-[1040]'
          )}
        />
      </>
    </Restart.Modal>
  );
}

export default Side;
