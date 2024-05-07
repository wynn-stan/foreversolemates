const routes = {
  home: {
    index: '/',
  },
  cart: {
    index: '/cart',
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
