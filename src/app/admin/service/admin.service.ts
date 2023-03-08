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

}
