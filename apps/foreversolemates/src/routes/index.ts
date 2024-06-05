const routes = {
  login: '/login',
  signup: '/signup',

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
  track_my_order: {
    index: '/track-my-order',
  },
};

export default routes;
