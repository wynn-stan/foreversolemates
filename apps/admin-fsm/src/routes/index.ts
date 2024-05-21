const routes = {
  auth: {
    login: {
      index: '/auth/login',
    },
    register: {
      index: '/auth/register',
    },
  },

  store: {
    inventory: {
      index: '/store/inventory',
      all: {
        index: '/store/inventory/all',
      },
      collection: {
        index: '/store/inventory/collection/[id]',
      },
    },
    order_management: {
      index: '/store/order-management',
    },
    customer_management: {
      index: '/store/customer-management',
    },
  },

  system: {
    admin_users: {
      index: '/system/admin-users',
    },
  },
};

export default routes;
