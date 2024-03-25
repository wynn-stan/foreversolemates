'use client';

// import { toast } from 'react-toastify';
// import showdown from 'showdown';

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

// export const converter = new showdown.Converter({
//   openLinksInNewWindow: true,
//   simpleLineBreaks: true,
// });

export const currencyFormatter = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const fullname = ({
  first_name,
  last_name,
  email,
}: {
  first_name: string;
  last_name: string;
  email: string;
}) => {
  return [first_name, last_name].join(' ').trim() || email || '-';
};

// export const copyToClipboard = (text: string): void => {
//   navigator.clipboard.writeText(text);
//   toast.success('Copied to clipboard');
// };

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
