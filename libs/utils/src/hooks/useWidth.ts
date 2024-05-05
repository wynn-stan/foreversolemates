import { useState, useEffect } from 'react';

const useWidth = () => {
  /**
   * state
   */
  const [width, setWidth] = useState<number>(0);

  /**
   * function
   */
  const handleWidth = (get?: number | undefined | boolean): void | number => {
    if (get) {
      if (typeof window !== 'undefined') {
        return window.innerWidth;
      }
    } else {
      setWidth(window.innerWidth);
    }
  };

  /**
   * effect
   */
  useEffect(() => {
    window.addEventListener('resize', () => handleWidth());
    return () => {
      window.removeEventListener('resize', () => handleWidth());
    };
  });

  /*
   * variables
   */
  const props = {
    width,
    sm: width >= 640,
    md: width >= 768,
    lg: width >= 1024,
    xl: width >= 1280,
  };

  return width ? { ...props } : { width: handleWidth(true) || 0 };
};

export default useWidth;
