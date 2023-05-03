import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productList: any =[];
  page = 1;
  total = 20;
  pageSize = 12;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  
  constructor(private _salesService: SalesRelationService, private _adminService: AdminService ) { }

  ngOnInit(): void {
    this.getProductDetailsListBySale();
    
  }

  getProductDetailsListBySale(){
      this._adminService.getProductDetailsForSale(this.cityId,this.page,this.pageSize).subscribe((data:any) =>{
        console.log(data,'data');
        
        if(data.products.length > 0){
          data.products.forEach((product:any) =>{
            product['url'] = product.assetes[0].url;
          })
          this.productList = data.products;
          this.total = data.page.totalCount;
          console.log(this.productList)
   
         }else{
           this.productList = [];
         } 
       })
   
  }
  
 


  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getProductDetailsListBySale();
}

}
