import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId = localStorage.getItem('userId');
  cityId = localStorage.getItem('userCity');
  centerName = "";
  centerList =[];
  orderList =[];


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getCenterSummary();
    this.getOrderSummary();
    this.adminService.getCityById(this.cityId).subscribe((data:any) => {
      this.centerName = data.cityName
    })
  }


  getCenterSummary(){
      this.adminService.getCenterSummary(this.userId).subscribe((data:any) => {
        if(data.status == 200){
        //console.log(data.body);
        this.centerList = data.body;
        }
      })
  }

  getOrderSummary(){
    this.adminService.getOrderSummary(this.userId).subscribe((data:any) => {
      if(data.status == 200){
        //console.log(data.body);
        this.orderList = data.body;
      }
 })
  }

}
