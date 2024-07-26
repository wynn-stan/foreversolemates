'use client';

import useSWR from 'swr';
import { CartItem, ProductModel } from '../../models';
import { useStore } from '../../hooks';
import axios from 'axios';
import { useRef, useState } from 'react';
import { http } from '@foreversolemates/utils';

// interface Props {
//   isValidating: boolean;
//   setIsValidating: () => void;
// }

type TFormattedData = { [key: string]: ProductModel };
type Errors = {
  message: string;
  selected_size: any;
  selected_quantity: number;
  db_available_quantity: number;
}[];

interface Props {
  children: ({
    validateCheckoutItems,
  }: {
    validateCheckoutItems: () => Promise<void>;
  }) => React.ReactNode;
}

export default function CheckoutManager({ children }: Props) {
  /**
   * API
   */
  const { store, setStore } = useStore();
  const updatedData = useRef<TFormattedData>();
  const errors = useRef([] as Errors);

  /**
   * variables
   */
  const cartItems = store?.cart || [];

  /**
   * Function
   */
  const getCartProductsWithUniqueIDs = () => {
    return cartItems?.reduce((array, curr_prod) => {
      if (!curr_prod?._id) return array;
      if (array.includes(curr_prod._id)) return array;
      return [...array, curr_prod?._id];
    }, [] as string[]);
  };

  /**
   * Function
   */
  const formatData = (items: { data: ProductModel }[]) => {
    const formattedData = {} as TFormattedData;
    items.map((data) => {
      const product_info = data?.data;
      formattedData[product_info._id] = product_info;
    });
    updatedData.current = formattedData;
  };

  /**
   * function
   */
  const raiseErrorsIfProductsMismatch = () => {
    cartItems?.map((cartItem) => {
      // the db data of the current cart item
      const updatedDataItem = updatedData.current?.[`${cartItem._id}`];
      // if these values don't exist, which they will, don't proceed (typescript safety what not)
      if (!cartItem || !cartItem.selected_quantity) return;

      //if the current product has attached sizes/variants
      if (cartItem.available_sizes_and_units?.length) {
        // get the selected size and available units of the db data relating to this cart item
        const updatedDBSizeUnit =
          updatedDataItem?.available_sizes_and_units.find((size_unit) => {
            return size_unit.size === cartItem.selected_size;
          });

        if (
          cartItem.selected_quantity > (updatedDBSizeUnit?.available_units || 0)
        )
          errors.current.push({
            db_available_quantity: updatedDBSizeUnit?.available_units || 0,
            message: 'error again',
            selected_quantity: cartItem.selected_quantity,
            selected_size: updatedDBSizeUnit?.size,
          });
      } else {
        if (
          cartItem.selected_quantity >
          (updatedDataItem?.total_available_units || 0)
        )
          errors.current.push({
            db_available_quantity: updatedDataItem?.total_available_units || 0,
            message: 'error again',
            selected_quantity: cartItem.selected_quantity,
            selected_size: undefined,
          });
      }
    });
  };

  /**
   * Function
   */
  const validateCheckoutItems = async () => {
    const unique_products = getCartProductsWithUniqueIDs();

    await Promise.all(
      unique_products.map((id) => {
        return http.get<never, { data: ProductModel }>(`/product/${id}`);
      })
    )
      .then((items) => {
        formatData(items);
      })
      .catch(() => {
        console.log('Error getting product data');
      });

    raiseErrorsIfProductsMismatch();

    if (errors.current.length) throw { errors };
  };

  return <>{children({ validateCheckoutItems })}</>;
}
