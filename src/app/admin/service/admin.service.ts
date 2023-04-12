import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient){ }

  getAllProductCategory(){
   return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductCategory.GetAllProductCategory)
  }

  addProductCategory(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductCategory.AddProductCategory,data,{observe: 'response'})
  }

  updateProductCategory(data:any){
    return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductCategory.UpdateCategory,data,{observe: 'response'})
  }

  deleteProductCategory(id:any){
    return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductCategory.DeleteProductCategory+`/${id}`,{observe: 'response'})
  }

  getAllUnits(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Unit.GetAllUnits)
   }
 
   addUnit(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Unit.AddUnit,data,{observe: 'response'})
   }
 
   updateUnit(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Unit.UpdateUnit,data,{observe: 'response'})
   }
 
   deleteUnit(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Unit.DeleteUnit+`/${id}`,{observe: 'response'})
   }

   //city apis

   getAllCity(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.City.GetAllCity)
   }
 
   addCity(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.City.AddCity,data,{observe: 'response'})
   }
 
   updateCity(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.City.UpdateCity,data,{observe: 'response'})
   }
 
   deleteCity(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.City.DeleteCity+`/${id}`,{observe: 'response'})
   }


    //city apis

     getAllCenter(cityId:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetAllCentersListByCity+`?cityId=${cityId}`)
     }

     getCenterDropdownByCityId(cityId:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetCenterDropdownByCityId+`?cityId=${cityId}`)
     }

     getAllSalesOfficerByCity(cityId:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetAllSalesOfficerByCity+`?cityId=${cityId}`)
     }

     getAllRelationOfficerByCity(cityId:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetAllRelationOfficerByCity+`?cityId=${cityId}`)
     }

     getAllSalesManagersByCity(cityId:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetAllSalesManagersByCity+`?cityId=${cityId}`)
     }
   
     addCenter(data:any){
       return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.AddCenter,data,{observe: 'response'})
     }
   
     updateCenter(data:any){
       return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.UpdateCenter,data,{observe: 'response'})
     }
   
     deleteCenter(id:any){
       return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.DeleteCenter+`/${id}`,{observe: 'response'})
     }


   //expense type

   getAllExpenseType(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ExpenseType.GetAllExpenseType)
   }
 
   addExpenseType(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ExpenseType.AddExpenseType,data,{observe: 'response'})
   }
 
   updateExpenseType(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ExpenseType.UpdateExpenseType,data,{observe: 'response'})
   }
 
   deleteExpenseType(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ExpenseType.DeleteExpenseType+`/${id}`,{observe: 'response'})
   }


   //installment

   getAllInstallment(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Installment.GetAllInstallment)
   }
 
   addInstallment(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Installment.AddInstallment,data,{observe: 'response'})
   }
 
   updateInstallment(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Installment.UpdateInstallment,data,{observe: 'response'})
   }
 
   deleteInstallment(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Installment.DeleteInstallment+`/${id}`,{observe: 'response'})
   }

   //group

   getAllGroupsByCityId(cityId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Group.GetAllGroups+`?cityId=${cityId}`)
   }

   getGroupListByCenterId(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Group.GetGroupListByCenterId+`/${id}`,{observe: 'response'})
   }
 
   addGroup(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Group.AddGroup,data,{observe: 'response'})
   }
 
   updateGroup(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Group.UpdateGroup,data,{observe: 'response'})
   }
 
   deleteGroup(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Group.DeleteGroup+`/${id}`,{observe: 'response'})
   }



   //tax slot

   getAllTaxSlot(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.TaxSlot.GetAllTaxSlot)
   }
 
   addTaxSlot(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.TaxSlot.AddTaxSlot,data,{observe: 'response'})
   }
 
   updateTaxSlot(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.TaxSlot.UpdateTaxSlot,data,{observe: 'response'})
   }
 
   deleteTaxSlot(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.TaxSlot.DeleteTaxSlot+`/${id}`,{observe: 'response'})
   }


   //product brand

   getAllProductBrand(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductBrand.GetAllProductBrand)
   }
 
   addProductBrand(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductBrand.AddProductBrand,data,{observe: 'response'})
   }
 
   updateProductBrand(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductBrand.UpdateProductBrand,data,{observe: 'response'})
   }
 
   deleteProductBrand(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductBrand.DeleteProductBrand+`/${id}`,{observe: 'response'})
   }

   //product city

   getAllProductPrice(pageNo:any,pageSize:any,cityId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductPrice.GetAllProductPriceByCity+`?pageNo=${pageNo}&pageSize=${pageSize}&cityId=${cityId}`)
   }
 
   addProductPrice(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductPrice.AddProductPrice,data,{observe: 'response'})
   }
 
   updateProductPrice(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductPrice.UpdateProductPrice,data,{observe: 'response'})
   }
 
   deleteProductPrice(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ProductPrice.DeleteProductPrice+`/${id}`,{observe: 'response'})
   }


   //product

   getAllProduct(pageNo:any,pageSize:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.GetAllProduct+`?pageNo=${pageNo}&pageSize=${pageSize}`)
   }

   getProducts(pageNo:any,pageSize:any,cityId:any,SearchTerm?:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.GetProducts+`?pageNo=${pageNo}&pageSize=${pageSize}&cityId=${cityId}&SearchTerm=${SearchTerm}`)
   }

   getAllProductByCity(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.GetAllProductByCity)
   }
 
   addProduct(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.AddProduct,data,{observe: 'response'})
   }

   addProductImages(data:any){
      return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.AddProductImages,data,{observe: 'response'})
    }
 
   updateProduct(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.UpdateProduct,data,{observe: 'response'})
   }
 
   deleteProduct(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.DeleteProduct+`/${id}`,{observe: 'response'})
   }

   //branch

   getAllBranch(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Branch.GetAllBranches)
   }
 
   addBranch(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Branch.AddBranch,data,{observe: 'response'})
   }
 
   updateBranch(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Branch.UpdateBranch,data,{observe: 'response'})
   }
 
   deleteBranch(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Branch.DeleteBranch+`/${id}`,{observe: 'response'})
   }

   getAllManager(){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.GetAllManager)
   }


   //user

   getAllUser(pageNo:any,pageSize:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.GetAllUser+`?pageNo=${pageNo}&pageSize=${pageSize}`)
   }

   getAllUserDetails(userId : any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.GetAllUserDetails+`?userId=${userId}`)
   }
 
   addUser(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.AddUser,data,{observe: 'response'})
   }

   changePassword(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.ChangePassword,data,{observe: 'response'})
  }
 
   addUserDocuments(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.AddUserDocuments,data,{observe: 'response'})
   }

   addUserOtherDocuments(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.AddUserOtherDocuments,data,{observe: 'response'})
  }
 
  //  deleteUser(id:any){
  //    return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.DeleteUser+`/${id}`,{observe: 'response'})
  //  }

    //user role

    getAllUsersListByCity(cityId:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.GetUsersListByCity+`?cityId=${cityId}`)
     }

     getAllUsersByCity(cityId:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.GetUsersByCity+`?cityId=${cityId}`)
     }


    getAllRoles(){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.GetAllRoles)
     }
   

    getAllUserRole(pageNo:any,pageSize:any){
      return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.GetAllUserRole+`?pageNo=${pageNo}&pageSize=${pageSize}`)
     }
   
    addUserRole(data:any){
       return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.AddUserRole,data,{observe: 'response'})
     }

    updateUserRole(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.UpdateUserRole+`/${id}`,{observe: 'response'})
    }

    deleteUserRole(data:any){
      return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.User.DeleteUserRole,data,{observe: 'response'})
    }
   
    


}
