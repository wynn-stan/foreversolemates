const routes = {
  home: {
    index: '/',
  },
  cart: {
    index: '/cart',
    checkout: {
      index: '/cart/checkout',
    },
  },

  shop: {
    all: {
      index: '/shop/all',
    },
    collection: {
      index: '/shop/collection/[id]',
    },
    product: {
      index: '/shop/product/[id]',
    },
  },
};

export default routes;
