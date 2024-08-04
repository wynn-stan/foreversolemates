'use client';

import React, { useContext } from 'react';

import { StoreContext, StoreInterface } from '../contexts/store';
import { ProductModel } from '../models';
import { toast } from 'react-toastify';

interface ReducerProps {
  id: string;
  size?: number | string;
  quantity?: number;
}

interface ActionProps {
  store: Partial<StoreInterface>;
  setStore: React.Dispatch<React.SetStateAction<Partial<StoreInterface>>>;
}

export const useStore = () => {
  const { setStore, store } = useContext(StoreContext);
  const cart = store?.cart || [];

  /**
 * • Get cart item
• set/update cart item
• remove cart item 
• add cart item
 */

  const getCartItem = ({ id, size }: ReducerProps) => {
    const cartItemIndex = cart.findIndex((item, index) => {
      const IDCondition = item._id === id;
      const SizeCondition = size ? item?.selected_size === size : true;

      if (IDCondition && SizeCondition) {
        return true;
      }

      return false;
    });

    if (cartItemIndex !== -1) {
      const cartItem = cart[cartItemIndex];
      return { cartItemIndex, cartItem };
    } else {
      return {
        cartItem: undefined,
        cartItemIndex: undefined,
      };
    }
  };

  const addCartItem = ({
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

    // If no item in cart
    if (!store?.cart) {
      createNewCartItem();
      return;
    }

    //  find out if the cart item is already in cart
    const { cartItem, cartItemIndex } = getCartItem({
      id: details._id,
      size: selected_size,
    });

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
        toast.error('Error in adding item');
        // setErrorDetails({
        //   available_units,
        //   selected_size: selected_size || 0,
        //   new_total,
        //   items_in_cart: cartItem?.selected_quantity || 0,
        // });
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
  };

  const updateCartItemQuantity = ({ id, size, quantity }: ReducerProps) => {
    const { cartItem, cartItemIndex } = getCartItem({ id, size });
    if (cartItemIndex || cartItemIndex === 0) {
      const newCart = cart.map((item, index) => {
        if (index === cartItemIndex)
          return { ...item, selected_quantity: quantity };
        return item;
      });
      setStore((store) => ({
        ...store,
        cart: newCart,
      }));
    }
  };

  const removeCartItem = ({ id, size }: ReducerProps) => {
    const { cartItem, cartItemIndex } = getCartItem({ id, size });

    if (cartItemIndex || cartItemIndex === 0) {
      const newCart = cart.filter((item, index) => index !== cartItemIndex);
      setStore((store) => ({
        ...store,
        cart: newCart,
      }));
    }
  };

  return {
    store,
    setStore,
    actions: {
      removeCartItem,
      getCartItem,
      updateCartItemQuantity,
    },
  };
};

export default useStore;
