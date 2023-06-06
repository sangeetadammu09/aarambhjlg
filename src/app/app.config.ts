import { NgModule } from '@angular/core';


export const APP_DI_CONFIG: any = {
  // For api calls
  parentDomain: 'https://jlg.examfirst.in/api',
  endPoints: {
    User:{
      Login : "/User/Login", 
      Logout : "/User/Logout", 
      ChangePassword : "/User/ChnagePassword", 
      RefreshToken: "/User/RefreshToken",
      GetAllManager : "/User/GetAllManager",
      GetAllUser : "/User/GetAllUser",
      AddUser : "/User/AddSystemUser",
      AddUserDocuments : "/User/AddUserDocuments",
      AddUserOtherDocuments : "/User/AddUserOtherDocuments",
      GetAllUserRoles : "/User/GetAllUserRoles",
      AddUserRole : "/User/AddUserRole",
      UpdateUserRole : "/User/UpdateUserRole",
      DeleteUserRole : "/User/DeleteUserRole",
      GetUsersListByCity: "/User/GetUsersListByCity",
      GetUsersByCity: "/User/GetUsersByCity",
      GetAllRoles: "/User/GetAllRoles",
      GetAllUserDetails : "/User/GetUserAllDetails",
      GetUserContacts: "/User/GetUserContacts",
      GetUserProfilePic: "/User/GetUserProfilePic",
      CheckUserMobileNumberExists: "/User/CheckUserMobileNumberExists",
    },
    ProductCategory:{
      GetAllProductCategory : "/ProductCategory/GetAllProductCategory",
      AddProductCategory : "/ProductCategory/AddCategory",
      UpdateCategory : "/ProductCategory/UpdateCategory",
      DeleteProductCategory : "/ProductCategory/DeleteProductCategory"
    },
    Unit:{
      GetAllUnits : "/Unit/GetAllUnits",
      AddUnit : "/Unit/AddUnit",
      UpdateCategory : "/Unit/UpdateUnit",
      DeleteUnit : "/Unit/DeleteUnit"
    },
    City:{
      GetAllCity : "/City/GetAllCity",
      AddCity : "/City/AddCity",
      UpdateCity : "/City/UpdateCity",
      DeleteCity : "/City/DeleteCity",
      GetCityById : "/City/GetCityById"
    },
    Center:{
      GetAllCentersListByCity : "/Center/GetCentersListByCityId",
      GetAllSalesOfficerByCity : "/Center/GetSalesOfficerByCityId",
      GetAllRelationOfficerByCity : "/Center/GetRelationOfficerByCityId",
      GetAllSalesManagersByCity : "/Center/GetSalesManagersByCityId",
      GetSalesManagerCenterList : "/Center/GetSalesManagerCenterList",
      GetCenterDropdownByCityId : "/Center/GetCenterDropdownByCityId",
      GetOfficersCenterList : "/Center/GetOfficersCenterList",
      GetSalesOfficersCenterList : "/Center/GetSalesOfficerCenterList",
      AssignLeaderToCenter :"Center/AssignLearderToCenter",
      AddCenter : "/Center/AddCenter",
      UpdateCenter : "/Center/UpdateCenter",
      DeleteCenter : "/Center/DeleteCenter"
    },
    ExpenseType:{
      GetAllExpenseType : "/ExpenseTypes/GetAllExpenseType",
      AddExpenseType : "/ExpenseTypes/AddExpenseType",
      UpdateExpenseType : "/ExpenseTypes/UpdateExpenseType",
      DeleteExpenseType : "/ExpenseTypes/DeleteExpenseType"
    },
    Installment:{
      GetAllInstallment : "/Installment/GetAllInstallment",
      GetInstallmentById : "/Installment/GetInstallmentById",
      AddInstallment : "/Installment/AddInstallment",
      UpdateInstallment : "/Installment/UpdateInstallment",
      DeleteInstallment : "/Installment/DeleteInstallment"
    },
    Group:{
      GetAllGroups : "/Group/GetAllGroups",
      GetGroupListByCenterId : "/Group/GetGroupListByCenterId",
      AddGroup : "/Group/AddGroup",
      UpdateGroup : "/Group/UpdateGroup",
      DeleteGroup : "/Group/DeleteGroup"
    },
    Members:{
      GetMemberDetailsById : "/Members/GetMemberDetailsById",
      GetMemberAllDetails : "/Members/GetMemberAllDetails",
      AddMember : "/Members/AddMember",
      AddMemberDocuments : "/Members/AddMemberDocuments",
      GetCenterWiseMemberList : "/Members/GetCenterWiseMemberList",
      GetMemberListByCenter : "/Members/GetMemberListByCenter",
      GetMemberContacts : "/Members/GetMemberContacts",
      CheckMemberMobileNumberExists: "/Members/CheckMemberMobileNumberExists",
    },
    TaxSlot:{
      GetAllTaxSlot : "/TaxSlot/GetAllTaxSlots",
      AddTaxSlot : "/TaxSlot/AddTaxSlot",
      UpdateTaxSlot : "/TaxSlot/UpdateTaxSlot",
      DeleteTaxSlot : "/TaxSlot/DeleteTaxSlot"
    },
    ProductBrand:{
      GetAllProductBrand : "/ProductBrands/GetAllProductBrand",
      AddProductBrand : "/ProductBrands/AddProductBrand",
      UpdateProductBrand : "/ProductBrands/UpdateProductBrand",
      DeleteProductBrand : "/ProductBrands/DeleteProductBrand"
    },
    ProductPrice:{
      GetAllProductPriceByCity : "/Product/GetByProductShortDetail",
      AddProductPrice : "/Product/AddProductPrice",
      UpdateProductPrice : "/Product/UpdateProductPrice",
      DeleteProductPrice : "/Product/DeleteProductBrand"
    },
    Product:{
      GetAllProduct : "/Product/GetAllProduct",
      GetProducts : "/Product/GetProducts",
      GetAllProductByCity : "/Product/GetAllProductByCity",
      GetProductDetailsForSale : "/Product/GetProductDetailsForSale",
      GetProductAutoComplete : "/Product/GetProductAutoComplete",
      GetRandomProducts : "/Product/GetRandomProducts",
      GetSingleProducts : "/Product/GetSingleProducts",
      AddProduct : "/Product/AddProduct",
      AddProductPrice : "/Product/AddProductPrice",
      AddProductImages : "/Product/AddProductImages",
      UpdateProduct : "/Product/UpdateProduct",
      DeleteProduct : "/Product/DeleteProduct"
    },
    Branch:{
      GetAllBranches : "/Branch/GetAllBranches",
      GetBranchesByCityId : "/Branch/GetBranchesByCityId",
      AddBranch : "/Branch/AddBranch",
      UpdateBranch : "/Branch/UpdateBranch",
      DeleteBranch : "/Branch/DeleteBranch"
    },
    Kyc:{
      GetUserListForKycVerification : "/Kyc/GetUserListForKycVerification",
      GetUserKycDetails : "/Kyc/GetUserKycDetails",
      AddUserKycVerification:"/Kyc/AddUserKycVerification",
      GetMemberListForKycVerification : "/Kyc/GetMemberListForKycVerification",
      GetMemberKycDetails : "/Kyc/GetMemberKycDetails",
      AddMemberKycVerification:"/Kyc/AddMemberKycVerification",
      GetKycFailedMembers : "/Kyc/GetKycFailedMembers",
      GetKycFailedUsers : "/Kyc/GetKycFailedUsers",
      GetMemberKycStatus : "/Kyc/GetMemberKycStatus",
      GetUserKycStatus : "/Kyc/GetUserKycStatus"
    },
    ShoppingCart:{
      CreateNewCart: '/ShopingCart/CreateNewCart',
      AddItemToCart: '/ShopingCart/AddItemToCart',
      RemoveItemFromCart: '/ShopingCart/RemoveItemFromCart',
      GetShoppingCart: '/ShopingCart/GetShopingCart',  
    },
    Order:{
        PlaceNewOrder: '/Order/PlaceNewOrder',
        CancelOrder: '/Order/CancelOrder',
        GetOrderDetails: '/Order/GetOrderDetails',
        GetOrderListForApproval: '/Order/GetOrdersListForApproval',
        ApproveOrder: '/Order/ApproveOrder',
        GetInstallmentList : '/Order/GetInstallmentList',
        GetApprovedOrdersForSoRoList : '/Order/GetApprovedOrdersForSoRoList',
        GetApprovedOrdersForManagerList : '/Order/GetApprovedOrdersForManagerList',
        GetApprovedOrderDetails : '/Order/GetApprovedOrderDetails',
        GetOrderMemberValidity : '/Order/GetOrderMemberValidity',
    },
    OrderInstallment:{
      getOrderInstallmentCollectionList: '/OrderInstallment/GetOrderInstallmentCollectionList',
      makeInstallmentPayment: '/OrderInstallment/MakeInstallment/MakeInstallmentPayment',
      getOrderInstallmentHistory: '/OrderInstallment/GetOrderInstallmentHistory'
    },
    OrderReturn:{
      addOrderReturnItems: '/OrderReturn/AddReturnItems',
      getOrderReturnedItems: '/OrderReturn/GetReturnedItems',
      submitReturnRequest: '/OrderReturn/SubmitReturnRequest',
      getReturnedRequestedList: '/OrderReturn/GetReturnedRequestedList',
      getReturnOrderDetails: '/OrderReturn/GetReturnOrderDetails',
      approveReturnRequest: '/OrderReturn/ApproveReturnRequest'
    },
    Dashboard:{
      getCenterSummary: '/Dashboard/GetCenterSummary',
      getOrderSummary: '/Dashboard/GetOrderSummary'
    
    }
  }
  
};

@NgModule({
})
export class AppConfigModules {}