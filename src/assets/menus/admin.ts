export const AdminList = {

    statusCode: 200,

    data: [
        {
            id: 1,
            parentMenu: 'Admin Master',
            icon : 'fa-user',
            isActive: true,
            url: 'admin-master',
            submenuList: [
                {
                    id: 0,
                    menu: 'Product Category',
                    url: 'product-category',
                    isActive: true, 
                }, 
                {
                    id: 1,
                    menu: 'Unit',
                    url: 'unit',
                    isActive: true, 
                },
                {
                    id: 2,
                    menu: 'Tax Slot',
                    url: 'tax-slot',
                    isActive: true, 
                },  
                {
                    id: 3,
                    menu: 'Products',
                    url: 'products',
                    isActive: true, 
                },
                {
                    id: 4,
                    menu: 'City',
                    url: 'city',
                    isActive: true, 
                },
                {
                    id: 5,
                    menu: 'Expense Type',
                    url: 'expense-type',
                    isActive: true, 
                },
                {
                    id: 6,
                    menu: 'Installments',
                    url: 'installments',
                    isActive: true, 
                },
                 
            ]
          },

    ],
    message: null,
};