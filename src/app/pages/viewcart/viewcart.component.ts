import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  newCart:any 
  cartDetailsObj :any={};
  viewCartList :any = [];
  productObj:any ={};
  page =1;
  demoText="demo"
  cartList: any = [];
  @ViewChild('closeDeleteItemBtn') closeDeleteItemBtn:any;
  cartItemId: any;
  serviceCharge: any =0;
  paymentInstallment :any;
  installmentList :any =[];
  updatedCartId: any;
  paymentInstallmentId: any;
  rowValue: any;
  selectedCartId :any
  memberId :any
  itemId: any;
  

  constructor(private _adminService:AdminService, private _salesService: SalesRelationService,
    private toastrService :ToastrService,private router: Router, private dataService:DataService) {

    }

  ngOnInit(): void {
   
    this.getAllInstallments();
    this.paymentInstallment = "";
    this.dataService.currentCatObj.subscribe((data:any) => {
      this.newCart = data;
      this.showViewCartModal();
    })

  }

  showViewCartModal(){
    if(this.newCart != null){
   //   console.log(this.newCart,'new cart')
      this._salesService.getShoppingCart(this.newCart).subscribe((data:any) => {
        if(data){
         // debugger;
          this.cartDetailsObj = data;
          this.viewCartList = data.cartItems;
          this.cartDetailsObj.total = 0;
          this.cartDetailsObj.finalAmount = 0;
          this.updatedCartId = this.cartDetailsObj.cartId;
          this.viewCartList.forEach((item:any,index:number) => {
            this.cartDetailsObj.total += item['subTotal'];
            item['rowEdited'] = false;
          }) 
        
         
         }
       })
    }

    // this.dataService.currentCatObj.subscribe((data:any) => {
    //     console.log(data,'dataaaaaaaaaaaaaaaaaa');
    //       if(data){
    //      this.selectedCartId = data.cartId;
    //      this.memberId = data.memberId;
    //      console.log(this.memberId,this.selectedCartId)
        
     
    //       }
    //    })   

  }

  editRow(item:any){
    item.rowEdited = !item.rowEdited;
    item.prodQuantityInput = item.qty
  }

  updateItemQuantity(item:any){
          this.updatedCartId = item.cartId;
          var updateCart :any = {};
          updateCart.cartId = item.cartId,
          updateCart.itemId = item.itemId,
          updateCart.itemName = item.itemName == null ? '' : item.itemName,
         updateCart.qty = JSON.parse(item.prodQuantityInput),
          updateCart.salePrice = item.salePrice,
          updateCart.mrp = item.mrp,
          updateCart.subTotal = updateCart.salePrice * updateCart.qty,
          updateCart.itemUrl = item.productPhoto
          this._salesService.addItemToCart(updateCart).subscribe((data:any) => {
            if(data.status == 200){
              this.toastrService.success('Item Quantity updated successfully')

              this.showViewCartModal()

             }else{
               this.toastrService.error('No Items added. Please try again')
             } 
           })
         
  }

  addServiceCharge(value:any){
      this.serviceCharge = JSON.parse(value);
      this.cartDetailsObj.finalAmount = 0;
      this.cartDetailsObj.finalAmount +=  this.cartDetailsObj.total + this.serviceCharge
  }

  showdeleteCartModal(item:any){
    console.log(item)
    this.cartItemId = item.cartId;
    this.itemId = item.itemId;
    
 }

  deleteItem(){
    this._salesService.removeItemFromCart(this.cartItemId,this.itemId).subscribe((data:any) => {
      if(data.status == 200){
        this.toastrService.success('Item deleted successfully!');
        this.showViewCartModal();
        this.closeDeleteItemBtn.nativeElement.click();
      }
    })
  }

  getAllInstallments(){
    this._adminService.getAllInstallment().subscribe((data) => {
   //   console.log(data,'all Installments')
     if(data.length > 0){
    //  this.productsFound = true;
       this.installmentList = data;
      }else{
        this.installmentList = [];
       // this.productsFound = false;
      }
      
    })
  }


  cancelOrder(){
    this._salesService.cancelOrder(this.selectedCartId).subscribe((data) => {
     if(data.status == 200){
      this.router.navigate(['/sales-relation-officer/new-order']);
      localStorage.removeItem(this.memberId);
      localStorage.removeItem(this.selectedCartId);
      this.toastrService.success('Order cancelled successfully')

      }else{
        this.toastrService.success('Error cancelling the order')
      }
      
    })
  }

  getInstallmentDetails(item:any){
      this.paymentInstallmentId = item;
  }

  placeOrder(){
    var newOrder :any = {};
    newOrder.cartId = this.updatedCartId,
    newOrder.totalBill = this.cartDetailsObj.total ,
    newOrder.serviceCharges = this.serviceCharge,
    newOrder.totalBillWithServiceCharges = this.cartDetailsObj.finalAmount,
    newOrder.requestedInstallmentId = this.paymentInstallmentId
   
    this._salesService.placeNewOrder(newOrder).subscribe((data:any) => {
      if(data.status == 200){
      this.toastrService.success('Order placed successfully')
      this.router.navigate(['/sales-relation-officer/new-order']);
      localStorage.removeItem(this.memberId);
      localStorage.removeItem(this.selectedCartId);
      this.showViewCartModal()

       }else{
         this.toastrService.error('Error placing the order. Please try again')
       } 
     })
  }

  showGoToCartModal(){
    if(this.newCart != null){
          this.dataService.sendOldCartData(this.cartDetailsObj)
          this.router.navigate(['/sales-relation-officer/new-order']) 
    } 
  }


}
