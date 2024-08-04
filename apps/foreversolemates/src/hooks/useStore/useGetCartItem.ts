import useStore from '../useStore';

interface ReducerProps {
  id: string;
  size?: number | string;
}

const useGetCartItem = ({ id, size }: ReducerProps) => {
  /**
   * Hooks
   */
  const { store, setStore } = useStore();
  const cart = store?.cart || [];

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

export default useGetCartItem;
