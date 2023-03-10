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
                    menu: 'Product Brand',
                    url: 'product-brand',
                    isActive: true, 
                }, 
                {
                    id: 5,
                    menu: 'Product Category',
                    url: 'product-category',
                    isActive: true, 
                }, 
                
                {
                    id: 6,
                    menu: 'Tax Slot',
                    url: 'tax-slot',
                    isActive: true, 
                },  
                
                {
                    id: 7,
                    menu: 'Unit',
                    url: 'unit',
                    isActive: true, 
                },
                
                
                 
            ]
          },
          {
            id: 2,
            parentMenu: 'Products',
            icon : 'fa-list',
            isActive: true, 
            url: 'products',
            submenuList: []
        },

    ],
    message: null,
};