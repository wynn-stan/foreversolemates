import { motion } from 'framer-motion';

import { Props } from './Animated';

export default function FadeIn({ children, className, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
