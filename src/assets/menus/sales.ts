export const SalesList = {

    statusCode: 200,

    data: [
        
          {
            id: 1,
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
                }
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
                id: 1,
                menu: 'Product Details',
                url: 'product-details',
                icon : 'fa-building',
                isActive: true, 
               },      
        ]
          },
          {
            id: 1,
            parentMenu: 'Member',
            icon : 'fa-user',
            isActive: true, 
            url: 'member',
            submenuList: [
                {
                    id: 0,
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
              },
              {
                id: 2,
                menu: 'KYC',
                url: 'member-kyc',
                icon : 'fa-check',
                isActive: true, 
            }
            ]
          },
          {
            id: 1,
            parentMenu: 'My Profile',
            icon : 'fa-user',
            isActive: true, 
            url: 'my-profile',
            submenuList: [
                // {
                //     id: 0,
                //     menu: 'My Profile',
                //     url: 'my-profile',
                //     icon : 'fa-user',
                //     isActive: true, 
                // }
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



export const SalesManagerList = {

  statusCode: 200,

  data: [
        {
          id: 1,
          parentMenu: 'Member',
          icon : 'fa-user',
          isActive: true, 
          url: 'member',
          submenuList: [
            {
              id: 2,
              menu: 'KYC',
              url: 'member-kyc',
              icon : 'fa-check',
              isActive: true, 
          }
          ]
        },
    
  ],
  message: null,
};