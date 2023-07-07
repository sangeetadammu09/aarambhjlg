import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesManagerService } from 'src/app/sales-manager-officer/service/sales-manager.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-dispatched-orders',
  templateUrl: './dispatched-orders.component.html',
  styleUrls: ['./dispatched-orders.component.css']
})
export class DispatchedOrdersComponent implements OnInit {
  page = 1;
  total = 20;
  pageSize = 10;
  pageLoaded : boolean= false;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  dispatchedList:any = [];
  roleNo = localStorage.getItem('roleNo');
  constructor(private _adminService: AdminService, private soRoService: SalesRelationService, private salesManager: SalesManagerService) { }
  ngOnInit(): void {
    this.getAllDispatchedDetails();
  }

  getAllDispatchedDetails(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    if(this.roleNo == '101'){
    this._adminService.getDispatchedOrdersListForAdmin(this.cityId, this.page,this.pageSize).subscribe((data) => {
      console.log(data,'all dispatched orders')
        if(data.length > 0){
          this.pageLoaded = true;
          this.dispatchedList = data;
          this.total = data[0].totalCount;
   
         }else{
           this.dispatchedList = [];
           this.pageLoaded = true;
         } 
       })
    }

    if(this.roleNo == '102'){
      this.soRoService.getDispatchedOrdersListForSoRoList(this.cityId, this.page,this.pageSize).subscribe((data) => {
        console.log(data,'all dispatched orders')
          if(data.length > 0){
            this.pageLoaded = true;
            this.dispatchedList = data;
            this.total = data[0].totalCount;
     
           }else{
             this.dispatchedList = [];
             this.pageLoaded = true;
           } 
         })
      }
      if(this.roleNo == '103'){
        this.salesManager.getDispatchedOrdersListForManager(this.cityId, this.page,this.pageSize).subscribe((data) => {
          console.log(data,'all dispatched orders')
            if(data.length > 0){
              this.pageLoaded = true;
              this.dispatchedList = data;
              this.total = data[0].totalCount;
       
             }else{
               this.dispatchedList = [];
               this.pageLoaded = true;
             } 
           })
        }
   
  }


  handlePageChange(event: number){
    this.page = event;
    this.getAllDispatchedDetails();
}

}
