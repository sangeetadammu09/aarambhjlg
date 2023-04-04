import { NgModule } from '@angular/core';


export const APP_DI_CONFIG: any = {
  // For api calls
  parentDomain: 'https://jlg.examfirst.in/api',
  endPoints: {
    User:{
      Login : "/User/Login", 
      Logout : "/User/Logout", 
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
      GetAllUserDetails : "/User/GetUserAllDetails"
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
      DeleteCity : "/City/DeleteCity"
    },
    Center:{
      GetAllCentersListByCity : "/Center/GetCentersListByCityId",
      GetAllSalesOfficerByCity : "/Center/GetSalesOfficerByCityId",
      GetAllRelationOfficerByCity : "/Center/GetRelationOfficerByCityId",
      GetAllSalesManagersByCity : "/Center/GetSalesManagersByCityId",
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
      AddInstallment : "/Installment/AddInstallment",
      UpdateInstallment : "/Installment/UpdateInstallment",
      DeleteInstallment : "/Installment/DeleteInstallment"
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
      AddProduct : "/Product/AddProduct",
      AddProductPrice : "/Product/AddProductPrice",
      AddProductImages : "/Product/AddProductImages",
      UpdateProduct : "/Product/UpdateProduct",
      DeleteProduct : "/Product/DeleteProduct"
    },
    Branch:{
      GetAllBranches : "/Branch/GetAllBranches",
      AddBranch : "/Branch/AddBranch",
      UpdateBranch : "/Branch/UpdateBranch",
      DeleteBranch : "/Branch/DeleteBranch"
    },
    
    
  }
  
};

@NgModule({
})
export class AppConfigModules {}