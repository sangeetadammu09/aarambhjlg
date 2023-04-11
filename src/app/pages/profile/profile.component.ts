import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetailsObj: any ={};
  userId = localStorage.getItem('userId')
  userDocuments: any = [];
  pagenew = 1;
  userDocImage: any ={};
  fileUrl: any;

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.showUserModal();
  }



  showUserModal(){
    // console.log(item)
     this._adminService.getAllUserDetails(this.userId).subscribe((data:any) =>{
       if(data){
        console.log(data,'0')
         this.userDetailsObj = data;
         this.userDocuments = data.documents;
         console.log(this.userDocuments)
       }
      
     })
    }
    showUserDocuments(item:any){
      this.userDocImage = item;
         this.fileUrl =  item.url;

    }

}
