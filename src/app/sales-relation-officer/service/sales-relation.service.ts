import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class SalesRelationService {

  constructor(private http: HttpClient) { }

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

  //members

   getAllMembersById(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.GetMemberDetailsById+`?id=${id}`)
   }
 
   addMember(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.AddMember,data,{observe: 'response'})
   }
 
   addMemberDocuments(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.AddMemberDocuments,data,{observe: 'response'})
   }

}
