const routes = {
  login: '/login',
  signup: '/signup',
  about_us: '/about-us',

  policies: {
    privacy_policy: '/policies/privacy-policy',
    terms_of_service: '/policies/terms-of-service',
    returns_and_warranties: '/policies/returns-and-warranties',
    payments_and_deliveries: '/policies/payments-and-deliveries',
  },

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
