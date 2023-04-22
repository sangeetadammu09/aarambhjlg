import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})
export class NeworderComponent implements OnInit {

  randomProductList: any =[];
  MembersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  memberDropdownList: any =[];
  centerDropdownList :any =[]
  searchMember:any;
  searchProduct:any;
  searchCenter:any;
  productList: any = []; 
  todayDate = new Date().toJSON();
  selectedCartId: any;


  constructor(private _salesService: SalesRelationService, private toastrService: ToastrService ) { }

  ngOnInit(): void {
    this.getSalesOfficersCenterList();
    this.searchMember = "";
    this.searchCenter = "";
    this.searchProduct = "";
    this.getRandomProductList()
  }

  getSalesOfficersCenterList(){
    this._salesService.getSalesOfficersCenterList(this.userId,this.cityId).subscribe((data:any) => {
      console.log(data,'cco member')
        if(data.length > 0){
          this.centerDropdownList = data;
   
         }else{
           this.centerDropdownList = [];
         } 
       })
   
  }

  getCenterVal(event:any){
    var searchMemberId = event;
    this._salesService.getMemberListByCenter(searchMemberId).subscribe((data:any) => {
      console.log(data,'all memberDropdownList')
      if(data.length > 0){
        this.memberDropdownList = data;

      //  this.total = data.page.totalCount;

       }else{
         this.memberDropdownList = [];
       } 
     })
  
  }

  getSearchedProducts(event: any){
    var searchProd = event;
    this._salesService.getProductAutocomplete(searchProd).subscribe((data:any) => {
      console.log(data,'all productList')
      if(data.length > 0){
        this.searchProduct = ''
        this.productList = data;
       }else{
         this.productList = [];
       } 
     })
  }

  listSearchedProducts(item:any){
 
      var selectproductId = item;
      this._salesService.getSingleProducts(this.cityId,selectproductId).subscribe((data:any) => {
     
          if(data){
            this.randomProductList= [data, ...[]] 
           
     
           }else{
             this.toastrService.error('No Product Found')
           } 
         })
  }


  getRandomProductList(){
    this._salesService.getRandomProducts(this.cityId).subscribe((data:any) => {
        if(data.length > 0){
          this.randomProductList = data;
   
         }else{
           this.randomProductList = [];
         } 
       })
  }

  clearText(){
    this.productList = [];
    this.searchProduct = null;
    this.getRandomProductList();
  }

  createNewCart(item:any){
    var newCart :any = {};
    newCart.cartId = 0,
    newCart.cityId = this.cityId ? JSON.parse(this.cityId) : null,
    newCart.centerId = this.searchCenter,
    newCart.memberId = item,
    newCart.orderTakenById = this.userId ? JSON.parse(this.userId) : null,
    newCart.orderTakenByRole = this.roleNo == '102' ? 'Role Officer' : null,
    newCart.cartDate = this.todayDate

    this._salesService.createNewCart(newCart).subscribe((data:any) => {
      if(data){
        console.log(data.body)
        this.selectedCartId = data.body;
        this.toastrService.success('Cart created successfully')
       }else{
         this.toastrService.error('No cart created')
       } 
     })
  }

  validateQuantity(value:any){
    
  }

  addToCart(prodQuantity:any, product:any){
    if(this.selectedCartId){
    var addCart :any = {};
    addCart.cartId = this.selectedCartId,
    addCart.itemId = product.productId,
    addCart.itemName = product.productName ,
    addCart.qty = JSON.parse(prodQuantity),
    addCart.salePrice = product.jlgSalePrice,
    addCart.mrp = product.mrp,
    addCart.subTotal = addCart.salePrice * addCart.qty,
    addCart.itemUrl = product.productPhoto
    this._salesService.addItemToCart(addCart).subscribe((data:any) => {
      if(data.status == 200){
        this.toastrService.error('Items added successfully')
       }else{
         this.toastrService.error('No Items added. Please try again')
       } 
     })
    }else{
      this.toastrService.error('No Cart Found')
    }
    
  }


}
