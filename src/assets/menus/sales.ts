export const SalesList = {

  statusCode: 200,

  data: [
    {
      id: 1,
      parentMenu: 'Dashboard',
      icon: 'fa-cog',
      isActive: true,
      url: 'dashboard',
      submenuList: []
    },
    {
      id: 1,
      parentMenu: 'Center',
      icon: 'fa-building',
      isActive: true,
      url: 'center',
      submenuList: [
        {
          id: 0,
          menu: 'Center List',
          url: 'center-list',
          icon: 'fa-building',
          isActive: true,
        }
      ]
    },
    {
      id: 2,
      parentMenu: 'Product',
      icon: 'fa-list',
      isActive: true,
      url: 'product',
      submenuList: [
        {
          id: 1,
          menu: 'Product Details',
          url: 'product-details',
          icon: 'fa-building',
          isActive: true,
        },
      ]
    },
    {
      id: 1,
      parentMenu: 'Member',
      icon: 'fa-user',
      isActive: true,
      url: 'member',
      submenuList: [
        {
          id: 0,
          menu: 'Member List',
          url: 'member-list',
          icon: 'fa-users',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Member Contacts',
          url: 'member-contacts',
          icon: 'fa-phone',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Kyc Failed Members',
          url: 'kyc-failed-members',
          icon: 'fa-phone',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Validity Expiring',
          url: 'validity-expiring-members',
          icon: 'fa-check',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Membership',
          url: 'membership',
          icon: 'fa-check',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Membership History',
          url: 'membership-history',
          icon: 'fa-check',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Renew Membership',
          url: 'renew-membership',
          icon: 'fa-check',
          isActive: true,
        }
      ]
    },
    {
      id: 1,
      parentMenu: 'Order',
      icon: 'fa-pencil',
      isActive: true,
      url: 'order',
      submenuList: [
        {
          id: 0,
          menu: 'New Order',
          url: 'new-order',
          icon: 'fa-book',
          isActive: true,
        },
        {
          id: 1,
          menu: 'Approval Pending Orders',
          url: 'pending-orders',
          icon: 'fa-book',
          isActive: true,
        },
        {
          id: 1,
          menu: 'Approved Order',
          url: 'approved-order',
          icon: 'fa-book',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Dispatched Orders',
          url: 'dispatched-orders',
          icon: 'fa-book',
          isActive: true,
        },
        {
          id: 3,
          menu: 'Completed Orders',
          url: 'completed-orders',
          icon: 'fa-book',
          isActive: true,
        }
      ]
    },
    {
      id: 1,
      parentMenu: 'Payment',
      icon: 'fa-money',
      isActive: true,
      url: 'payment',
      submenuList: [
        {
          id: 0,
          menu: 'Payment Collection',
          url: 'collections',
          icon: 'fa-money',
          isActive: true,
        },
        {
          id: 1,
          menu: 'Collection History',
          url: 'collection-history',
          icon: 'fa-money',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Centerwise Collection',
          url: 'centerwise-collection',
          icon: 'fa-money',
          isActive: true,
        }
      ]
    },
    {
      id: 1,
      parentMenu: 'Return',
      icon: 'fa-undo',
      isActive: true,
      url: 'return',
      submenuList: [
        {
          id: 0,
          menu: 'Start Return',
          url: 'returnorder',
          icon: 'fa-undo',
          isActive: true,
        },
        {
          id: 0,
          menu: 'Return History',
          url: 'returnhistory',
          icon: 'fa-undo',
          isActive: true,
        },
      ]
    },
    {
      id: 1,
      parentMenu: 'Setting',
      icon: 'fa-cog',
      isActive: true,
      url: 'setting',
      submenuList: []
    }
  ],
  message: null,
};



export const SalesManagerList = {

  statusCode: 200,

  data: [
    {
      id: 1,
      parentMenu: 'Dashboard',
      icon: 'fa-cog',
      isActive: true,
      url: 'dashboard',
      submenuList: []
    },
    {
      id: 1,
      parentMenu: 'Member',
      icon: 'fa-user',
      isActive: true,
      url: 'member',
      submenuList: [
        {
          id: 1,
          menu: 'KYC',
          url: 'member-kyc',
          icon: 'fa-check',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Validity Expiring',
          url: 'validity-expiring-members',
          icon: 'fa-check',
          isActive: true,
        }
      ]
    },
    {
      id: 3,
      parentMenu: 'Users',
      icon: 'fa-user-circle',
      isActive: true,
      url: 'users',
      submenuList: [
        {
          id: 2,
          menu: 'Kyc Failed Users',
          url: 'kyc-failed-users',
          icon: 'fa-phone',
          isActive: true,
        }
      ]
    },
    {
      id: 2,
      parentMenu: 'Product',
      icon: 'fa-list',
      isActive: true,
      url: 'product',
      submenuList: [
        {
          id: 1,
          menu: 'Product Details',
          url: 'product-details',
          icon: 'fa-building',
          isActive: true,
        },
      ]
    },
    {
      id: 3,
      parentMenu: 'Order',
      icon: 'fa-pencil',
      isActive: true,
      url: 'order',
      submenuList: [
        {
          id: 0,
          menu: 'Order Details',
          url: 'order-details',
          icon: 'fa-book',
          isActive: true,
        },
        {
          id: 1,
          menu: 'Approved Orders',
          url: 'approved-order',
          icon: 'fa-book',
          isActive: true,
        },
        {
          id: 2,
          menu: 'Dispatched Orders',
          url: 'dispatched-orders',
          icon: 'fa-book',
          isActive: true,
        },
        {
          id: 3,
          menu: 'Completed Orders',
          url: 'completed-orders',
          icon: 'fa-book',
          isActive: true,
        }
      ]
    },
    {
      id: 1,
      parentMenu: 'Payment',
      icon: 'fa-money',
      isActive: true,
      url: 'payment',
      submenuList: [
        {
          id: 0,
          menu: 'Collection History',
          url: 'collection-history',
          icon: 'fa-money',
          isActive: true,
        },
        {
          id: 1,
          menu: 'Centerwise Collection',
          url: 'centerwise-collection',
          icon: 'fa-money',
          isActive: true,
        }
      ]
    },
    {
      id: 3,
      parentMenu: 'Return',
      icon: 'fa-undo',
      isActive: true,
      url: 'return',
      submenuList: [
        {
          id: 0,
          menu: 'Returned Orders',
          url: 'returned-orders',
          icon: 'fa-undo',
          isActive: true,
        },
        {
          id: 0,
          menu: 'Return History',
          url: 'returnhistory',
          icon: 'fa-undo',
          isActive: true,
        },
      ]
    }
  ],
  message: null,
};