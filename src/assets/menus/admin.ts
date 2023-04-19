export const AdminList = {

    statusCode: 200,

    data: [
        {
            id: 1,
            parentMenu: 'Admin Master',
            icon : 'fa-users',
            isActive: true,
            url: 'admin-master',
            submenuList: [
                {
                    id: 0,
                    menu: 'City',
                    url: 'city',
                    icon : 'fa-building',
                    isActive: true, 
                },
                {
                    id: 1,
                    menu: 'Branch',
                    url: 'branch',
                    icon : 'fa-building',
                    isActive: true, 
                },
                {
                    id: 2,
                    menu: 'Unit',
                    url: 'unit',
                    icon : 'fa-building',
                    isActive: true, 
                },
                {
                    id: 3,
                    menu: 'Tax Slot',
                    url: 'tax-slot',
                    icon : 'fa-building',
                    isActive: true, 
                }, 
                {
                    id: 4,
                    menu: 'Installments',
                    url: 'installments',
                    icon : 'fa-building',
                    isActive: true, 
                },
                {
                    id: 5,
                    menu: 'Expense Type',
                    url: 'expense-type',
                    icon : 'fa-building',
                    isActive: true, 
                },
  
            ]
          },
          {
            id: 2,
            parentMenu: 'Product',
            icon : 'fa-list',
            isActive: true, 
            url: 'product',
            submenuList: [ 
                {
                    id: 0,
                    menu: 'Product Category',
                    url: 'product-category',
                    icon : 'fa-building',
                    isActive: true, 
                },
                {
                    id: 1,
                    menu: 'Product Brand',
                    url: 'product-brand',
                    icon : 'fa-building',
                    isActive: true, 
                },  
                {
                id: 2,
                menu: 'Product List',
                url: 'product-list',
                icon : 'fa-building',
                isActive: true, 
               },
               {
                id: 3,
                menu: 'Product Price',
                url: 'product-price',
                icon : 'fa-building',
                isActive: true, 
               }, 
               {
                id: 4,
                menu: 'Product Details',
                url: 'product-details',
                icon : 'fa-building',
                isActive: true, 
               },      
        ]
          },
          {
            id: 3,
            parentMenu: 'Users',
            icon : 'fa-user-circle',
            isActive: true, 
            url: 'users',
            submenuList: [
                {
                    id: 0,
                    menu: 'User List',
                    url: 'user-list',
                    icon : 'fa-user',
                    isActive: true, 
                },
                {
                    id: 1,
                    menu: 'User Role',
                    url: 'user-role',
                    icon : 'fa-user',
                    isActive: true, 
                },
                {
                    id: 2,
                    menu: 'User Contacts',
                    url: 'user-contacts',
                    icon : 'fa-phone',
                    isActive: true, 
                },
                {
                    id: 2,
                    menu: 'KYC',
                    url: 'user-kyc',
                    icon : 'fa-check',
                    isActive: true, 
                }
            ]
          },
          {
            id: 3,
            parentMenu: 'Center',
            icon : 'fa-building',
            isActive: true, 
            url: 'center',
            submenuList: [
                {
                    id: 0,
                    menu: 'Center List',
                    url: 'center-list',
                    icon : 'fa-building',
                    isActive: true, 
                },
                {
                    id: 1,
                    menu: 'Group-List',
                    url: 'group-list',
                    icon : 'fa-building',
                    isActive: true, 
                },
                {
                    id: 2,
                    menu: 'Member List',
                    url: 'member-list',
                    icon : 'fa-users',
                    isActive: true, 
                },
                {
                    id: 2,
                    menu: 'Member Contacts',
                    url: 'member-contacts',
                    icon : 'fa-phone',
                    isActive: true, 
                }
            ]
          },
          {
            id: 1,
            parentMenu: 'Setting',
            icon : 'fa-cog',
            isActive: true, 
            url: 'setting',
            submenuList: [
                {
                    id: 0,
                    menu: 'Change Password',
                    url: 'change-password',
                    icon : 'fa-wrench',
                    isActive: true, 
                }
            ]
          }
          

    ],
    message: null,
};