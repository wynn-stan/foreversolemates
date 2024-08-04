'use client';

import { Button } from '@fsm/ui';
import { ProductModel } from '../../models';
import useStore from '../useStore';
import useGetCartItem from './useGetCartItem';
import { useState } from 'react';

interface ReducerProps {
  id: string;
  size?: number | string;
}

const useAddCartItem = ({
  details,
  selected_color,
  selected_quantity = 0,
  selected_size,
}: {
  details: ProductModel;
  selected_size?: number;
  selected_quantity?: number;
  selected_color?: string;
}) => {
  /**
   * Hooks
   */
  const { store, setStore } = useStore();
  const cart = store?.cart || [];

  /**
   * State
   */
  const [errorDetails, setErrorDetails] = useState({
    available_units: 0,
    selected_size: 0,
    new_total: 0,
    items_in_cart: 0,
  });

  const createNewCartItem = () => {
    setStore((store) => {
      return {
        ...store,
        cart: [
          {
            ...details,
            selected_size: selected_size || undefined,
            selected_quantity: selected_quantity,
            selected_color: selected_color,
          },
          ...(store?.cart || []),
        ],
      };
    });
  };

  //  find out if the cart item is already in cart
  const { cartItem, cartItemIndex } = useGetCartItem({
    id: details._id,
    size: selected_size,
  });

  // If no item in cart
  if (!store?.cart) {
    createNewCartItem();
    return;
  }

  if (cartItem) {
    const new_total = (cartItem?.selected_quantity || 0) + selected_quantity;
    const cartItemSizeAndUnits = cartItem.available_sizes_and_units?.find(
      (item) => {
        return item.size === selected_size;
      }
    );
    const available_units = details?.available_sizes_and_units?.length
      ? cartItemSizeAndUnits?.available_units || 0
      : cartItem?.total_available_units || 0;

    if (new_total > available_units) {
      setErrorDetails({
        available_units,
        selected_size: selected_size || 0,
        new_total,
        items_in_cart: cartItem?.selected_quantity || 0,
      });
    } else {
      const new_cart = cart.map((item, index) => {
        if (index === cartItemIndex)
          return { ...item, selected_quantity: new_total };
        return item;
      });
      setStore((store) => ({ ...store, cart: new_cart }));
    }
  } else {
    // item is not in cart;
    createNewCartItem();
  }

  return;
};
