import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
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
  
  constructor(private _salesService: SalesRelationService, private _adminService: AdminService ) { }

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


  getRandomProductList(){
    this._salesService.getRandomProducts(this.cityId).subscribe((data:any) => {
      console.log(data,'random')
        if(data.length > 0){
          this.randomProductList = data;
   
         }else{
           this.randomProductList = [];
         } 
       })
  }


  getProductQuantity(prodQuantity:any){

  }

  addToCart(){
    
  }


  clearText(){
    this.productList = [];
    this.searchProduct = null;
  }


}
