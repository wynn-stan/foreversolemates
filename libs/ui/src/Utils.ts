export const currencyFormatter = (amount: number, currency = 'GHS') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};
