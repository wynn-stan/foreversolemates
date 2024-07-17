export const getFinalPrice = (initial: number, discount: number) => {
  return initial - initial * (discount / 100);
};
