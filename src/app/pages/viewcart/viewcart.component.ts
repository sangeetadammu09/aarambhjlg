import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  selectedCartId:any = localStorage.getItem('selectedCartId');
  memberId:any = localStorage.getItem('memberId');
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
  

  constructor(private dataService: DataService, private _salesService: SalesRelationService,
    private toastrService :ToastrService,private router: Router) {}

  ngOnInit(): void {
    this.showViewCartModal();
    this.installmentList= [{id:1,name:"4 Installments"},{id:2,name:"5 Installments"},{id:3,name:"6 Installments"},{id:4,name:"7 Installments"},
    {id:5,name:"8 Installments"}]
    this.paymentInstallment = ""

  }

  showViewCartModal(){
    if(this.selectedCartId != null && this.memberId != null){
      this._salesService.getShoppingCart(this.memberId,this.selectedCartId).subscribe((data:any) => {
        if(data){
         // debugger;
          this.cartDetailsObj = data;
          this.viewCartList = data.cartItems;
          this.cartDetailsObj.total = 0;
          this.cartDetailsObj.finalAmount = 0;
          this.viewCartList.forEach((item:any,index:number) => {
            this.cartDetailsObj.total += item['subTotal'];
          })  
          this.cartDetailsObj.finalAmount +=  this.cartDetailsObj.total + this.serviceCharge;
          //console.log(this.viewCartList);
         
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

  updateItemQuantity(item:any){
          console.log(item)
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
      this.serviceCharge = value;
      this.cartDetailsObj.finalAmount =0;
      this.cartDetailsObj.finalAmount +=  this.cartDetailsObj.total + this.serviceCharge
  }

  showdeleteCartModal(item:any){
    this.cartItemId = item.cartId;
    
 }

  deleteItem(){
    this._salesService.removeItemFromCart(this.cartItemId,this.memberId).subscribe((data:any) => {
      if(data.status == 200){
        this.toastrService.success('Item deleted successfully!');
        this.showViewCartModal();
        this.closeDeleteItemBtn.nativeElement.click();
      }
    })
  }

  cancelOrder(){
    this.router.navigate(['/sales-relation-officer/new-order']);
    localStorage.removeItem(this.memberId);
    localStorage.removeItem(this.selectedCartId);

  }

  placeOrder(){

  }


}
