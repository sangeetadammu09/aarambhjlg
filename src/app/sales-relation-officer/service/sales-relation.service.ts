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

   getSalesManagerCenterList(smId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetSalesManagerCenterList+`?smId=${smId}`)
   }

   getSalesOfficersCenterList(soId:any,cityId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetSalesOfficersCenterList+`?soId=${soId}&cityId=${cityId}`)
   }
 
 
   addCenter(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.AddCenter,data,{observe: 'response'})
   }


   getOfficersCenterList(cityId:any,officerUserId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.GetOfficersCenterList+`?cityId=${cityId}&officerUserId=${officerUserId}`)
   }
 
   updateCenter(data:any){
     return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.UpdateCenter,data,{observe: 'response'})
   }
 
   deleteCenter(id:any){
     return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Center.DeleteCenter+`/${id}`,{observe: 'response'})
   }

  //members

   getAllMembersById(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.GetMemberDetailsById+`/id=${id}`)
   }

   getAllMemberDetails(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.GetMemberAllDetails+`?memberId=${id}`)
   }
 
   getCenterWiseMemberList(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.GetCenterWiseMemberList+`?centerId=${id}`)
   }

   getMemberListByCenter(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.GetMemberListByCenter+`?centerId=${id}`)
   }
 
   getMemberContacts(id:any,pageno:any,pageSize:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.GetMemberContacts+`?centerId=${id}&PageNumber=${pageno}&PageSize=${pageSize}`)
   }

   addMember(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.AddMember,data,{observe: 'response'})
   }
 
   addMemberDocuments(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.AddMemberDocuments,data,{observe: 'response'})
   }

   checkMemberMobileNumberExists(mobileNo:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.CheckMemberMobileNumberExists+`?mobileNo=${mobileNo}`)
   }

   getValidityExpiringMembers(centerId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Members.GetValidityExpiringMembers+`?centerId=${centerId}`)
   }

   //kyc 
   getMemberListForKycVerification(centerId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Kyc.GetMemberListForKycVerification+`?centerId=${centerId}`)
   }

   getMemberKycDetails(memberId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Kyc.GetMemberKycDetails+`?memberId=${memberId}`,{observe: 'response'})
   }
 
   addMemberKycVerification(data:any){
     return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Kyc.AddMemberKycVerification,data,{observe: 'response'})
   }

   getKycFailedMembers(centerId:any,pagesize:any,pageno:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Kyc.GetKycFailedMembers+`?centerId=${centerId}&pageNumber=${pageno}&pageSize=${pagesize}`)
   }

   getMemberKycStatus(memberId:any, cityId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Kyc.GetMemberKycStatus+`?memberId=${memberId}&cityId=${cityId}`,)
   }

   getProductAutocomplete(SearchTerm?:any){
   
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.GetProductAutoComplete+`?SearchTerm=${SearchTerm}`)
   }
 
   getRandomProducts(cityId?:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.GetRandomProducts+`?cityId=${cityId}`)
   }

   getSingleProducts(cityId?:any, productId?:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.GetSingleProducts+`?cityId=${cityId}&productId=${productId}`)
   }

   createNewCart(data: any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ShoppingCart.CreateNewCart,data,{observe: 'response'})
   }

   addItemToCart(data: any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ShoppingCart.AddItemToCart,data,{observe: 'response'})
   }

   removeItemFromCart(cartId: any,itemId:any){
    return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ShoppingCart.RemoveItemFromCart+`?cartId=${cartId}&itemId=${itemId}`,{observe: 'response'})
   }

   getShoppingCart(data: any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.ShoppingCart.GetShoppingCart,data)
   }

   
   placeNewOrder(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.PlaceNewOrder,data,{observe: 'response'})
   }

   getOrderMemberValidity(memberId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetOrderMemberValidity+`?memberId=${memberId}`,{observe: 'response'})
   }

   cancelOrder(cartId:any){
    return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.CancelOrder+`?cartId=${cartId}`,{observe: 'response'})
   }

   getOrderListForApproval(id:any,pagesize:any,pageno:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetOrderListForApproval+`?userId=${id}&PageSize=${pagesize}&PageNo=${pageno}`)
   }

   getOrderDetails(orderId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetOrderDetails+`?orderId=${orderId}`,{observe: 'response'})
   }

   approveOrder(data:any){
    return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.ApproveOrder,data,{observe: 'response'})
   }

   getInstallmentList(totalAmount:any,installmentNo:any,gapDays:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetInstallmentList+`?totalAmount=${totalAmount}&installmentNo=${installmentNo}&gapDays=${gapDays}`)
   }

   getApprovedOrdersForSoRoList(id:any,pagesize:any,pageno:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetApprovedOrdersForSoRoList+`?userId=${id}&PageSize=${pagesize}&PageNo=${pageno}`)
   }

   getApprovedOrdersForManagerList(id:any,pagesize:any,pageno:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetApprovedOrdersForManagerList+`?managerId=${id}&PageSize=${pagesize}&PageNo=${pageno}`)
   }

   getApprovedOrdersDetails(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetApprovedOrderDetails+`?orderId=${id}`,{observe: 'response'})
   }

   getOrderInstallmentCollectionList(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderInstallment.getOrderInstallmentCollectionList,data)
   }

   makeInstallmentPayment(data:any){
    return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderInstallment.makeInstallmentPayment,data,{observe: 'response'})
   }

   getOrderInstallmentHistory(id:any, memberId:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderInstallment.getOrderInstallmentHistory
      +`?orderId=${id}&memberId=${memberId}`,null)
   }


   addOrderReturnItems(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderReturn.addOrderReturnItems,data,{observe: 'response'})
   }

   getOrderReturnedItems(id:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderReturn.getOrderReturnedItems
      +`?orderId=${id}`,{observe: 'response'})
   }

   submitReturnRequest(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderReturn.submitReturnRequest,data,{observe: 'response'})
   }

   getMembershipsOverview(centerId:any,PageNo:any,PageSize:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Membership.GetMembershipsOverview+
      `?centerId=${centerId}&PageNo=${PageNo}&PageSize=${PageSize}`)
   }

   getMembershipPendingFeesDetails(memberId:any,subcriptionId:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Membership.GetMembershipPendingFeesDetails+
      `?memberId=${memberId}&subcriptionId=${subcriptionId}`)
   }

   getIndividualMembershipPendingFeesHistory(memberId:any,PageNo:any,PageSize:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Membership.GetIndividualMembershipPendingFeesHistory+
      `?memberId=${memberId}&pageNo=${PageNo}&pageSize=${PageSize}`)
   }

   collectFees(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Membership.CollectFees,data,{observe: 'response'})
   }

   renewMembership(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Membership.RenewMembership,data,{observe: 'response'})
   }

   getDispatchedOrdersListForSoRoList(userId:any, pageSize:any,pageNumber:any){
    console.log(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetDispatchedOrdersForSoRoList)
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetDispatchedOrdersForSoRoList
      +`?userId=${userId}&PageSize=${pageSize}&PageNo=${pageNumber}`)

   }


   getCompletedOrdersListForSoRoList(userId:any, pageSize:any,pageNumber:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetCompletedOrdersForSoRoList
      +`?userId=${userId}&PageSize=${pageSize}&PageNo=${pageNumber}`)
   }

   getApprovalPendingOrdersForSoRo(userId:any, pageSize:any,pageNumber:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Order.GetApprovalPendingOrdersForSoRo
      +`?userId=${userId}&PageSize=${pageSize}&PageNo=${pageNumber}`)
   }

   getCenterwisePaidMembersList(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderInstallment.getCenterwisePaidMembersList, data)
   }

   getCenterwisePaymentCollectionOverview(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderInstallment.getCenterwisePaymentCollectionOverview, data)
   }

   getCenterwisePaymentOverview(data:any){
   
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderInstallment.getCenterwisePaymentCollectionOverview, data)
   }

   getReturnedHistory(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.OrderReturn.getReturnedHistory, data)
   }





   
 

}
