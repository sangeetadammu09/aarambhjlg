import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import { DataService } from 'src/app/utils/data.service';


declare var $ :any;
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
  roles = localStorage.getItem('roles');
  memberDropdownList: any =[];
  centerDropdownList :any =[]
  searchMember:any;
  searchProduct:any;
  searchCenter:any;
  productList: any = []; 
  todayDate = new Date().toJSON();
  selectedCartId: any;
  exampleData: any = [];
  suggestions: string[] = [];
  itemsAdded :boolean = false;
  cartText = "Add To Cart";
  isselectedProduct: boolean = true;
  @ViewChild('closeproductModalBtn') closeproductModalBtn: any;
  @ViewChild('closeViewCartModalBtn') closeViewCartModalBtn: any;
  searchProductItem: any ={};
  productObj:any ={};
  memberId: any;
  cartDetailsObj :any ={}
  cartList : any = [];
  firstRole: any;
  newCart :any = {};
  createdCart: any;
  oldCartData: any;
  pageLoaded : boolean= false;

  

  constructor(private _salesService: SalesRelationService, private toastrService: ToastrService,
    private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.getSalesOfficersCenterList();
    this.searchMember = "";
    this.searchCenter = "";
    this.searchProduct = "";
    this.getRandomProductList();
    this.productObj = { 
      prodQuantityInput:"",
      
    };

    if(this.roles){
      var temp = JSON.parse(this.roles);
      const finalArray = temp.map((item:any, index:number) => ({ id: index,name: item }))
      this.firstRole = finalArray[0].name;
      console.log(this.firstRole);
    }

   
 
  }

  getSalesOfficersCenterList(){
    this._salesService.getSalesOfficersCenterList(this.userId,this.cityId).subscribe((data:any) => {
      //console.log(data,'cco member')
        if(data.length > 0){
          this.centerDropdownList = data;
          this.pageLoaded = true;
   
         }else{
           this.centerDropdownList = [];
           this.pageLoaded = true;
         } 
       })
   
  }

  getCenterVal(event:any){
    var searchMemberId = event;
    this._salesService.getMemberListByCenter(searchMemberId).subscribe((data:any) => {
     // console.log(data,'all memberDropdownList')
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
   //   console.log(data,'all productList')
      if(data.length > 0){
        //this.searchProduct = ''
        this.productList = data;
        
       }else{
         this.productList = [];
         
       } 
     })
    }

  listSearchedProduct(item:any){
    this.searchProduct = item.productName;
      var selectproductId = item.productId;
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
          this.dataService.oldCartData.subscribe((data:any) => {
            this.oldCartData = data;    
            if(this.oldCartData){
              console.log(this.oldCartData.cartItems);
            this.searchCenter = this.oldCartData.centerId;
            this.getCenterVal(this.searchCenter)
            console.log(this.randomProductList)
            
            }
      
          })
   
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
    this.memberId = item;
    this.newCart.cartId = 0,
    this.newCart.cityId = this.cityId ? JSON.parse(this.cityId) : null,
    this.newCart.centerId = this.searchCenter,
    this.newCart.memberId = item,
    this.newCart.orderTakenById = this.userId ? JSON.parse(this.userId) : null,
    this.newCart.orderTakenByRole = this.roleNo == '102' && this.roles ? this.firstRole : null,
    this.newCart.cartDate = this.todayDate
   // console.log(this.newCart)
    this._salesService.getShoppingCart(this.newCart).subscribe((data:any) => {
      if(data){
        this.createdCart = data;
        this.selectedCartId = data.cartId;
        this.toastrService.success('Cart created successfully')
       }else{
         this.toastrService.error('No cart created')
       } 
     })
  }

  validateQuantity(value:any){
     this.isselectedProduct = value;
     
  }

  showProductModal(item:any,index:any){
    this.productObj.prodQuantityInput = null;
     this.searchProductItem = item;
     let tempCartArr = this.oldCartData.cartItems;
      tempCartArr.forEach((y:any)=>{
        if(item.productId == y.itemId){
          this.productObj.prodQuantityInput = y.qty
        }
      }) 
    
     this.itemsAdded = false;
     this.cartText = "Add To Cart";
  }

  addToCart(prodQuantity:any, product:any){
    if(this.selectedCartId){
    var addCart :any = {};
    addCart.cartId = this.selectedCartId,
    addCart.itemId = product.productId,
    addCart.itemName = product.productName ,
    addCart.qty = JSON.parse(this.productObj.prodQuantityInput),
    addCart.salePrice = product.jlgSalePrice,
    addCart.mrp = product.mrp,
    addCart.subTotal = addCart.salePrice * addCart.qty,
    addCart.itemUrl = product.productPhoto
    this._salesService.addItemToCart(addCart).subscribe((data:any) => {
      if(data.status == 200){
        this.toastrService.success('Items added successfully')
        this.itemsAdded = true;
        this.cartText = "Added To Cart"
        this.productObj.prodQuantityInput = null;
        this.closeproductModalBtn.nativeElement.click();
       }else{
         this.toastrService.error('No Items added. Please try again')
       } 
     })
    }else{
      this.toastrService.error('No Cart Found')
    }
    
  }

  showViewCartModal(){
    if(this.selectedCartId && this.memberId){
   //   localStorage.setItem('newCart',JSON.stringify(this.createdCart))
      this.dataService.sendMemberIdAndCartId(this.createdCart)
       this.router.navigate(['/sales-relation-officer/view-cart'])
      
    }
  }

 


}
