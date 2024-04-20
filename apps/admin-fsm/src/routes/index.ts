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
