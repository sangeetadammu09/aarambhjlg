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
                    isActive: true, 
                }
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
                    isActive: true, 
                }
            ]
          },
          

    ],
    message: null,
};