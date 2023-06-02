import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-user-contacts',
  templateUrl: './user-contacts.component.html',
  styleUrls: ['./user-contacts.component.css']
})
export class UserContactsComponent implements OnInit {

  userList: any =[];
  usersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  cityId = localStorage.getItem('userCity');
  pageLoaded : boolean= false;
  
  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.getUserContactsDetails()
  }

  getUserContactsDetails(){
    this._adminService.getUserContacts(this.cityId,this.page,this.pageSize).subscribe((data) => {
        if(data.users.length > 0){
          data.users.forEach((user:any) => {
              var finalArray = user.roles.map((item:any)=>{
                return item.roleName;
              });
            user['modifiedRoles']= finalArray;
          })
          this.userList = data.users;
          this.pageLoaded = true;
          this.total = data.page.totalCount;

         }else{
           this.userList = [];
           this.pageLoaded = true;
         } 
       })
   
  }


  handlePageChange(event: number){
    //console.log(event)
    this.page = event;
    this.getUserContactsDetails();
}
}
