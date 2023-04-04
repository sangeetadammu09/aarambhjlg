export const AdminList = {

    statusCode: 200,

    data: [
        {
            id: 1,
            parentMenu: 'Admin Master',
            icon : 'fa-user-circle',
            isActive: true,
            url: 'admin-master',
            submenuList: [
                {
                    id: 0,
                    menu: 'Branch',
                    url: 'branch',
                    isActive: true, 
                },
                {
                    id: 1,
                    menu: 'City',
                    url: 'city',
                    isActive: true, 
                },
                {
                    id: 2,
                    menu: 'Expense Type',
                    url: 'expense-type',
                    isActive: true, 
                },
                {
                    id: 3,
                    menu: 'Installments',
                    url: 'installments',
                    isActive: true, 
                },
                           
                {
                    id: 4,
                    menu: 'Tax Slot',
                    url: 'tax-slot',
                    isActive: true, 
                },  
                
                {
                    id: 5,
                    menu: 'Unit',
                    url: 'unit',
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
                menu: 'Product List',
                url: 'product-list',
                isActive: true, 
               },
               {
                id: 1,
                menu: 'Product Price',
                url: 'product-price',
                isActive: true, 
               },
               {
                id: 2,
                menu: 'Product Brand',
                url: 'product-brand',
                isActive: true, 
            }, 
            {
                id: 3,
                menu: 'Product Category',
                url: 'product-category',
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
                    isActive: true, 
                },
                {
                    id: 1,
                    menu: 'User Role',
                    url: 'user-role',
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
                    isActive: true, 
                }
            ]
          },

    ],
    message: null,
};