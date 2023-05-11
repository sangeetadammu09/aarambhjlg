import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-returnorder',
  templateUrl: './returnorder.component.html',
  styleUrls: ['./returnorder.component.css']
})
export class ReturnorderComponent implements OnInit {

  approvedOrderDetailsObj:any = {};
  selectedOrderList :any = [];
  orderinstallmentList :any = []
  searchOrder:any;
  orderId:any;
  orderFound = false;
  cartItemId: any;
  itemId: any;
  _salesService: any;
  page = 1;
  @ViewChild('closeDeleteItemBtn') closeDeleteItemBtn:any;
  updatedCartId: any;
  selectedReturnOrder: any;
  returnedOrderList: any;
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('roles');

  constructor( private _saleService: SalesRelationService, private toastrService :ToastrService) { }

  ngOnInit(): void {}

  getSearchedOrder(searchOrder:any){
    this.orderId = searchOrder;
    if(this.orderId){
      this._saleService.getApprovedOrdersDetails(this.orderId).subscribe((data:any) =>{
        if(data.status == 200){
          this.orderFound = true;
          this.approvedOrderDetailsObj = data.body;
          this.selectedOrderList = data.body.orderItems;
          this.selectedOrderList.forEach((item:any,index:number) => {
            item['rowEdited'] = false;
          }) 
          this.orderinstallmentList = data.body.installments;
          this.orderinstallmentList.forEach((item:any) => {
            item.installmentDate = moment(item.installmentDate).format("L");
          })
          this.getOrderReturnedItems()
        }else{
          this.orderFound = false;
          this.selectedOrderList = []
        }
      })
    }
  }

  getOrderReturnedItems(){
      this._saleService.getOrderReturnedItems(this.orderId).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this.orderFound = true;          
          this.returnedOrderList = data.body;
         
        }else{
          this.orderFound = false;
          this.returnedOrderList = []
        }
      })
  }

  editRow(item:any){
    item.rowEdited = !item.rowEdited;
  }

  updateItemQuantity(item:any){
    this.selectedReturnOrder = item;
    var updateCart :any = {};
    updateCart.orderId = item.orderId,
    updateCart.productId = item.productId,
    updateCart.qty = JSON.parse(item.prodQuantityInput),
    updateCart.salePrice = item.salePrice,
    updateCart.taxAmt = item.taxAmt? item.taxAmt : 0,
    updateCart.totalAmt = item.totalAmt 
    console.log(updateCart);
    this._saleService.addOrderReturnItems(updateCart).subscribe((data:any) => {
      if(data.status == 200){
        this.toastrService.success('Item Quantity updated successfully')
        this.getSearchedOrder(item.orderId)

       }else{
         this.toastrService.error('No Items added. Please try again')
       } 
     })
   
}

  showdeleteCartModal(item:any){
    console.log(item)
    this.selectedReturnOrder = item;
    
 }

  deleteItem(){    
    var updateCart :any = {};
    updateCart.orderId = this.selectedReturnOrder.orderId,
    updateCart.productId = this.selectedReturnOrder.productId,
    updateCart.qty = 0,
    updateCart.salePrice = this.selectedReturnOrder.salePrice,
    updateCart.taxAmt = this.selectedReturnOrder.taxAmt? this.selectedReturnOrder.taxAmt : 0,
    updateCart.totalAmt = this.selectedReturnOrder.totalAmt 
    console.log(updateCart);
    this._saleService.addOrderReturnItems(updateCart).subscribe((data:any) => {
      console.log(data.status)
      if(data.status == 200){
        this.toastrService.success('Item deleted successfully')
        this.closeDeleteItemBtn.nativeElement.click();
        this.getSearchedOrder(this.selectedReturnOrder.orderId)

       }else{
         this.toastrService.error('No Items deleted. Please try again')
       } 
     })
    
  }

  submitReturnRequest(){
    console.log(this.approvedOrderDetailsObj)
    var selectedReturnOrder :any = this.approvedOrderDetailsObj;
    if(this.userRole)
    var temp = JSON.parse(this.userRole);
    const finalArray = temp.map((item:any, index:number) => ({ id: index,name: item }))
    this.userRole = finalArray[0].name;
    var submitOrder :any = {};
    submitOrder.orderId = selectedReturnOrder.orderId,
    submitOrder.cityId = selectedReturnOrder.cityId,
    submitOrder.centerId = selectedReturnOrder.centerId,
    submitOrder.memberId = selectedReturnOrder.memberId,
    submitOrder.returnRequestedById = this.userId ? JSON.parse(this.userId) : null,
    submitOrder.returnRequestedRole =  this.userRole,
    submitOrder.totalActualBillAmt = selectedReturnOrder.orderItems[0].totalAmt 
    console.log(submitOrder);
    this._saleService.submitReturnRequest(submitOrder).subscribe((data:any) => {
      console.log(data.status)
      if(data.status == 200){
        this.toastrService.success('Order return submitted successfully')
        this.closeDeleteItemBtn.nativeElement.click();
        this.getSearchedOrder(this.selectedReturnOrder.orderId)

       }else{
         this.toastrService.error('No Items deleted. Please try again')
       } 
     })
  }




}