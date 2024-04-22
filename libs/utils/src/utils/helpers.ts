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

export const currencyFormatter = (amount: number, currency = 'GHS') => {
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

export const getFilesFromImageUrls = async (urls: string[]) => {
  //variables - get filenames for each url
  const filenames = (() => {
    const list = urls?.map((url) => {
      const all_list = url.split('/');
      return all_list[all_list.length - 1];
    });
    return list || [];
  })();

  //store all request
  const fetch_requests = urls.map((item) =>
    fetch(item).then((res) => res.blob())
  );

  //getting the files after all requests are made
  const image_files = await Promise.all(fetch_requests).then((blobs) => {
    //create a file for each blob
    return blobs.map((blob, index) => {
      //get the file type
      const file_type = (() => {
        const list = filenames?.[index]?.split('.');
        return list[list.length - 1];
      })();

      //create the file
      const file = new File([blob], filenames?.[index], {
        type: file_type,
      });

      //end
      return file;
    });
  });

  return image_files;
};
